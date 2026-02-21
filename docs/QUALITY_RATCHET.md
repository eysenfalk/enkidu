# Quality ratchet

The goal:

> If we generate 1000 lines of code, the next 1000 should be better.  
> Repeat forever.

This document defines how Enkidu measures “better” and makes improvement automatic.

---

## 1) The core mechanism: scorecards

Every PR (human or agent) produces a **scorecard**.

A scorecard is a small JSON document that captures:
- test status
- coverage deltas
- lint/type errors
- security findings
- performance budget deltas (when applicable)
- complexity / maintainability signals (optional)

Scorecards live in:
- `evals/scorecards/`

Schema:
- `evals/scorecard.schema.json`

---

## 2) Ratchet rules (never get worse)

A ratchet rule is a monotonic constraint, e.g.:

- **no new lint errors**
- **no new type errors**
- **no reduction in unit coverage** (or “no reduction above epsilon”)
- **no new high/medium security findings**
- **no regression in p95 latency beyond X%** on key endpoints
- **no growth in bundle size beyond X%** (frontend)

These thresholds are configurable in `enkidu.yaml`.

---

## 3) Kaizen loop (continuous improvement)

Every N merges (or daily), Enkidu runs a retro-like loop:

1. Sample the last N scorecards
2. Identify top failure modes:
   - flakiest tests
   - most common lint issues
   - common architecture violations
   - repeated “agent mistakes”
3. Convert failure modes into:
   - a gate improvement
   - a doc improvement (make the repo more legible)
   - a new regression test
   - a rule in the governance kernel

The output is a backlog of “quality investments” with ROI.

---

## 4) Evals: measuring the agent, not just the code

In addition to code scorecards, track **agent behavior scorecards**:

- did the agent update docs when it changed architecture?
- did it add/adjust tests?
- did it follow naming conventions?
- did it keep PR size reasonable?
- did it cite sources when doing research?

You can treat this like CI for agent behavior.

---

## 5) The anti-entropy principle

High-throughput agents create *entropy*:

- duplicated code
- inconsistent patterns
- stale docs
- magical constants
- missing invariants

Your quality ratchet must include:
- periodic refactoring goals
- “delete code” goals
- dead code detection
- doc freshness checks

If you never delete, you will eventually be debugging a landfill.

---

## 6) Implementation notes (practical)

Start small:

- record scorecards in CI
- block merges on obvious regressions
- add one ratchet dimension at a time

Don’t start by measuring 50 things.
Start by measuring 5 things you can enforce.
