# Motionav — Plan 04: Quranav System Prototype

**Status:** IN PROGRESS  
**Date:** 2026-09-12  
**Purpose:** prove that a channel-specific visual system can sit above Motionav Core without leaking channel identity into Core.

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

This is a **prototype visual system**, not the final Quranav brand system. The palette, typography, shapes, and motion choices are provisional and exist to test architecture. Final channel identity should be refined separately from Core engineering.

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

The adapter chooses visual presentation and channel semantics. Core provides mechanics only.

## Task 04.1 — Adapter boundary

**PASS — implementation complete.** Created `adapters/quranav/visual-system.js` as the channel-level home for provisional visual tokens and motion recipes.

## Task 04.2 — Generic appearance hook

**PASS — implementation complete.** Core `Node` now accepts a generic `appearance` object, and the DOM renderer consumes generic presentation fields such as width, height, radius, background, border, shadow, and text color. The Core API does not name the channel.

## Task 04.3 — Visual tokens

**PASS — implementation complete.** Canvas, ink, accent, muted, and surface tokens live under the channel adapter rather than Core.

## Task 04.4 — Motion signature

**PASS — implementation complete.** The prototype defines restrained entrance, drift, emphasis, and camera choreography at the channel layer. Core continues to execute generic time-based evaluation.

## Task 04.5 — First Quranav system proof scene

**PASS — implementation complete.** Added `examples/plan04-channel-system/index.html`. It composes a channel-branded opener-like scene using Core `Viewport`, `Scene`, `Node`, `Camera`, `TimelineClock`, `DOMRenderer`, and `MotionavRuntime`, while importing visual choices only from the channel adapter. It uses abstract shapes rather than final channel assets.

## Task 04.6 — Manual browser verification

**OPEN.** User-level verification is required. The test should only ask whether the scene renders correctly and visibly moves; no DevTools should be needed unless it fails.

## Task 04.7 — Boundary audit

**OPEN.** Before closing Plan 04, inspect the final Core surface and confirm that channel-specific tokens, assets, and semantic rules remain outside Core.

## Verification

Manual browser verification is required before Plan 04 can close.

## Boundary audit criteria

- No `quranav` import from Core.
- No channel color/font token inside Core.
- No channel-specific asset path inside Core.
- No channel storytelling rule in Runtime, Timeline, Camera, or Renderer.
- The same Core should remain usable by another future channel adapter.
