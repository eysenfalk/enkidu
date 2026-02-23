# Workflow

This document describes the **manual** Enkidu workflow (productive first), and the **automated** workflow (autonomy later).

The guiding philosophy (from harness engineering) is:

- **Humans steer. Agents execute.**
- Build the *environment* so that agents can do reliable work.
- Make quality measurable, then ratchet it.

---

## 0) “Normal” agile in a typical software company (baseline)

Most teams mix some version of:

- **Scrum** (timeboxed sprints, ceremonies, roles)
- **Kanban** (continuous flow, WIP limits)
- **XP practices** (TDD, pair programming, CI, refactoring)
- **DevOps** (trunk-based development, automated deploys, infra as code)

A very normal baseline looks like:

1. **Backlog intake**  
   - capture ideas as issues/stories
   - add acceptance criteria and a definition-of-done
2. **Grooming / refinement** (weekly-ish)  
   - slice work smaller
   - clarify requirements, risks, dependencies
3. **Sprint planning** (Scrum) or “pull next” (Kanban)  
4. **Implementation loop**  
   - code → tests → PR → review → fix → merge
5. **Release**  
   - CI/CD pipelines, feature flags, canary deploys
6. **Retro**  
   - improve workflow, tooling, quality, and planning accuracy

Enkidu doesn’t throw that away — it *maps it to agentic execution*.

---

## 1) Enkidu workflow: the “agentic agile” mapping

### Key translation
- **Story refinement** becomes *context engineering*.
- **Definition of done** becomes *gates*.
- **Code review** becomes *agent review + automated checks*.
- **Retro** becomes *quality ratchet + eval-driven improvement*.

### Artifacts (the things that outlive a chat)
- **Work packet** (canonical): `docs/work/<id>-<slug>/`
  - `story.md` (requirements)
  - `plan.md` (execution plan + progress + evidence pointers)
- **ADRs**: `docs/adr/ADR-*.md` for decisions
- **Context bundles**: saved retrieval for recurring tasks
- **Scorecards**: `evals/scorecards/*.json` for measurable quality

Work status is represented by queue pointers:
- `docs/work/_queue/backlog/`
- `docs/work/_queue/ready/`
- `docs/work/_queue/in-progress/`
- `docs/work/_queue/blocked/`
- `docs/work/_queue/done/`

Rule: agents only execute **planned work** (a committed `story.md` + `plan.md` with a pointer in `ready/` or `in-progress/`).

### Control semantics

Enkidu uses two control types and both must be explicit:

- **Mechanical controls**: hard, tool-enforced constraints (permissions, command allowlists, worktree preflight checks).
- **Procedural controls**: policy/process requirements that reviewers verify (packet hygiene, evidence quality, risk notes).

Policy rule: when a control can be mechanical, prefer mechanical. Procedural-only controls require explicit evidence in the packet.

---

## 2) Manual workflow (productive first)

This is the “get a manual AI workflow rolling and productive” stage.

### Step 1 — pick a single slice
Pick something small and *verifiable*:
- one endpoint
- one component + tests
- one scraper enhancement with fixtures

Create a work packet:
- `docs/work/<id>-<slug>/story.md` (use `docs/templates/story.md`)
- `docs/work/<id>-<slug>/plan.md` (use `docs/templates/plan.md`)
- add a pointer in `docs/work/_queue/ready/<id>-<slug>.md` (use `docs/templates/work-pointer.md`)

In OpenCode:
- `/enkidu-new-packet <your request>` creates a new planned packet (story + plan + ready pointer).

### Step 2 — plan (no edits)
Use the planning agent (or `enkidu-deepthink`) to:
- restate the problem
- list acceptance criteria
- choose the gate set (quick / pr / release)
- identify context requirements (which docs, which files, which data)

In OpenCode:
- run `/enkidu-plan-new` for full Planner Pro workflow (requirements -> red-team -> pragmatist -> architect -> plan-reviewer -> synthesis)
- run `/enkidu-plan-review` to review/update an existing packet plan with subset-by-policy reviewer passes
- or run `/enkidu-plan` for a lighter planning pass

Note: Planner Pro may edit plan/workflow artifacts, but must not edit application code.

### Step 3 — (optional) research
If you need APIs, libraries, regulations, or scraping constraints:
- run `/enkidu-deepresearch`

