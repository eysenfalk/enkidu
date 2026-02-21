#!/usr/bin/env bash
set -euo pipefail

# Enkidu merge train helper (manual use)
# This is a stub. In practice you'd integrate with CI + gh CLI.

integration_branch="${1:-ekdu/integration}"

echo "Creating or resetting integration branch: ${integration_branch}"
git checkout -B "${integration_branch}"

echo "Now merge PR branches one-by-one, re-running gates each time."
echo "Example:"
echo "  git merge --no-ff ekdu/feature-a"
echo "  ./scripts/run-gates.sh pr"
