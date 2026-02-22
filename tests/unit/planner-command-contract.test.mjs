import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const readText = (path) => readFileSync(path, "utf8");

test("planner command inventory migrates to plan-new and plan-review", () => {
  assert.equal(existsSync(".opencode/commands/enkidu-plan-new.md"), true);
  assert.equal(existsSync(".opencode/commands/enkidu-plan-review.md"), true);
  assert.equal(existsSync(".opencode/commands/enkidu-plan-pro.md"), false);
});

test("planner commands are bound to enkidu-planner-pro", () => {
  const planNew = readText(".opencode/commands/enkidu-plan-new.md");
  const planReview = readText(".opencode/commands/enkidu-plan-review.md");

  assert.match(planNew, /agent:\s*enkidu-planner-pro/);
  assert.match(planReview, /agent:\s*enkidu-planner-pro/);
});

test("planner commands include deterministic pass ordering and review triggers", () => {
  const planNew = readText(".opencode/commands/enkidu-plan-new.md");
  const planReview = readText(".opencode/commands/enkidu-plan-review.md");

  assert.match(planNew, /1\) requirements\s*\n2\) red-team\s*\n3\) pragmatist\s*\n4\) architect\s*\n5\) plan-reviewer\s*\n6\) synthesis/s);
  assert.match(planReview, /requirements -> red-team -> pragmatist -> architect -> plan-reviewer -> synthesis/);
  assert.match(planReview, /Trigger matrix for conditional passes \(evaluate in this order\):/);
  assert.match(planReview, /red-team: run when changes introduce or modify security, privacy, abuse-case, permission, or release-blocker risk\./);
  assert.match(planReview, /pragmatist: run when scope increases, delivery cost rises, or value-to-effort is unclear\./);
  assert.match(planReview, /architect: run when interfaces, system boundaries, data contracts, or ADR-relevant decisions change\./);
});

test("planner prompt defines required pass order and output contract", () => {
  const prompt = readText(".opencode/prompts/enkidu-planner-pro.md");

  assert.match(prompt, /requirements\s*\n\s*- red-team\s*\n\s*- pragmatist\s*\n\s*- architect\s*\n\s*- plan-reviewer/s);
  assert.match(prompt, /Controlled question-loop policy \(requirements pass\):/);
  assert.match(prompt, /single targeted question batch \(max 3 questions\)/);
  assert.match(prompt, /recommended default \+ expected impact/);
  assert.match(prompt, /## Consolidated traceability matrix \(requirements -> tasks -> validations\)/);
  assert.match(prompt, /## Blocker status \(by pass: open\/mitigated\/exceptioned\)/);
});

test("required reviewer prompt artifacts exist", () => {
  assert.equal(existsSync(".opencode/prompts/enkidu-requirements.md"), true);
  assert.equal(existsSync(".opencode/prompts/enkidu-redteam.md"), true);
  assert.equal(existsSync(".opencode/prompts/enkidu-pragmatist.md"), true);
  assert.equal(existsSync(".opencode/prompts/enkidu-plan-reviewer.md"), true);
});
