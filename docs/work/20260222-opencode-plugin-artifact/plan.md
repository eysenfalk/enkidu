# Execution plan: Enkidu as installable OpenCode plugin artifact

**Owner:** aemon  
**Created:** 2026-02-22  
**Status:** active  
**Gate set:** release  
**Risk class:** A

## Objective and scope

- Goal: make Enkidu deployable as a runnable OpenCode plugin artifact that can be built and released using npm or bun.
- Non-goals:
  - shipping every optional Enkidu module in this packet,
  - full autonomous release train automation,
  - app feature expansion unrelated to plugin packaging/release.
- Measurable success criteria:
  - clean checkout can build package with both `npm` and `bun`,
  - plugin package is installable from tarball and resolves in OpenCode config,
  - publish dry-runs pass for both `npm publish --dry-run` and `bun publish --dry-run`,
  - release gate set passes with evidence attached in packet artifacts.

## Requirements baseline

### Functional requirements

- FR-01: Define a publishable package boundary for Enkidu plugin runtime.
- FR-02: Provide a stable plugin entrypoint export compatible with OpenCode npm plugin loading.
- FR-03: Ensure build output includes runnable JS artifacts and required metadata files.
- FR-04: Support build/test/gate execution using both npm and bun command paths.
- FR-05: Support release dry-run and publish path for both npm and bun.
- FR-06: Add plugin smoke validation that confirms runtime hook initialization in OpenCode.
- FR-07: Provide migration path from local `.opencode/plugins/*` usage to packaged install.
- FR-08: Document rollback steps for failed release or runtime regression.

### Non-functional requirements (with metrics)

- NFR-01 (reproducibility): from clean checkout, build path succeeds with npm and bun in <= 5 minutes per manager on baseline CI runner.
- NFR-02 (release reliability): full release gate completes in <= 20 minutes.
- NFR-03 (artifact control): packed artifact includes only allowlisted files (`package.json` + build/docs/license essentials) and excludes secrets/local state.
- NFR-04 (compatibility): plugin smoke test passes on Node LTS + Bun stable matrix used by repo.
- NFR-05 (security): no unresolved critical vulnerabilities in release gate dependency/security scans.
- NFR-06 (operability): rollback to last stable package version can be executed in <= 10 minutes.
- NFR-07 (traceability): each FR/NFR maps to at least one slice and one validation artifact.

### Acceptance criteria

- [ ] Given a clean checkout, when `npm ci && npm run build` is executed, then a runnable plugin artifact is produced.
- [ ] Given a clean checkout, when `bun install --frozen-lockfile && bun run build` is executed, then the same plugin artifact contract is satisfied.
- [ ] Given package metadata and publish config, when `npm publish --dry-run` runs, then publish validation passes.
- [ ] Given package metadata and publish config, when `bun publish --dry-run` runs, then publish validation passes.
- [ ] Given a fixture OpenCode config with packaged plugin, when `opencode debug config` is run, then plugin resolution includes the Enkidu package.
- [ ] Given plugin startup smoke scenario, when OpenCode session starts, then at least one Enkidu hook initializes without error.
- [ ] Given migration docs, when a user currently on local plugin files follows steps, then they can switch to packaged install and back.

### Traceability matrix

- FR-01/FR-02 -> Slice 1/2 -> `npm run build`, `bun run build`, plugin resolution smoke.
- FR-03/FR-04 -> Slice 3 -> `npm run gates:quick`, `bun run gates:quick`.
- FR-05 -> Slice 4 -> `npm publish --dry-run`, `bun publish --dry-run`.
- FR-06 -> Slice 5 -> plugin smoke test command + startup log evidence.
- FR-07/FR-08 -> Slice 6 -> migration/rollback docs walkthrough evidence.
- NFR-03/NFR-05 -> Slice 5/7 -> tarball manifest inspection + security/audit outputs.

## Execution plan (DAG + worktree slices)

DAG order:

- S0 -> S1 -> S2 -> {S3, S4} -> S5 -> S6 -> S7
- S3 and S4 run in parallel after S2 is stable.

Worktree strategy:

- Use one dedicated execution worktree per slice under `.ekdu/worktrees/20260222-opencode-plugin-artifact-<slice>`.
- Use packet-scoped branches `ekdu/20260222-opencode-plugin-artifact-<slice>`.
- Keep docs-only planning updates in this packet; hand off app-code slices to orchestrator for implementer/tester execution.

Slice plan:

- Slice 0 (packet/doc baseline - this packet):
  - [x] Create `story.md`, `plan.md`, and ready queue pointer.
  - [ ] Commit checkpoint: `docs(work): add plugin artifact packet`

- Slice 1 (package boundary and contract):
  - [ ] Choose package name/scope and plugin entrypoint contract.
  - [ ] Define included files policy (`files` allowlist and ignore rules).
  - [ ] Record decisions and ADR candidates.
  - [ ] Commit checkpoint: `refactor(plugin): define package boundary`

- Slice 2 (runtime extraction/refactor):
  - [ ] Refactor runtime so plugin entrypoint is package-first, not repo-local only.
  - [ ] Preserve compatibility path for existing local plugin usage.
  - [ ] Commit checkpoint: `refactor(plugin): isolate runtime entrypoint`

- Slice 3 (dual build/gate execution):
  - [ ] Ensure build and gate scripts execute reliably under npm and bun.
  - [ ] Add or fix missing scripts needed by selected release gate set.
  - [ ] Commit checkpoint: `build(plugin): support npm and bun gates`

