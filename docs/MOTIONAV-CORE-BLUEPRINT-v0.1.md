# Motionav — Core Blueprint v0.1

**Plan:** 02 — Motionav Core Blueprint  
**Status:** COMPLETE — blueprint, not implementation  
**Date:** 2026-09-11

> Architecture contract for the future independent Motionav engine. `adhnafi/bang-motion` remains the laboratory.

## Mission

Motionav is a **deterministic visual composition and motion engine for AI-assisted video creation**. Its job is to provide reliable primitives for turning structured story/composition into rendered animation—not to decide a channel's visual identity.

```text
Story / Content → Visual Composition → Scene Graph → Timeline State → Renderer → Frame / Video
```

AI acts as director/compositor above the engine, not as the engine itself.

## Non-goals

Core must NOT own Quranav/Animal identity, specific characters such as Nafi, fixed colors/fonts/illustration styles/transitions, Islamic or channel-specific assets, channel storytelling rules, or one rendering library as architectural identity.

If a capability only makes sense for one channel, it does not belong in Core.

## Layer architecture

```text
CONTENT
topic · research · script · language · VO
                ↓
STORY / COMPOSITION
beats · visual metaphors · scene intent
                ↓
CHANNEL / VISUAL SYSTEM
character · environment · props · style
                ↓
MOTION SYSTEM
camera · transitions · object motion · FX
                ↓
CORE ENGINE
 timeline · scene graph · renderer · audio
 determinism · adapters · runtime
```

Quality/verification crosses all layers.

## Core Engine boundary

Core owns mechanics: timeline clock, deterministic state evaluation, scene graph lifecycle, transforms, camera abstraction, animation scheduling, renderer interface, asset loading contract, audio timing contract, aspect-ratio adaptation primitives, serialization, debug/scrub, render/export, and validation hooks.

Core does not own visual taste or semantic meaning.

## Scene model

A scene is a **semantic composition**, not an HTML `<section>`.

```js
Scene {
  id,
  duration,
  world,
  entities,
  camera,
  audio,
  transitions,
  constraints,
  metadata
}
```

Scene boundaries are story/timeline boundaries, not mandatory visibility toggles. Persistent entities may continue across scenes.

## Scene graph

```text
Composition
└── World
    ├── Background
    ├── Environment
    ├── Characters
    │   └── Character Parts
    ├── Props
    ├── Text
    ├── FX
    └── Camera
```

Minimum node concepts: `id`, `parent`, `transform`, `visibility`, `opacity`, `z/depth`, `capabilities`.

Implementation may use DOM, SVG, Canvas, WebGL, or another renderer.

## Timeline contract

The timeline is the single temporal authority:

```text
T = timeline time
State = evaluate(SceneGraph, T)
Frame = render(State)
```

Requirements:

1. Any frame is directly addressable.
2. Scrubbing never depends on previous frames.
3. Same inputs + same time = same visual state.
4. Audio synchronization uses explicit timing data.
5. Random-looking motion is seedable/deterministic.

Avoid system-clock visual state, uncontrolled per-frame randomness, and frame-accumulated state unless it is explicitly derived from timeline time.

## Camera contract

Camera is first-class composition infrastructure.

```js
Camera {
  position,
  rotation,
  scale / zoom,
  target,
  projection,
  depth,
  constraints
}
```

Required capabilities: push-in, pull-out, pan, orbit/3D movement when supported, follow target, depth-aware transition, camera drift, aspect-ratio-aware framing.

Camera mechanics belong in Core; choreography belongs in Motion System.

## Asset system

Assets are registered resources:

```text
Asset
├── id
├── type
├── source
├── bounds
├── anchor
├── variants
├── capabilities
└── metadata
```

Types may include character, character-part, prop, environment, texture, illustration, image, icon, audio, font, and 3D model.

Core knows how to load/place/render. Upper layers determine meaning.

## Character system

Characters are composite assets with reusable animation capability.

```text
Character Definition
├── identity
├── visual parts
├── rig
├── anchors
├── poses
├── expressions
├── actions
└── variants
```

The engine should support pose selection, interpolation where appropriate, micro-motion, action clips, facing direction, attachments, and expression state.

```text
Core Character Engine
        ↓
Quranav Character: Nafi
```

Core must never import Nafi directly.

## Environment system

```text
Environment
├── layers
├── depth bands
├── anchors
├── interactive regions
├── lighting / atmosphere
└── variants
```

Environments can persist while the camera moves. This is a preferred mechanism for avoiding slide-like scene changes.

## Visual system

```text
VisualSystem
├── palette
├── typography
├── shape language
├── texture
├── illustration language
├── composition rules
├── emphasis rules
└── motion signature
```

Core receives resolved visual properties; it does not choose them.

## Motion system

```text
Motion
├── object motion
├── character motion
├── camera motion
├── text motion
├── transition
├── secondary motion
└── effects
```

Motion should answer at least one meaningful question: what is revealed, emphasized, changed, connected, physically motivated, or emotionally established. Decorative effects without purpose are candidates for removal.

## Story Grammar

```js
Beat {
  id,
  statement,
  intent,
  entities,
  visualMetaphor,
  emphasis,
  duration,
  transitionIntent
}
```

