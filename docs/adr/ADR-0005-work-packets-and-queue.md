# ADR-0005: Work Packets and Queue Pointers

**Status:** proposed  
**Date:** 2026-02-22

## Context

Enkidu needs an end-to-end workflow where planning, progress, evidence, and decisions are durable artifacts.

Previous approaches (single board file like `docs/WORK_ITEMS.md`) risk:
- merge conflicts under parallel work
- unbounded growth/bloat
- unclear ownership boundaries

## Decision

Adopt a filesystem-based workflow-of-record using:

1) **Work packets** as canonical per-item directories:
- `docs/work/<id>-<slug>/story.md`
- `docs/work/<id>-<slug>/plan.md`
- optional supporting files (`pr.md`, `links.md`, `notes.md`)

2) **Queue pointers** (maildir-style) to represent status without a central board:
- `docs/work/_queue/backlog/`
- `docs/work/_queue/ready/`
- `docs/work/_queue/in-progress/`
- `docs/work/_queue/blocked/`
- `docs/work/_queue/done/`

A work item is "planned" only when `story.md` and `plan.md` are committed and a pointer exists in `ready/` or `in-progress/`.

## Consequences

Positive:
- parallel-safe updates (different packets rarely touch the same files)
- scalable tracking via directory listing
- explicit artifact chain suitable for gates + scorecards

Negative:
- introduces more files/directories
- requires discipline and templating

## Follow-ups

- Update `docs/WORKFLOW.md` to make this the workflow-of-record.
- Update agent prompts to only operate on planned work packets.
