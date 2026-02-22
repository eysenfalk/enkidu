# Execution plan: <title>

**Owner:** <name>  
**Created:** <YYYY-MM-DD>  
**Status:** active | paused | done  
**Gate set:** quick | pr | release  
**Risk class:** A | B | C

## Objective and scope

- Goal:
- Non-goals:
- Measurable success criteria:

## Requirements baseline

### Functional requirements

- ...

### Non-functional requirements (with metrics)

- ...

### Acceptance criteria

- [ ] ...

## Execution plan (DAG + worktree slices)

Describe the dependency-aware plan.

- Slice 0 (docs/plan-of-record):
  - [ ] Create/update work packet artifacts
  - [ ] Commit: `docs(work): ...`
- Slice 1 (implementation):
  - [ ] ...
  - [ ] Commit: `feat(...): ...`
- Slice 2 (tests/validation):
  - [ ] ...
  - [ ] Commit: `test(...): ...`

Notes:
- Use atomic commits (one logical change per commit). See `docs/COMMITS.md`.

## Red-team risk register and mitigations

List threats/abuse cases (when relevant), risk score, mitigations, and validation.

## Gate and validation matrix

- Gate set: <quick|pr|release>
- Commands:
  - [ ] `npm run lint`
  - [ ] `npm run typecheck`
  - [ ] `npm run test`
  - [ ] `npm run test:integration` (if gate set >= pr)
  - [ ] `npm run security:scan` (if gate set >= pr)
  - [ ] `npm run audit:deps` (if gate set >= pr)
- Evidence artifacts (scorecards/logs):
  - execution worktree path: `.ekdu/worktrees/<slice-slug>`
  - branch: `ekdu/<packet-id>-<slice-slug>`
  - command results with timestamps
  - links/paths to any generated reports

## Self-modification evidence (required when changing Enkidu prompts/docs/scripts)

- Why self-modification was needed:
- Compensating controls applied:
  - docs/templates updated
  - tests added/updated
  - gate evidence captured
- Reviewer checklist:
  - [ ] no policy regressions introduced
  - [ ] workflow transition/exception notes updated if needed

## Decision log

Record key decisions and why.

## Progress log

Timestamped notes.

## Completion checklist

- [ ] acceptance criteria satisfied
- [ ] chosen gate set is green
- [ ] scorecard recorded (if required)
- [ ] docs/ADRs updated (if reality changed)
- [ ] memory updated (if enabled)
