# Hero Portrait — Design

**Date:** 2026-07-01
**Author:** Kim Roland Berame (with Claude)
**Status:** Approved for planning

## Goal

Make Kim visible to visitors immediately by adding a single professional
portrait to the hero, without breaking the site's Swiss typographic specimen
aesthetic (near-black achromatic field, hairline rules over boxes, one red
accent).

## Decisions

| Question | Decision |
| --- | --- |
| How many photos | **One** sharp portrait. |
| Where | Hero right column (`src/sections/Hero.tsx`), stacked **above** the spec `<dl>`. |
| Treatment | **Grayscale by default, warms to full color on hover/focus.** |
| Frame | Reuse project-media idiom: `rounded-sm border border-line bg-inset`. |
| Accent | Red square tick, **Swiss-aligned** to the frame's top-left corner (on the grid, not a floating sticker). |
| Photo source | Kim provides the file. |

## Layout

- Grid stays `lg:grid-cols-[1.5fr_1fr]`, unchanged. Portrait enters the existing
  right column, above the spec list.
- **Desktop:** portrait sits at the top of the right column; the six spec rows
  follow directly below it.
- **Mobile (single column):** the right column already stacks under the
  identity block. Portrait renders between the identity block and the specs, so
  the face still lands early in the scroll.
- Portrait crop: **4:5 portrait** (`aspect-[4/5]`), `object-cover`, full column
  width.

## The frame

- `rounded-sm border border-line bg-inset overflow-hidden` — a single hairline
  on recessed ground. No card, no shadow, no nested frame. Obeys **Rules, Not
  Boxes**.
- On hover the border warms `border-line` → `border-line-2` (matches
  ProjectMedia hover), subtle, optional.

## Red tick (Swiss-aligned)

- A **6px red square** (`bg-red`), positioned flush to the **top-left corner of
  the frame**, aligned to the frame edges — no outward offset, no drop tuck. It
  reads as a structural mark on the grid, the same red-square tick vocabulary
  used in `SheetHeading` (tick sits *on* the rule).
- `aria-hidden="true"`. Pure accent; carries no meaning to assistive tech.
- Sits above the image in stacking order (`relative` frame, `absolute` tick),
  inside the frame's corner so it never floats free.

## Treatment (grayscale → color)

- Default: `grayscale`. Hover/focus: `grayscale-0`.
- `transition-[filter] duration-500 ease-out`.
- **Pointer fallback:** the grayscale default is gated behind
  `@media (hover: hover)`. On coarse/touch pointers (no hover), the portrait
  shows **full color always** — color cannot be "earned" without a hover, so
  touch users get the warm state by default.
- **Reduced motion:** drop the `transition` only; the grayscale↔color effect
  itself stays (it is not motion, it is a state).
- Implementation note: Tailwind's `hover:grayscale-0` covers hover; the
  touch-always-color behavior needs a small CSS rule (e.g. a utility class or an
  `index.css` block keyed on `@media (hover: hover)`) since Tailwind can't
  express "grayscale only when hover is available" inline. Plan will pick the
  cleanest option.

## Load motion

- The portrait is one more `variants={item}` child in the existing hero
  stagger — it fades and lifts into its slot like the other identity rows.
- The spec `<dl>` keeps its existing separate `delay: 0.5` reveal and still
  resolves last.
- Reduced-motion: inherits the hero's existing reduced-motion fallback (no
  stagger), consistent with the rest of the section.

## The photo (export spec for Kim)

- **Aspect:** 4:5 portrait.
- **Size:** min 880×1100px; ship 2× (**1760×2200**) for retina.
- **Format:** `.jpg` (or `.webp`).
- **Framing:** head-and-shoulders, eyes ~top third, breathing room around head.
- **Background:** plain, **dark or mid-tone**, uncluttered. Default state is
  grayscale on a near-black page, so a bright/busy background fights the frame.
- **File:** `src/assets/portrait.jpg`, imported into `Hero.tsx` via the existing
  `import x from '@/assets/...'` pattern.

## Accessibility

- `alt="Kim Roland Berame"`.
- `loading="eager"` (above the fold) + `decoding="async"`.
- Explicit `width`/`height` (or the `aspect-[4/5]` box) to prevent layout shift.

## Out of scope (YAGNI)

- No additional photos, no gallery, no lightbox on the portrait.
- No duotone / color-mapping.
- No changes to the spec list content or the identity column copy.

## Files touched

- `src/sections/Hero.tsx` — add portrait markup above the spec `<dl>`.
- `src/assets/portrait.jpg` — new asset (Kim provides).
- `src/index.css` — small `@media (hover: hover)` rule for the grayscale
  default, if that route is chosen over a Tailwind-only approach.
