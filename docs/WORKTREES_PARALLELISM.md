# Worktrees and parallelism

The system you want lives or dies on **parallel isolation**.

Git worktrees are the cleanest way to run multiple agents concurrently without:
- stepping on each other’s files
- mixing context
- creating merge hell

---

## 1) Worktree layout (recommended)

```
.ekdu/
  worktrees/
    ekdu-feature-a/
    ekdu-feature-b/
    ekdu-bugfix-c/
```

Each folder is a git worktree on its own branch.

Naming:
- branch: `ekdu/<slug>`
- worktree dir: `.ekdu/worktrees/<slug>`

---

## 2) Parallel execution strategy

The orchestrator should:
1. Create N worktrees for N independent slices.
2. Start one OpenCode session per worktree.
3. Dispatch a subagent prompt tailored to that slice.
4. Collect outputs:
   - changed files
   - gate results
   - scorecard
5. Open PR(s) or merge into a merge train branch.

---

## 3) Merge philosophy: merge train

High throughput changes the merge philosophy.

Instead of one giant PR:
- keep PRs small
- merge them in order into an integration branch
- rerun gates after each merge
- only when stable, merge to main

---

## 4) Conflict handling

When worktrees conflict:
- prioritize merging “foundation” PRs first (types, shared utilities)
- rebase dependent branches onto the updated integration branch
- use the context graph to detect dependency edges early

---

## 5) Garbage collection

Worktrees are disposable.
After merge:
- delete worktree directory
- delete branch
- keep only the PR + scorecard artifacts

Entropy control is a feature.
