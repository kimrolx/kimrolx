---
name: Kim Roland Berame Portfolio
description: A near-black engineer's portfolio lit by sparse amber and teal signal.
colors:
  ink-black: "#0A0A0A"
  ash: "#DFE0E2"
  amber: "#FFB22C"
  teal: "#006D5B"
  signal-green: "#05A005"
  flag-blue: "#0038A8"
  flag-red: "#CE1126"
  hairline: "#B8B8B8"
typography:
  hello:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(1.875rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  display:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(1.25rem, 4vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Poppins, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
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
    backgroundColor: "{colors.ash}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  button-primary-hover:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.ash}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ash}"
    padding: "8px 12px"
  badge:
    textColor: "#FFFFFF"
    rounded: "{rounded.badge}"
    padding: "4px 8px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ash}"
---

# Design System: Kim Roland Berame Portfolio

## 1. Overview

**Creative North Star: "The Midnight Workshop"**

A near-black canvas lit by a single warm lamp. This is the desk of an engineer building after hours: the room is dark and quiet, the work is the only thing in focus, and warmth comes from two small light sources, an amber glow and a teal glow, drifting at the edges. The personality is precise, confident, and refined, never loud. Confidence here is shown by restraint: a near-black field, generous breathing room, and color used so sparingly that when it appears it carries weight.

The system is content-forward and low-chrome. Type is one family (Poppins) carried by weight contrast, not by decoration. Motion is ambient (slow-drifting background glow, a typewriter greeting) rather than choreographed entrances on every section. The human notes (the multilingual greeting, the Philippines flag in the heading) are earned, specific touches against an otherwise austere frame.

This system explicitly rejects the **generic dev-template portfolio** (hero + skill-icon grid + endless identical cards), the **corporate SaaS landing** (sterile, buzzword-heavy, stock-photo enterprise tone), and **clutter** (cramped, no breathing room). It is a person's workshop, not a product page.

**Key Characteristics:**
- Near-black `#0A0A0A` body with light-ash `#DFE0E2` text. Dark is the deliberate surface, not a toggle.
- Two signal accents (amber, teal) used on ≤10% of any screen.
- One typeface, Poppins, across the whole system.
- Ambient glow as the only persistent motion; everything else is state-driven.
- Breathing room and hairline dividers carry structure, not boxes.

## 2. Colors

A dark, low-saturation field where two warm-cool accents act as light sources, plus a national flag used once as a personal signature.

### Primary
- **Amber Signal** (`#FFB22C`): The brand's warm light. Used for the strongest single highlight on a view, the even-numbered background glow orbs, and key emphasis. Treated as rare; its scarcity is the point.

### Secondary
- **Workshop Teal** (`#006D5B`): The cool counter-light. Carries small factual signals (employment-type label, odd-numbered glow orbs) and pairs with amber at the screen edges. Deep enough to recede, saturated enough to register.

### Tertiary
- **Signal Green** (`#05A005`): Reserved for positive status (active / complete states on badges). Status only, never decoration.
- **Flag Blue** (`#0038A8`) and **Flag Red** (`#CE1126`): The Philippines flag, used exactly once, on the word "Philippines" in the hero. A personal signature, not a palette.

### Neutral
- **Ink Black** (`#0A0A0A`): The body and fixed background. The whole room.
- **Light Ash** (`#DFE0E2`): Primary text and UI foreground. Hits ≥4.5:1 on ink black.
- **Hairline** (`#B8B8B8`): Section dividers (1px bottom borders between Home / Experience / Projects). Structure without boxes.

### Named Rules
**The Signal Rule.** Amber and teal together occupy ≤10% of any screen. They are light sources, not surfaces. The moment an accent fills a region, it has stopped being a signal.

**The One Flag Rule.** The Philippines gradient (`#0038A8` → `#CE1126`) appears exactly once, on "Philippines" in the hero. It is the single sanctioned gradient-on-text in the system because it is a flag, not decoration. Nowhere else.

## 3. Typography

**Display Font:** Poppins (with `sans-serif` fallback)
**Body Font:** Poppins (with `sans-serif` fallback)

**Character:** One geometric sans across the whole system. Hierarchy comes entirely from weight (400 → 700) and scale, not from a second typeface. This is deliberate: a single confident voice over a chorus.

### Hierarchy
- **Hello** (700, `clamp(1.875rem, 5vw, 3rem)`, 1.1): The animated typewriter greeting. Sets the human tone before anything else loads.
- **Display / H1** (700, `clamp(2.25rem, 5vw, 3rem)`, 1.1): Page-defining headings ("I'm Kim Roland Berame", "Professional Experience").
- **Headline / H2** (700, `clamp(1.25rem, 4vw, 2.25rem)`, 1.2): Section and sub-statement headings.
- **Title / H3–H4** (600, `1.25rem`, 1.3): Card titles, job titles.
- **Body** (400, `1rem`, 1.6): Paragraphs and descriptions. Cap measure at 65–75ch; the hero column is already capped at `max-w-3xl`.
- **Label** (600, `0.6875rem`, 1.2): Badges and dense metadata only.

### Named Rules
**The One Voice Rule.** Poppins is the only family. Never introduce a second typeface for "contrast"; reach for weight and size instead.

**The No-Shout Rule.** Display tops out near 3rem. The page never exceeds it to "feel bigger"; hierarchy is relative, not loud.

## 4. Elevation

This is a flat, dark system with one signature exception: an ambient glow layer. There are no resting drop-shadows on flat content. Depth at rest comes from the fixed background of slow-drifting, blurred color orbs (amber and teal, `box-shadow: 40vmin 0 ~5.5vmin currentColor`) sitting at `z-index: 0` behind everything. Interactive surfaces lift only on state (cards scale `1.05` and carry `shadow-lg` on hover).

A translucent glass treatment currently appears on the timeline entries and project-card backs (`background: rgba(255,255,255,0.05)`, `backdrop-filter: blur(3.3px)`, `border: 1px solid rgba(255,255,255,0.17)`, `box-shadow: 0 4px 30px rgba(0,0,0,0.1)`). It is documented here as the current state but **flagged for reduction** (see Do's and Don'ts): it is the one place the system drifts toward decorative glass.

### Shadow Vocabulary
- **Ambient glow** (`box-shadow: ±40vmin 0 ~5.5vmin currentColor` on orbs): The room's light. Persistent, behind content, never on content.
- **Lift** (`shadow-lg` + `scale(1.05)`): Hover response on project cards only. State, not rest.

### Named Rules
**The Flat-By-Default Rule.** Flat content casts no shadow at rest. Shadow and lift are responses to hover/state, never ambient on a card sitting still.

## 5. Components

### Navigation (TopBar)
- **Style:** Sticky top bar, full-width, `z-index` above all content. Translucent with `backdrop-blur-md` over the dark field, no solid fill.
- **Typography:** Small (`text-sm`) ash links, centered, `space-x-8`.
- **States:** Default ash; hover dims toward gray with a `transition`. Note: the hover-to-gray currently risks dropping below contrast on the dark bg (see Don'ts).
- **Mobile:** Same centered row, height `4rem` (`h-16`).

### Buttons
- **Shape:** Gently rounded (`8px`, `rounded-md`).
- **Primary (hero CTA, "View my work"):** Light-ash fill, ink-black text, `8px 12px` padding. Hover inverts to ink-black fill with ash text, `transition-all 200ms`.
- **Ghost ("Learn more"):** Transparent, ash text, no border. Hover brightens text toward white.
- **shadcn `Button`:** The shadcn/ui button (new-york, zinc base) exists in `components/ui/button.tsx` with the standard variant set (`default`, `outline`, `secondary`, `ghost`, `link`, `destructive`). It inherits the OKLCH token scaffold and is available, but the hero uses bespoke anchor buttons.

### Badge (chip)
- **Style:** Small inline pill, `4px` radius, `11px` semibold label, `4px 8px` padding. Background color is data-driven (per tech/status), text defaults to `#FFFFFF`.
- **Use:** Tech-stack tags and project status. The one place dense color is permitted, because each chip is tiny.

### Cards / Containers (Project cards)
- **Corner Style:** `8px` (`rounded-md`).
- **Behavior:** 3D flip on click (`rotateY(180deg)`, `transformStyle: preserve-3d`, `500ms`). Front is the cover image, desaturated at rest (`grayscale(100%)`) and resolving to full color on hover over `~1500ms`; back is the detail panel.
- **Shadow Strategy:** `shadow-lg` + `scale(1.05)` on hover only (see Elevation).
- **Width:** Fluid up to `500px` on desktop.

### Vertical Timeline (Experience)
- **Style:** `react-vertical-timeline-component` with glass content panels (the flagged treatment), white circular icon nodes holding company logos.
- **Accent:** Employment type rendered in Workshop Teal (`#006D5B`); dates in white.

### Signature: Animated Greeting
- **Style:** Typewriter cycling through 11 languages (Filipino first), `250ms` per character, `2000ms` pause, blinking cursor (`border-r-2`, `animate-pulse`). The system's human handshake. Must degrade to a single static greeting under reduced motion (see Don'ts).

## 6. Do's and Don'ts

### Do:
- **Do** keep the body on ink black `#0A0A0A` with light-ash `#DFE0E2` text. Dark is the committed surface, not a theme toggle.
- **Do** confine amber `#FFB22C` and teal `#006D5B` to ≤10% of any view (The Signal Rule). Treat them as light, not paint.
- **Do** build hierarchy with Poppins weights (400 → 700) and scale alone (The One Voice Rule).
- **Do** keep flat content flat at rest; reserve `shadow-lg` and `scale(1.05)` for hover (The Flat-By-Default Rule).
- **Do** verify the nav hover color and any gray-on-dark text clears 4.5:1 against `#0A0A0A`.
- **Do** give every animation a `prefers-reduced-motion: reduce` fallback: freeze the background orbs and settle the typewriter on one static greeting.

### Don't:
- **Don't** build the **generic dev-template portfolio**: hero + skill-icon grid + endless identical cards. It is a named anti-reference.
- **Don't** drift toward a **corporate SaaS landing**: no buzzwords, no stock-photo enterprise tone, no hero-metric template.
- **Don't** clutter. Hairline dividers and whitespace carry structure; resist packing sections with boxes.
- **Don't** expand the glass treatment. Glass is legacy, scoped to the timeline and card backs only; new surfaces use solid or tonal-on-dark layering. Phase glass down over time, never add more.
- **Don't** introduce a second gradient-on-text. The Philippines flag is the single sanctioned one (The One Flag Rule); everywhere else, color is solid and emphasis is weight.
- **Don't** add a second typeface for "richness". One voice.
- **Don't** ship gray body text that reads under 4.5:1 on the dark field "for elegance".
