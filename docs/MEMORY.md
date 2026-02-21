# Memory

Enkidu supports memory as an **optional plugin**, because memory is powerful… and also a liability if mishandled.

This repo assumes **PsychMem** can be installed as an OpenCode plugin and enabled/disabled per project.

---

## 1) What should be stored in memory?

Store:
- stable architecture constraints (“scraper outputs must conform to schema X”)
- project conventions (“we use Vitest; no Jest”)
- invariants (“never scrape behind auth; respect robots policy”)
- recurring context (“Austria is default locale/timezone; Europe/Vienna”)
- decisions that would otherwise repeat every task (“heatmap aggregation rules”)

Do **not** store:
- secrets
- API keys
- personal data scraped from websites
- large blobs (store those in docs, not memory)
- ephemeral task state (use plans/todos)

---

## 2) When to read memory

At the start of every task:
- read memory first
- then build a plan

This prevents “forgetting the same constraint 30 times”.

---

## 3) When to write memory

Write when you learn something that will matter again:
- a repeated bug cause
- a new invariant
- a new policy decision
- a new workflow rule

If it matters only for one PR, it belongs in the PR description or the plan doc.

---

## 4) Recommended pattern: “docs are truth, memory is cache”

Treat docs as canonical.
Treat memory as a “fast cache” of the most important constraints.

If docs and memory disagree:
- update memory to match docs
- or update docs and explain the decision

---

## 5) Integration

PsychMem is configured via OpenCode plugin config (see `opencode.json`) and can be enabled/disabled in `enkidu.yaml`.
