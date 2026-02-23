# Work pointer: <id>-<slug>

**Packet:** `docs/work/<id>-<slug>/`
**Title:** <title>
**Owner:** <name>
**Status:** backlog | ready | in-progress | blocked | done
**Risk class:** A | B | C
**Gate set:** quick | pr | release
**Branch:** ekdu/<packet-id>-<slice-slug>
**Worktree:** .ekdu/worktrees/<slice-slug>
**Execution model:** single-worktree default | exception-approved multi-slice
**Updated:** <YYYY-MM-DD>

## Notes

- Packet ID in branch name must match the packet path exactly.
- Use collision-safe `<slice-slug>` names (`s1-*`, `s2-*`) for parallel work across packet branches.
- Default policy: one active worktree per packet branch.
- Exception policy: extra slice worktrees for the same packet require explicit preplan + justification in `plan.md` before creation.
- Merge/cleanup checkpoint: record explicit human confirmation in packet artifacts before merge and before destructive cleanup actions.
- Cleanup order is deterministic: backup/evidence -> merge -> verify -> remove worktrees, then remove branches.
