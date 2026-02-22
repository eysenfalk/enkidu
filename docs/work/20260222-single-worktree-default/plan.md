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

- [ ] `docs/WORKFLOW.md` reflects the single-worktree-per-feature-branch default.
- [ ] Orchestrator command/prompt contracts encode the same default and exception gate.
- [ ] `docs/templates/work-pointer.md` aligns branch/worktree conventions with packet-scoped naming.
- [ ] Cleanup runbook and merge order are documented with explicit confirmation gate.
- [ ] Validation evidence for `quick` gates and git invariants is recorded in this packet.

## Execution plan (DAG + worktree slices)

Describe the dependency-aware plan.

- Slice 0 (packet scaffolding, this PR):
  - [x] Create packet artifacts (`story.md`, `plan.md`, ready pointer)
  - [ ] Commit: `docs(work): add single-worktree-default packet`
- Slice 1 (workflow policy alignment):
  - [ ] Update workflow docs with default model + exception rule.
  - [ ] Add explicit confirmation gate before merge/cleanup operations.
  - [ ] Commit: `docs(workflow): set single-worktree default`
- Slice 2 (orchestrator contract alignment):
  - [ ] Update orchestrator command/prompt docs to match the default model.
  - [ ] Ensure no implicit extra worktree spawning without documented exception.
  - [ ] Commit: `docs(orchestrator): enforce branch-worktree default`
- Slice 3 (cleanup runbook + templates):
  - [ ] Update `docs/templates/work-pointer.md` and related docs to match naming/lifecycle policy.
  - [ ] Add cleanup runbook steps and evidence checklist.
  - [ ] Commit: `docs(templates): align pointer and cleanup runbook`
- Slice 4 (validation + closeout evidence):
  - [ ] Run `quick` gate commands and git invariant checks.
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
  - reviewer closeout note in packet `Completion checklist`
  - explicit human confirmation note before merge/cleanup steps

## Decision log

- 2026-02-22: adopt single-worktree-per-feature-branch as default execution model.
- 2026-02-22: keep multi-slice sub-worktrees as opt-in exception only when parallelism benefit is explicit.

## Progress log

- 2026-02-22: packet created from templates and queued in `ready`.

## Completion checklist

- [ ] acceptance criteria satisfied
- [ ] chosen gate set is green
- [ ] scorecard recorded (if required)
- [ ] docs/ADRs updated (if reality changed)
- [ ] memory updated (if enabled)
- [ ] explicit human confirmation recorded before merge + branch/worktree cleanup
