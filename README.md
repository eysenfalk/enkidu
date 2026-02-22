# Enkidu

**Enkidu** is a workflow + harness for *agentic software engineering*:

- multiple AI subagents working **in parallel**
- each subagent isolated in its own **git worktree / feature branch**
- producing **reviewable pull requests**
- with **tests, gates, observability, and governance** that get stricter over time

The vibe is “humans steer, agents execute” — but with enough feedback loops that human steering becomes progressively optional.

## Why the name “Enkidu”?

In the Epic of Gilgamesh, Enkidu is the companion who **civilizes, balances, and keeps Gilgamesh honest**. That’s exactly what this project is trying to do for high-throughput coding agents: speed *with* constraints, velocity *with* taste, autonomy *with* guardrails.

If you later want a “big umbrella” name for the whole platform, **Gilgamesh** can be the epic, and **Enkidu** can be the conscience/harness inside it. But as the repo name, Enkidu is short, memorable, and thematically perfect.

## What you get in this starter repo

This repo is mostly *the plans*, wired into OpenCode:

- `AGENTS.md` — short table-of-contents for agents
- `docs/` — the real system-of-record (workflow, gates, context graph, observability, governance)
- `.opencode/` — commands + skills + plugins to enforce the workflow in OpenCode
- `opencode.json` — agent definitions (orchestrator, deep-thinker, reviewers) and tool permissions
- `enkidu.yaml` — Enkidu’s own config (plugins on/off, quality ratchet thresholds, gate sets)
- `evals/` — scorecards & eval harness scaffolding for “next 1000 LOC must be better than the last”

## The big idea

Autonomous agents only become trustworthy when:
1) the *environment* makes correctness easy, and
2) the *feedback loops* punish entropy quickly.

OpenAI calls this style **harness engineering** (the “agent-first” equivalent of good dev tooling + good CI). The pattern is:
- make the codebase legible to agents,
- make the feedback loops fast,
- make quality measurable,
- keep repository knowledge as the system-of-record.

## Optional integrations (pluggable)

Everything is designed to be optional + configurable:

- **PsychMem** (project/user memory for agents)  
- **arifOS** (governance kernel / policy floors)  
- **Superpowers** (OpenCode bootstrap + skills injection)  
- **BMAD Method** (spec-driven, role-based agile workflows)  
- **value-realization** (OpenCode skill for product value discovery checks)

This starter includes adapters and configuration patterns, not hard dependencies.
This repo currently includes `value-realization` under `.opencode/skills/value-realization/`.

## Quickstart (minimal)

1) Install OpenCode and connect a model provider (OpenAI, OpenCode Zen, etc).
2) Copy `opencode.json` into your project root (or merge the relevant parts into your existing config).
3) Restart OpenCode.

### Default cited web search (enabled)

This starter is configured to use `opencode-websearch-cited` by default, with OpenAI `gpt-5.2` as the cited-search model (`websearch_cited`).

Configured in `opencode.json`:
- `plugin`: `opencode-websearch-cited@1.2.0`
- `provider.openai.options.websearch_cited.model`: `gpt-5.2`

Run auth once:

```bash
opencode auth login
```

Optional fallback: OpenCode’s built-in `websearch` (Exa)

```bash
export OPENCODE_ENABLE_EXA=1
```

### Turn on the “deep thinking” agent

Use the `enkidu-deepthink` agent (defined in `opencode.json`) for tasks that require:
- longer reasoning
- higher quality planning
- research + citations

In the OpenCode TUI, switch agent or run:

```text
/use agent enkidu-deepthink
```

Or use the provided command:

```text
/enkidu-deepresearch <your task>
```

## Files to read first

- `docs/WORKFLOW.md`
- `docs/GATES.md`
- `docs/OPENCODE_EXTENDED_THINKING.md`
- `docs/QUALITY_RATCHET.md`
- `docs/CONTEXT_GRAPH.md`

## License

MIT for this starter repo scaffolding (see `LICENSE`).
