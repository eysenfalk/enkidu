---
name: red-team-planning
description: "Embed adversarial thinking in planning via threat modeling, abuse-case design, risk scoring, and mitigation validation tied to release gates."
allowed-tools: [Read, WebFetch, WebSearch, WebSearch_Cited, Grep, Glob, TodoRead, TodoWrite]
---

# Red Team Planning Skill

Status: Production-ready
Version: 1.0.0
Last Updated: 2026-02-22
Type: Security and adversarial planning framework

## Purpose

Use this skill before implementation to identify exploitable paths, prioritize mitigations, and define security validation that can block risky releases.

## Evidence base (high-signal references)

Workflow is adapted from high-adoption OSS security projects and standards:
- OWASP Threat Dragon (threat modeling workflows)
  - https://github.com/OWASP/threat-dragon
  - https://owasp.org/www-project-threat-dragon/
- OWASP GenAI / LLM Top 10 (LLM-specific risk taxonomy)
  - https://genai.owasp.org/llm-top-10/
- Promptfoo (automated LLM red teaming and plugin-based attacks)
  - https://github.com/promptfoo/promptfoo
  - https://www.promptfoo.dev/docs/red-team/quickstart/
- NVIDIA garak (LLM vulnerability scanning)
  - https://github.com/NVIDIA/garak
- Microsoft PyRIT (structured AI red-team pipelines)
  - https://github.com/Azure/PyRIT
  - https://azure.github.io/PyRIT/
- MITRE ATLAS and MITRE CALDERA (adversary behaviors and emulation)
  - https://github.com/mitre/advmlthreatmatrix
  - https://github.com/mitre/caldera
- OpenSSF Scorecard and secure CI policy checks
  - https://github.com/ossf/scorecard-action

## Core method

### 1) Threat surface decomposition
- Identify assets, trust boundaries, entry points, and privileged actions.
- Identify external dependencies and supply-chain touchpoints.

### 2) Abuse-case generation
- Generate adversarial misuse cases from attacker goals.
- Cover direct abuse, indirect abuse, and chained exploits.
- Map threats with STRIDE and OWASP LLM Top 10 categories as applicable.

### 3) Risk scoring
- Score each threat using likelihood (1-5), impact (1-5), exploitability (1-5).
- Compute priority score: (likelihood * impact) + exploitability.
- Label tiers:
  - Critical: >= 20
  - High: 15-19
  - Medium: 10-14
  - Low: < 10

### 4) Mitigation planning
- Define preventive controls (policy, authz, input/output controls, sandboxing).
- Define detective controls (audit logs, alerts, anomaly checks).
- Define response controls (rollback, kill-switch, containment steps).

### 5) Security validation design
- Define concrete red-team tests for each high/critical threat.
- Bind each test to a gate and pass/fail threshold.
- Include regression tests for previously exploited paths.

### 6) Release policy
- Critical unresolved threats block release.
- High threats require documented mitigation or time-boxed exception.
- Exceptions must include owner, expiry date, and compensating controls.

## Output contract

Always produce:
1. Threat model summary (assets, boundaries, trust assumptions).
2. Risk register (threat, category, score, tier).
3. Mitigation table (prevent/detect/respond).
4. Red-team validation plan with tools and scenarios.
5. Release blockers and exception rules.

## Anti-patterns to avoid

- Security review only after implementation.
- Threat lists with no prioritization.
- Mitigations with no validation tests.
- High-risk exceptions without owner or expiry.
- Treating LLM prompt-injection risk as edge-only.
