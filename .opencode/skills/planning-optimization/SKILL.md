---
name: planning-optimization
description: "Design high-reliability, high-throughput execution plans using plan-then-execute, dependency-aware decomposition, replanning, and explicit validation gates."
allowed-tools: [Read, WebFetch, WebSearch, WebSearch_Cited, Grep, Glob, TodoRead, TodoWrite]
---

# Planning Optimization Skill

Status: Production-ready
Version: 1.0.0
Last Updated: 2026-02-22
Type: Execution planning framework

## Purpose

Use this skill to produce implementation plans that are:
- clear enough to execute without hidden assumptions
- safe enough to avoid obvious failure modes
- efficient enough to parallelize without chaos

This skill is optimized for engineering tasks that must produce PR-sized, gate-validated outcomes.

## Evidence base (high-signal references)

Planning and orchestration patterns are adapted from widely used OSS projects and docs:
- LangChain and LangGraph (stateful graph orchestration, planner/executor patterns)
  - https://github.com/langchain-ai/langchain
  - https://github.com/langchain-ai/langgraph
  - https://www.blog.langchain.com/planning-agents
- Microsoft AutoGen (multi-agent planning and conversation orchestration)
  - https://github.com/microsoft/autogen
- CrewAI (sequential vs hierarchical manager-led planning)
  - https://github.com/crewAIInc/crewAI
  - https://docs.crewai.com/en/learn/hierarchical-process
- OpenHands and GitHub custom planning-agent examples (implementation planner role)
  - https://github.com/All-Hands-AI/OpenHands
  - https://docs.github.com/en/copilot/tutorials/customization-library/custom-agents/implementation-planner
- SWE-agent and SWE-bench (benchmark-driven planning and validation loops)
  - https://github.com/SWE-agent/SWE-agent
  - https://github.com/SWE-bench/SWE-bench

## Core method

### 1) Frame the mission
- Restate objective in one sentence.
- Define non-goals and hard constraints.
- State measurable success criteria.

### 2) Build a dependency-aware task graph
- Break work into smallest independently verifiable slices.
- Identify dependencies and blockers explicitly.
- Mark what can run in parallel and what must be serialized.

### 3) Assign execution strategy per slice
- Choose implementation path per slice (API-first, test-first, adapter-first, etc.).
- Define expected artifacts (code, tests, docs, ADR, migration notes).
- Define acceptance checks per slice.

### 4) Add reliability controls
- Replanning triggers: unknown constraint, failing gate, conflicting dependency.
- Exit criteria: done criteria and stop conditions.
- Rollback/fallback strategy when an approach fails.

### 5) Validate through gates
- Select gate set (quick/pr/release).
- Map each slice to required tests and quality checks.
- Ensure no slice is declared done without evidence.

## Output contract

Always produce:
1. Goal + scope boundaries.
2. Acceptance criteria (checklist).
3. Assumptions and known unknowns.
4. Execution DAG (tasks, dependencies, parallelization).
5. Gate/validation matrix.
6. Risks and mitigation plan.
7. Final recommendation and first action.

## Anti-patterns to avoid

- Big-bang plans with no slice boundaries.
- Tasks without explicit acceptance criteria.
- Parallelizing dependent work that will cause merge conflicts.
- Declaring completion without gate evidence.
- Vague risk notes without mitigation and owner.