The output should be:
- short “what matters”
- citations/links
- any *constraints* to store in docs/memory

### Step 4 — implement in a branch/worktree
Implementation/testing must run in a dedicated execution worktree:

- branch: `ekdu/<packet-id>-<slice-slug>`
- worktree dir: `.ekdu/worktrees/<slice-slug>`
- creation command:
  - `git worktree add .ekdu/worktrees/<slice-slug> -b ekdu/<packet-id>-<slice-slug> <base-branch>`

Naming guidance:
- keep `<packet-id>` unchanged from `docs/work/<packet-id>-<slug>/`
- use collision-safe slice names such as `s1-docs`, `s2-gates`, `s3-tests`
- avoid reusing slice slugs across active slices for the same packet

Legacy-transition exception:
- Existing legacy branches/worktrees that predate packet-scoped naming may complete in place.
- Any new slice created after workflow-of-record adoption must use packet-scoped naming.

Let the implementation agent do the coding and tests.

Commit policy:
- Use atomic commits (see `docs/COMMITS.md`).

### Step 5 — validate
Run the selected gate set locally:
- lint
- typecheck
- unit tests
- integration/e2e (as needed)
- security scan (as needed)

Validation checklist (record in `plan.md`):
- exact commands run
- pass/fail result per command
- timestamp and execution worktree path
- relevant artifacts/notes for failures and mitigations

### Step 6 — self-review + PR
Have `enkidu-reviewer` perform a review pass:
- correctness
- edge cases
- maintainability
- hidden complexity
- missing tests

Then open a PR. The PR description must include:
- what changed
- how to validate
- risks
- scorecard deltas

### Step 7 — merge
Merge only when:
- chosen gate set is green
- a scorecard exists (or was updated)
- the packet plan completion checklist is complete

Self-modification policy:
- Enkidu may modify its own prompts/docs/scripts when required to improve reliability.
- Compensating controls are mandatory:
  - update workflow docs/templates in the same packet
  - add/expand tests for changed enforcement behavior
  - run PR gate set and record evidence in packet artifacts

---

## 3) Automated workflow (autonomy later)

Once the manual loop is stable, automate it.

### The orchestrator model
One orchestrator agent coordinates multiple subagents:

- `enkidu-orchestrator` (primary)
  - decomposes the story into parallelizable units
  - selects from planned work packets only
  - asks for priority when multiple unfinished packets exist
  - creates worktrees/branches
  - dispatches subagents to each worktree
  - enforces gates
  - merges work (merge train)
  - never edits repo files directly (delegates edits to subagents)

In OpenCode:
- `/enkidu-work` runs the orchestrator workflow over planned packets.

Subagents:
- `enkidu-research` (web only)
- `enkidu-architect` (ADRs + interfaces)
- `enkidu-implementer` (code + tests)
- `enkidu-tester` (test improvement, flake hunts)
- `enkidu-reviewer` (read-only review)

### Parallel worktree strategy (the critical part)
Each unit of work gets:
- its own branch
- its own worktree directory
- its own OpenCode session(s)

Why:
- no tool contention
- no context pollution
- easy rollback
- clean merge boundaries

### Merge train strategy
Instead of “one huge PR”, do:
1) merge leaf PRs into an integration branch in order
2) re-run gates after each merge
3) when stable, fast-forward / merge to main

This makes “agent throughput” compatible with “human sanity”.

---

## 4) Where BMAD + Superpowers fit

BMAD is best at:
- spec-driven workflow
- role-based prompting (PM, Architect, Dev, QA)
- structured artifacts

Superpowers is best at:
- bootstrapping good default behaviors
- injection of skills/rules into OpenCode sessions
- ergonomics (“make the agent do the right thing by default”)

Enkidu should treat both as **optional modules**:
- install BMAD for planning/spec discipline
- use Superpowers for OpenCode bootstrap
- keep Enkidu as the harness that turns that into parallel worktrees + gates + scorecards

See `docs/SUPERBMAD_PLAN.md`.

---

## 5) Definition of done (Enkidu edition)

A change is “done” when:
- acceptance criteria are met
- chosen gate set is green
- docs/memory are updated where reality changed
- a scorecard exists (or was updated)
- the repo gets *more legible* (not less)

If your system is generating code faster than it’s generating understanding, you are building a haunted mansion.
