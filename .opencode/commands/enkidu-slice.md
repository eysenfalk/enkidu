---
description: Slice a large feature into parallel PR-sized work items
agent: enkidu-deepthink
---
Slice the request into small, mergeable PRs that can be built in parallel worktrees.

If you need external info while slicing, use websearch_cited first (websearch fallback only).

Output:
- A numbered list of slices.
- For each slice: scope, touched modules, tests to add/update, risk class, dependencies.
- Recommend merge order (merge train).

User request: $ARGUMENTS
