# Execution plan: Workflow-of-record + agent discipline

**Owner:** aemon  
**Created:** 2026-02-22  
**Status:** active  
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

- [ ] `docs/work/README.md` exists and explains packet model.
- [ ] `docs/adr/ADR-0005-work-packets-and-queue.md` exists.
- [ ] `docs/WORKFLOW.md` updated to describe A-to-Z packet flow.
- [ ] `docs/COMMITS.md` exists and is referenced by `docs/WORKFLOW.md`.
- [ ] Planner Pro can update `docs/work/**` and selected workflow files, but cannot edit `src/**`.
- [ ] Orchestrator cannot edit files and has bash allowlist.
- [ ] `/enkidu-new-packet` and `/enkidu-work` commands exist.

## Execution plan (DAG + worktree slices)

- Slice 0 (artifacts):
  - [ ] Create work packet dirs and queue pointer dirs
  - [ ] Add ADR-0005
  - [ ] Add `docs/COMMITS.md`
  - Commit checkpoint: `docs(workflow): add work packets + commit policy`

- Slice 1 (workflow docs):
  - [ ] Update `docs/WORKFLOW.md` to:
    - define planned work packets
    - define queue pointer model
    - define evidence requirements (scorecards)
    - define orchestrator/planner rules
  - [ ] Update `docs/index.md` to link `docs/COMMITS.md`
  - Commit checkpoint: `docs(workflow): document packet A-to-Z`

- Slice 2 (agent enforcement):
  - [ ] Update `opencode.json` agent permissions:
    - orchestrator: strict bash allowlist + read/glob/list
    - planner pro: enable edit/write/patch with allowlist-only paths
  - [ ] Update `.opencode/prompts/enkidu-orchestrator.md` to follow packet workflow and delegate-only rule
  - [ ] Update `.opencode/prompts/enkidu-planner-pro.md` to:
    - always create/maintain packet artifacts
    - only edit plan/workflow files
  - [ ] Add commands `.opencode/commands/enkidu-work.md` and `.opencode/commands/enkidu-new-packet.md`
  - Commit checkpoint: `chore(agents): enforce workflow + permissions`

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
  - `opencode debug config` shows effective per-agent permissions
  - planner edit attempt to `src/**` is denied
  - orchestrator can list/read planned packets and asks for priority if multiple

## Decision log

- 2026-02-22: adopt work packets + queue pointers (ADR-0005).

## Progress log

- 2026-02-22: created initial packet and baseline artifacts.

## Completion checklist

- [ ] acceptance criteria satisfied
- [ ] chosen gate set is green
- [ ] docs/ADRs updated
- [ ] memory updated (if enabled)
