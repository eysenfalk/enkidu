# Execution plan: Planner Pro workflow review agents + architect pass

**Owner:** aemon  
**Created:** 2026-02-22  
**Status:** active  
**Gate set:** pr  
**Risk class:** A

## Objective and scope

- Goal: implement a deterministic Planner Pro review workflow with five explicit specialist passes: requirements engineer, red teamer, pragmatist, architect, and plan-reviewer.
- Boundaries:
  - in scope: planner workflow config/prompt/command/docs alignment and validation evidence,
  - out of scope: application code changes under `src/**`, runtime feature delivery unrelated to planning workflow.
- Measurable success criteria:
  - Planner Pro can invoke all required review passes and synthesize one final execution-ready plan,
  - requirement pass can ask focused user questions when ambiguity is blocking,
  - architect and plan-reviewer outputs are reflected in final plan decisions,
  - permissions remain least-privilege and pass security checks.

## Requirements baseline

### Functional requirements

- FR-01: Add `enkidu-plan-reviewer` subagent definition (read-only critique role, no mutation tools).
- FR-02: Ensure `enkidu-requirements`, `enkidu-redteam`, and `enkidu-pragmatist` are fully wired with existing prompt files and usable contracts.
- FR-03: Update Planner Pro task permissions to call required planning reviewers (`enkidu-requirements`, `enkidu-redteam`, `enkidu-pragmatist`, `enkidu-plan-reviewer`, `enkidu-architect`) plus research support where needed.
- FR-04: Define explicit Planner Pro pass order:
  1) requirements clarifications,
  2) red-team attack,
  3) pragmatist value check,
  4) architect design pass,
  5) plan-reviewer big-picture pass,
  6) final synthesis.
- FR-05: Requirements engineer asks user only targeted, blocking questions, each with recommended default and impact.
- FR-06: Final Planner Pro output includes merged findings, acceptance criteria deltas, traceability matrix, and blocker status.
- FR-07: Workflow docs and command docs describe the new pass sequence and decision checkpoints.
- FR-08: Add validation playbook for config integrity, permission posture, and planner smoke scenario.
- FR-09: Add `/enkidu-plan-new` command bound to `enkidu-planner-pro` for new-plan creation using full reviewer stack.
- FR-10: Add `/enkidu-plan-review` command bound to `enkidu-planner-pro` for plan update/review using subset-by-policy reviewers.
- FR-11: Remove `/enkidu-plan-pro` command and update workflow/docs references to `/enkidu-plan-new` and `/enkidu-plan-review`.

### Non-functional requirements (with metrics)

- NFR-01 (safety): critique agents keep read-only posture (`edit/write/patch/bash/task` disabled), validated by effective permission snapshot.
- NFR-02 (question hygiene): requirements pass asks at most one question batch, max 3 targeted questions per planning run.
- NFR-03 (determinism): Planner Pro output always includes required sections and all five reviewer outcomes.
- NFR-04 (latency): full planning workflow (all reviewer passes) completes within 8 minutes on baseline model settings.
- NFR-05 (traceability): each FR/NFR maps to at least one task slice and one validation artifact.

### Acceptance criteria

- [ ] Given a planning task with missing constraints, when Planner Pro runs, then requirements engineer asks targeted clarifying questions with defaults and impact.
- [ ] Given a planning task, when Planner Pro runs end-to-end, then output includes results from red teamer, pragmatist, architect, and plan-reviewer before final synthesis.
- [ ] Given `/enkidu-plan-new`, when invoked with a request, then Planner Pro executes full reviewer stack and produces a new execution-ready plan artifact set.
- [ ] Given `/enkidu-plan-review`, when invoked with a packet reference, then Planner Pro executes subset-by-policy reviewers and returns plan update/review output.
- [ ] Given command inventory is reviewed, when migration is complete, then `/enkidu-plan-pro` is absent and no active docs point users to it.
- [ ] Given updated config, when `opencode debug config` is run, then reviewer agents and permissions match least-privilege expectations.
- [ ] Given planner workflow docs, when reviewed, then pass order and responsibilities are explicit and consistent with config.
- [ ] Given gate execution, when `npm run gates:pr` and `bun run gates:pr` complete, then selected gate set is green.

