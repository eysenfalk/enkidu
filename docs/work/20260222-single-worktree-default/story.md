# Story: Single-worktree feature branch default

**Owner:** aemon  
**Status:** ready  
**Target gate set:** quick  
**Risk class:** B

## Problem

Current execution mode creates too many active worktrees and unclear merge paths. This increases coordination cost and cleanup risk. We need a simpler default: one feature branch per packet, one worktree per feature branch, serial writes on that branch, and parallelism across feature branches.

## Acceptance criteria

- [ ] Workflow docs define default execution model: `1 packet branch = 1 worktree`.
- [ ] Workflow docs define parallelism rule: parallel execution happens across different feature branches, not by default through nested/sub worktrees.
- [ ] Workflow docs define exception rule: extra slice worktrees are allowed only when explicitly justified and preplanned.
- [ ] Orchestrator process docs include required human confirmation checkpoint before merge + branch/worktree cleanup.
- [ ] Cleanup runbook order is documented (backup/evidence, merge, verify, then remove worktrees and branches).
- [ ] Validation recipe is executable and records evidence in packet artifacts.

## Non-goals

- Changing application runtime behavior in `src/**`.
- Rewriting CI/CD architecture.
- Introducing new governance systems outside current Enkidu workflow.

## Constraints

- Security / privacy constraints: no secret reads (`.env`), no credential leakage in logs or docs.
- Scraping constraints: none (workflow-only packet).
- Performance budgets: operational cleanup should not require long-lived multi-worktree drift.
- Safety constraints: destructive cleanup actions require explicit human confirmation.

## Context bundle

List the docs/files/tests that must be read before implementing.

- Docs:
  - `docs/WORKFLOW.md`
  - `docs/COMMITS.md`
  - `docs/work/README.md`
  - `docs/GATES.md`
  - `docs/SECURITY.md`
- Files:
  - `.opencode/commands/enkidu-work.md`
  - `.opencode/prompts/enkidu-orchestrator.md`
  - `docs/templates/work-pointer.md`
- Tests:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run test`
- Metrics/log queries:
  - `git worktree list`
  - `git branch --list "ekdu/*"`
  - `git status --short`

## Implementation notes

This is workflow/process work. Keep it PR-sized. Prefer documentation and orchestration-contract changes over introducing extra automation complexity.

## Validation recipe

- Run selected gate set (`quick`):
  - `npm run lint`
  - `npm run typecheck`
  - `npm run test`
- Validate workflow invariants:
  - `git worktree list` shows expected active worktrees only.
  - `git branch --list "ekdu/*"` matches planned active packet branches.
  - `git status --short` is clean before and after cleanup actions.
- Record outputs and decisions in `plan.md` progress/evidence sections.
