import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const gatesScript = "scripts/run-gates.sh";

const runGate = (setName) => {
  const tempDir = mkdtempSync(join(tmpdir(), "enkidu-gates-unit-"));
  const logPath = join(tempDir, "gate.log");
  const env = {
    ...process.env,
    ENKIDU_LINT_CMD: `printf 'lint\\n' >> '${logPath}'`,
    ENKIDU_TYPECHECK_CMD: `printf 'typecheck\\n' >> '${logPath}'`,
    ENKIDU_TEST_CMD: `printf 'test\\n' >> '${logPath}'`,
    ENKIDU_INTEGRATION_TEST_CMD: `printf 'integration\\n' >> '${logPath}'`,
    ENKIDU_SECURITY_SCAN_CMD: `printf 'security\\n' >> '${logPath}'`,
    ENKIDU_AUDIT_DEPS_CMD: `printf 'audit\\n' >> '${logPath}'`,
    ENKIDU_RELEASE_CMD: `printf 'release\\n' >> '${logPath}'`
  };
  const result = spawnSync("bash", [gatesScript, setName], {
    encoding: "utf8",
    env
  });
  return {
    ...result,
    steps: result.status === 0 ? readFileSync(logPath, "utf8").trim().split("\n") : []
  };
};

test("quick gate runs lint, typecheck, and unit tests", () => {
  const result = runGate("quick");
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(result.steps, ["lint", "typecheck", "test"]);
});

test("pr gate runs quick plus integration, security, and audit", () => {
  const result = runGate("pr");
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(result.steps, ["lint", "typecheck", "test", "integration", "security", "audit"]);
});

test("unknown gate exits non-zero", () => {
  const result = runGate("invalid");
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Unknown gate set/);
});
