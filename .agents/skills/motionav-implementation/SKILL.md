---
name: motionav-implementation
description: Implement focused Motionav repository changes while preserving existing architecture and verification contracts.
---

# Motionav Implementation

Use this skill when a task asks you to modify Motionav code.

## Procedure

1. Inspect the repository and the task-relevant files before editing.
2. Identify the smallest change that satisfies the acceptance criteria.
3. Preserve existing Core, adapter, scene, timeline, renderer, and runtime boundaries.
4. Do not refactor unrelated code.
5. Implement the change.
6. Run relevant checks.
7. If runtime or visuals changed, perform browser verification.
8. Inspect the final diff.
9. Report changed files, checks, evidence, and remaining risks.

## Completion rule

Do not claim completion from file edits alone. Evidence must match the task's acceptance criteria.
