---
name: requirements-engineering
description: "Transform ambiguous requests into testable, traceable requirements with acceptance criteria, contracts, ADR decisions, and definition-of-done alignment."
allowed-tools: [Read, WebFetch, WebSearch, WebSearch_Cited, Grep, Glob, TodoRead, TodoWrite]
---

# Requirements Engineering Skill

Status: Production-ready
Version: 1.0.0
Last Updated: 2026-02-22
Type: Requirements quality framework

## Purpose

Use this skill to produce requirements that are precise enough for implementation agents, reviewers, and test systems.

The target state is: every major requirement is testable, traceable, and tied to definition-of-done.

## Evidence base (high-signal references)

Best practices are adapted from mature OSS standards and projects:
- OpenAPI Specification (contract-first API requirements)
  - https://github.com/OAI/OpenAPI-Specification
- Cucumber + Gherkin (behavioral acceptance criteria)
  - https://github.com/cucumber/cucumber-js
  - https://github.com/cucumber/cucumber-ruby
  - https://cucumber.io/docs/gherkin/reference
  - https://cucumber.io/docs/terms/user-story/
- MADR (architecture decision records)
  - https://github.com/adr/madr
  - https://adr.github.io/madr/
- Microsoft engineering playbook (definition of done patterns)
  - https://github.com/microsoft/code-with-engineering-playbook
  - https://microsoft.github.io/code-with-engineering-playbook/agile-development/team-agreements/definition-of-done/

## Core method

### 1) Problem and stakeholder framing
- Identify actor(s), objective, and business/operational impact.
- Convert fuzzy requests into outcome statements.

### 2) Requirement specification
- Functional requirements as user-story style statements where useful.
- Non-functional requirements with measurable thresholds (latency, reliability, security, cost).
- Interface/data contracts (OpenAPI/JSON schema/event schema) for integration boundaries.

### 3) Acceptance criteria
- Write Given/When/Then criteria for behavior-driven validation.
- Include happy path, edge cases, and failure handling.
- Ensure each criterion is observable and testable.

### 4) Decision clarity
- Record material design/architecture decisions as ADR candidates.
- Capture tradeoffs, rejected options, and constraints.

### 5) Traceability
- Maintain mapping: requirement -> task slice -> test(s) -> gate(s).
- No requirement without planned verification.

### 6) Definition of done alignment
- Require code quality, test pass, docs updates, and review signoff.
- Ensure release-readiness checks when risk class is high.

## Output contract

Always produce:
1. Scope + user outcomes.
2. Functional requirements.
3. Non-functional requirements with metrics.
4. Acceptance criteria (Given/When/Then where practical).
5. Interface/contract notes.
6. Traceability matrix.
7. Definition-of-done checklist.

## Anti-patterns to avoid

- Feature lists without user outcomes.
- Requirements that cannot be tested.
- Hidden non-functional requirements.
- Missing interface contracts for external integrations.
- No traceability from requirement to test evidence.
