# Example product: Austria job heatmap + seasonal insights

This doc translates your idea into a spec that Enkidu/BMAD can work from.

## 1) Problem statement

You want to:
- scrape job postings relevant to a very specific “perfect fit” criteria
- visualize where those jobs appear in Austria (heatmap / map clusters)
- track *seasonality* (“these companies post mostly in month X”)
- send notifications when new matches appear
- include time tracking (how long you spend on outreach/interviews/etc.)

## 2) Users

Primary user: you.

Secondary (future): other job seekers.

## 3) Core user stories

### Heatmap
- As a user, I can see a map of Austria with job matches aggregated by region/city.
- I can filter by:
  - role keywords
  - seniority
  - remote/hybrid/on-site
  - salary range (if available)
  - company
  - timeframe

### Notifications
- As a user, I can subscribe to filters and receive alerts when new matches appear.
- Alerts should be de-duped and rate-limited.

### Seasonality
- As a user, I can see monthly/quarterly trends:
  - matches per region
  - matches per company
  - “peak months” per company

### Time tracking (optional v1)
- As a user, I can track time spent on:
  - researching companies
  - applications
  - interview prep
  - interviews
- And correlate it with outcomes.

## 4) Non-functional requirements

- Scraper must be polite (rate limits, caching, no auth bypass).
- Data must avoid storing personal data.
- System must be testable with fixtures.
- The app must be debuggable from logs/metrics.

## 5) High-level architecture

### Data pipeline
1. Scraper(s) fetch job pages/APIs.
2. Parser normalizes jobs into a canonical schema.
3. Deduper merges duplicates (same job cross-posted).
4. Store to DB.
5. Notification engine queries DB for new matches and sends alerts.

### App
- TanStack app (frontend)
- API service (or serverless functions) for queries
- Map visualization for heatmap layer

## 6) Canonical job schema (starter)

Fields:
- `source` (job board / company site)
- `sourceId` (stable id if possible)
- `url`
- `companyName`
- `title`
- `locationText`
- `geo` (lat/lng) or `regionCode`
- `employmentType` (full-time, part-time, contract)
- `remoteType` (remote/hybrid/on-site)
- `seniority` (junior/mid/senior/lead)
- `salaryMin`, `salaryMax`, `salaryCurrency` (optional)
- `postedAt` (timestamp, Europe/Vienna normalized)
- `scrapedAt`
- `tags` (your “perfect fit” classifier outputs)

## 7) Seasonality analysis approach

Minimum viable:
- monthly counts per company and region
- compute:
  - mean per month
  - peak month(s)
  - concentration metric (how seasonal is it?)

Later:
- time-series decomposition
- anomaly detection (“new spike”)

## 8) Test strategy highlights

- fixture replay tests for each source
- schema validation tests
- dedupe tests
- timezone normalization tests
- seasonality aggregation tests

## 9) Observability highlights

Scraper metrics:
- success rate per source
- parse failure rate
- retries/backoff
- new jobs found per run

App metrics:
- request latency
- error rate
- map render time

## 10) Governance hot spots

- adding a new scraping source should require explicit approval class
- ensure compliance with site rules and applicable laws
