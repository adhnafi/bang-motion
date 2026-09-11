---
name: motionav-architecture
description: Analyze Motionav architecture and make evidence-backed design recommendations before implementation.
---

# Motionav Architecture

Use this skill for architecture questions, boundary audits, and high-impact design decisions.

## Procedure

1. Read the current repository state and relevant design documents.
2. Define the concrete problem and affected boundary.
3. Identify existing abstractions before proposing new ones.
4. Consider at least one simpler alternative.
5. Prefer evidence-first abstraction over speculative framework design.
6. State trade-offs and risks.
7. Produce an implementation and verification plan.
8. Do not modify files unless the task explicitly requests implementation.

## Decision principle

Promote a capability into shared engine code only when current evidence shows that it is genuinely reusable, required by deterministic rendering, part of a renderer/runtime contract, or removes demonstrated duplication.
