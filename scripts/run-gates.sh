#!/usr/bin/env bash
set -euo pipefail

set_name="${1:-quick}"

run_step() {
  local label="$1"
  local cmd="$2"
  echo "[gates] ${label}"
  bash -lc "$cmd"
}

run_quick() {
  run_step "lint" "${ENKIDU_LINT_CMD:-npm run lint}"
  run_step "typecheck" "${ENKIDU_TYPECHECK_CMD:-npm run typecheck}"
  run_step "unit-tests" "${ENKIDU_TEST_CMD:-npm run test}"
}

run_pr() {
  run_quick
  run_step "integration-tests" "${ENKIDU_INTEGRATION_TEST_CMD:-npm run test:integration}"
  run_step "security-scan" "${ENKIDU_SECURITY_SCAN_CMD:-npm run security:scan}"
  run_step "dependency-audit" "${ENKIDU_AUDIT_DEPS_CMD:-npm run audit:deps}"
}

run_release() {
  run_pr
  run_step "release-checks" "${ENKIDU_RELEASE_CMD:-echo 'No release-specific checks configured.'}"
}

echo "[gates] Running gate set: $set_name"

case "$set_name" in
  quick)
    run_quick
    ;;
  pr)
    run_pr
    ;;
  release)
    run_release
    ;;
  *)
    echo "Unknown gate set: $set_name" >&2
    exit 1
    ;;
esac

echo "[gates] Gate set completed: $set_name"
