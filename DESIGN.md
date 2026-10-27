---
name: Kim Roland Berame Portfolio
description: An engineer's portfolio as a Swiss typographic specimen on near-black, marked in one Swiss red.
colors:
  bg: "oklch(0.16 0 0)"
  surface: "oklch(0.205 0 0)"
  inset: "oklch(0.135 0 0)"
  line: "oklch(1 0 0 / 0.1)"
  line-2: "oklch(1 0 0 / 0.2)"
  line-3: "oklch(1 0 0 / 0.38)"
  ink: "oklch(0.97 0 0)"
  ink-2: "oklch(0.74 0 0)"
  ink-3: "oklch(0.62 0 0)"
  red: "oklch(0.63 0.23 25)"
  red-ink: "oklch(0.7 0.2 27)"
  on-red: "oklch(0.16 0 0)"
typography:
  display-xl:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 12vw, 5.5rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  display:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 7vw, 4.5rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.04em"
  title-lg:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.8vw, 2.5rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.14em"
    textTransform: "uppercase"
rounded:
  sm: "2px"
  full: "9999px"
spacing:
  space-1: "4px"
  space-2: "8px"
  space-3: "12px"
  space-4: "16px"
  space-5: "20px"
  space-6: "24px"
  space-8: "32px"
  space-10: "40px"
  space-12: "48px"
  space-14: "56px"
  space-16: "64px"
  space-20: "80px"
  space-28: "112px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    border: "1px solid {colors.line-2}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  tech-tag:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    border: "1px solid {colors.line}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-3}"
---

# Design System: Kim Roland Berame Portfolio

This file is the brief: the intent and the rules. Every value, token, type step, component spec and state lives in **`DESIGN-SYSTEM.md`** — read it before any visual change. The frontmatter above mirrors its tokens for tooling; if they ever disagree, `DESIGN-SYSTEM.md` and `src/index.css` `@theme` win.

## Creative North Star: "The Specimen Sheet (Dark)"

The page is a Swiss typographic specimen, set on a near-black sheet. One grotesque (Schibsted Grotesk) carries every level by weight and scale alone, from a 400-weight paragraph to a 900-weight name that fills the fold. Structure is drawn with hairline rules, not boxes; whitespace is generous and deliberate; one Swiss red marks the few things that matter. The voice is precise and confident: an engineer who lets type and grid do the talking.

This is a **deliberate departure** from the prior "Drafting Table (Night)" — the dim ink-slate field, the schematic grid, the generative flow-field hero, the signal-orange CAD title blocks and monospace instrument readouts are all retired. No blueprint, no developer-IDE glow, no editorial-serif affectation. The register is International Typographic Style (Vignelli red/black/white), translated to a dark surface.

## Named Rules

**The Red Rule.** Red is accent, never fill. It points at one thing per region and never becomes a background or a body-text color (use `red-ink` when red must read small). The moment red fills a surface it has stopped being the accent.

**Achromatic Neutrals.** Every surface and ink is chroma 0. Warmth or coolness is never added "for mood"; the page is neutral so the red reads.

**One Voice.** Exactly one typeface. Weight and scale carry every level; there is no second family. IBM Plex Mono appears only inside the project rail (counter, card labels, chips, buttons, DemoLink).

**The No-Shout Rule.** Only the hero name reaches 5.5rem; everything else ≤ 4.5rem; letter-spacing never tighter than `-0.04em`. The sheet reads compact and data-dense — never large-format.

**Rules, Not Boxes.** Separation is a hairline and whitespace, not a bordered card. Where a frame is unavoidable (project media, DemoLink, the lightbox), it is a single hairline one level deep, never nested. Depth is tone and rule — never shadow or glass.

**Reveal-to-Visible.** Every reveal enhances an already-visible default. No content is gated behind a class-triggered transition; headless renders and background tabs always show full content.

## Do's and Don'ts

### Do:
- **Do** keep the body on the near-black achromatic field with near-white `ink`. Dark is the committed surface.
- **Do** carry hierarchy with Schibsted Grotesk weights (400 → 900) and scale (One Voice).
- **Do** separate with hairline rules and whitespace, not boxes (Rules, Not Boxes).
- **Do** treat red as a precise accent; use `red-ink` when it must read small (The Red Rule).
- **Do** keep `ink-2` (~7:1) the floor for secondary prose; `ink-3` for labels and meta only.
- **Do** give every animation a reduced-motion fallback: static greeting, no smooth scroll, reveals resolve to visible.

### Don't:
- **Don't** reintroduce the blueprint: schematic grid, flow-field, CAD title blocks, monospace readouts outside the project rail, signal orange, or draw-on rails.
- **Don't** add a second typeface. IBM Plex Mono only inside the project rail (counter, card labels, chips, buttons, DemoLink).
- **Don't** let red fill a surface or set body text (The Red Rule).
- **Don't** wrap content in cards or nest frames (Rules, Not Boxes).
- **Don't** tint the neutrals warm or cool (Achromatic Neutrals).
- **Don't** add an uppercase tracked eyebrow above every heading; the `.label` is for ruled lists and one header tick, not a per-section kicker.
- **Don't** gate content visibility on a scroll animation (Reveal-to-Visible).
- **Don't** invent project metrics; DemoLink states only what is true.
