---
name: motionav-browser-verification
description: Verify Motionav runtime and visual behavior in a browser after relevant changes.
---

# Motionav Browser Verification

Use this skill when a change affects a runnable example, DOM/SVG output, camera behavior, animation, layout, or interaction.

## Procedure

1. Identify the affected example or entry point.
2. Start the local server if needed.
3. Open the affected page in a browser.
4. Check the requested visual states and interactions.
5. For timeline changes, test explicit seek positions.
6. Repeat a requested seek position when determinism is part of the task.
7. Record concrete evidence: state, time, interaction, or visible result.
8. Report failures rather than silently working around them.