- Slice 4 (dual publish flow):
  - [ ] Add release scripts/checklist for `npm publish --dry-run` and `bun publish --dry-run`.
  - [ ] Set tag/access/provenance policy and CI-safe auth strategy.
  - [ ] Commit checkpoint: `chore(release): add dual publish flow`

- Slice 5 (validation hardening):
  - [ ] Add plugin smoke test fixture and tarball content verification.
  - [ ] Add/verify security + dependency checks as release blockers.
  - [ ] Commit checkpoint: `test(plugin): add smoke and pack checks`

- Slice 6 (migration and rollback docs):
  - [ ] Document install, upgrade, rollback, and local-plugin fallback.
  - [ ] Update docs to remove ambiguity around npm vs bun release path.
  - [ ] Commit checkpoint: `docs(plugin): add migration rollback guide`

- Slice 7 (release-candidate evidence):
  - [ ] Run full release gate set with npm and bun paths.
  - [ ] Attach evidence pointers (logs, manifests, checksums, smoke output) in packet.
  - [ ] Commit checkpoint: `docs(work): record release gate evidence`

Replanning triggers:

- Entry-point/package-boundary decision unresolved after Slice 1.
- npm and bun publish behavior diverges materially.
- Any critical/high red-team risk fails mitigation validation.
- Release gate runtime exceeds budget or is flaky.

Rollback strategy:

- Keep current local plugin path usable until packaged path is stable.
- Publish first on prerelease tag (`next`) before `latest`.
- If release regression occurs, pin consumers to last known-good version and document rollback in packet progress.

## Red-team risk register and mitigations

Threat surface summary:

- Assets: package tarball contents, publish credentials, plugin runtime hooks, install/update path, release tags.
- Trust boundaries: local repo -> packaged artifact -> npm registry -> consumer OpenCode runtime.
- External dependencies: npm/bun registry clients, package manager lockfiles, OpenCode plugin loader.

Risk scoring formula: `score = (likelihood * impact) + exploitability`.

| ID | Threat | Category | L | I | E | Score | Tier | Mitigations | Validation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R1 | Supply-chain compromise (dependency confusion/typosquat) | Tampering | 4 | 5 | 4 | 24 | Critical | scoped package, dependency pinning policy, audit + provenance | dependency audit/security scan, publish metadata checks |
| R2 | Secret or local-state leakage in tarball | Information disclosure | 3 | 5 | 3 | 18 | High | `files` allowlist, tarball inspection, secret scan | `npm pack --dry-run`, secret scan gate |
| R3 | Unsafe command execution inside plugin hooks | Elevation of privilege | 3 | 5 | 4 | 19 | High | avoid unsanitized shell execution, strict permission model, code review | unit/smoke tests + reviewer checks |
| R4 | npm/bun publish drift creates inconsistent artifacts | Integrity/availability | 4 | 3 | 3 | 15 | High | dual-manager dry-run checks and manifest comparison | dual publish dry-runs + artifact manifest diff |
| R5 | Migration breaks existing local-plugin users | Availability | 3 | 4 | 3 | 15 | High | compatibility fallback and staged rollout docs | migration walkthrough + rollback drill |
| R6 | CI credential misuse during publish | Spoofing | 2 | 5 | 4 | 14 | Medium | trusted publishing/OIDC where possible, short-lived tokens, no token logging | release workflow config review + dry-run evidence |

Release blockers:

- Any unresolved Critical risk blocks release.
- High risks require mitigation evidence or explicit exception with owner and expiry date.

## Gate and validation matrix

- Gate set: `release`
- Validation recipe commands (target state):
  - quick: `npm run gates:quick`, `bun run gates:quick`
  - pr: `npm run gates:pr`, `bun run gates:pr`
  - release: `npm run gates:release`, `bun run gates:release`
  - package: `npm pack --dry-run`, `bun pm pack`
  - publish dry-run: `npm publish --dry-run`, `bun publish --dry-run`
  - runtime smoke: fixture install + `opencode debug config` + startup hook assertion
- Evidence artifacts:
  - gate command outputs (attached in packet progress)
  - tarball manifest and size report
  - plugin smoke logs
  - release dry-run output snapshots

## Assumptions, unknowns, and decision log candidates

Assumptions:

- OpenCode npm plugin loading remains compatible with published package entrypoints.
- Repo can support package refactor without splitting into multi-repo architecture.
- npm and bun are both available in CI for matrix validation.

Unknowns:

- Final package name/scope availability in registry.
- Whether release provenance will be npm-only or both npm/bun in CI.
- Exact backward-compatibility mechanism for local plugin files.

Decision log candidates:

- D1: package naming and scope strategy.
- D2: single package vs workspace split for runtime/docs/tooling assets.
- D3: default publish authority (`npm publish` primary, `bun publish` parity) and release tag strategy.
- D4: deprecation timeline for local `.opencode/plugins/*`-only installation.

## Recommended first action

- Execute Slice 1 as a focused architecture spike and lock package boundary + entrypoint contract before any broad refactor.

## Decision log

- 2026-02-22: selected `release` gate target because the requested outcome is deployable/releasable packaging.
- 2026-02-22: selected risk class `A` due supply-chain, credential, and runtime integrity exposure in release path changes.

## Progress log

- 2026-02-22: planned packet created and queued in `ready`.

## Completion checklist

- [ ] acceptance criteria satisfied
- [ ] chosen gate set is green
- [ ] scorecard recorded (if required)
- [ ] docs/ADRs updated (if reality changed)
- [ ] memory updated (if enabled)
- [ ] release blockers resolved or approved exceptions recorded
