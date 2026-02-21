# Context graph

“Context engineering” is the discipline of designing what the agent sees, when it sees it, and why.

A **context graph** is a lightweight knowledge graph that links:
- plans
- ADRs
- components
- tests
- incidents
- PRs
- metrics/logs queries

So instead of shoving a 1,000-page manual into the prompt, the agent gets a *map*.

---

## 1) Why a graph, not just memory?

Project memory (PsychMem) is good for:
- durable facts
- preferences
- recurring constraints
- “things that always matter”

A context graph is good for:
- *relationships* (“this component depends on that service”)
- *traceability* (“this PR implements that ADR”)
- *retrieval* (“for this task, fetch docs A+B+C and tests X+Y”)

They complement each other.

---

## 2) Data model (minimal viable)

### Node types
- `doc` — markdown docs, ADRs, plans
- `component` — logical modules/services (frontend, scraper, notifications)
- `file` — optionally tracked for hot files / ownership
- `test` — test suite / file / scenario
- `gate` — a gate definition (“unit_tests”, “security_scan”)
- `metric` — SLOs, budgets, dashboards
- `log_query` — saved queries useful for validation
- `pr` — pull request artifact
- `issue` — tracker item (optional sync)

### Edge types
- `implements` (pr -> doc/story)
- `decides` (adr -> component)
- `depends_on` (component -> component)
- `touches` (pr -> component/file)
- `validated_by` (component -> test/gate)
- `observed_by` (component -> metric/log_query)
- `supersedes` (adr -> adr)

---

## 3) Storage (starter: SQLite)

Starter default: SQLite in `.ekdu/context-graph.db`.

This keeps the system:
- local
- fast
- easy to back up
- easy to query from scripts and agents

See `docs/adr/ADR-0003-context-graph-storage.md`.

---

## 4) Retrieval rules (“context bundles”)

Enkidu builds **context bundles** based on task type.

### Example: implementing a new feature
Bundle might include:
- story spec
- relevant ADRs
- the component’s architecture doc
- key tests
- observability budget for the feature

### Example: debugging a production incident
Bundle might include:
- incident summary
- dashboards/log queries
- recent PRs touching the component
- relevant runbooks

---

## 5) Keeping the graph fresh

The graph must be updated mechanically:

- On PR creation:
  - link PR to story + touched components
- On ADR addition:
  - link ADR to components it decides
- On test creation:
  - link tests to components they validate
- On incident:
  - link incident to component + fixes

If the graph isn’t updated automatically, it will rot.
