import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const opencode = JSON.parse(readFileSync("opencode.json", "utf8"));
const agents = opencode.agent;

const critiqueAgents = [
  "enkidu-requirements",
  "enkidu-redteam",
  "enkidu-pragmatist",
  "enkidu-plan-reviewer"
];

test("planner-pro allowlist includes required reviewer passes and architect", () => {
  const plannerTaskPermission = agents["enkidu-planner-pro"].permission.task;

  assert.equal(plannerTaskPermission["enkidu-requirements"], "allow");
  assert.equal(plannerTaskPermission["enkidu-redteam"], "allow");
  assert.equal(plannerTaskPermission["enkidu-pragmatist"], "allow");
  assert.equal(plannerTaskPermission["enkidu-plan-reviewer"], "allow");
  assert.equal(plannerTaskPermission["enkidu-architect"], "allow");
});

test("critique agents are non-mutating and non-escalating", () => {
  for (const id of critiqueAgents) {
    const agent = agents[id];
    assert.ok(agent, `missing agent ${id}`);

    assert.equal(agent.tools.edit, false, `${id} edit must be disabled`);
    assert.equal(agent.tools.write, false, `${id} write must be disabled`);
    assert.equal(agent.tools.patch, false, `${id} patch must be disabled`);
    assert.equal(agent.tools.bash, false, `${id} bash must be disabled`);
    assert.equal(agent.tools.task, false, `${id} task must be disabled`);
    assert.equal(agent.permission.task["*"], "deny", `${id} task escalation must be denied`);
  }
});

test("only requirements critique agent can ask user questions", () => {
  assert.equal(agents["enkidu-requirements"].tools.question, true);
  assert.equal(agents["enkidu-redteam"].tools.question, false);
  assert.equal(agents["enkidu-pragmatist"].tools.question, false);
  assert.equal(agents["enkidu-plan-reviewer"].tools.question, false);
});

test("critique agents are wired to dedicated prompts", () => {
  assert.equal(agents["enkidu-requirements"].prompt, "{file:./.opencode/prompts/enkidu-requirements.md}");
  assert.equal(agents["enkidu-redteam"].prompt, "{file:./.opencode/prompts/enkidu-redteam.md}");
  assert.equal(agents["enkidu-pragmatist"].prompt, "{file:./.opencode/prompts/enkidu-pragmatist.md}");
  assert.equal(agents["enkidu-plan-reviewer"].prompt, "{file:./.opencode/prompts/enkidu-plan-reviewer.md}");
});

test("opencode debug config is explicitly allowlisted for validation agents", () => {
  assert.equal(opencode.permission.bash["opencode debug config*"], "allow");
  assert.equal(agents["enkidu-orchestrator"].permission.bash["opencode debug config*"], "allow");
  assert.equal(agents["enkidu-implementer"].permission.bash["opencode debug config*"], "allow");
  assert.equal(agents["enkidu-tester"].permission.bash["opencode debug config*"], "allow");
});