### Traceability matrix

- FR-01 -> Slice 2 -> config validation (`python -m json.tool opencode.json`, `opencode debug config`).
- FR-02/FR-04 -> Slice 3 -> planner smoke scenario output with pass-order evidence.
- FR-03 -> Slice 2 -> permission snapshot and deny-by-default verification.
- FR-05 -> Slice 3/5 -> smoke scenario confirms bounded question batch behavior.
- FR-06 -> Slice 5 -> final planner output checklist includes merged findings + traceability.
- FR-07 -> Slice 4 -> docs/command diff review against workflow contract.
- FR-08 -> Slice 5 -> validation recipe and evidence pointers in packet progress.
- FR-09/FR-10/FR-11 -> Slice 3/5 -> command file checks + smoke-run evidence for `/enkidu-plan-new` and `/enkidu-plan-review`.
- FR-11 -> Slice 3/4/5 -> deletion evidence for `.opencode/commands/enkidu-plan-pro.md` + docs reference checks.
- NFR-01..NFR-05 -> Slices 2-5 -> security posture checks + timing/structure evidence.

## Execution plan (DAG + worktree slices)

DAG:
- S0 -> S1 -> {S2, S3} -> S4 -> S5

Parallelization strategy:
- After S1 contract freeze, execute S2 (agent topology/permissions) and S3 (prompt contracts) in parallel worktrees.

Worktree strategy:
- Use packet-scoped branches/worktrees:
  - branch: `ekdu/20260222-planner-pro-workflow-agents-<slice>`
  - worktree: `.ekdu/worktrees/20260222-planner-pro-workflow-agents-<slice>`

Slices:

- Slice 0 (packet-of-record; docs-only):
  - [x] create packet artifacts and ready pointer.
  - [ ] Commit: `docs(work): add planner-pro workflow agents packet`

- Slice 1 (workflow contract and role charter):
  - [ ] finalize role definitions, pass order, and escalation rules.
  - [ ] define question-loop policy and stop conditions.
  - [ ] Commit: `docs(workflow): define planner-pro multi-review flow`

- Slice 2 (agent topology + permissions; implementation handoff):
  - [ ] add `enkidu-plan-reviewer` and wire planner task allowlist.
  - [ ] ensure critique agents remain non-mutating and non-spawning.
  - [ ] add architect as explicit planner workflow dependency.
  - [ ] Commit: `chore(agents): wire planner reviewer stack`

- Slice 3 (prompt + command contract; implementation handoff):
  - [ ] add/mend critique prompt files and planner synthesis instructions.
  - [ ] add `.opencode/commands/enkidu-plan-new.md` (full-stack planner flow).
  - [ ] add `.opencode/commands/enkidu-plan-review.md` (review/update flow with subset policy).
  - [ ] delete `.opencode/commands/enkidu-plan-pro.md`.
  - [ ] update any command references that still point to `/enkidu-plan-pro`.
  - [ ] Commit: `chore(prompts): enforce planner review pass order`

- Slice 4 (docs alignment and governance):
  - [ ] update `docs/WORKFLOW.md` and related pointers for the new planner review flow.
  - [ ] include architect and plan-reviewer checkpoints in planning guidance.
  - [ ] Commit: `docs(workflow): document planner reviewer workflow`

- Slice 5 (validation and evidence):
  - [ ] run `pr` gate set for npm and bun paths.
  - [ ] capture permission snapshots + planner smoke evidence.
  - [ ] update packet progress and completion evidence.
  - [ ] Commit: `docs(work): record planner workflow validation evidence`

Replanning triggers:

- Missing/invalid prompt paths for critique agents.
- Planner cannot spawn a required reviewer due permission mismatch.
- Question loop causes repeated non-blocking questions.
- Any high/critical risk lacks mitigation evidence by Slice 5.

