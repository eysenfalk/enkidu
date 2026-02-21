# Autonomy ladder

This is how Enkidu earns autonomy *without* losing quality.

Think of it as “capability levels” gated by measurable evidence.  
The goal is **Level 5**, but shipping garbage at Level 2 is worse than being slow at Level 1.

---

## Level 0 — Assisted (human does everything)
- Human writes code, AI helps with suggestions.
- No automation.
- No gate discipline.

**Exit criteria:** you can reliably produce small PRs with tests.

---

## Level 1 — Agent implements, human drives
- Human writes the story and the plan.
- Agent implements in a branch.
- Human runs gates and reviews PR.

**Required:**
- lint + typecheck + unit tests in CI
- PR template
- basic observability baseline (logs, errors)

---

## Level 2 — Agent implements + self-reviews, human approves
- Human provides story + acceptance criteria.
- Agent plans, implements, runs gates, self-reviews.
- Human approves/merges.

**Required:**
- documented gate sets (quick/pr/release)
- reproducible local environment
- “agent legibility”: docs map + clean module boundaries

---

## Level 3 — Orchestrated parallelism, human approves
- Orchestrator splits work across multiple worktrees.
- Subagents work in parallel.
- Orchestrator assembles a merge train and opens PR(s).
- Human approval is still required.

**Required:**
- worktree isolation tooling
- deterministic test runs (or flake quarantine)
- scorecards recorded per PR

---

## Level 4 — Mostly autonomous delivery, human audits
- Agent opens PRs and merges once gates pass.
- Human audits periodically (sampling), not per PR.

**Required:**
- strong governance policies (security, data handling)
- observability gates (performance budgets, error budgets)
- automated rollback strategy (feature flags, safe deploys)
- proven low regression rate over N releases

---

## Level 5 — Autonomous with “human veto only”
- Agent does everything end-to-end.
- Human acts as a **policy authority**, not a reviewer.

**Required:**
- governance kernel enforced (arifOS-style floors, or equivalent)
- continuous evaluation and quality ratchet
- strong monitoring + automated incident response runbooks
- provable traceability: why a change happened, how it was validated

---

## Non-negotiable: the quality ratchet

At every level:
- the system must get *better* at building itself
- the next 1000 LOC must have higher quality than the previous 1000 LOC

See `docs/QUALITY_RATCHET.md`.
