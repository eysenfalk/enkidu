# Gates

Gates are the difference between “autonomous engineering” and “autonomous vandalism”.

A **gate** is any automated or semi-automated check that blocks merges when it fails.

Enkidu uses gates to:
- prevent regressions
- keep the repo legible
- make agent work self-correcting
- support incremental autonomy

---

## Gate sets

You can define sets in `enkidu.yaml` (recommended). Default sets:

### quick
Fast feedback while iterating:
- lint
- typecheck
- unit tests

### pr
Everything required for a PR to merge:
- quick
- integration tests
- security scan
- dependency audit

### release
For deploys:
- pr
- e2e
- performance budget
- observability smoke test

---

## Categories of gates

### 1) Correctness gates
- Unit tests
- Integration tests
- End-to-end tests
- Property-based tests (where useful)
- Replay tests with fixtures (especially for scrapers!)

### 2) Quality gates
- Lint (style + anti-footguns)
- Typecheck
- Formatting (prettier, biome)
- Complexity budgets (optional)
- Coverage deltas (ratchet, not an absolute)

### 3) Security gates
- Secret scanning
- Dependency audit
- SAST (static application security testing)
- Scraper safety and compliance checks (robots.txt policy, rate limits)

### 4) Observability gates
- “No new errors” on key flows
- Performance budgets (startup time, p95 latency)
- Required logs/metrics for new components
- Traces for critical paths

### 5) Governance gates
- “Policy floors” for risky changes:
  - data handling
  - credentials/secrets
  - user-impacting behavior (notifications)
  - scraping and TOS risk
- Optional: external governance kernel (arifOS)

---

## Gate implementation pattern

Each gate should have:
- a **local command** (developer / agent can run)
- a **CI command** (same behavior, no surprises)
- a **clear failure output** (agents need legibility)
- an **owner** (who maintains it)

---

## Test strategy for your job heatmap + scraper project

Scrapers are tricky. Gates must include:

1. **Fixture replay tests**  
   Save a few HTML pages (or API responses) as fixtures. Your scraper must parse them deterministically.

2. **Contract tests**  
   Validate output schema:
   - required fields present
   - types correct
   - normalization rules applied

3. **Rate limit + politeness tests** (mocked)  
   Ensure your fetch loop:
   - respects delays
   - respects concurrency limits
   - retries with backoff

4. **Seasonality analysis tests**  
   For “jobs open in month X” features, validate:
   - aggregation correctness
   - timezone correctness (Europe/Vienna)
   - missing-data behavior

---

## “Better gates” as you gain autonomy

A simple rule:

> Increase autonomy only when gates are strong enough to catch the agent’s most common failure modes.

Early on:
- unit tests + typecheck catch most mistakes

Later:
- e2e and observability budgets become necessary,
  because you’ll ship changes that “compile” but still break reality.

---

## Suggested initial tooling (Node / TS)

- lint + format: biome or eslint + prettier
- typecheck: tsc
- unit tests: vitest/jest
- e2e: playwright
- dependency audit: npm audit / pnpm audit (or Snyk)
- secret scanning: gitleaks (or GitHub Advanced Security)