Rollback strategy:

- Keep previous Planner Pro flow behind documented fallback until smoke pass succeeds.
- If new reviewer stack regresses planner usability, revert to previous planner prompt/config commit and re-run `pr` gate set.

## Red-team risk register and mitigations

Threat surface:
- planner synthesis logic,
- reviewer subagent permissions,
- user-question loop,
- architecture decision pass,
- config/prompt integrity.

Risk scoring: `(likelihood * impact) + exploitability`.

| ID | Threat | L | I | E | Score | Tier | Mitigation | Validation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R1 | Permission creep enables critique-agent mutation | 4 | 5 | 4 | 24 | Critical | deny-by-default permissions; explicit read-only policy | `opencode debug config` permission snapshot |
| R2 | Prompt injection through requirements question loop | 4 | 4 | 3 | 19 | High | targeted-question policy + default-first synthesis + scope guardrails | planner smoke with adversarial prompt |
| R3 | Missing prompt files break runtime reviewer flow | 4 | 3 | 3 | 15 | High | enforce file existence checks before merge | config parse + prompt path validation |
| R4 | Over-questioning degrades planning throughput | 3 | 3 | 3 | 12 | Medium | max 1 question batch, max 3 questions, block-only criteria | smoke scenario timing + output checks |
| R5 | Architect pass omitted causing design drift | 3 | 4 | 3 | 15 | High | make architect pass mandatory in planner sequence | output checklist includes architect section |
| R6 | Reviewer disagreement unresolved in final plan | 3 | 4 | 2 | 14 | Medium | planner synthesis rule: explicit conflicts + decision log entry | final plan includes conflict resolution notes |

Release blockers:
- Any unresolved Critical risk blocks merge.
- High risks require mitigation evidence or a time-boxed exception (owner + expiry + compensating controls).

## Gate and validation matrix

- Selected gate set: `pr`
- Justification:
  - change impacts workflow integrity and permission/security posture,
  - requires stronger assurance than `quick`,
  - does not require production release hardening from `release` for this planning/workflow scope.
- Required checks:
  - `npm run gates:pr`
  - `bun run gates:pr`
  - `python -m json.tool opencode.json`
  - `opencode debug config` (effective permissions)
  - Planner Pro smoke run demonstrating all required passes and bounded question behavior
  - command smoke checks for `/enkidu-plan-new` and `/enkidu-plan-review`
  - reference check proving `/enkidu-plan-pro` is removed from active docs/commands
- Evidence artifacts:
  - gate outputs,
  - permission snapshot,
  - smoke-run transcript excerpt,
  - packet progress entries with timestamps.

## Assumptions, unknowns, and decision log candidates

Assumptions:
- Planner Pro remains the primary planning entrypoint.
- Architect remains a non-mutating architecture advisor unless explicitly delegated otherwise.

Unknowns:
- whether question tool enablement is required for requirement-engineer or planner-mediated questioning is sufficient.
- expected default timeout/latency budget for multi-review planning in real usage.

Decision log candidates:
- D1: direct question-tool usage by requirements agent vs planner-mediated user questions.
- D2: mandatory vs conditional architect pass for small packets.
- D3: plan-reviewer escalation policy when reviewer outputs conflict.

## Recommended first action

- Freeze the role charter and pass order in Slice 1, then hand off S2/S3 in parallel to implementer worktrees for config and prompt wiring.

## Decision log

- 2026-02-22: selected risk class `A` due permission and policy-safety impact.
- 2026-02-22: selected gate set `pr` as minimum adequate assurance for workflow/security changes.

## Progress log

- 2026-02-22: packet created and queued in `ready`.

## Completion checklist

- [ ] acceptance criteria satisfied
- [ ] chosen gate set is green
- [ ] scorecard recorded (if required)
- [ ] docs/ADRs updated (if reality changed)
- [ ] memory updated (if enabled)
- [ ] all high/critical risks mitigated or exceptioned with owner and expiry
