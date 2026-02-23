# Execution plan: Single-worktree feature branch default

**Owner:** aemon  
**Created:** 2026-02-22  
**Status:** active  
**Gate set:** quick  
**Risk class:** B

## Objective and scope

- Goal: standardize execution to one feature branch + one worktree per packet by default, with clear exception and cleanup rules.
- Non-goals: modify application code paths or ship runtime feature changes.
- Measurable success criteria:
  - workflow and orchestrator docs encode the default model and exception policy,
  - cleanup procedure is explicit, repeatable, and confirmation-gated,
  - packet-level validation evidence proves the process works end-to-end.

## Requirements baseline

### Functional requirements

- Define default model: one packet branch and one worktree per packet execution.
- Define parallelism model: parallel work occurs across feature branches.
- Define exception model: sub-slice worktrees are opt-in only with explicit rationale and merge-back order.
- Add/align orchestrator contract to require human confirmation before merge and cleanup operations.
- Provide a deterministic cleanup runbook covering branch/worktree lifecycle.

### Non-functional requirements (with metrics)

- Legibility: packet documentation must state branch/worktree ownership and lifecycle unambiguously.
- Safety: destructive operations (`worktree remove`, branch delete) require explicit human confirmation recorded in packet progress.
- Reproducibility: validation commands and evidence pointers are sufficient for another reviewer to reproduce closeout.
- Throughput: active worktree count should trend to one per active packet unless an approved exception exists.

### Acceptance criteria

- [x] `docs/WORKFLOW.md` reflects the single-worktree-per-feature-branch default.
- [x] Workflow contract text encodes parallelism across packet branches and preplanned exception-only extra slice worktrees.
- [x] `docs/templates/work-pointer.md` aligns branch/worktree conventions with packet-scoped naming and default execution model.
- [x] Orchestrator contract files `.opencode/commands/enkidu-work.md` and `.opencode/prompts/enkidu-orchestrator.md` align with explicit human confirmation requirements before merge and cleanup.
- [x] Cleanup runbook and merge order are documented with explicit human confirmation gate.
- [x] Validation evidence for `quick` gates and git invariants is recorded in this packet.

## Execution plan (DAG + worktree slices)

Describe the dependency-aware plan.

- Slice 0 (packet scaffolding, this PR):
  - [x] Create packet artifacts (`story.md`, `plan.md`, ready pointer)
  - [ ] Commit: `docs(work): add single-worktree-default packet`
- Slice 1 (workflow policy alignment):
  - [x] Update workflow docs with default model + exception rule.
  - [x] Add explicit confirmation gate before merge/cleanup operations.
  - [x] Add deterministic cleanup runbook order: backup/evidence -> merge -> verify -> remove worktrees/branches.
  - [ ] Commit: `docs(workflow): set single-worktree default`
- Slice 2 (pointer template + docs contract alignment):
  - [x] Update `docs/templates/work-pointer.md` to match naming/lifecycle policy.
  - [x] Encode default model, exception rule, confirmation checkpoint, and cleanup order in pointer notes.
  - [ ] Commit: `docs(templates): align pointer and cleanup runbook`
- Slice 4 (validation + closeout evidence):
  - [x] Run `quick` gate commands and git invariant checks.
  - [ ] Capture reviewer evidence and explicit human confirmation before any merge/cleanup.
  - [ ] Commit: `docs(work): record validation and closeout evidence`

Notes:
- Use atomic commits (one logical change per commit). See `docs/COMMITS.md`.

## Red-team risk register and mitigations

- Threat: accidental deletion of needed worktree or branch during cleanup.
  - Risk: High
  - Mitigation: require confirmation gate, backup/evidence step, and deterministic removal order.
  - Validation: reviewer checks confirmation record and post-cleanup branch/worktree lists.
- Threat: hidden divergence between packet branches due long-lived parallel slices.
  - Risk: Medium
  - Mitigation: single-worktree default and exception-only sub-slicing with explicit merge-back sequence.
  - Validation: packet plan records branch ancestry and merge order.
- Threat: policy drift between docs, templates, and orchestrator prompts.
  - Risk: Medium
  - Mitigation: update all workflow artifacts in one packet and require checklist cross-reference.
  - Validation: grep/read checks across targeted docs and prompts.

## Gate and validation matrix

