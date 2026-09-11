---
name: motionav-visual-qa
description: Review visual output for layout, framing, duplication, clipping, motion, and consistency after Motionav changes.
---

# Motionav Visual QA

Use this skill after implementation when the result is visual or interactive.

## Review checklist

- Composition and viewport are correct.
- No duplicate nodes or unexpected elements appear.
- Camera/framing is correct.
- Motion occurs at the intended times.
- Text and objects remain within intended bounds.
- Opacity, scale, rotation, and transforms behave as expected.
- Browser console/runtime errors are absent for the tested path.
- Repeated seek of the same time produces the same state when required.

## Output

Report pass/fail per relevant check and identify the exact evidence used.
