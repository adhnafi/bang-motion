# Motionav — Antigravity Setup
## v0.1

Status: CONFIGURED

## Purpose

This document records the workspace-level Antigravity configuration added before continuing Plan 04.

## Installed workspace configuration

```text
.agents/
├── README.md
├── agents/
│   ├── motionav-architect.md
│   ├── motionav-implementer.md
│   └── motionav-reviewer.md
├── rules/
│   ├── determinism.md
│   └── verification.md
└── skills/
    ├── motionav-architecture/SKILL.md
    ├── motionav-browser-verification/SKILL.md
    ├── motionav-implementation/SKILL.md
    └── motionav-visual-qa/SKILL.md
```

## Roles

- `motionav-architect`: architecture and boundary decisions; pro tier.
- `motionav-implementer`: focused implementation and debugging; flash tier.
- `motionav-reviewer`: correctness, determinism, visual/runtime review; pro tier.

## Skill roles

- architecture: evidence-backed design and boundary review.
- implementation: smallest safe repository change plus checks.
- browser verification: runtime and visual verification.
- visual QA: layout, framing, motion, duplication, clipping, and deterministic seek checks.

## Operating loop

```text
Task
 ↓
Classify
 ↓
Choose agent/model
 ↓
Inspect
 ↓
Plan
 ↓
Implement
 ↓
Verify
 ↓
Review diff
 ↓
Human approval
```

## First local verification

After pulling the latest repository in Antigravity:

1. Open the repository root as the workspace.
2. Open the Agent Manager (`/agents`) and confirm the three custom agents are discoverable.
3. Confirm the workspace skills are visible to the agent when a matching task is requested.
4. Run a read-only architecture task with `motionav-architect`.
5. Run a small implementation task with `motionav-implementer` only after reviewing its proposed change.
6. Run browser/visual verification for the affected example.
7. Use `motionav-reviewer` to review the resulting diff and evidence.

## Important note

The model field in custom agents uses Antigravity's documented model tiers (`flash` and `pro`). Exact vendor/model selection remains subject to the current Antigravity model selector and account availability.

## Boundary

This setup is an engineering operating layer. It does not change Motionav Core architecture and does not replace Plan 04 acceptance criteria.

## Next step

After local configuration verification, resume Plan 04 from the current repository state. Do not redesign Plan 04 merely because the Antigravity configuration has been added.
