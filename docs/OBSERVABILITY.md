# Observability

Observability is not optional when agents ship code fast.

Enkidu treats observability as:
- a developer tool
- an agent tool
- a gate

---

## 1) What “agent legibility” means

Agents need to be able to answer:
- “what happened?”
- “what changed?”
- “how do we know it’s fixed?”
- “what is the system currently doing?”

If logs/metrics/traces are confusing to humans, they are *unusable* to agents.

---

## 2) Minimum observability baseline

### Logs
- structured JSON logs
- stable fields (`service`, `component`, `requestId`, `userId?`, `durationMs`, `error`)
- no secrets, no PII

### Metrics
- request counts and latencies (p50/p95/p99)
- error rate
- scraper: pages/min, success rate, retry rate, block rate

### Traces
- distributed tracing for critical paths
- at minimum: one trace per “user journey” or “job scrape batch”

---

## 3) Observability gates (examples)

- “no new errors” in critical flows
- “startup time < 800ms” (or your chosen budget)
- “p95 request latency not worse than baseline by > X%”
- “scraper success rate > Y% on fixtures”

---

## 4) Ephemeral observability per worktree (advanced)

A powerful pattern from harness engineering is:
- each worktree spins up its own app + its own observability stack
- agents can query logs/metrics/traces locally
- when the task ends, the whole stack is destroyed

This makes it practical for agents to:
- validate UI flows
- reproduce bugs
- verify performance budgets
- iterate until stable

You don’t need to start there — but it’s the endgame.

---

## 5) Practical notes for your Austria job heatmap project

### Scraper observability
Track:
- number of fetches
- per-site success rate
- parse failure rate
- HTTP status distribution
- robots.txt blocks
- average response size and time
- backoff events

### App observability
Track:
- heatmap render time
- notification scheduling delays
- background job duration
- time-to-first-data

---

## 6) “Make it queryable”

Store a few default queries in the context graph:
- “errors in scraper last 15m”
- “parse failures by site”
- “latency histogram for /api/jobs”
- “notifications sent per day”

Agents should be able to validate their work by running queries, not by vibes.
