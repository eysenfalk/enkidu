# Enkidu Deep Research Mode

Enkidu Deep Research Mode is a research-only workflow that decomposes a
question, orchestrates parallel web-only subagents, and returns a cited,
cross-checked synthesis with explicit coverage stats. It is built for breadth
and verification, not implementation.

Default search tooling in this repo:
- `websearch_cited` first (inline citations + `Sources:` output)
- `webfetch` for direct source extraction
- built-in `websearch` only as fallback

## Workflow stages

1) Scoping
- Restate the question in 1-3 bullets.
- Identify 5-10 research lanes and key uncertainties.

2) Lane planning
- Assign subagents per lane with distinct queries, regions, and source types.
- Explicitly include primary sources and opposing viewpoints.

3) Parallel collection waves
- Wave 1: broad sweep across lanes.
- Wave 2: fill gaps, target missing regions and primary sources.

4) Verification wave
- Cross-check critical claims and dates across independent sources.
- Resolve conflicts and note remaining uncertainty.

5) Synthesis
- Produce claim-to-citation mapping.
- Report coverage stats and gaps.

## Breadth and source targets

Default behavior emphasizes breadth:
- Target 150-300 unique sources.
- Hard minimum 120 unique sources unless the domain is genuinely too narrow.
- If below minimum, explain why and list coverage gaps.

## Usage

Use the command:

```text
/enkidu-deepresearch <your question>
```

Examples:

```text
/enkidu-deepresearch Compare the 2024-2026 EU AI Act enforcement guidance and
how it impacts model risk assessments for generative AI vendors.
```

```text
/enkidu-deepresearch What are the most credible benchmarks for LLM reasoning
in 2025-2026, and how do they differ in methodology?
```

## Handoff to planning or implementation

This mode is research-only. After completion, hand off to planning or
implementation commands for execution:
- /enkidu-plan for a gated plan
- /enkidu-slice for PR-sized breakdowns
