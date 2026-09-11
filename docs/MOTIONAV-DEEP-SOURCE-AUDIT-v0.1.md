# Motionav — Deep Source Audit of Bang Motion

**Date:** 2026-09-11  
**Repository:** `adhnafi/bang-motion`  
**Purpose:** validate Plan 02 against the actual implementation before Plan 03.

## Executive conclusion

Bang Motion already contains a useful **deterministic browser-motion prototype**, but its architecture is still encoded primarily inside large single-file starters.

The strongest reusable ideas are implemented: fixed logical stage, world/camera transform, GSAP timeline as temporal authority, deterministic seeking, time-derived rendering, reusable camera/motion recipes, explicit runtime contract for verification/export, and frame-by-frame export.

The main architectural problem is that **infrastructure, visual surface, demo content, and authoring policy are mixed together**. Therefore Plan 03 should extract the smallest proven kernel rather than rewrite Bang Motion wholesale.

## 1. Starter architecture findings

### Logical stage

The starter uses a fixed `1920 × 1080` stage and scales it to the viewport. This is a sound authoring model because composition coordinates remain stable.

**Promote to Core:** yes, as an explicit viewport/composition abstraction.

### World/camera rig

The opener wraps content in `#world` and performs camera-like movement through the wrapper transform. This avoids moving every DOM object individually.

**Promote to Core:** yes.

### Render state

The opener uses a state object containing camera, bloom, hero, grid, dust, and other values. GSAP tweens that state while `render(t)` consumes it.

This establishes the useful pattern:

```text
Timeline → State → Renderer
```

**Promote concept:** yes. Do not preserve the exact `S` object as the public API.

### Determinism

Rendering is driven from `tl.time()`. Continuous effects use time functions such as sine rather than frame-count accumulation.

This validates the Plan 02 deterministic timeline rule.

### Determinism issue

Particle positions are initially generated with `Math.random()`. Animation afterward is time-derived, but separate page loads can start from different particle configurations.

**Plan 03:** replace uncontrolled initialization randomness with seedable generation or serialized deterministic data.

## 2. Camera findings

The opener has a `camThrough()` recipe that pushes into a cut point and pulls out from a new state. The explainer has explicit camera state and helpers such as `look()`, `home()`, `into()`, and `settle()`.

There are therefore already **two concrete camera implementations** proving the need for one conceptual Camera API.

Boundary:

- camera transform mechanics → Core;
- push-through, whip, and choreography → Motion System.

## 3. Typography findings

The starter implements `splitChars()`, directional blur, per-character entrances/exits, highlight variants, punctuation pops, and other recipes.

These are valuable, but they are **Typography/Motion System**, not Core.

The exact visual policies—fonts, highlight shapes, one-word emphasis, etc.—must remain above Core.

## 4. Renderer and visual-surface coupling

The same opener file contains renderer creation, postprocessing, particle shaders, grid shaders, stars, hero geometry, lighting, exact colors, and exact visual tokens.

This is the clearest architecture smell:

```text
renderer infrastructure
+
visual effects
+
Demo artwork
+
style policy
```

Future separation:

```text
Core        → renderer lifecycle/state evaluation
Visual      → materials/effects/style
Channel     → artwork/assets/composition
```

## 5. Explainer findings

`starter-explainer.html` provides stronger evidence for generic engine primitives.

### Velocity profile → distance

It defines a velocity profile and precomputes a distance function `D(t)`. Objects are positioned from `D(t)` rather than frame-by-frame velocity accumulation.

**Promote:** deterministic temporal-function principle.

**Do not promote:** vehicle/distance demo itself.

### Parallax world

Reusable strips use depth/parallax factors. This supports a future World/Depth abstraction.

### World-object lifecycle

`wobj()` demonstrates an entity with activation interval, world position, depth factor, and render node.

**Promote concept:** entity lifecycle/activation.

### Map camera

The map marker and camera are both functions of timeline time. This is another independent example of:

```text
time → state → render
```

### Collage camera

The collage implementation has explicit camera state and camera choreography. This further validates extracting Camera before adding higher-level features.

