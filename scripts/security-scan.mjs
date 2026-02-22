#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const scanPatterns = [
  { name: "AWS access key", regex: /AKIA[0-9A-Z]{16}/ },
  { name: "GitHub token", regex: /ghp_[A-Za-z0-9]{36}/ },
  { name: "Slack token", regex: /xox[baprs]-[A-Za-z0-9-]{10,}/ },
  { name: "Private key", regex: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ }
];

const list = spawnSync("git", ["ls-files"], { encoding: "utf8" });
if (list.status !== 0) {
  console.error("[security] unable to list tracked files");
  process.exit(list.status ?? 1);
}

const files = list.stdout.split("\n").filter(Boolean);
const findings = [];

for (const filePath of files) {
  if (filePath === "package-lock.json") {
    continue;
  }

  const content = await readFile(filePath, "utf8").catch(() => null);
  if (content === null) {
    continue;
  }

  for (const pattern of scanPatterns) {
    if (pattern.regex.test(content)) {
      findings.push(`${pattern.name} in ${filePath}`);
    }
  }
}

if (findings.length > 0) {
  console.error("[security] secret-like material detected:");
  for (const finding of findings) {
    console.error(`- ${finding}`);
  }
  process.exit(1);
}

console.log("[security] no secret-like material detected in tracked files");
