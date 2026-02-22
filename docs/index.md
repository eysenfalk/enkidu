# Docs index

Enkidu’s docs are the **system-of-record**.  
`AGENTS.md` is the map; `docs/` is the territory.

## Core workflow

- `WORKFLOW.md` — manual → automated flow, from idea to merged PR
- `AUTONOMY_LADDER.md` — what “fully autonomous” means and how to earn it
- `GATES.md` — tests, quality gates, governance gates, release gates
- `QUALITY_RATCHET.md` — “next 1000 LOC must be better than the last”
- `OBSERVABILITY.md` — logs/metrics/traces + agent legibility
- `SECURITY.md` — secrets, sandboxing, scraping ethics
- `GOVERNANCE.md` — policies, approvals, arifOS integration

## Context engineering

- `CONTEXT_GRAPH.md` — context graph data model and retrieval rules
- `MEMORY.md` — project memory (PsychMem) + how it’s used safely
- `CONTEXT_BUNDLES.md` — what goes into an agent prompt for different tasks

## Tooling integration

- `OPENCODE_EXTENDED_THINKING.md` — how to get “deep thinking + web research” in OpenCode
- `DEEP_RESEARCH.md` — Enkidu deep research mode (parallel web research with citations)
- `PLUGINS.md` — plugin system and optional modules (PsychMem, arifOS, Superpowers, BMAD)
- `SUPERBMAD_PLAN.md` — plan to combine Superpowers + BMAD into one pack

## Example vertical (your job heatmap project)

- `EXAMPLE_JOB_HEATMAP_PRODUCT.md` — product/spec notes for the Austria job heatmap + scraper

## Architecture decision records (ADRs)

- `adr/ADR-0001-project-name.md`
- `adr/ADR-0002-worktrees-and-parallelism.md`
- `adr/ADR-0003-context-graph-storage.md`
- `adr/ADR-0004-quality-ratchet-scorecards.md`
