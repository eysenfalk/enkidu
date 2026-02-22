# Story: Enkidu as installable OpenCode plugin artifact

**Owner:** aemon  
**Status:** ready  
**Target gate set:** release  
**Risk class:** A

## Problem

Enkidu currently ships mostly as repository-local docs, prompts, scripts, and local plugin files.
That blocks reliable deployment: teams cannot consistently build and release a runnable OpenCode plugin artifact from package tooling.

We need a packaging and release path that works with npm and bun so users can install a versioned artifact and run it in OpenCode without copying repo internals.

## Acceptance criteria

- [ ] A publishable package exposes a plugin entrypoint that OpenCode can load from `opencode.json` `plugin` array.
- [ ] Build path works from a clean checkout with both npm and bun.
- [ ] Release dry-run succeeds with both `npm publish --dry-run` and `bun publish --dry-run`.
- [ ] Packed artifact contents are allowlisted and exclude secrets, caches, and local worktree state.
- [ ] Plugin smoke test proves at least one Enkidu plugin hook executes after install from packaged artifact.
- [ ] Migration path is documented for existing local `.opencode/plugins/*` usage.
- [ ] Release notes and rollback steps are documented.

## Non-goals

- Shipping every optional Enkidu module in v1.
- Rewriting all docs and all agent prompts in one packet.
- Building full autonomous release orchestration beyond package build and publish.

## Constraints

- Security / privacy constraints:
  - Never read `.env` files in agent sessions.
  - Do not publish credentials, local caches, or personal data in package tarballs.
  - Follow `docs/SECURITY.md` and keep secret/dependency checks in gates.
- Scraping constraints:
  - No new scraping targets or scraping policy changes in this packet.
- Performance budgets:
  - Plugin cold-load smoke check should complete within 5 seconds on the dev baseline machine.
  - Release gate runtime target is <= 20 minutes in CI.
- Compatibility constraints:
  - Artifact must run under both npm-managed and bun-managed installs.

## Context bundle

- Docs:
  - `docs/index.md`
  - `docs/WORKFLOW.md`
  - `docs/GATES.md`
  - `docs/SECURITY.md`
  - `docs/PLUGINS.md`
  - `docs/IMPLEMENTATION_STATUS.md`
  - `docs/COMMITS.md`
- Files:
  - `package.json`
  - `tsconfig.json`
  - `opencode.json`
  - `.opencode/plugins/enkidu-compaction-context.ts`
  - `scripts/run-gates.sh`
  - `src/cli.ts`
  - `src/config.ts`
- Tests:
  - `npm run gates:quick`
  - `npm run gates:pr`
  - `npm run gates:release`
  - `bun run gates:quick`
  - `bun run gates:pr`
  - `bun run gates:release`
- Metrics/log queries:
  - `npm pack --dry-run`
  - `bun pm pack`
  - `opencode debug config`
  - package tarball file list and size report

## Implementation notes

This likely requires a significant refactor, but execute in PR-sized slices:
1) package boundary and runtime entrypoint,
2) build and publish toolchain,
3) smoke tests, docs, and release evidence.

Keep migration compatibility explicit to avoid breaking current local workflows.

## Validation recipe

- Build and gate validation:
  - `npm ci && npm run gates:release`
  - `bun install --frozen-lockfile && bun run gates:release`
- Packaging validation:
  - `npm pack --dry-run`
  - `npm publish --dry-run`
  - `bun publish --dry-run`
- Runtime validation:
  - install packed artifact in a plugin-smoke fixture project and run `opencode debug config`
  - verify plugin initializes and hook output appears in startup/session logs
- Security validation:
  - dependency audit and secret scan gates pass
  - tarball inspection confirms no secret or local-state files are included
