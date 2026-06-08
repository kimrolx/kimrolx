---
name: Kim Roland Berame Portfolio
description: A near-black engineer's portfolio lit by sparse amber and teal signal.
colors:
  ink-black: "#0A0A0A"
  surface: "#141414"
  surface-2: "#1B1B1B"
  ash: "#DFE0E2"
  ink-dim: "#9A9DA3"
  ink-faint: "#6B6E74"
  amber: "#FFB22C"
  teal: "#006D5B"
  teal-ink: "#34C7AC"
  signal-green: "#21C521"
  flag-blue: "#0038A8"
  flag-red: "#CE1126"
  hairline: "#B8B8B8"
typography:
  hello:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  display:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 4vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "normal"
rounded:
  badge: "4px"
  md: "8px"
  lg: "10px"
  glass: "16px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "40px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ash}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  tech-tag:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-dim}"
    rounded: "{rounded.md}"
    padding: "4px 10px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-dim}"
---

# Design System: Kim Roland Berame Portfolio

## 1. Overview

**Creative North Star: "The Midnight Workshop"**

A near-black canvas lit by a single warm lamp. This is the desk of an engineer building after hours: the room is dark and quiet, the work is the only thing in focus, and warmth comes from two small light sources, an amber glow and a teal glow, drifting at the edges. The personality is precise, confident, and refined, never loud. Confidence here is shown by restraint: a near-black field, generous breathing room, and color used so sparingly that when it appears it carries weight.

The system is content-forward and low-chrome. Prose and headings ride one humanist grotesque (Hanken Grotesk) carried by weight contrast; a monospace (JetBrains Mono) handles the machine's readouts, nav, dates, status, and tags. Motion is ambient (slow-drifting background glow, a typewriter greeting) plus a subtle scroll reveal that always resolves to visible, never choreographed entrances on every section. The human notes (the multilingual greeting, the Philippines flag in the heading) are earned, specific touches against an otherwise austere frame.

This system explicitly rejects the **generic dev-template portfolio** (hero + skill-icon grid + endless identical cards), the **corporate SaaS landing** (sterile, buzzword-heavy, stock-photo enterprise tone), and **clutter** (cramped, no breathing room). It is a person's workshop, not a product page.

**Key Characteristics:**
- Near-black `#0A0A0A` body with light-ash `#DFE0E2` text. Dark is the deliberate surface, not a toggle.
- Two signal accents (amber, teal) used on ≤10% of any screen.
- Two typefaces: Hanken Grotesk for prose, JetBrains Mono for technical labels.
- Ambient glow as the only persistent motion; reveals always resolve to visible.
- Breathing room and hairline dividers carry structure, not boxes.

## 2. Colors

A dark, low-saturation field where two warm-cool accents act as light sources, plus a national flag used once as a personal signature.

### Primary
- **Amber Signal** (`#FFB22C`): The brand's warm light. Used for the strongest single highlight on a view, the even-numbered background glow orbs, and key emphasis. Treated as rare; its scarcity is the point.

### Secondary
- **Workshop Teal** (`#006D5B`): The cool counter-light. Carries small factual signals (employment-type label, odd-numbered glow orbs) and pairs with amber at the screen edges. Deep enough to recede, saturated enough to register.

### Tertiary
- **Signal Green** (`#21C521`): Positive status (a "Production" / "Completed" dot). Status only, never decoration.
- **Text Teal** (`#34C7AC`): Text-safe teal for the rare place teal must be read (highlight dots, employment label). The dark brand teal `#006D5B` is glow/fill only.
- **Flag Blue** (`#0038A8`) and **Flag Red** (`#CE1126`): The Philippines flag, used exactly once, on the word "Philippines" in the hero. A personal signature, not a palette.

