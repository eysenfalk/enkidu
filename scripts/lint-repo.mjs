#!/usr/bin/env node
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const REQUIRED_PATHS = [
  "scripts/run-gates.sh",
  "scripts/security-scan.mjs",
  "scripts/audit-deps.mjs",
  "tests/unit/run-gates.test.mjs",
  "tests/integration/pr-gate.test.mjs"
];

for (const requiredPath of REQUIRED_PATHS) {
  if (!existsSync(requiredPath)) {
    console.error(`[lint] missing required path: ${requiredPath}`);
    process.exit(1);
  }
}

const packageJson = JSON.parse(await readFile("package.json", "utf8"));
const scripts = packageJson.scripts ?? {};
const requiredScripts = [
  "typecheck",
  "test:integration",
  "security:scan",
  "audit:deps",
  "gates:quick",
  "gates:pr"
];

for (const scriptName of requiredScripts) {
  if (typeof scripts[scriptName] !== "string" || scripts[scriptName].trim().length === 0) {
    console.error(`[lint] missing npm script: ${scriptName}`);
    process.exit(1);
  }
}

const shellCheck = spawnSync("bash", ["-n", "scripts/run-gates.sh"], { stdio: "inherit" });
if (shellCheck.status !== 0) {
  process.exit(shellCheck.status ?? 1);
}

console.log("[lint] repository lint checks passed");
