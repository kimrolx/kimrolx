---
name: Kim Roland Berame Portfolio
description: An engineer's portfolio as a Swiss typographic specimen on near-black, marked in one Swiss red.
colors:
  bg: "oklch(0.16 0 0)"
  surface: "oklch(0.205 0 0)"
  inset: "oklch(0.135 0 0)"
  line: "oklch(1 0 0 / 0.1)"
  line-2: "oklch(1 0 0 / 0.2)"
  ink: "oklch(0.97 0 0)"
  ink-2: "oklch(0.74 0 0)"
  ink-3: "oklch(0.62 0 0)"
  red: "oklch(0.63 0.23 25)"
  red-ink: "oklch(0.7 0.2 27)"
typography:
  display:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(3rem, 11vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2rem)"
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
  md: "3px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "40px"
  section: "160px"
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

## 1. Overview

**Creative North Star: "The Specimen Sheet (Dark)"**

The page is a Swiss typographic specimen, set on a near-black sheet. One grotesque (Schibsted Grotesk) carries every level by weight and scale alone, from a 400-weight paragraph to a 900-weight name that fills the fold. Structure is drawn with hairline rules, not boxes; whitespace is generous and deliberate; one Swiss red marks the few things that matter (the name's terminal period, the active nav link, header ticks, hover states, the scroll rule). The voice is precise and confident: an engineer who lets type and grid do the talking.

This is a **deliberate departure** from the prior "Drafting Table (Night)" — the dim ink-slate field, the schematic grid, the generative flow-field hero, the signal-orange CAD title blocks and monospace instrument readouts are all retired. No blueprint, no developer-IDE glow, no editorial-serif affectation. The register is International Typographic Style (Vignelli red/black/white), translated to a dark surface.

**Key Characteristics:**
- Near-black **achromatic** field (`oklch(0.16 0 0)`) — no hue tint. White ink, one red accent.
- **One family**, Schibsted Grotesk, 400 → 900. Hierarchy is weight and scale, never a second typeface.
- **Hairline rules over boxes.** Sections, spec lists, and entries are separated by `line` / `line-2` hairlines. Cards and framed plates are gone.
- **Red as accent, not paint.** Red points at one thing per region; it never fills a surface.
- **Balanced motion.** Hero load stagger, scroll-reveal (visible by default), Lenis smooth scroll, one thin red scroll rule. Reduced-motion fallbacks throughout.

## 2. Colors

A near-black achromatic field where white ink and one Swiss red do all the work.

### Primary
- **Swiss Red** (`red` `oklch(0.63 0.23 25)`): The one accent. The name's period, the nav active marker, section header ticks, the highlight dashes in Experience, hover states, and the scroll rule. `red-ink` (`oklch(0.7 0.2 27)`) is the lighter step for red used as small text on dark.

### Neutral
- **Bg / Surface / Inset** (`oklch(0.16…)` / `oklch(0.205…)` / `oklch(0.135…)`): The sheet, raised tone (logo wells, nav), recessed tone (media frames). All achromatic.
- **Ink / Ink-2 / Ink-3** (`oklch(0.97…)` / `oklch(0.74…)` / `oklch(0.62…)`): Display + body (~17:1), secondary prose (~7:1), labels + meta (~5:1). All clear AA on the field.
- **Line / Line-2** (`white / 0.1`, `/ 0.2`): Hairline separators and structural rules.

### Named Rules
**The Red Rule.** Red is accent, never fill. It points at one thing per region and never becomes a background or a body-text color (use `red-ink` when red must read small). The moment red fills a surface it has stopped being the accent.

**Achromatic Neutrals.** Every surface and ink is chroma 0. Warmth or coolness is never added "for mood"; the page is neutral so the red reads.

## 3. Typography

**One Family:** Schibsted Grotesk (with `system-ui, sans-serif` fallback), weights 400 / 500 / 600 / 700 / 800 / 900.

**Character:** A contemporary neo-grotesque with a touch of mechanical precision — neutral enough to be authoritative, distinct enough to avoid the Helvetica/Inter monoculture. Hierarchy is carried entirely by weight (400 body → 900 display) and a fluid modular scale.

### Hierarchy
- **Display / H1** (900, `clamp(3rem, 11vw, 6rem)`, 0.9, `-0.04em`): The hero name and the Contact headline. Ceiling 6rem.
- **Headline / H2** (800, `clamp(2.25rem, 6vw, 3.75rem)`, `-0.04em`): Section titles.
- **Title / H3** (800, `clamp(1.5rem, 3vw, 2rem)`): Project and role titles.
- **Body** (400, `1rem`, 1.65): Prose. Measure capped at `max-w-prose` (~65ch).
- **Label** (`.label`, 600, `0.6875rem`, `0.14em`, uppercase): Spec labels, meta, nav. Used sparingly on header rules and ruled lists, never as a kicker above every heading.

### Named Rules
**One Voice.** Exactly one typeface. Weight and scale carry every level; there is no second family and no monospace.

**The No-Shout Rule.** Display tops out at 6rem; letter-spacing never tighter than `-0.04em`.

## 4. Elevation

A flat system. Depth is rule, tone, and whitespace — never shadow or glass. Three achromatic tones (`bg` → `surface` → `inset`) and two hairline weights (`line`, `line-2`) build every layer. The only true overlay is the lightbox scrim (`bg/92` + blur).

### Named Rule
**Rules, Not Boxes.** Separation is a hairline and whitespace, not a bordered card. Spec lists, the Experience entries, the About toolkit, and the Contact links are all ruled rows on the open field. Where a frame is unavoidable (project media, the no-screenshot Detail block, the lightbox), it is a single hairline one level deep, never nested.

## 5. Components

### Navigation (TopBar)
- Sticky bar, `bg/85` with `backdrop-blur-md` and a bottom hairline. Wordmark `Kim Berame.` (red period). Section links right; the in-view link turns `ink` and grows a 4px red rule before it (IntersectionObserver).

### Scroll rule (ScrollProgress)
- A 2px red rule pinned to the top edge, `scaleX` springing with scroll depth. Transform-only; spring drops under reduced motion.

### Buttons (ButtonLink)
- Square (`rounded-sm`), semibold, `verb + object`. **Primary:** solid white (`ink`) fill, near-black (`bg`) text — the Swiss black/white key; lifts 1px and dims to `ink-2` on hover. **Ghost:** `line-2` hairline, ink text; border and text warm to red on hover.

### Tech chips (TechTag / TechList)
- A hairline chip with a medium label, no color dot, no mono. A flex-wrapping set under each project and role.

### Spec & skill lists (Hero spec, SkillGroup)
- Ruled rows on the open field: a `.label` in a fixed left column, the value or component list to its right, hairline `border-t` between rows. No surrounding box.

### Status (StatusPill)
- A `.label` with a dot: filled red for live / production / in-progress, hollow `ink-3` ring for completed.

### Section header (SheetHeading)
- A full-width `line-2` rule marked by a single red square tick, an optional right-aligned count, then an oversized H2. No repeated eyebrow.

### Project media (ProjectMedia, Lightbox)
- Framed screenshots (single hairline, `inset` ground) that open in a blurred lightbox (Escape / backdrop / button to close, body scroll locked). Projects without screenshots get an honest typographic **Detail** block (project / live-at / type) — never an empty rectangle, never invented metrics.

### Signature: Greeting (TypewriterGreeting)
- The multilingual greeting cycles letter-by-letter with a blinking red caret — the page's one human note, the single carryover from the prior design. Degrades to one static greeting under reduced motion; `sr-only` carries it to assistive tech.

## 6. Motion

- **Hero load:** orchestrated stagger (`motion`) — greeting → name → role rule → intro → keys → socials; the spec list resolves last.
- **Scroll reveals:** sections fade-lift via a `data-reveal` pattern that is **visible by default** and resolves to visible even if the observer never fires (timeout safety net).
- **Scroll:** Lenis inertial smooth scroll with native anchor handling, disabled entirely under reduced motion; a thin red rule tracks depth.
- No parallax, no scroll-linked drift, no draw-on schematics — the prior scroll choreography is retired in favor of Swiss stillness with a few precise moments.

### Named Rule
**Reveal-to-Visible.** Every reveal enhances an already-visible default. No content is gated behind a class-triggered transition; headless renders and background tabs always show full content.

## 7. Do's and Don'ts

### Do:
- **Do** keep the body on the near-black achromatic field with near-white `ink`. Dark is the committed surface.
- **Do** carry hierarchy with Schibsted Grotesk weights (400 → 900) and scale (One Voice).
- **Do** separate with hairline rules and whitespace, not boxes (Rules, Not Boxes).
- **Do** treat red as a precise accent; use `red-ink` when it must read small (The Red Rule).
- **Do** keep `ink-2` (~7:1) the floor for secondary prose; `ink-3` for labels and meta only.
- **Do** give every animation a reduced-motion fallback: static greeting, no smooth scroll, reveals resolve to visible.

### Don't:
- **Don't** reintroduce the blueprint: schematic grid, flow-field, CAD title blocks, monospace readouts, signal orange, or draw-on rails.
- **Don't** add a second typeface or any monospace.
- **Don't** let red fill a surface or set body text (The Red Rule).
- **Don't** wrap content in cards or nest frames (Rules, Not Boxes).
- **Don't** tint the neutrals warm or cool (Achromatic Neutrals).
- **Don't** add an uppercase tracked eyebrow above every heading; the `.label` is for ruled lists and one header tick, not a per-section kicker.
- **Don't** gate content visibility on a scroll animation (Reveal-to-Visible).
- **Don't** invent project metrics; the Detail block states only what is true.