## 6. Runtime contract

Both starters expose `window.OPENER` with readiness, duration/dimensions, and seek behavior. `snap.mjs` and `export-frames.mjs` depend on this pattern.

**Keep:** stable page/runtime contract.

**Rebuild:** rename to a generic `MOTIONAV` contract and formalize its shape.

## 7. Verification/export findings

`snap.mjs` uses selected keyframe seeks for visual verification instead of rendering the whole video. This is excellent separation of concerns.

`export-frames.mjs` sets timeline time explicitly for each frame, waits for rendering, and captures the frame. This is the correct deterministic export pattern.

Keep the principles; move the generic runtime contract into Motionav tooling.

## 8. Tooling findings

`serve.py` is useful developer infrastructure but should remain tiny and outside Core.

`vo-pauses.html` is a useful audio-analysis prototype. Its concept should evolve into structured timing data, but audio analysis should not become renderer logic.

## 9. Hidden couplings to remove

### A. DOM IDs as engine API

IDs such as `#world`, `#gl`, `#stage`, `#side`, `#map`, and `#collage` are implementation details, not reusable API.

### B. CSS as animation state database

Animation correctness depends on CSS initial states such as `opacity: 0` and `visibility: hidden`. This becomes fragile as the system grows.

**Action:** explicit state in runtime; renderer applies it.

### C. Raw GSAP mutation as public architecture

GSAP currently mutates arbitrary state and DOM nodes directly. Future Core should wrap the animation dependency behind a small interface.

### D. Style/mechanics coupling

Exact fonts, colors, star geometry, glow, vignette, and other visual decisions live next to camera/timeline mechanics.

### E. Demo/channel assumptions

Terms and objects such as `hero`, `JARAK`, vehicle, star, and opener are demo assumptions. Core must use generic IDs and capabilities.

## 10. Important anti-overengineering finding

The source does **not** provide evidence for a full Entity Component System. A minimal Core can begin with:

```text
Scene
Node
Transform
Timeline
Camera
Renderer
Asset
```

Likewise, there is not yet enough evidence to build a large scene compiler, AI compiler, visual-metaphor database, or complete 3D abstraction.

## 11. Plan 03 extraction

Extract only:

```text
Motionav Core
├── composition
│   └── fixed logical viewport
├── scene
│   ├── Node
│   └── Scene
├── timeline
│   ├── clock
│   └── deterministic seek
├── camera
│   └── transform abstraction
├── animation
│   └── minimal GSAP adapter
├── renderer
│   └── DOM/SVG proof renderer
├── runtime
│   └── play / pause / seek / render
└── verification
    └── deterministic frame probe
```

Not yet:

```text
character library
asset marketplace
visual metaphor database
AI scene compiler
Three.js abstraction
full FFT engine
full responsive layout engine
channel registry
```

## 12. Proof scene for Plan 03

The first Core proof should be deliberately simple:

```text
one world
   ↓
three nodes
   ↓
camera push
   ↓
node motion
   ↓
timeline seek
   ↓
same seek = same frame
```

No Quranav assets. No Bang Motion visual skin. No elaborate effects.

## 13. Final verdict

### Strong and reusable

- deterministic timeline;
- fixed logical composition;
- camera/world rig;
- time-derived rendering;
- seekable state;
- frame export;
- visual verification;
- camera choreography patterns.

### Reusable after refactor

- GSAP;
- Three.js;
- parallax world;
- audio timing;
- DOM/SVG rendering;
- starter utilities.

### Must stay outside Core

- typography taste;
- highlight shapes;
- colors;
- fonts;
- demo artwork;
- Quranav;
- Animal;
- explainer genre;
- channel identity.

### Must not be built yet

- giant framework;
- ECS;
- AI compiler;
- universal asset database;
- universal visual-metaphor database;
- full 3D engine.

## Gate

**PLAN 03 IS APPROVED TO PROCEED.**

The deep audit confirms that Plan 02 matches the real implementation and identifies the smallest proven kernel to extract next.
