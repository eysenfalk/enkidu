# Story: Workflow-of-record + agent discipline

**Owner:** aemon
**Status:** done
**Target gate set:** pr
**Risk class:** B

## Problem

We lack an end-to-end workflow-of-record that turns chat activity into durable, git-versioned artifacts.
We also need enforced role separation: orchestrator delegates only; planner edits only plans/workflow artifacts.

## Acceptance criteria

- [ ] Work packet model exists in `docs/work/` with queue pointer directories.
- [ ] `docs/WORKFLOW.md` documents the A-to-Z workflow using work packets and scorecards.
- [ ] `docs/COMMITS.md` defines atomic commit policy and commit message standards.
- [ ] Orchestrator follows the workflow: planned packets only; asks for priority when multiple.
- [ ] Orchestrator cannot edit repo files directly (mechanically enforced).
- [ ] Planner Pro can edit, but only plan/workflow artifacts (mechanically enforced).
- [ ] Temporary OpenCode commands exist to (a) create packets and (b) run orchestrator workflow.

## Non-goals

- Implementing the full automated gate runner/CI (future work).
- Implementing context graph MVP runtime (future work).

## Constraints

- Everything must be tracked in git (plans, progress, decisions, evidence pointers).
- Avoid single mega tracking file that bloats and conflicts.

## Context bundle

- Docs:
  - `docs/WORKFLOW.md`
  - `docs/GATES.md`
  - `docs/SECURITY.md`
  - `docs/QUALITY_RATCHET.md`
  - `docs/MEMORY.md`
  - `docs/PLUGINS.md`
  - `docs/adr/ADR-0005-work-packets-and-queue.md`
- Templates:
  - `docs/templates/story.md`
  - `docs/templates/plan.md`
  - `docs/templates/work-pointer.md`

## Implementation notes

Completed as docs/config + gate-script implementation with unit and integration tests.

## Validation recipe

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run test:integration`
- `npm run security:scan`
- `npm run audit:deps`
- `npm run gates:pr`
- `git diff --check`

## Completion snapshot

- [x] Work packet model exists in `docs/work/` with queue pointer directories.
- [x] `docs/WORKFLOW.md` documents workflow-of-record controls, validation checklist, and worktree policy.
- [x] Orchestrator/implementer/tester prompts include dedicated execution worktree + packet-scoped naming rules.
- [x] Gate scripts are executable and mapped to concrete commands in `package.json` and `docs/GATES.md`.
- [x] Packet moved from `in-progress` pointer to `done` pointer.

Legacy transition note:
- Existing pre-policy worktrees may finish under legacy naming, but all new slices must use `ekdu/<packet-id>-<slice-slug>` and `.ekdu/worktrees/<slice-slug>`.
