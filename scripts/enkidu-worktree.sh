#!/usr/bin/env bash
set -euo pipefail

# Enkidu worktree helper (manual use)
# Usage:
#   ./scripts/enkidu-worktree.sh create ekdu/my-feature
#   ./scripts/enkidu-worktree.sh remove ekdu/my-feature
#
# Worktrees live under: .ekdu/worktrees/<slug>

cmd="${1:-}"
branch="${2:-}"

if [[ -z "$cmd" || -z "$branch" ]]; then
  echo "Usage: $0 <create|remove> <branch>"
  exit 1
fi

slug="${branch#*/}"
dir=".ekdu/worktrees/${slug}"

mkdir -p ".ekdu/worktrees"

case "$cmd" in
  create)
    echo "Creating worktree at $dir for branch $branch"
    git worktree add -b "$branch" "$dir"
    ;;
  remove)
    echo "Removing worktree at $dir for branch $branch"
    git worktree remove "$dir"
    git branch -D "$branch" || true
    ;;
  *)
    echo "Unknown command: $cmd"
    exit 1
    ;;
esac
