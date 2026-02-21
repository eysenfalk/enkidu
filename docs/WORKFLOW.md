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
- **Story spec**: `docs/plans/<date>-<slug>.md` (or your tracker)
- **ADRs**: `docs/adr/ADR-*.md` for decisions
- **Context bundles**: saved retrieval for recurring tasks
- **Scorecards**: `evals/scorecards/*.json` for measurable quality

---

## 2) Manual workflow (productive first)

This is the “get a manual AI workflow rolling and productive” stage.

### Step 1 — pick a single slice
Pick something small and *verifiable*:
- one endpoint
- one component + tests
- one scraper enhancement with fixtures

Create a story file using the template in `docs/templates/story.md`.

### Step 2 — plan (no edits)
Use the planning agent (or `enkidu-deepthink`) to:
- restate the problem
- list acceptance criteria
- choose the gate set (quick / pr / release)
- identify context requirements (which docs, which files, which data)

In OpenCode:
- switch to `enkidu-deepthink`, or
- run `/enkidu-plan`

### Step 3 — (optional) research
If you need APIs, libraries, regulations, or scraping constraints:
- run `/enkidu-deepresearch`

The output should be:
- short “what matters”
- citations/links
- any *constraints* to store in docs/memory

### Step 4 — implement in a branch/worktree
Create a feature branch (or better: a worktree):
- `ekdu/<story-slug>`

Let the implementation agent do the coding and tests.

### Step 5 — validate
Run the selected gate set locally:
- lint
- typecheck
- unit tests
- integration/e2e (as needed)
- security scan (as needed)

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
Merge only when gates pass and the PR is legible.

---

## 3) Automated workflow (autonomy later)

Once the manual loop is stable, automate it.

### The orchestrator model
One orchestrator agent coordinates multiple subagents:

- `enkidu-orchestrator` (primary)
  - decomposes the story into parallelizable units
  - creates worktrees/branches
  - dispatches subagents to each worktree
  - enforces gates
  - merges work (merge train)

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