### Neutral
- **Ink Black** (`#0A0A0A`): The body and fixed background. The whole room.
- **Surface / Surface-2** (`#141414` / `#1B1B1B`): Tonal step-ups for chips, frames, and the nav, separated by hairline borders.
- **Light Ash** (`#DFE0E2`) and **Ink Dim** (`#9A9DA3`): Primary and secondary text. Both clear 4.5:1 on ink black; ink-dim is the floor.
- **Hairline** (`oklch(1 0 0 / 0.1)`): Section and component dividers. Structure without boxes.

### Named Rules
**The Signal Rule.** Amber and teal together occupy ≤10% of any screen. They are light sources, not surfaces. The moment an accent fills a region, it has stopped being a signal.

**The One Flag Rule.** The Philippines gradient (`#0038A8` → `#CE1126`) appears exactly once, on "Philippines" in the hero. It is the single sanctioned gradient-on-text in the system because it is a flag, not decoration. Nowhere else.

## 3. Typography

**Display / Body Font:** Hanken Grotesk (with `system-ui, sans-serif` fallback)
**Technical Label Font:** JetBrains Mono (with `ui-monospace, monospace` fallback)

**Character:** A humanist grotesque carries all prose and headings, weight (400 → 800) and scale doing the hierarchy. A monospace handles the workshop's "instrument readouts": nav, dates, status, tech tags, and metadata. The mono is register-earned, this is literally a software engineer's site, not costume; it never sets body prose.

### Hierarchy
- **Hello** (700, `clamp(1.5rem, 5vw, 1.875rem)`, 1.1): The animated typewriter greeting. Sets the human tone before anything else loads.
- **Display / H1** (800, `clamp(2.25rem, 6vw, 3.75rem)`, 1.1): Page-defining hero heading.
- **Headline / H2** (700, `clamp(1.875rem, 4vw, 2.25rem)`, 1.1): Section headings, with a leading amber tick.
- **Title / H3** (700, `1.25rem–1.5rem`, 1.3): Project and role titles.
- **Body** (400, `1rem`, 1.6): Paragraphs and descriptions. Cap measure at 65–75ch (`max-w-prose`).
- **Label** (500, `0.75rem`, mono): Nav, dates, status, tech tags, metadata.

### Named Rules
**The Two Voices Rule.** Exactly two families: Hanken Grotesk for everything you read, JetBrains Mono for what the machine reports (labels, dates, paths, tags). No third typeface. Prose is never mono.

**The No-Shout Rule.** Display tops out near 3.75rem. The page never exceeds it to "feel bigger"; hierarchy is relative, not loud.

## 4. Elevation

A flat, dark system with one signature exception: the ambient glow layer. There are no decorative drop-shadows. Depth comes from the fixed background of slow-drifting, blurred color orbs (amber and teal, `box-shadow: ±40vmin 0 ~5.5vmin currentColor`) at `z-index: 0` behind everything, with a radial vignette keeping text legible. Surfaces step up by tone, not shadow: `bg` (`#0A0A0A`) → `surface` (`#141414`) → `surface-2` (`#1B1B1B`), separated by `1px` borders at `oklch(1 0 0 / 0.1)`. Glass (translucent blur panels) was removed in the rebuild; it is not part of the system.

### Shadow Vocabulary
- **Ambient glow** (`box-shadow: ±40vmin 0 ~5.5vmin currentColor` on orbs): The room's light. Persistent, behind content, never on content.

### Named Rules
**The Tonal-Depth Rule.** Layering is done with the three surface tones plus hairline borders, not shadows or glass. If a panel needs to lift, raise its tone, don't float it.

## 5. Components

### Navigation (TopBar)
- **Style:** Sticky top bar, translucent `bg/70` with `backdrop-blur-md` and a bottom hairline, above all content (`--z-nav`). Brand on the left (`kim.berame`, mono, `.berame` in amber; shortens to `kim.b` below `sm`), section links on the right.
- **Typography:** Mono links, `0.8125rem` (`text-xs` below `sm` with tighter gap to prevent overflow on narrow phones).
- **States:** `ink-dim` default → `ink` on hover; the in-view section is `amber` (tracked via `IntersectionObserver`).

