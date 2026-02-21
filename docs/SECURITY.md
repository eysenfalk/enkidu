# Security

Agents are powerful. Power without guardrails is… spicy.

This doc defines minimum security posture for Enkidu-driven development.

---

## 1) Secrets hygiene

Hard rules:
- never read `.env` in an agent session
- never paste API keys into prompts
- never commit credentials
- never store secrets in PsychMem memory

Recommended:
- use `.opencode/plugins/env-protection.js` (example included) to block reads of `.env`
- use secret scanning (gitleaks / GitHub Advanced Security)
- use per-environment `.env` management outside git

---

## 2) Dependency risk

- run `npm audit` / `pnpm audit`
- pin versions for critical packages
- avoid unvetted scraping libraries that embed headless browsers with unknown behaviors

---

## 3) Sandboxing OpenCode

If you want strong isolation:
- run OpenCode inside a container (or a VM)
- mount the repo read/write
- restrict network egress unless explicitly needed
- restrict access to host credentials (SSH agent, keychains)

This is especially important if you allow autonomous `bash` execution.

---

## 4) Scraping ethics and compliance

Your project includes a web scraper. That’s automatically a policy hotspot.

Minimum rules:
- respect robots.txt where applicable
- rate limit requests
- identify yourself (User-Agent) if appropriate
- cache aggressively
- avoid scraping personal data
- do not circumvent authentication or paywalls
- comply with site terms and local laws

Add a “scraper policy” doc for each target site if you need to defend your behavior later.

---

## 5) Governance integration (optional)

If you use arifOS as a governance kernel:
- define policy floors for “risky operations”
- require explicit approval for:
  - touching auth flows
  - adding new scraping targets
  - changing notification behavior
  - reading/writing sensitive files

See `docs/GOVERNANCE.md`.
