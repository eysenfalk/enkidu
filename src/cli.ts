#!/usr/bin/env node
import { Command } from "commander";
import { loadConfig } from "./config.js";
import { WorktreeManager } from "./worktrees.js";

const program = new Command();

program
  .name("enkidu")
  .description("Enkidu: agentic software engineering harness (worktrees + gates + context + governance)")
  .version("0.1.0");

program
  .command("config")
  .description("Print resolved Enkidu config")
  .action(async () => {
    const cfg = await loadConfig();
    console.log(JSON.stringify(cfg, null, 2));
  });

program
  .command("worktree:create")
  .description("Create a worktree for a branch")
  .argument("<branch>", "branch name, e.g. ekdu/my-feature")
  .action(async (branch) => {
    const cfg = await loadConfig();
    const wt = new WorktreeManager(cfg);
    const dir = await wt.create(branch);
    console.log(dir);
  });

program
  .command("worktree:remove")
  .description("Remove a worktree and delete its branch")
  .argument("<branch>", "branch name")
  .action(async (branch) => {
    const cfg = await loadConfig();
    const wt = new WorktreeManager(cfg);
    await wt.remove(branch);
  });

program.parseAsync(process.argv).catch((err) => {
  console.error(err);
  process.exit(1);
});
