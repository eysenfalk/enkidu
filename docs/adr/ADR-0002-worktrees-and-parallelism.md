# ADR-0002: Parallel development via git worktrees

**Date:** 2026-02-21  
**Status:** accepted

## Context

We want multiple subagents working in parallel on separate features with minimal interference.
Branch switching inside one working directory causes:
- context pollution
- file contention
- broken local state
- merge conflicts discovered too late

## Decision

Use **git worktrees** as the standard isolation primitive.

Each slice of work gets:
- one branch
- one worktree directory
- one agent session

## Consequences

- Orchestrator must manage creation/cleanup of worktrees.
- Gates must run per worktree and again on the merge train.
- Local dev scripts should assume worktree isolation is normal.
