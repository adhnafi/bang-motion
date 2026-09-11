# Motionav — Plan 03: Minimal Core Prototype

**Status:** IN VERIFICATION  
**Date:** 2026-09-11  
**Scope:** prove the smallest reusable engine kernel against the findings of the deep source audit.

## Task list

- [x] **Task 03.1 — Core module boundaries**
- [x] **Task 03.2 — Deterministic Scene / Node model**
- [x] **Task 03.3 — Timeline + deterministic seek**
- [x] **Task 03.4 — Camera abstraction**
- [x] **Task 03.5 — Minimal GSAP adapter**
- [x] **Task 03.6 — DOM proof renderer**
- [x] **Task 03.7 — Runtime contract**
- [x] **Task 03.8 — Deterministic proof scene**
- [x] **Task 03.9 — Verification boundary**
- [x] **Task 03.10 — Fix proof scene viewport/rendering**
- [x] **Task 03.11 — Fix duplicate proof nodes**
- [ ] **Task 03.12 — Manual browser re-check**
- [x] **Task 03.13 — Connect runtime playback to render loop**
- [ ] **Task 03.14 — Manual playback re-check**
- [x] **Task 03.15 — Strengthen playback proof and diagnostics**
- [ ] **Task 03.16 — Final manual playback re-check**

## Task 03.10 — What changed

The first manual screenshot showed the proof page positioned at the document origin with a large overflowing logical canvas. The root cause was the proof page's viewport fitting: the logical `1920 × 1080` stage was scaled but not centered as a fixed viewport.

The proof page now locks the document to the browser viewport, hides page scrollbars, centers the logical stage with `position: fixed`, and applies `translate(-50%,-50%)` before scale.

## Task 03.11 — What changed

The first proof implementation contained three placeholder DOM nodes while `DOMRenderer.mount()` created three renderer-owned nodes. This produced duplicate nodes and meant the placeholder nodes could remain at the document origin.

The proof now starts with an empty stage and the renderer owns the mounted nodes.

## Task 03.13 — What changed

The first playback implementation exposed a real runtime gap: `TimelineClock.play()` changed a boolean but did not advance time or render subsequent frames.

The runtime now owns a minimal `requestAnimationFrame` loop. Each frame advances the clock from elapsed real time, evaluates the scene at the new time, and renders it. `pause()` cancels the loop.

## Task 03.15 — What changed

The user still observed no movement after the first playback fix. A second review hardened the frame scheduler so it cannot accidentally schedule duplicate or missing frames. The runtime now explicitly clears its pending RAF handle before processing a frame, then schedules exactly one next frame while playing.

The proof scene was also made deliberately more visually obvious: node travel distances and vertical motion were increased. A small diagnostic HUD displays the live timeline time and frame count. This does not drive animation; it only exposes whether the Core playback loop is advancing.

## Manual verification protocol

For the user, this task is intentionally reduced to one visual check:

1. Run `git pull` in the local clone.
2. Refresh the existing proof URL.
3. Confirm that the page fills the browser viewport without horizontal/vertical page scrolling.
4. Confirm that three nodes are visible inside one light stage.
5. Confirm that the HUD changes from `STARTING` to `PLAYING` and its time/frame values increase.
6. Confirm that the three nodes visibly move over time.

No DevTools or console work is required unless the visual check fails.

## Verification boundary

Code completion is not the same as browser verification. Plan 03 remains **IN VERIFICATION** until Task 03.16 passes.

## What was intentionally not included

No Quranav identity, channel assets, character library, visual-metaphor database, AI compiler, Three.js abstraction, audio FFT engine, or full responsive system.

## Architecture

```text
Scene
  ├── Node / Transform
  ├── Camera
  └── Timeline
        ↓
     Runtime
        ↓
    Renderer
```

The renderer is replaceable. The proof renderer uses DOM/CSS so the Core is not accidentally defined by Three.js.

## Determinism contract

For a fixed scene and time:

```text
state = evaluate(scene, t)
frame = render(state)
```

Repeated `seek(t)` calls must produce the same state. Randomness is not used in the proof.

## Proof criteria

1. One continuous world.
2. Three semantic nodes.
3. Camera abstraction exists and can be evaluated.
4. Nodes are evaluated from timeline time.
5. `seek(t)` is explicit.
6. Playback advances time and renders frames.
7. Repeated seek at the same time produces the same serialized state.
8. Runtime is generic and does not know Quranav or Bang Motion styling.

## New repository surface

```text
core/
  composition/viewport.js
  scene/node.js
  scene/scene.js
  timeline/clock.js
  camera/camera.js
  animation/gsap-adapter.js
  renderer/dom-renderer.js
  runtime/runtime.js
examples/
  plan03-core-proof/
    index.html
```

## Change log for this plan

**Task 03.10 added and completed:** Fix proof scene viewport/rendering.  
**Task 03.11 added and completed:** Fix duplicate proof nodes.  
**Task 03.12 remains open:** Manual browser re-check.  
**Task 03.13 added and completed:** Connect runtime playback to render loop.  
**Task 03.14 added:** Manual playback re-check.  
**Task 03.15 added and completed:** Strengthen playback proof and diagnostics.  
**Task 03.16 added:** Final manual playback re-check.  
Reason: the user still observed a static proof after the first playback implementation, so the scheduler was hardened and the proof was instrumented with visible diagnostics before another manual check.