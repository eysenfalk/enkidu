# Context bundles

A context bundle is a **structured packet** of information that Enkidu gives an agent for a task.

The point:
- avoid stuffing everything into the prompt
- make context selection repeatable and auditable

---

## Bundle structure

A bundle should contain:

1) **Task framing**
- goal
- acceptance criteria
- gate set

2) **Relevant docs**
- story spec
- ADRs
- architecture docs

3) **Relevant code pointers**
- key files
- APIs/contracts

4) **Validation recipe**
- commands to run
- fixtures to use
- dashboards/log queries to check (if applicable)

5) **Constraints**
- security policies
- scraping policies
- performance budgets

---

## Bundle types (suggested)

- `feature_impl`
- `bugfix`
- `refactor`
- `incident_debug`
- `security_fix`
- `test_hardening`
- `performance_tuning`

Each type has a default doc/test/metric retrieval strategy.

---

## Why this matters

Agents fail in two boring ways:
1) they don’t see the right information
2) they see too much and optimize for the wrong thing

Bundles are the antidote.

You’re not “prompt engineering”. You’re **building an information supply chain**.
