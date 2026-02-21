# AGENTS.md

This file is **not** the manual. It’s the **map**.

The system-of-record is `docs/`. If something important isn’t in `docs/`, it doesn’t exist (yet).

## Prime directive

**Humans steer. Agents execute.**  
Your job as an agent is to produce *reviewable PRs* that pass gates and improve the quality baseline.

## Start-of-task checklist

1. Read `docs/index.md` (navigation)
2. Read the relevant domain docs:
   - workflow + gates: `docs/WORKFLOW.md`, `docs/GATES.md`
   - architecture decisions: `docs/adr/`
   - context + memory: `docs/CONTEXT_GRAPH.md`, `docs/MEMORY.md`
3. If PsychMem is enabled, read project memory first.
4. Build a small plan with acceptance criteria and gate set.
5. Work in an isolated branch / worktree.

## End-of-task checklist

1. Update docs if you changed reality (architecture, workflows, policies).
2. Update memory (PsychMem) with durable decisions / constraints.
3. Ensure gates pass locally (tests, lint, types, security checks).
4. Write a PR description that includes:
   - what changed
   - why
   - how to validate
   - risks + mitigations
   - scorecard deltas (quality ratchet)

## Repository navigation

- `docs/index.md` — docs table of contents
- `docs/WORKFLOW.md` — manual → automated workflow
- `docs/GATES.md` — test gates, quality gates, release gates
- `docs/OPENCODE_EXTENDED_THINKING.md` — “deep thinking + web research” in OpenCode
- `docs/QUALITY_RATCHET.md` — self-improving loop + scorecards
- `docs/CONTEXT_GRAPH.md` — context graph design + retrieval
- `docs/PLUGINS.md` — plugin architecture (PsychMem, arifOS, Superpowers, BMAD)
- `docs/SECURITY.md` — secrets, sandboxing, scraping ethics

## Hard rules

- Never read or print `.env` or secret material.
- Don’t commit credentials or scraped personal data.
- Prefer small PRs. If PR is huge, justify and add extra validation.

## Optional: use the Enkidu commands

See `.opencode/commands/` and run them in the OpenCode TUI:
- `/enkidu-plan`
- `/enkidu-slice`
- `/enkidu-deepresearch`
- `/enkidu-review`
