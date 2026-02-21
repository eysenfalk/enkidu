# ADR-0003: Context graph storage in SQLite

**Date:** 2026-02-21  
**Status:** accepted

## Context

We need a context graph that is:
- local-first
- fast
- easy to query
- easy to back up
- simple to run in CI and on developer machines

## Decision

Use **SQLite** as the storage engine for the context graph in v1.

Location:
- `.ekdu/context-graph.db`

## Alternatives considered

- JSON files in git (too noisy, hard to query)
- Postgres (heavier operational footprint)
- Neo4j (overkill)

## Consequences

- Provide migration strategy if we outgrow SQLite.
- Keep schema minimal and typed.
