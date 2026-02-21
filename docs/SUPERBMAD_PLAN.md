# SuperBMAD plan (Superpowers + BMAD in one pack)

Goal: a single optional module that combines the best of:
- **Superpowers** (OpenCode bootstrap + “do the right thing by default” ergonomics)
- **BMAD Method** (spec-driven, role-based agile workflows and templates)

This module should:
- install cleanly in OpenCode
- be configurable
- not require for Enkidu core

---

## 1) What we keep from Superpowers

Superpowers is valuable because it:
- injects a bootstrap prompt into sessions
- provides skill-based capabilities
- improves “agent ergonomics” (consistent execution)

Keep:
- bootstrap injection
- skill packaging and discovery
- sensible defaults for tool usage and session hygiene

---

## 2) What we keep from BMAD

BMAD is valuable because it provides:
- structured workflows (analysis → planning → architecture → implementation)
- role-based agents (PM, Architect, Dev, QA, etc.)
- templates and rituals that prevent “vibe coding”

Keep:
- workflow modules
- templates (PRD, user stories, ADRs, test strategy)
- “help me choose the right workflow” behavior

---

## 3) What Enkidu adds that both lack

Enkidu’s differentiator:
- **parallel worktrees**
- **merge trains**
- **gates + scorecards + quality ratchet**
- **context graph + retrieval**
- **governance policies**

SuperBMAD should integrate with Enkidu, not duplicate it.

---

## 4) Feature set for SuperBMAD v1

### A) Bootstrap + map
- Insert a short “table of contents” into the agent system prompt:
  - where docs live
  - which commands to use
  - how to avoid secrets
- Enforce “docs are system-of-record” behavior.

### B) Workflow router
- A small router that, given a task, chooses:
  - BMAD workflow module (analysis/planning/architecture/etc.)
  - or Enkidu command (slice, gates, review)

### C) Artifact generators
- Create a story spec from a prompt
- Create ADR skeletons
- Create test strategy skeletons
- Create PR descriptions with scorecard summary

### D) Policy-aware prompts
- Scraper policies baked in (rate limiting, robots, no auth bypass)
- Data handling rules
- Risk classification

### E) Optional memory hooks
- If PsychMem is enabled:
  - auto-read memory at task start
  - suggest memory writes when discovering durable facts

---

## 5) Implementation strategy

### Phase 0 — compatibility first
- ensure OpenCode can load both:
  - BMAD skills (from `.claude/skills` or equivalent)
  - Superpowers plugin injection
- avoid conflicting hooks

### Phase 1 — unify into a single pack
- publish `@enkidu/superbmad` as an npm OpenCode plugin
- ship:
  - `.opencode/skills/superbmad/*`
  - `.opencode/plugins/superbmad.js` (bootstrap injection + router tool)

### Phase 2 — tests for the harness
- snapshot test the injected system prompt
- golden tests for generated artifacts
- fuzz “workflow router” inputs to ensure stability

### Phase 3 — integrate with Enkidu orchestrator
- orchestrator calls SuperBMAD router to pick workflows
- router outputs:
  - chosen workflow steps
  - required context bundle
  - required gate set

---

## 6) Non-goals (v1)

- do not attempt full “autonomous merge” here — that’s Enkidu core + gates
- do not create a new methodology; compose existing ones
- do not embed proprietary model assumptions

---

## 7) Success metrics

- users can go from “empty repo” to “agent-produced PR” with < 15 minutes of setup
- PRs have:
  - clear plans
  - passing gates
  - readable diffs
  - artifacts (story/ADR) when needed
- “manual workflow” feels smooth enough to be used daily
