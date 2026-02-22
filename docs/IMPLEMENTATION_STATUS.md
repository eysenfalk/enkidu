# Implementation status: what exists vs what is missing

Last updated: 2026-02-22

This file is a reality check against the current repository state.

Scope of this assessment:
- repository code and scripts
- `docs/` system-of-record
- OpenCode command/agent configuration

---

## 1) What is already implemented

### 1.1 Project framing and architecture decisions

Implemented:
- [x] Core project direction is documented (`docs/WORKFLOW.md`, `docs/GATES.md`, `docs/QUALITY_RATCHET.md`, `docs/CONTEXT_GRAPH.md`, `docs/GOVERNANCE.md`, `docs/OBSERVABILITY.md`).
- [x] Naming and core decisions are captured in ADRs (`docs/adr/ADR-0001` to `ADR-0004`).
- [x] `AGENTS.md` is kept short as a map and points to docs as source-of-truth.

Value:
- Strong conceptual foundation.
- Clear long-term target (autonomous, gated, parallel agent workflows).

### 1.2 OpenCode workflow scaffolding

Implemented:
- [x] OpenCode commands exist for planning/slicing/review/deep-research:
  - `.opencode/commands/enkidu-plan.md`
  - `.opencode/commands/enkidu-slice.md`
  - `.opencode/commands/enkidu-review.md`
  - `.opencode/commands/enkidu-deepresearch.md`
- [x] Agent profiles are defined in `opencode.json`:
  - orchestrator, deepthink, deepresearch, research, architect, implementer, tester, reviewer.
- [x] Prompt files exist for each major agent role (`.opencode/prompts/*.md`).
- [x] Cited web search plugin is configured (`opencode-websearch-cited`) and wired to OpenAI model options.

Value:
- You already have a usable command surface and role separation.
- Deep research mode is configured, documented, and repeatable.

### 1.3 Safety scaffolding

Implemented:
- [x] Example `.env` protection plugin exists (`.opencode/plugins/env-protection.js`).
- [x] Security policy docs are explicit (`docs/SECURITY.md`).
- [x] Tool permissions are partially constrained in `opencode.json`.

Value:
- Baseline policy exists and can be tightened incrementally.

### 1.4 Enkidu core code (early starter)

Implemented:
- [x] Basic CLI shell exists (`src/cli.ts`).
- [x] Config loading and validation exists (`src/config.ts`, `enkidu.yaml`).
- [x] Worktree create/remove manager exists (`src/worktrees.ts`).
- [x] Context graph schema exists as SQL starter (`src/context-graph/schema.sql`).

Value:
- Enough foundation to begin real implementation in small vertical slices.

### 1.5 Quality and eval scaffolding

Implemented:
- [x] Scorecard schema exists (`evals/scorecard.schema.json`).
- [x] Ratchet strategy is documented (`docs/QUALITY_RATCHET.md`).
- [x] Gate sets are defined in docs/config (`docs/GATES.md`, `enkidu.yaml`).

Value:
- The measurement model exists, even though enforcement is not complete yet.

---

## 2) What is partially implemented (present but not production-ready)

### 2.1 Worktree and merge operations

Current state:
- [~] Manual helper scripts exist (`scripts/enkidu-worktree.sh`, `scripts/enkidu-merge-train.sh`).
- [~] CLI supports worktree create/remove.

Gap:
- No orchestrator-level pipeline management (queueing, status tracking, retries, conflict-aware scheduling).
- Merge train script is a stub, not an automated CI-integrated merge queue.

### 2.2 Gates and testing

Current state:
- [~] Gate definitions and scripts exist.

Gap:
- `scripts/run-gates.sh` is placeholder-only (prints TODOs).
- `package.json` scripts for lint/test are placeholders.
- No real lint config, no real unit/integration/e2e setup.
- No CI workflow enforcing gates on PRs.

### 2.3 Context graph

Current state:
- [~] Data model and storage decision are documented.
- [~] SQL schema exists.

Gap:
- No graph ingestion/indexers (docs/code/tests/PR edges).
- No retrieval API to build context bundles from graph state.
- No automatic updates on PR/test/ADR events.

### 2.4 Quality ratchet automation

Current state:
- [~] Ratchet concept + scorecard schema are in place.

Gap:
- No scorecard producer wired into CI.
- No merge-blocking ratchet enforcement.
- No automated retrospection loop that converts failures into new tests/rules.

### 2.5 Plugin integrations

Current state:
- [~] PsychMem/arifOS/SuperBMAD are documented and configurable in principle.

Gap:
- No concrete adapter implementation for PsychMem read/write flows.
- No concrete arifOS policy call + verdict enforcement path.
- No implemented SuperBMAD runtime package.

---

## 3) What is still missing (major capabilities)

### 3.1 End-to-end autonomous orchestration

Missing:
- [ ] Controller that decomposes work, spawns subagents, and runs parallel worktrees automatically.
- [ ] Pipeline state model (queued/running/blocked/failed/merged).
- [ ] Failure handling (retries, rollback, escalation).
- [ ] Dependency-aware merge order automation.

### 3.2 Deterministic quality gates in CI

Missing:
- [ ] Real lint/typecheck/test stack and stable commands.
- [ ] CI workflows that run quick/pr/release gate sets.
- [ ] Security scanners integrated into CI.
- [ ] Observability and performance budget checks as merge gates.

### 3.3 Context graph + memory in the execution loop

Missing:
- [ ] Context graph builder/indexer.
- [ ] Context bundle builder that agents consume per task type.
- [ ] PsychMem integration that is scoped and policy-safe.
- [ ] Sync rules for "docs truth, memory cache".

### 3.4 Governance enforcement

Missing:
- [ ] Action-level approval classes enforced in code (A/B/C).
- [ ] arifOS optional integration path with explicit verdict mapping.
- [ ] Default-safe behavior when governance provider is disabled.

### 3.5 Actual product vertical implementation

Missing (for the Austria job heatmap product example):
- [ ] scraper implementation + fixture-based parser tests.
- [ ] canonical data pipeline (normalize, dedupe, store).
- [ ] API endpoints for heatmap and seasonality.
- [ ] frontend map/heatmap and filters.
- [ ] notifications pipeline.
- [ ] time-tracking feature.

---

## 4) Current maturity snapshot

Practical maturity level (from `docs/AUTONOMY_LADDER.md`):
- Estimated current level: between Level 1 and early Level 2.

Why:
- You have strong plans, docs, and command scaffolding.
- You do not yet have deterministic, enforced gates and full CI automation.
- Parallel orchestration is not yet implemented as a running system.

---

## 5) Highest-priority next build steps (recommended order)

1. Implement real gate commands and CI for quick/pr sets.
2. Replace placeholder `lint`/`test` scripts with real tooling and baseline tests.
3. Implement scorecard generation in CI and fail on ratchet regressions.
4. Build orchestrator MVP for one queued task -> one worktree -> one PR.
5. Add parallel worktree scheduler with simple conflict rules.
6. Implement context-graph ingestion + bundle retrieval for planner/implementer.
7. Add optional governance adapter (arifOS) and optional memory adapter (PsychMem).

---

## 6) Bottom line

The repository is a strong, coherent starter harness with unusually good documentation and agent-role design.

It is not yet a fully autonomous engineering system. The biggest missing piece is execution hardening:
- real CI gates,
- real orchestrator runtime,
- real context/memory/governance integration,
- and at least one fully implemented vertical feature path to prove the workflow in production conditions.
