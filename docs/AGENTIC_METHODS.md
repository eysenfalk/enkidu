# Agentic methodologies (2025–2026 era)

This doc names the “new” disciplines that show up when you build with parallel AI agents.

These aren’t replacements for agile/DevOps — they’re *additional layers*.

---

## 1) Context engineering

Designing:
- what information exists
- how it’s structured
- how it’s retrieved
- how it’s updated
- how to prevent staleness

Key principle:
> Give agents a map, not an encyclopedia.

Artifacts:
- docs as system-of-record
- context bundles
- “what to read first” pointers
- doc freshness / ownership

---

## 2) Context graphs

A context graph is a structured way to connect:
- components
- docs/ADRs/plans
- tests and gates
- PRs and incidents
- dashboards/log queries

Purpose:
- retrieval and traceability at scale
- avoid dumping everything into the prompt

---

## 3) Systems of agents

Instead of “one big agent”, you get a **team**:

- orchestrator
- researcher
- architect
- implementer
- tester
- reviewer
- security/ops

The trick is not “more agents”.
The trick is:
- clear interfaces
- clean context boundaries
- explicit handoffs
- shared gates and scorecards

---

## 4) Harness engineering

Harness engineering is the environment-level work that makes agent execution reliable:
- tools
- CI gates
- observability
- reproducible dev environments
- merge strategies for high throughput

---

## 5) Eval-driven development (EDD)

A close cousin of TDD:

- define what “good” means as metrics and scorecards
- measure every PR
- block regressions
- continuously expand the eval suite

EDD is how a system becomes self-improving instead of self-amplifying bugs.

---

## 6) Governance engineering

When agents can:
- run bash
- open PRs
- touch prod configs

… governance becomes part of engineering.

You need:
- policy floors
- approvals by risk class
- auditable decisions
- safe defaults

Optional governance kernels (like arifOS) formalize this.

---

## 7) Putting it together

Enkidu is not “a methodology”.
It’s a harness that lets you combine:
- agile flow
- BMAD spec discipline
- Superpowers ergonomics
- context engineering and graphs
- evals + quality ratchet
- governance floors

The outcome: parallel agent throughput without losing correctness.
