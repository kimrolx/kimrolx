# Projects section — soft-settle scroll snapping

**Date:** 2026-07-13
**Status:** Approved, ready for implementation
**Scope:** `src/components/PinnedTrack.tsx` only

## Problem

The desktop projects showcase (`PinnedTrack`) is a scroll-jack: an outer spacer
`count × 100vh` tall pins a sticky child while the panel row translates
horizontally, linearly, with vertical scroll. Scrolling is fully continuous —
the view can rest half-between two projects. The user wants each project to act
as a **detent**: free scrolling, but on settle the view eases to the nearest
project and locks.

## Chosen behavior

- **Feel:** *soft settle*. Horizontal keeps tracking the wheel/finger live;
  when scrolling stops, it eases to the nearest project and locks. A momentum
  flick carries through (can pass several projects) and lands on the nearest.
- **Scope:** desktop scroll-jack only. Mobile (vertical stack) and
  reduced-motion (native CSS snap) are untouched — `PinnedTrack` only mounts on
  desktop + motion, so this is guaranteed by construction, not by extra guards.

## Mechanism

The scroll-jack maps vertical window scroll → horizontal panel translate
linearly. With `offset: ["start start", "end end"]` over a `count × 100vh`
spacer, progress `0→1` spans `(count - 1) × innerHeight` of vertical scroll, so
**each project occupies exactly one viewport-height of vertical scroll**.

Therefore: snap the *vertical* scroll to multiples of `innerHeight`, and the
existing `useTransform` makes the horizontal panel row glide to match. No change
to the transform math or the counter (both already read live scroll progress).

Snap point for project `i`:

```
snapY(i) = spacerRef.current.offsetTop + i * window.innerHeight   // i = 0..count-1
```

## Implementation (Lenis Snap)

`lenis/snap` ships with the installed `lenis@1.3.25` (no new dependency).

Inside `PinnedTrack`:

1. Get the Lenis instance via `useLenis()`.
2. In a `useEffect` (runs when `lenis` and `spacerRef.current` are ready):
   - `const snap = new Snap(lenis, { type: 'proximity', distanceThreshold: '50%', debounce: SETTLE_DEBOUNCE_MS, duration: SNAP_DURATION_S, easing: SNAP_EASING })`
   - A `buildPoints()` helper computes `snapY(i)` for every project and calls
     `snap.add(y)`, collecting the returned remove functions.
   - Build points once; rebuild on `window` `resize` (both `innerHeight` and
     `offsetTop` shift): remove old points, re-add fresh ones.
   - Cleanup: remove points, `snap.destroy()`, remove the resize listener.

### Why `proximity` + `distanceThreshold: '50%'`

- Points sit exactly one viewport apart. `50%` threshold = half the gap, so
  **every position inside the projects band is within threshold** → it always
  eases to the nearest point and locks. This delivers the soft-settle "always
  lock" feel.
- Any position **outside** the band (Hero, Contact, anchor jumps) is more than
  `50%` of a viewport from any registered point → **no snap**. This
  automatically confines snapping to the projects section.
- `mandatory` snaps to the nearest registered point *anywhere on the page*
  regardless of distance — it would yank the user down from unrelated sections.
  Rejected for that reason. `proximity` is both the correct feel and the safe
  choice.

### Tunable constants (top of the effect/module)

- `SETTLE_DEBOUNCE_MS` — delay after scroll stops before snapping. Default
  library value is 500ms (laggy); start at ~200ms.
- `SNAP_DURATION_S` / `SNAP_EASING` — glide animation. Start with a smooth
  ease-in-out around ~0.8s; dial live.

## Edge cases

- **count === 1:** one point at the section top; harmless. Existing transform
  already handles `(count - 1) === 0`.
- **SSR / prerender:** `PinnedTrack` mounts only on the client desktop path; the
  effect and all `window` reads are client-only.
- **offsetTop drift:** content above can reflow; the `resize` rebuild covers the
  common cases. Reassess only if drift is observed in practice.

## Out of scope

Mobile snapping, reduced-motion changes, counter/nav changes, keyboard/dot
navigation. None are required for this behavior.
