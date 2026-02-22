# Execution plan: PsychMem via npm plugin

**Owner:** aemon  
**Created:** 2026-02-22  
**Status:** active  
**Gate set:** quick  
**Risk class:** B

## Objective and scope

- Goal: enable PsychMem as an OpenCode npm plugin for this repo.
- Non-goals: custom plugin shims; storing memory in git.

## Requirements baseline

### Functional requirements

- Add `psychmem` to `opencode.json` `plugin` array (prefer version pin after selecting).
- Ensure PsychMem DB path is under `.ekdu/` (already gitignored).
- Document verification steps and safe memory scope.

### Non-functional requirements (with metrics)

- Reproducible: new contributor can enable memory without manual file copying.

### Acceptance criteria

- [ ] `opencode.json` has `psychmem` plugin configured.
- [ ] `docs/MEMORY.md` documents what is stored and how to verify PsychMem loads.
- [ ] `docs/PLUGINS.md` reflects npm plugin approach.
- [ ] `.gitignore` already excludes `.ekdu/` (confirm).

## Execution plan (DAG + slices)

- Slice 0 (config):
  - [ ] Update `opencode.json` `plugin` array to include `psychmem`
  - Commit checkpoint: `chore(plugins): enable psychmem`

- Slice 1 (docs + safety):
  - [ ] Update `docs/MEMORY.md` and `docs/PLUGINS.md` with:
    - install method (npm plugin)
    - verification commands
    - memory do/don't list
  - Commit checkpoint: `docs(memory): document psychmem usage`

## Red-team risk register and mitigations

- Risk: secrets/PII captured in memory.
  - Mitigation: follow `docs/SECURITY.md`; never store secrets; keep DB out of git.

## Gate and validation matrix

- Gate set: quick
- Validation:
  - run `opencode debug config` and confirm psychmem plugin is in resolved plugin list
  - start a session and confirm PsychMem init logs appear

## Progress log

- 2026-02-22: packet created; not started.

## Completion checklist

- [ ] acceptance criteria satisfied
- [ ] chosen gate set is green