### Buttons (`ButtonLink`)
- **Shape:** Rounded `10px` (`rounded-md`), `10px 20px` padding, semibold.
- **Primary:** Amber fill (`#FFB22C`), ink-black text (~10:1 contrast), `hover:bg-amber/90`. Used for the principal action in a region; small enough to respect The Signal Rule.
- **Ghost:** Transparent with a `border-strong` outline, ash text; border and text shift to amber on hover.

### Tech Tag (`TechTag`)
- **Style:** Small `surface` chip, `rounded-md`, mono `text-xs`, `ink-dim` label, with a `1.5px` brand-color dot. Color appears only as the dot, the chip itself stays neutral.
- **Use:** Tech stacks on projects and experience. Replaces the old fully-color-filled badge; color is now signal, not fill.

### Project Row (`ProjectCard`)
- **Layout:** A two-column row (`md:grid-cols-2`) that alternates side per index for rhythm; stacks to one column on mobile. Both tracks carry `min-w-0` so long content can't blow out the grid.
- **Media (`ProjectMedia`):** A screenshot in a bordered `surface` frame when one exists (lazy-loaded, full color, no grayscale gate); otherwise a small mono "terminal" motif so no project ships as an empty block. No flip, no hover-gated content, nothing hidden on mobile.
- **Content:** Status pill + period (mono), title, kind (mono), description, tech tags, link buttons.

### Timeline (`ExperienceEntry`)
- **Style:** Lean native timeline (no third-party component). A logo node on a white circle, a `1px` connector line that omits on the last entry, role + period (mono), company + employment type (mono), teal-dotted highlights, tech tags.
- **Accent:** Highlight bullets and the employment label use text-safe teal (`#34C7AC`), not the dark brand teal.

### Signature: Animated Greeting (`TypewriterGreeting`)
- **Style:** Typewriter cycling through 11 languages (Filipino first), `~230ms` per character, `2000ms` pause, blinking amber caret. The system's human handshake. Degrades to a single static greeting under reduced motion; an `sr-only` "Hello, welcome." carries it to assistive tech.

## 6. Do's and Don'ts

### Do:
- **Do** keep the body on ink black `#0A0A0A` with light-ash `#DFE0E2` text. Dark is the committed surface, not a theme toggle.
- **Do** confine amber `#FFB22C` and teal `#006D5B` to ≤10% of any view (The Signal Rule). Treat them as light, not paint.
- **Do** build hierarchy with Hanken Grotesk weights (400 → 800) and scale; reserve JetBrains Mono for labels (The Two Voices Rule).
- **Do** layer with the three surface tones and hairline borders, not shadows or glass (The Tonal-Depth Rule).
- **Do** keep `ink-dim` (`#9A9DA3`) the floor for body text on `#0A0A0A` (~6:1); use text-safe teal (`#34C7AC`) when teal must be read.
- **Do** give every animation a `prefers-reduced-motion: reduce` fallback, and make scroll reveals resolve to visible even if the observer never fires (a timeout safety net).

### Don't:
- **Don't** build the **generic dev-template portfolio**: hero + skill-icon grid + endless identical cards. It is a named anti-reference.
- **Don't** drift toward a **corporate SaaS landing**: no buzzwords, no stock-photo enterprise tone, no hero-metric template.
- **Don't** clutter. Hairline dividers and whitespace carry structure; resist packing sections with boxes.
- **Don't** reintroduce glassmorphism. It was removed in the rebuild; depth is tonal, not translucent-blur.
- **Don't** gate content visibility on a scroll animation. Reveals enhance an already-visible default and always resolve to visible (no blank sections in headless renders or background tabs).
- **Don't** introduce a second gradient-on-text. The Philippines flag is the single sanctioned one (The One Flag Rule); everywhere else, color is solid and emphasis is weight.
- **Don't** add a third typeface. Two voices: Hanken Grotesk and JetBrains Mono.
- **Don't** fill tech tags with solid brand color. Color is the dot; the chip stays neutral.
- **Don't** ship gray body text that reads under 4.5:1 on the dark field "for elegance".
