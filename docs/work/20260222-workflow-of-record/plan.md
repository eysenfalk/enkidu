# Execution plan: Workflow-of-record + agent discipline

**Owner:** aemon
**Created:** 2026-02-22
**Status:** done
**Gate set:** pr
**Risk class:** B

## Objective and scope

- Goal: install a repo-native workflow-of-record (work packets + queue pointers) and enforce orchestrator/planner roles.
- Non-goals: build full CI gate runner; implement context graph runtime.
- Success: agents operate only on planned packets; progress/evidence is versioned in git.

## Requirements baseline

### Functional requirements

- Introduce `docs/work/<id>-<slug>/` packets plus `_queue/<status>/` pointers.
- Update workflow docs to make work packets canonical.
- Add atomic commit policy doc.
- Add temporary OpenCode commands:
  - packet creation (planner)
  - work execution (orchestrator)
- Enforce role separation mechanically via OpenCode permissions:
  - orchestrator: delegate-only (no edits)
  - planner: edits only plan/workflow artifacts

### Non-functional requirements (with metrics)

- Parallel safety: packet updates should rarely conflict (no central board file).
- Auditability: each packet has story+plan+progress+validation evidence pointers.

### Acceptance criteria

- [x] `docs/work/README.md` exists and explains packet model.
- [x] `docs/adr/ADR-0005-work-packets-and-queue.md` exists.
- [x] `docs/WORKFLOW.md` updated to describe A-to-Z packet flow and control semantics.
- [x] `docs/COMMITS.md` exists and is referenced by `docs/WORKFLOW.md`.
- [x] Planner Pro can update `docs/work/**` and selected workflow files, but cannot edit `src/**`.
- [x] Orchestrator cannot edit files and has bash allowlist.
- [x] `/enkidu-new-packet` and `/enkidu-work` commands exist.
- [x] PR gate set is executable via concrete npm commands and `scripts/run-gates.sh`.

## Execution plan (DAG + worktree slices)

- Slice 0 (artifacts):
  - [x] Create work packet dirs and queue pointer dirs
  - [x] Add ADR-0005
  - [x] Add `docs/COMMITS.md`
  - Commit checkpoint: `docs(workflow): add work packets + commit policy`

- Slice 1 (workflow docs):
  - [x] Update `docs/WORKFLOW.md` to:
    - define planned work packets
    - define queue pointer model
    - define evidence requirements (scorecards)
    - define orchestrator/planner rules
    - add control semantics + worktree policy + legacy-transition exception
  - [x] Update `docs/index.md` to link `docs/COMMITS.md`
  - Commit checkpoint: `docs(workflow): document packet A-to-Z`

- Slice 2 (agent enforcement):
  - [x] Update `opencode.json` agent permissions:
    - orchestrator: strict bash allowlist + read/glob/list
    - planner pro: enable edit/write/patch with allowlist-only paths
  - [x] Update `.opencode/prompts/enkidu-orchestrator.md` to follow packet workflow and delegate-only rule
  - [x] Update `.opencode/prompts/enkidu-planner-pro.md` to:
    - always create/maintain packet artifacts
    - only edit plan/workflow files
  - [x] Add commands `.opencode/commands/enkidu-work.md` and `.opencode/commands/enkidu-new-packet.md`
  - Commit checkpoint: `chore(agents): enforce workflow + permissions`

- Slice 3 (gate maturation + tests):
  - [x] Replace placeholder gate behavior in `scripts/run-gates.sh`
  - [x] Add `scripts/lint-repo.mjs`, `scripts/security-scan.mjs`, and `scripts/audit-deps.mjs`
  - [x] Add `tests/unit/run-gates.test.mjs` and `tests/integration/pr-gate.test.mjs`
  - [x] Map gate commands in `package.json` and `docs/GATES.md`

## Red-team risk register and mitigations

- Risk: orchestrator mutates repo through bash.
  - Mitigation: deny-by-default bash allowlist in `opencode.json`.
- Risk: planner edits code by accident.
  - Mitigation: path-allowlist `permission.edit` for `enkidu-planner-pro`.
- Risk: false claims of validation.
  - Mitigation: require scorecards + evidence pointers in plan completion checklist.

## Gate and validation matrix

- Gate set: pr
- Validation steps:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run test`
  - `npm run test:integration`
  - `npm run security:scan`
  - `npm run audit:deps`
  - `npm run gates:pr`
  - `git diff --check`

Evidence:
- execution worktree: `.ekdu/worktrees/s9-pr-validation`
- execution branch: `ekdu/20260222-workflow-of-record-s9-pr-validation`
- validation run (2026-02-22):
  - [x] `npm run lint` (pass)
  - [x] `npm run typecheck` (pass)
  - [x] `npm run test` (pass)
  - [x] `npm run test:integration` (pass)
  - [x] `npm run security:scan` (pass)
  - [x] `npm run audit:deps` (pass)
  - [x] `npm run gates:pr` (pass)
  - [x] `git diff --check` (pass)

## Self-modification evidence

- Why self-modification was needed: workflow-of-record required enforceable prompts/scripts/docs rather than placeholders.
- Compensating controls:
  - [x] templates/workflow docs updated together with policy changes
  - [x] tests added for gate runner behavior
  - [x] PR gate validation executed and recorded
- Legacy transition handling:
  - [x] documented exception for pre-policy worktrees and strict rule for new slices

## Decision log

- 2026-02-22: adopt work packets + queue pointers (ADR-0005).

## Progress log

- 2026-02-22: created initial packet and baseline artifacts.
- 2026-02-22: restored gate maturation scripts/tests and aligned workflow/prompt/template policies.
- 2026-02-22: moved pointer from `in-progress` to `done` after validation.

## Completion checklist

- [x] acceptance criteria satisfied
- [x] chosen gate set is green
- [x] docs/ADRs updated
- [ ] memory updated (if enabled)
