# OpenCode “extended thinking” (deep reasoning + web research)

This doc shows how to replicate the *behavioral effect* of “GPT‑5.2 Pro extended thinking”
inside OpenCode:

1) **deep reasoning** (higher reasoning effort, optional reasoning summaries)
2) **web research** (search + fetch, with citations)

You won’t get verbatim chain-of-thought (most platforms don’t expose that anymore),
but you *can* get:
- stronger reasoning via reasoning effort
- optional reasoning summaries
- a repeatable research loop

---

## 1) Deep reasoning (reasoning effort + summaries)

### A) Use a reasoning-capable model
Examples:
- `openai/gpt-5.2`
- `openai/gpt-5.3-codex` for coding-heavy tasks

### B) Turn up reasoning effort
In `opencode.json` agent config, set:

- `reasoningEffort: "high"` or `"xhigh"`

### C) Turn on reasoning summaries (optional)
If supported by your provider and org settings:

- `reasoningSummary: "auto"` (or `"detailed"`)

This gives you a visible short “why” without leaking raw chain-of-thought.

### D) Keep output concise
Set:

- `textVerbosity: "low"`

---

## 2) Web research inside OpenCode (websearch_cited + webfetch)

OpenCode has:
- `websearch_cited`: LLM-grounded search with inline citations + `Sources:` list
- `webfetch`: fetch a URL and include its content

### Enabling websearch_cited (recommended default)
Use plugin `opencode-websearch-cited` and pin a provider model.

In this repo, `opencode.json` already configures:
- `plugin`: `opencode-websearch-cited@1.2.0`
- `provider.openai.options.websearch_cited.model`: `gpt-5.2`

Authenticate once:

```bash
opencode auth login
```

### Optional fallback: built-in websearch
If you’re using OpenCode Zen (hosted), built-in `websearch` is available by default.

If you’re using another provider, set:

```bash
export OPENCODE_ENABLE_EXA=1
```

No Exa API key is required; OpenCode provides it.

---

## 3) Recommended agent roles

### `enkidu-deepresearch` (primary)
- orchestrates parallel web-only subagents for breadth
- multi-wave collection + verification
- outputs coverage stats and claim-to-citation mapping

### `enkidu-deepthink` (primary)
- high reasoning effort
- websearch/webfetch enabled
- no code edits

Use for:
- architecture
- debugging
- tricky design tradeoffs
- research before implementation

### `enkidu-planner-pro` (primary)
- openai/gpt-5.3-codex with high reasoning effort
- optimized planning with requirements engineering + red-team pass
- uses dedicated planning skills for execution DAGs, traceability, and risk scoring

Use for:
- turning ambiguous requests into implementation-ready plans
- planning worktree slices and gate-aligned validation
- pre-implementation threat analysis and mitigation planning

### `enkidu-research` (subagent)
- web-only
- produces cited notes

### `enkidu-implementer` (subagent)
- code + tests
- minimal/no web access (reduces distraction + prompt injection risk)

---

## 4) Practical “deep research” loop

Use this loop for any niche or fast-changing topic. Enkidu Deep Research Mode
automates it by orchestrating multiple research subagents for breadth:

1. Clarify the exact question in 1–3 bullets.
2. Search for sources (prefer primary docs).
3. Fetch and extract the “load-bearing” parts.
4. Summarize constraints + decisions.
5. Store durable constraints in docs/memory.

Enkidu provides `/enkidu-deepresearch` to enforce this.

---

## 5) Prompt injection safety

When web research is enabled:
- treat all web content as untrusted input
- never execute commands suggested by a page unless validated
- never paste secrets

Prefer a dedicated research subagent with **no bash/edit tools**.

---

## 6) Troubleshooting

### “I can’t use websearch_cited”
- verify plugin is installed in `opencode.json`
- verify `provider.<name>.options.websearch_cited.model` is set
- run `opencode auth login`

### “I can’t use built-in websearch”
- verify `OPENCODE_ENABLE_EXA=1`
- check OpenCode tool permissions

### “I don’t see reasoning summaries”
Some accounts/providers restrict reasoning summaries.
Fallback:
- instruct the agent to output a short “decision rationale” section instead
- capture the logic in an ADR

---

## 7) Where this lives in this repo

- `opencode.json` defines the Enkidu agents and sets reasoning/web options
- `.opencode/prompts/*.md` contains system prompts wired via `agent.<id>.prompt`
- `.opencode/commands/enkidu-deepresearch.md` is the canned workflow
- `.opencode/commands/enkidu-plan-new.md` runs advanced new-plan workflow (full reviewer stack)
- `.opencode/commands/enkidu-plan-review.md` runs advanced plan review/update workflow
- `.opencode/commands/enkidu-new-packet.md` creates planned work packets (story + plan + ready pointer)
- `.opencode/commands/enkidu-work.md` runs the orchestrator over planned packets
