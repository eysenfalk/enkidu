import path from "node:path";
import fs from "node:fs/promises";
import { execa } from "execa";
import type { EnkiduConfig } from "./config.js";

export class WorktreeManager {
  constructor(private cfg: EnkiduConfig) {}

  private slug(branch: string) {
    const prefix = this.cfg.workflow.branch_prefix ?? "ekdu/";
    return branch.startsWith(prefix) ? branch.slice(prefix.length) : branch.replaceAll("/", "-");
  }

  async create(branch: string): Promise<string> {
    const dir = path.resolve(this.cfg.workflow.worktrees_dir, this.slug(branch));
    await fs.mkdir(path.dirname(dir), { recursive: true });

    // git worktree add -b <branch> <dir>
    await execa("git", ["worktree", "add", "-b", branch, dir], { stdio: "inherit" });
    return dir;
  }

  async remove(branch: string): Promise<void> {
    const dir = path.resolve(this.cfg.workflow.worktrees_dir, this.slug(branch));
    await execa("git", ["worktree", "remove", dir], { stdio: "inherit" });
    await execa("git", ["branch", "-D", branch], { stdio: "inherit" }).catch(() => {});
  }
}