Story Grammar answers **what should be shown**, not exactly how pixels should be animated.

## Visual Metaphor

Semantic mapping:

```text
Concept → Meaning → Metaphor → Visual object/action → Scene composition
```

Examples such as burden→weight, confusion→branching paths, memory→archive, and growth→expansion are vocabulary candidates, not Core mandates.

## Text system

```text
Text
├── content
├── language
├── typography
├── layout
├── emphasis
├── directionality
└── motion
```

Language remains outside visual-engine logic.

## Multilingual contract

```text
content/
├── id/
├── en/
└── ar/
```

Visual package:

```text
visual/
├── scenes
├── assets
└── style
```

Language may change text, voice, timing where needed, layout constraints, and directionality without rewriting the scene engine. RTL is an architecture concern from the beginning.

## Audio contract

```text
Audio Source → Analysis → Timing Data → Timeline → Render
```

Possible data: duration, segment boundaries, pauses, beats, energy, optional FFT summaries. Deterministic export consumes precomputed timing/analysis data.

## Aspect-ratio contract

Initial targets: `16:9`, `9:16`, `1:1`, `4:5`.

Adaptation may change camera framing, safe areas, text wrapping, object positions, crop strategy, and composition constraints. Do not merely scale the entire frame.

## Renderer abstraction

```text
Renderer
├── mount(scene)
├── evaluate(state)
├── render(time)
├── capture(frame)
└── dispose()
```

Potential implementations: DOM/SVG, Canvas, WebGL/Three.js, and future renderers. GSAP may be an implementation dependency, not an architectural identity.

## Channel adapter

```text
Channel
├── manifest
├── visual system
├── asset registry
├── character registry
├── environment registry
├── story recipes
└── content defaults
          ↓
       Adapter
          ↓
    Motionav Core
```

Core resolves registered IDs/capabilities. It never branches on channel name.

## AI composition contract

Preferred pipeline:

```text
Prompt → Research → Script → Story beats → Visual metaphor plan → Scene composition → Asset resolution → Motion plan → Timeline → Render
```

Avoid `Prompt → giant HTML file` because it undermines consistency, debugging, multilingual adaptation, and reuse.

## Quality system

Quality is cross-layer.

**Structural:** no accidental slide architecture, continuity, intended persistence, timeline integrity.

**Visual:** contrast, safe areas, clipping, accidental gaps, hierarchy, density, target aspect ratio.

**Motion:** deterministic seek, no frame accumulation, transition integrity, camera continuity, motion meaning.

**Render:** frame reproducibility, missing assets, audio/video duration consistency.

## Debug / authoring mode

Production stays clean. Authoring mode may expose timeline scrubber, scene/beat IDs, bounds, anchors, camera path, asset IDs, safe areas, and debug overlays. Debug UI must be removable/disabled in production render.

## Proposed repository shape

```text
motionav/
├── README.md
├── LICENSE
├── package.json
├── core/
│   ├── timeline/
│   ├── scene/
│   ├── camera/
│   ├── animation/
│   ├── renderer/
│   ├── audio/
│   └── runtime/
├── systems/
│   ├── assets/
│   ├── characters/
│   ├── environments/
│   ├── motion/
│   ├── composition/
│   ├── story/
│   └── typography/
├── adapters/
│   ├── aspect-ratio/
│   ├── renderer/
│   └── channels/
├── tools/
│   ├── verify/
│   ├── export/
│   └── audio/
├── docs/
└── examples/
```

This is a target shape, not a command to create everything immediately.

## Evidence-first abstraction rule

Promote a capability into Core when at least one is true:

1. required by two independent channel systems;
2. required for deterministic rendering;
3. required by renderer contract;
4. solves a repeated production failure;
5. prevents infrastructure duplication.

Otherwise keep it local until evidence appears.

## Dependency direction

Allowed:

```text
Content → Story → Channel Adapter → Motion Systems → Core → Renderer
```

Forbidden:

```text
Core → Quranav
Core → Animal
Core → channel assets
Core → channel typography
Renderer → story semantics
```

Lower layers must not depend on upper-layer meaning.

## Migration strategy

Do not rewrite Bang Motion wholesale.

```text
Plan 01  Provenance / migration audit       ✓
Plan 02  Core blueprint                     ✓
Plan 03  Minimal Core skeleton
Plan 04  Character + Asset proof
Plan 05  Quranav prototype
```

Each phase must produce something inspectable.

## Acceptance criteria

Plan 02 is complete when there are unambiguous answers to: what belongs in Core; what belongs above Core; how a scene exists without being a slide; deterministic time; camera operation; asset registration; character/engine separation; channel integration; multilingual scenes; aspect-ratio adaptation; structured AI composition; and pre-export quality checks.

All are answered by this blueprint.

## Final principle

> **Motionav is not a collection of animation effects. It is a deterministic system for turning meaning into visual composition and motion.**

The engine should make good structure easy, bad structure difficult, and channel originality possible without modifying the engine.

---

**PLAN 02 — BLUEPRINT COMPLETE.**

No implementation code is introduced in this plan. The next plan creates only the minimum Core skeleton needed to test these boundaries.
