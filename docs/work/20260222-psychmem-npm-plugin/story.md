# Story: PsychMem via npm plugin

**Owner:** aemon  
**Status:** ready  
**Target gate set:** quick  
**Risk class:** B

## Problem

PsychMem must be enabled consistently for all agents using this repo.
The preferred mechanism is OpenCode's npm plugin installation via `opencode.json`.

## Acceptance criteria

- [ ] `opencode.json` includes `psychmem` in the `plugin` array (optionally pinned).
- [ ] PsychMem verification steps are documented (how to confirm it loads).
- [ ] PsychMem DB path remains under `.ekdu/` (or other ignored path) and is not committed.
- [ ] Memory policy remains aligned with `docs/SECURITY.md` (no secrets/PII).

## Non-goals

- Building a custom memory system in Enkidu.

## Constraints

- Prefer reproducible installs (npm plugin) over path-specific local shims.

## Context bundle

- Docs:
  - `docs/MEMORY.md`
  - `docs/PLUGINS.md`
  - `docs/SECURITY.md`
- Upstream:
  - https://github.com/muratg98/psychmem

## Validation recipe

- Confirm plugin loads using `opencode debug config` and/or startup logs.
