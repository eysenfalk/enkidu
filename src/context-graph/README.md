# Context graph module (stub)

This is a placeholder for Enkidu’s context graph implementation.

MVP responsibilities:
- store nodes/edges in SQLite (`schema.sql`)
- expose queries used for context bundles:
  - "docs relevant to component X"
  - "tests validating component X"
  - "recent PRs touching component X"
- export a bundle as markdown suitable for prompt injection

Implementation can start as:
- a simple CLI command
- later: a background service + cache
