# Standards and best practices (starter)

This is a default “engineering handbook” for the repo.

## Core principles

- Keep changes small and reviewable.
- Prefer explicitness over cleverness.
- Tests are part of the feature.
- Make failure obvious and fast.
- Don’t hide complexity in “helpers”.

## TDD (Test-Driven Development) in practice

When feasible:
1. Write a failing test for the behavior.
2. Implement the simplest thing to make it pass.
3. Refactor for clarity.

For UI:
- component tests for logic
- e2e tests for user journeys

For scrapers:
- fixture replay tests are your best friend.

## SDLC (Software Development Life Cycle)

Enkidu encourages a lightweight SDLC:
- define → design → implement → validate → observe → improve

Artifacts:
- story spec
- ADRs for decisions
- scorecards for validation

## DevOps basics

- CI must run on every PR.
- Deploys should be automated and reversible.
- Observability is required for production behavior.

## Code review standards

A “good” PR:
- changes one thing
- has tests for the risky bits
- explains the why, not just the what
- updates docs if it changed reality

## Branching

Prefer:
- short-lived feature branches
- merge trains when throughput is high
- avoid long-running divergence

## Documentation standards

- `AGENTS.md` stays short and points to docs.
- `docs/` is the canonical truth.
- ADRs record decisions.
- Stale docs are worse than missing docs — keep them fresh.
