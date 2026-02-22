#!/usr/bin/env bash
set -euo pipefail

# Enkidu worktree helper (manual use)
# Usage:
#   ./scripts/enkidu-worktree.sh create <packet-id> <slice-slug> [base-branch]
#   ./scripts/enkidu-worktree.sh remove <packet-id> <slice-slug>
#
# Worktrees live under: .ekdu/worktrees/<slice-slug>
# Branches must be packet-scoped: ekdu/<packet-id>-<slice-slug>

cmd="${1:-}"
packet_id="${2:-}"
slice_slug="${3:-}"
base_branch="${4:-main}"

if [[ -z "$cmd" || -z "$packet_id" || -z "$slice_slug" ]]; then
  echo "Usage: $0 <create|remove> <packet-id> <slice-slug> [base-branch]"
  exit 1
fi

if [[ ! "$packet_id" =~ ^[0-9]{8}$ ]]; then
  echo "Invalid packet-id '$packet_id' (expected YYYYMMDD)."
  exit 1
fi

if [[ ! "$slice_slug" =~ ^[a-z0-9]+[a-z0-9-]*$ ]]; then
  echo "Invalid slice-slug '$slice_slug' (expected lowercase letters, numbers, dashes)."
  exit 1
fi

if [[ ! "$slice_slug" =~ ^s[0-9]+- ]]; then
  echo "Invalid slice-slug '$slice_slug' (must start with s<index>- for collision safety)."
  exit 1
fi

branch="ekdu/${packet_id}-${slice_slug}"
dir=".ekdu/worktrees/${slice_slug}"

mkdir -p ".ekdu/worktrees"

case "$cmd" in
  create)
    if git branch --list "$branch" | grep -q "$branch"; then
      echo "Branch already exists: $branch"
      exit 1
    fi
    if [[ -e "$dir" ]]; then
      echo "Worktree path already exists: $dir"
      exit 1
    fi
    echo "Creating worktree at $dir for branch $branch from $base_branch"
    git worktree add "$dir" -b "$branch" "$base_branch"
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
