# Work pointer: <id>-<slug>

**Packet:** `docs/work/<id>-<slug>/`
**Title:** <title>
**Owner:** <name>
**Status:** backlog | ready | in-progress | blocked | done
**Risk class:** A | B | C
**Gate set:** quick | pr | release
**Branch:** ekdu/<packet-id>-<slice-slug>
**Worktree:** .ekdu/worktrees/<slice-slug>
**Updated:** <YYYY-MM-DD>

## Notes

- Packet ID in branch name must match the packet path exactly.
- Use collision-safe `<slice-slug>` names (`s1-*`, `s2-*`) for parallel work.
