import fs from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
import { z } from "zod";

const ConfigSchema = z.object({
  project: z.object({
    name: z.string().default("Enkidu"),
    repo: z.string().default("."),
  }),
  workflow: z.object({
    default_branch: z.string().default("main"),
    branch_prefix: z.string().default("ekdu/"),
    worktrees_dir: z.string().default(".ekdu/worktrees"),
  }).passthrough(),
  plugins: z.object({
    psychmem: z.object({
      enabled: z.boolean().default(false),
      db_path: z.string().default(".ekdu/psychmem.db"),
      scope: z.string().default("project"),
    }).passthrough(),
    context_graph: z.object({
      enabled: z.boolean().default(true),
      db_path: z.string().default(".ekdu/context-graph.db"),
    }).passthrough(),
    arifos: z.object({
      enabled: z.boolean().default(false),
      mode: z.string().default("rest"),
      endpoint: z.string().default("http://localhost:8000"),
      policy_profile: z.string().default("balanced"),
    }).passthrough(),
    superbmad: z.object({
      enabled: z.boolean().default(false),
      skills_path: z.string().default(".opencode/skills/superbmad"),
    }).passthrough(),
  }).passthrough(),
}).passthrough();

export type EnkiduConfig = z.infer<typeof ConfigSchema>;

export async function loadConfig(configPath = "enkidu.yaml"): Promise<EnkiduConfig> {
  const p = path.resolve(process.cwd(), configPath);
  const raw = await fs.readFile(p, "utf-8");
  const parsed = YAML.parse(raw);
  return ConfigSchema.parse(parsed);
}
