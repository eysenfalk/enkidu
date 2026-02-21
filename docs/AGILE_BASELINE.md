# Agile baseline (for humans and agents)

This is a compact “what normal companies do” reference, so Enkidu can map to it.

## Common methodologies

### Scrum
- timeboxed sprints (often 1–2 weeks)
- ceremonies: planning, daily standup, review, retrospective
- artifacts: backlog, sprint backlog, increment
- roles: product owner, scrum master, dev team

### Kanban
- continuous pull-based flow
- WIP limits (limit how much work is “in progress”)
- focus on cycle time and throughput

### XP (Extreme Programming) practices
- TDD (test-driven development)
- pair programming
- refactoring
- continuous integration
- small releases

### DevOps / Continuous Delivery
- automate build/test/deploy
- infrastructure as code
- feature flags
- monitoring and incident response

## Core engineering standards you should steal

- keep PRs small
- maintain a definition-of-done
- tests are part of the feature
- CI is non-negotiable
- “you build it, you run it” (observability matters)
- measure, then improve (cycle time, defects, reliability)

## Mapping to Enkidu

- backlog refinement → context graph + story spec
- sprint planning → slice selection + gate selection
- implementation → multi-agent worktrees
- code review → agent review + automated gates + (optional) human audit
- retro → quality ratchet + harness improvements
