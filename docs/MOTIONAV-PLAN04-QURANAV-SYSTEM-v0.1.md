# Motionav — Plan 04: Quranav System Prototype

**Status:** IN PROGRESS  
**Date:** 2026-09-12  
**Purpose:** prove that a channel-specific visual system can sit above Motionav Core without leaking Quranav identity into Core.

## Task list

- [x] **Task 04.1 — Quranav adapter boundary**
- [x] **Task 04.2 — Generic node appearance hook**
- [x] **Task 04.3 — Quranav visual tokens**
- [x] **Task 04.4 — Quranav motion signature**
- [x] **Task 04.5 — First Quranav system proof scene**
- [ ] **Task 04.6 — Manual browser verification**
- [ ] **Task 04.7 — Boundary audit: no Quranav leakage into Core**

## Definition of success

Plan 04 succeeds if a Quranav-branded proof can be composed using Core primitives plus a channel adapter, while Core remains unaware of Quranav names, assets, colors, typography, or storytelling rules.

## Important scope rule

This is a **prototype visual system**, not the final Quranav brand system. The palette, typography, shapes, and motion choices are provisional and exist to test the architecture. Final channel identity should be refined separately from Core engineering.

## Layer contract

```text
Quranav Content / Story
        ↓
Quranav Adapter + Visual System
        ↓
Motionav Core
        ↓
Renderer
```

The adapter may choose visual presentation and channel semantics. Core only provides mechanics.

## Task 04.1 — Adapter boundary

Created a channel adapter that owns Quranav-specific visual tokens and role mapping. It does not modify Core timeline, camera, or runtime behavior.

## Task 04.2 — Generic appearance hook

Core `Node` now accepts a generic `appearance` object. The DOM renderer reads generic appearance values such as width, height, radius, background, border, and shadow. This is a presentation hook, not a Quranav API.

## Task 04.3 — Visual tokens

The prototype defines provisional tokens for canvas, ink, accent, muted text, and surface treatment. These are isolated under the Quranav system and are not placed in Core.

## Task 04.4 — Motion signature

The prototype uses restrained entrance, vertical drift, scale emphasis, and camera movement. These are channel-level choreography choices; Core only executes time-based state changes.

## Task 04.5 — Proof scene

The proof demonstrates a channel opener-like composition with a Quranav wordmark/title treatment, a central semantic subject, supporting text, and a persistent background field. It intentionally uses abstract shapes instead of final channel assets.

## Verification

Manual browser verification is required before Plan 04 can close. The user should only need to visually inspect the proof scene for correct composition and motion; technical console work is not required unless it fails.

## Boundary audit criteria

- No `quranav` import from Core.
- No Quranav color/font token inside Core.
- No channel-specific asset path inside Core.
- No Quranav storytelling rule in Runtime, Timeline, Camera, or Renderer.
- The same Core should remain usable by another future channel adapter.
