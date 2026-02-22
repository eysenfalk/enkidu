# Story: Planner Pro workflow review agents + architect pass

**Owner:** aemon  
**Status:** ready  
**Target gate set:** pr  
**Risk class:** A

## Problem

Planner Pro needs a stronger planning workflow with explicit multi-angle critique before final plans are issued.

Requested workflow roles:
- red teamer to attack the plan,
- requirements engineer to ask the user focused clarifying questions,
- pragmatist to run value-realization checks and detect over-engineering,
- plan-reviewer to check implementation coherence at system level,
- architect included as a formal workflow pass.

Current state is inconsistent: critique agents are partially defined in config, some prompt files are missing, planner workflow integration is incomplete, and architect is not a required explicit pass.

## Acceptance criteria

- [ ] Planner Pro workflow defines explicit pass order: requirements -> red-team -> pragmatist -> architect -> plan-reviewer -> synthesis.
- [ ] A new command `/enkidu-plan-new` exists and is orchestrated by `enkidu-planner-pro` using all required reviewer passes.
- [ ] A new command `/enkidu-plan-review` exists and is orchestrated by `enkidu-planner-pro` for update/review of an existing packet plan with a subset policy.
- [ ] `/enkidu-plan-pro` is removed, and docs/command references are updated to use `/enkidu-plan-new` and `/enkidu-plan-review`.
- [ ] A new `enkidu-plan-reviewer` subagent exists and is wired into Planner Pro task permissions.
- [ ] Requirements engineer behavior includes a controlled user-question loop (targeted questions only, with recommended defaults and impact).
- [ ] Existing red-team and pragmatist agents are fully wired with valid prompt artifacts and read-only permissions.
- [ ] Architect is explicitly included in Planner Pro workflow for interface/ADR implications.
- [ ] Planner outputs include a consolidated traceability matrix and risk-blocker status from all review passes.
- [ ] Security posture is preserved: critique subagents remain non-mutating (no edit/write/patch/bash/task escalation).

## Non-goals

- Application/runtime feature changes in `src/**`.
- Replacing orchestrator workflow or merge-train logic.
- Creating autonomous release pipelines beyond current repo gate model.

## Constraints

- Security / privacy constraints:
  - Never read `.env` or secrets.
  - Keep subagent permissions least-privilege and read-only unless explicitly required.
- Governance constraints:
  - Maintain Planner Pro artifact-only editing boundaries.
  - Keep planner workflow deterministic and auditable.
- UX constraints:
  - Clarifying-question pass should reduce ambiguity without creating chat churn.

## Context bundle

- Docs:
  - `docs/index.md`
  - `docs/WORKFLOW.md`
  - `docs/GATES.md`
  - `docs/SECURITY.md`
  - `docs/COMMITS.md`
  - `docs/work/README.md`
- Files:
  - `opencode.json`
  - `.opencode/prompts/enkidu-planner-pro.md`
  - `.opencode/commands/enkidu-plan-new.md`
  - `.opencode/commands/enkidu-plan-review.md`
  - `.opencode/commands/enkidu-plan-pro.md`
  - `.opencode/prompts/enkidu-architect.md`
  - `.opencode/prompts/` (new critique prompt files)
- Tests:
  - `npm run gates:pr`
  - `bun run gates:pr`
  - `opencode debug config`
- Metrics/log queries:
  - planner smoke-run output using `/enkidu-plan-new` and `/enkidu-plan-review`
  - permission snapshot for planner + critique agents

## Implementation notes

Keep this as a workflow/config packet with small commits:
1) agent topology and permissions,
2) prompt and command workflow contract (`/enkidu-plan-new`, `/enkidu-plan-review`, and `/enkidu-plan-pro` removal),
3) validation evidence and docs alignment.

## Validation recipe

- Validate config integrity:
  - `python -m json.tool opencode.json`
  - `opencode debug config`
- Validate workflow behavior:
  - run `/enkidu-plan-new` smoke scenario and confirm all required passes are represented in output.
  - run `/enkidu-plan-review` smoke scenario and confirm subset pass policy + plan update behavior.
- Validate gate set:
  - `npm run gates:pr`
  - `bun run gates:pr`
- Validate security posture:
  - inspect effective permissions for critique agents (read-only, no task spawning).
