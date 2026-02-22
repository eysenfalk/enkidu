# Implementation status

This document tracks what is implemented today in this starter repo, what is only scaffolding, and what still needs to be built.

Scope of this status:
- configuration and CLI runtime code in `src/`
- helper scripts in `scripts/`
- OpenCode integration in `.opencode/` and `opencode.json`
- quality/eval scaffolding in `evals/`

---

## 1) What is already implemented

### A) Documentation and process baseline (strong)
- `docs/` is broad and organized, with workflow, gates, quality ratchet, context graph, security, observability, governance, and ADR coverage.
- `AGENTS.md` and `docs/index.md` establish a clear system-of-record model and agent entry path.
- Templates exist for planning and PR/story/ADR artifacts in `docs/templates/`.

### B) OpenCode integration scaffold (usable)
- `opencode.json` defines a multi-agent topology (orchestrator, deepthink, deepresearch, implementer, tester, reviewer, and subagents).
- Tool permissions are explicitly scoped by agent, including web research defaults through `websearch_cited`.
- Reusable slash commands exist in `.opencode/commands/` for planning, slicing, review, and deep research.
- A reusable workflow skill exists in `.opencode/skills/enkidu/SKILL.md`.

### C) Config and CLI skeleton (functional for basics)
- `enkidu.yaml` defines project config, plugin toggles, workflow defaults, autonomy level, ratchet thresholds, and gate sets.
- `src/config.ts` loads and validates config with `zod`.
- `src/cli.ts` provides working commands for:
  - `config`
  - `worktree:create <branch>`
  - `worktree:remove <branch>`
- `src/worktrees.ts` executes `git worktree add/remove` flows and branch cleanup.

### D) Safety and policy starter controls (basic)
- `.opencode/plugins/env-protection.js` blocks `.env` reads via tool hook.
- `.opencode/plugins/enkidu-compaction-context.ts` injects compaction context and reminds the model to preserve active execution state.

### E) Eval/scorecard foundation (schema-level)
- `evals/scorecard.schema.json` defines a concrete JSON schema for PR/gate quality reporting.
- `evals/README.md` documents intended scorecard workflow.

---

## 2) What is partially implemented

### A) Worktree automation
- CLI + shell helpers exist (`src/worktrees.ts`, `scripts/enkidu-worktree.sh`), but orchestration around parallel execution and lifecycle management is still manual.
- Merge train support exists only as a manual stub (`scripts/enkidu-merge-train.sh`).

### B) Gates and quality ratchet execution
- Gate definitions and thresholds are documented/configured (`docs/GATES.md`, `enkidu.yaml`).
- Runtime enforcement is not implemented; `scripts/run-gates.sh` is placeholder output only.
- `package.json` scripts for `lint` and `test` are placeholders and do not run real checks.

### C) Context graph
- Context graph design is well documented (`docs/CONTEXT_GRAPH.md`, ADR-0003).
- Implementation module is a stub only (`src/context-graph/README.md`), with no storage schema, ingest pipeline, or retrieval CLI.

### D) Plugin/module integration depth
- PsychMem, arifOS, and SuperBMAD toggles are represented in config.
- Integration is mostly declarative at this stage; no concrete runtime adapters or enforcement loops are present in the repo.

### E) Research workflow
- Deep research command and prompt framework are present and detailed.
- End-to-end persistence of findings into docs/memory/context graph is still process-driven, not automated.

---

## 3) What is missing

### A) Production-grade developer gates
- Real lint/typecheck/test toolchain setup and configuration.
- Non-placeholder gate runner that executes configured gate sets.
- CI workflows that enforce quick/pr/release gates on branches and PRs.

### B) Test coverage and reliability foundation
- Unit/integration/e2e test suites for runtime code.
- Test fixtures and regression suites for target verticals.

### C) Context graph MVP runtime
- SQLite schema and migration files.
- Ingestion commands (docs/ADRs/PR/test metadata).
- Query commands for context bundle generation.

### D) Orchestrator automation loop
- Automatic worktree provisioning per slice.
- Subagent dispatch/collection and merge-train orchestration.
- PR automation and scorecard-attached PR summaries.

### E) Governance and observability enforcement
- Policy-floor enforcement path (including optional arifOS runtime integration).
- Observability budgets/smoke checks wired into gates.

### F) Ratchet operation in practice
- Scorecard generation in CI.
- Historical storage/aggregation and regression blocking.

---

## 4) Current maturity estimate

Overall maturity: **early scaffold / pre-MVP runtime**.

Approximate readiness by area:
- Docs and process design: 4/5 (strongly specified)
- OpenCode agent configuration: 3/5 (usable baseline)
- CLI/worktree runtime: 2/5 (basic commands only)
- Gates and test automation: 1/5 (mostly placeholders)
- Context graph runtime: 1/5 (design only)
- Governance/observability enforcement: 1/5 (design only)

Estimated implementation completeness (repo code + automation, excluding docs): about 20-30%.

---

## 5) Prioritized next steps

### Priority 0 - Make quality gates real (highest leverage)
1. Replace placeholder `lint`/`test` scripts with real tooling and add `typecheck` command.
2. Implement `scripts/run-gates.sh` to execute `quick`, `pr`, and `release` sets against actual commands.
3. Add CI workflow(s) to run gate sets on PRs and fail on regressions.

Success criteria:
- `npm run lint`, `npm run build`, and `npm test` execute real checks.
- `./scripts/run-gates.sh quick` is deterministic and CI-aligned.

### Priority 1 - Build context graph MVP
1. Add SQLite schema and a minimal data access layer under `src/context-graph/`.
2. Implement CLI commands to ingest docs/ADRs and query related context by component/topic.
3. Output a markdown context bundle consumable by agent prompts.

Success criteria:
- Context graph DB can be initialized and queried locally.
- At least one real implementation flow can consume generated context bundles.

### Priority 2 - Close the orchestrator loop
1. Add CLI flows for gated worktree lifecycle + merge train execution.
2. Add scorecard emission after gate runs (schema-compliant JSON).
3. Add PR-ready summary generation that includes validation and risk notes.

Success criteria:
- A small feature can run from slice -> worktree -> gates -> scorecard -> PR summary with minimal manual glue.

### Priority 3 - Add governance and observability as blocking checks
1. Integrate baseline security/dependency scanning into gate sets.
2. Add basic observability smoke checks and define budget thresholds.
3. Wire optional arifOS policy checks for high-risk changes.

Success criteria:
- PR/release gates include at least one security and one observability blocking check.