- Gate set: quick
- Commands:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run test`
  - `git worktree list`
  - `git branch --list "ekdu/*"`
  - `git status --short`
- Evidence artifacts (scorecards/logs):
  - command outputs summarized in this packet `Progress log`
  - packet command ledger: `docs/work/20260222-single-worktree-default/command-log.md`
  - reviewer closeout note in packet `Completion checklist`
  - explicit human confirmation note before merge/cleanup steps

## Decision log

- 2026-02-22: adopt single-worktree-per-feature-branch as default execution model.
- 2026-02-22: keep multi-slice sub-worktrees as opt-in exception only when parallelism benefit is explicit.

## Progress log

- 2026-02-22: packet created from templates and queued in `ready`.
- 2026-02-23: updated `docs/WORKFLOW.md` with single-worktree default, packet-branch parallelism model, exception preplan rule, human confirmation checkpoint, and deterministic cleanup order.
- 2026-02-23: updated `docs/templates/work-pointer.md` to mirror workflow contract language for execution model, exceptions, and cleanup sequencing.
- 2026-02-23: re-ran quick gate validation and git invariant checks from packet worktree `s1-single-worktree-default`; `lint` and `typecheck` passed, `test` reported one existing config assertion failure, and git invariant commands succeeded.
- 2026-02-23: updated `tests/unit/opencode-config.test.mjs` to assert critique agents keep an empty task-permission map (no escalation) and re-ran quick gates with all commands passing.
- 2026-02-23: aligned `docs/WORKFLOW.md` Step 7 cleanup sequencing wording with orchestrator contracts after reviewer should-fix feedback.
- 2026-02-23: revalidated quick gates after latest docs updates from packet worktree; lint, typecheck, and test all passed, and git invariant checks remained stable.
- 2026-02-23: closeout pass prepared for commit handoff; scorecard and memory checklist items remain open pending explicit requirement trigger, and merge/cleanup confirmation remains pending human checkpoint.

## Evidence log

- 2026-02-23: `npm run lint` -> pass (`[lint] repository lint checks passed`).
- 2026-02-23: `npm run typecheck` -> pass (no type errors; zero non-zero output).
- 2026-02-23: `npm run test` -> fail (`12 passed, 1 failed`; failing assertion in `tests/unit/opencode-config.test.mjs` expecting deny for `enkidu-requirements` task escalation).
- 2026-02-23: `git worktree list` -> root `main` plus packet worktree `ekdu/20260222-single-worktree-default-s1-single-worktree-default`.
- 2026-02-23: `git branch --list "ekdu/*"` -> `ekdu/20260222-single-worktree-default-s1-single-worktree-default`.
- 2026-02-23: `git status --short` -> modified files include this packet docs and in-scope orchestrator contract files `.opencode/commands/enkidu-work.md` and `.opencode/prompts/enkidu-orchestrator.md`.
- 2026-02-23: detailed command ledger and dangerous-command register captured in `docs/work/20260222-single-worktree-default/command-log.md`.
- 2026-02-23: `npm run test` -> pass (`13 passed, 0 failed`) after task-permission assertion update in `tests/unit/opencode-config.test.mjs`.
- 2026-02-23: `npm run lint` -> pass (`[lint] repository lint checks passed`) on post-fix rerun.
- 2026-02-23: `npm run typecheck` -> pass (`tsc -p tsconfig.json --noEmit` exited zero) on post-fix rerun.
- 2026-02-23: reviewer parity should-fix resolved by aligning Step 7 deterministic cleanup wording in `docs/WORKFLOW.md` with `.opencode/commands/enkidu-work.md` and `.opencode/prompts/enkidu-orchestrator.md`.
- 2026-02-23: revalidation run after latest docs updates -> `npm run lint` pass, `npm run typecheck` pass, `npm run test` pass (`13/13`), plus `git worktree list`, `git branch --list "ekdu/*"`, and `git status --short` recorded in the packet command ledger.
- 2026-02-23: scorecard and memory remain unchecked by design for this closeout pass because no new scorecard artifact requirement or durable memory decision was introduced; explicit human merge/cleanup confirmation is still pending.

## Completion checklist

- [x] acceptance criteria satisfied
- [x] chosen gate set is green
- [ ] scorecard recorded (if required)
- [ ] docs/ADRs updated (if reality changed)
- [ ] memory updated (if enabled)
- [ ] explicit human confirmation recorded before merge + branch/worktree cleanup
