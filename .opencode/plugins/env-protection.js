// Enkidu: basic .env protection plugin for OpenCode
// Blocks the `read` tool from accessing `.env` files.
//
// Place in: .opencode/plugins/env-protection.js
// Loaded automatically by OpenCode.

export const EnvProtection = async () => {
  return {
    "tool.execute.before": async (input, output) => {
      if (input.tool === "read") {
        const filePath = String(output.args?.filePath ?? "");
        if (filePath.includes(".env")) {
          throw new Error("Enkidu policy: do not read .env files");
        }
      }
    },
  };
};
