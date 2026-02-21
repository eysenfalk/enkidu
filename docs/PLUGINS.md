# Plugins

Enkidu is designed as a *modular harness*.

Some teams want:
- memory (PsychMem)
- governance kernel (arifOS)
- workflow packs (BMAD)
- OpenCode bootstrap (Superpowers)

Other teams want zero extras.

So everything here is optional.

---

## 1) Plugin layers

### A) OpenCode plugins (runtime hooks)
These live in:
- `.opencode/plugins/` (project)
- `~/.config/opencode/plugins/` (global)

They can:
- intercept tool calls
- block dangerous reads/writes
- add custom tools
- inject context during compaction
- log telemetry

### B) Enkidu “modules” (orchestrator-level)
These are higher-level:
- worktree manager
- gate runner
- scorecard engine
- context graph store
- PR automation

Configured in `enkidu.yaml`.

---

## 2) Supported optional integrations

### PsychMem
Purpose: memory store for agents.

- Enable in `opencode.json` (plugin) and/or `enkidu.yaml` (orchestrator awareness).
- Use it for durable constraints and project conventions.

### arifOS
Purpose: governance + policy kernel.

- Run as a service (REST/MCP).
- Use it to enforce policy floors and risk controls.

### Superpowers
Purpose: OpenCode bootstrap + skills injection.

- Install as `.opencode/plugins/superpowers.js` (see Superpowers docs).
- Add Enkidu’s own skills on top.

### BMAD Method
Purpose: spec-driven “role-based agile” workflows.

- Use BMAD modules for analysis/spec/architecture before coding.
- Enkidu adds worktree parallelism + gates + scorecards.

See `docs/SUPERBMAD_PLAN.md`.

---

## 3) Enkidu plugin contract (proposal)

A plugin/module should declare:
- **capabilities** (memory, governance, context, telemetry)
- **inputs** (events, files, PR metadata)
- **outputs** (decisions, blocks, annotations, scorecards)

And it must be:
- optional
- configurable
- failure-tolerant (if it breaks, it fails “closed” for safety gates, “open” for optional hints)

---

## 4) Included example plugins

See `.opencode/plugins/`:
- `env-protection.js` (blocks `.env` reads)
- `enkidu-compaction-context.js` (injects high-level state into session compaction)
