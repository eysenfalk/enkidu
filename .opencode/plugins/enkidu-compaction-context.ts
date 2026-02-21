// Enkidu: compaction context injection
//
// When OpenCode compacts a long session, inject Enkidu's high-level state so
// the agent doesn't lose critical workflow information.
//
// This uses the documented `experimental.session.compacting` hook.

import type { Plugin } from "@opencode-ai/plugin";

export const EnkiduCompactionContext: Plugin = async ({ $ }) => {
  return {
    "experimental.session.compacting": async (_input, output) => {
      // Try to read a lightweight state file if present.
      // This file should contain: current story, gate set, worktree plan, etc.
      let state = "";
      try {
        state = await $`bash -lc 'test -f .ekdu/enkidu-state.md && cat .ekdu/enkidu-state.md || true'`.text();
      } catch {
        state = "";
      }

      if (state.trim().length > 0) {
        output.context.push(`
## Enkidu state (do not invent)
${state}
`);
      }

      // Always remind compaction to preserve active PR/plan context.
      output.context.push(`
## Enkidu compaction reminder
Preserve:
- current task goal
- acceptance criteria
- chosen gate set
- active worktrees/branches
- pending reviews and next steps
`);
    },
  };
};
