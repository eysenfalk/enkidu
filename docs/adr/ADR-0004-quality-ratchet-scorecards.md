# ADR-0004: Quality ratchet via per-PR scorecards

**Date:** 2026-02-21  
**Status:** accepted

## Context

A self-improving system needs a measurable definition of “better”.
Without metrics, “better” becomes vibes, and vibes do not scale.

## Decision

Record a **scorecard** for every PR and enforce monotonic “ratchet” rules:
- no new lint/type errors
- no reduction in chosen coverage signal
- no new security findings above thresholds

Store:
- `evals/scorecards/*.json`

## Consequences

- CI must produce scorecards.
- Orchestrator must refuse merges that regress scorecards.
- Over time, add more dimensions (performance, observability).
