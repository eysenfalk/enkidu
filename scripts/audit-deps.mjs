#!/usr/bin/env node
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const ensureLockfile = () => {
  if (existsSync("package-lock.json")) {
    return;
  }

  const lockRun = spawnSync(
    "npm",
    ["install", "--package-lock-only", "--ignore-scripts", "--no-fund", "--no-audit"],
    { stdio: "inherit" }
  );

  if (lockRun.status !== 0) {
    console.error("[audit] unable to generate package-lock.json");
    process.exit(lockRun.status ?? 1);
  }
};

const hasUnsafeSpec = (value) => {
  if (typeof value !== "string") {
    return false;
  }
  return /^(?:latest|\*|file:|link:|git\+|github:)/.test(value.trim());
};

ensureLockfile();

const pkg = JSON.parse(await readFile("package.json", "utf8"));
const sections = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"];
const unsafeSpecs = [];

for (const section of sections) {
  const deps = pkg[section] ?? {};
  for (const [name, spec] of Object.entries(deps)) {
    if (hasUnsafeSpec(spec)) {
      unsafeSpecs.push(`${section}:${name}=${spec}`);
    }
  }
}

if (unsafeSpecs.length > 0) {
  console.error("[audit] dependency specs must avoid mutable/unpinned sources:");
  for (const spec of unsafeSpecs) {
    console.error(`- ${spec}`);
  }
  process.exit(1);
}

const audit = spawnSync("npm", ["audit", "--audit-level=high", "--omit=dev"], { stdio: "inherit" });
if (audit.status !== 0) {
  process.exit(audit.status ?? 1);
}

console.log("[audit] dependency audit passed");
