import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

test("pr gate composes quick and pr-only checks in order", () => {
  const tempDir = mkdtempSync(join(tmpdir(), "enkidu-gates-integration-"));
  const logPath = join(tempDir, "sequence.log");

  const result = spawnSync("bash", ["scripts/run-gates.sh", "pr"], {
    encoding: "utf8",
    env: {
      ...process.env,
      ENKIDU_LINT_CMD: `printf 'lint\\n' >> '${logPath}'`,
      ENKIDU_TYPECHECK_CMD: `printf 'typecheck\\n' >> '${logPath}'`,
      ENKIDU_TEST_CMD: `printf 'test\\n' >> '${logPath}'`,
      ENKIDU_INTEGRATION_TEST_CMD: `printf 'integration\\n' >> '${logPath}'`,
      ENKIDU_SECURITY_SCAN_CMD: `printf 'security\\n' >> '${logPath}'`,
      ENKIDU_AUDIT_DEPS_CMD: `printf 'audit\\n' >> '${logPath}'`
    }
  });

  assert.equal(result.status, 0, result.stderr);
  const sequence = readFileSync(logPath, "utf8").trim().split("\n");
  assert.deepEqual(sequence, ["lint", "typecheck", "test", "integration", "security", "audit"]);
});
