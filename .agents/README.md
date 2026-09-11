# Motionav Antigravity Workspace Configuration

This directory defines the workspace-level operating system for Antigravity agents working on Motionav.

## Structure

```text
.agents/
├── README.md
├── rules/
│   ├── motionav-core.md
│   ├── determinism.md
│   └── verification.md
├── skills/
│   ├── motionav-architecture/SKILL.md
│   ├── motionav-implementation/SKILL.md
│   ├── motionav-browser-verification/SKILL.md
│   └── motionav-visual-qa/SKILL.md
└── agents/
    ├── motionav-architect.md
    ├── motionav-implementer.md
    └── motionav-reviewer.md
```

## Operating model

```text
Project Rules
      ↓
Relevant Skill
      ↓
Specialized Agent
      ↓
Task Prompt
      ↓
Implementation / Analysis
      ↓
Verification
      ↓
Human Review
```

## Model routing

- Flash tier: routine implementation, exploration, tests, browser checks.
- Pro tier: architecture, difficult reasoning, high-risk review.
- Exact vendor/model selection remains a session-level decision in Antigravity when available; custom agent definitions use Antigravity's model tiers rather than hard-coding a vendor model.

## Important boundary

Motionav Core must remain channel-independent. Quranav is an adapter/system and must not leak into Core.

## Verification rule

An agent must not report a visual/runtime task complete based only on successful file edits or build output. Browser verification is required when the change affects visual or interactive behavior.
