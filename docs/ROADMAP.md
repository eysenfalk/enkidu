# Roadmap

A practical path to “fully autonomous PRs”.

## Phase 0 — baseline hygiene (1–3 days)
- Repo has lint/typecheck/unit tests in CI
- PR template
- Basic docs structure (`docs/`, short `AGENTS.md`)
- OpenCode configured with agents + permissions

## Phase 1 — manual agent workflow (1–2 weeks)
- Use Enkidu commands daily
- Create small PRs with tests
- Record scorecards manually or via CI artifacts
- Identify top agent failure modes

## Phase 2 — parallel worktrees (1–2 weeks)
- Introduce worktree isolation scripts
- Run multiple OpenCode sessions in parallel
- Merge via merge train

## Phase 3 — orchestrator automation (2–6 weeks)
- Orchestrator creates worktrees, dispatches tasks, collects results
- Automatically opens PRs with scorecard summaries
- Human still approves merges

## Phase 4 — governance + observability gates (ongoing)
- Add policy floors
- Add performance budgets and observability smoke tests
- Optional arifOS integration

## Phase 5 — autonomy with audits (months)
- Auto-merge for low-risk changes with strong evidence
- Human audits sampling-based
- Continuous eval suite expansion (quality ratchet)
