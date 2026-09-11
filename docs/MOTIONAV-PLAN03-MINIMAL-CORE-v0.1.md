# Motionav — Plan 03: Minimal Core Prototype

**Status:** COMPLETE  
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
- [x] **Task 03.9 — Verification notes**

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
3. Camera moves through the world.
4. Nodes animate from timeline time.
5. `seek(t)` is explicit.
6. Repeated seek at the same time produces the same serialized state.
7. Runtime is generic and does not know Quranav or Bang Motion styling.

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
    scene.js
```

## Result

Plan 03 establishes a minimal kernel that can become the base for Plan 04 (Quranav System Prototype) without putting Quranav-specific concepts into Core.

### Verification limitation

The files have been committed to the repository. Browser execution still requires opening the example through a local HTTP server because ES modules are used. This task does not claim a successful browser screenshot run from the connector environment.

## Change log for this plan

**Additional task added:** Task 03.9 — Verification notes.  
Reason: distinguish repository-level implementation completion from browser-runtime verification, so future plans do not confuse committed code with visually verified output.
