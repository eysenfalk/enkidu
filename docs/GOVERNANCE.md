# Governance

Governance is “how we prevent the system from becoming a chaos machine”.

Enkidu supports governance at three layers:

1) **Repo policies** (docs, templates, gates)
2) **Tool permissions** (OpenCode permissions for edit/bash/webfetch)
3) **Governance kernel** (optional: arifOS)

---

## 1) Policy floors (minimum rules)

These should be enforced by gates and/or plugins:

### Security floor
- no secrets in git
- no `.env` reads
- no dependency regressions to known critical CVEs

### Data floor
- no storing scraped personal data
- no uploading scraped content to third parties without intent + consent

### Reliability floor
- critical flows must have tests
- no performance regressions beyond budget

### Scraping floor
- politeness rules and rate limits
- forbid bypassing auth/paywalls
- site-specific policies recorded

---

## 2) Approval classes

Not every change is equal. Define “approval classes”:

- **Class A (safe):** refactors, test improvements, internal docs
- **Class B (medium):** new feature behind a flag
- **Class C (risky):** scraping changes, auth changes, notification changes

As autonomy increases:
- Class A can become auto-merge
- Class B requires automated evidence + maybe sampled audit
- Class C remains “human veto” until governance proves itself

---

## 3) arifOS integration (optional)

arifOS can act as a governance kernel:
- a policy agent that evaluates plans/PRs
- a rules engine that blocks risky actions
- a memory/policy store separate from code

Enkidu treats arifOS as optional:
- configure it in `enkidu.yaml`
- attach it via REST or MCP
- if disabled, governance falls back to docs + gates + OpenCode permissions

---

## 4) Governance is a product

If governance is annoying, people disable it.
So:
- keep rules minimal and justified
- automate the boring checks
- add “why this rule exists” explanations
- measure false positives and tune

Perfect governance is impossible.
Useful governance is mandatory.
