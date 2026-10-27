# kimrolx Design System — The Specimen Sheet (v2)

> **For agents and contributors.** This is the design system reference for kimrolx.com. Read it before any visual change. When code and this file disagree, this file wins, unless the owner says otherwise. Fix the code, or ask, but don't quietly change the system.
>
> - Implementation lives in `src/index.css` (`@theme`). Tailwind v4, no `tailwind.config`.
> - `DESIGN.md` (frontmatter for the impeccable skill) and `PRODUCT.md` (audience, voice) are companions to this file and must not contradict it.
> - The visual, browsable version is the owner's private "kimrolx" Design System artifact on claude.ai.

## 1. Principles

1. **Show, don't tell.** Use real projects, stack and links. Never invent a metric. A project with no screenshot shows its live URL (DemoLink).
2. **Rules, Not Boxes.** Separate content with a hairline and whitespace. Frame only media, one level deep, never nested.
3. **The Red Rule.** Red is an accent, never paint. It points at one thing per region, never fills a surface behind text, and never sets prose.
4. **One Voice.** Schibsted Grotesk carries every level by weight and scale. IBM Plex Mono is allowed only inside the project rail.
5. **Reveal-to-Visible.** Motion only enhances content that is already visible. Every animation is gated on `usePrefersReducedMotion`.
6. **Achromatic neutrals.** Every surface, ink and line has chroma 0, so the one red reads.

## 2. Color

Two themes. **Sheet (Dark)** is the default and the site's identity. **Paper (Light)** mirrors it on white, for print, PDFs, the resume, and a future `prefers-color-scheme: light` option. The site currently ships dark only.

### 2.1 Base tokens (defined in `@theme`)

| Token | Dark (default) | Paper (light) | Tailwind | Notes |
| --- | --- | --- | --- | --- |
| `--color-bg` | `oklch(0.16 0 0)` | `oklch(0.985 0 0)` | `bg-bg` | Base. The sheet: page background behind everything. Achromatic in both themes. Use surface-page in components. |
| `--color-surface` | `oklch(0.205 0 0)` | `oklch(1 0 0)` | `bg-surface` | Base. Raised tone, one step off the sheet. Use surface-raised in components. |
| `--color-inset` | `oklch(0.135 0 0)` | `oklch(0.955 0 0)` | `bg-inset` | Base. Recessed tone for media frames and wells. Use surface-sunken in components. |
| `--color-line` | `oklch(1 0 0 / 0.1)` | `oklch(0 0 0 / 0.1)` | `border-line` | Base. Fine decorative hairline. Use border-subtle in components. |
| `--color-line-2` | `oklch(1 0 0 / 0.2)` | `oklch(0 0 0 / 0.2)` | `border-line-2` | Base. Structural rule. Use border-strong in components. Decorative only (1.6–1.9:1), too faint to be a control's only boundary. |
| `--color-line-3` | `oklch(1 0 0 / 0.38)` | `oklch(0 0 0 / 0.45)` | `border-line-3 (add)` | Base, new in v2. A boundary that meets 3:1 on every surface in both themes (3.5:1 dark, 3.3:1 light). Use border-control in components. |
| `--color-ink` | `oklch(0.97 0 0)` | `oklch(0.16 0 0)` | `text-ink` | Base. Highest-contrast ink: 16.4–19.4:1 on every surface in both themes. Use text-primary in components. |
| `--color-ink-2` | `oklch(0.74 0 0)` | `oklch(0.42 0 0)` | `text-ink-2` | Base. Secondary ink: 7.4–8.7:1 on every surface. Use text-secondary in components. |
| `--color-ink-3` | `oklch(0.62 0 0)` | `oklch(0.5 0 0)` | `text-ink-3` | Base. Meta ink: 4.9–6.0:1 on every surface. Use text-meta in components. |
| `--color-red` | `oklch(0.63 0.23 25)` | `oklch(0.58 0.22 27)` | `text-red / bg-red / border-red` | Base. Swiss red, the one accent. 4.2–5.1:1 on every surface, enough for marks, rules and focus rings. Use accent in components. |
| `--color-red-ink` | `oklch(0.7 0.2 27)` | `oklch(0.52 0.2 27)` | `text-red-ink` | Base. Red tuned to read as small text: 5.4–6.7:1 on every surface. Use text-accent in components. |
| `--color-on-red` | `var(--color-bg)` | `var(--color-surface)` | `text-on-red (add)` | Base, new in v2. The only text allowed on a color-red fill: 5.0:1 dark, 4.8:1 light. Replaces color-ink on red (3.6:1). |

### 2.2 Role tokens

Roles say what a color is for. Until role tokens are added to `@theme` (optional handoff phase), use the base class the role resolves to, so `text-secondary` means `text-ink-2`.

| Role | Resolves to | Use for |
| --- | --- | --- |
| `text-primary` | `color-ink` | Headings, display type, body prose and control labels on surface-page, surface-raised and surface-sunken. |
| `text-secondary` | `color-ink-2` | Secondary prose, descriptions, highlights, chip labels. The floor for any running sentence. |
| `text-meta` | `color-ink-3` | label-style meta only: periods, counts, nav at rest, placeholders, hints. Never a paragraph. |
| `text-accent` | `color-red-ink` | Red words: live status, field errors, hover text on links, outline buttons and icon keys. |
| `text-inverse` | `color-bg` | Text on surface-inverse (primary button, App Store badge). |
| `text-on-accent` | `color-on-red` | Text on an accent fill: text selection only. |
| `surface-page` | `color-bg` | The page and every open-field section. |
| `surface-raised` | `color-surface` | Logo wells, the modal close key, small chrome that sits one level up. |
| `surface-sunken` | `color-inset` | Media frames, the portrait well, project card grounds. |
| `surface-inverse` | `color-ink` | The solid key: primary button and App Store badge fill. |
| `border-subtle` | `color-line` | Default border: rows between ruled-list items, chips, icon keys, media frames. |
| `border-strong` | `color-line-2` | Structural rules: section header rules, the first row of a ruled list, outline buttons. |
| `border-control` | `color-line-3` | The resting boundary of a text input (PromptField underline) and any control whose edge is its only cue. |
| `border-accent` | `color-red` | Hover and focus borders, filled or focused input underline. |
| `accent` | `color-red` | Marks: name period, header tick, highlight dashes, active nav rule, caret, scroll rule, progress steps. |
| `status-live` | `color-red` | Status dot for Production and In Progress. Always beside the status word. |
| `focus-ring` | `color-red` | 2px focus outline, offset 3px, on every focusable element. ≥4.2:1 on every surface. |
| `selection-bg` | `color-red` | ::selection background. |
| `selection-text` | `color-on-red` | ::selection text. |

### 2.3 Overlays and easter egg

| Token | Dark | Paper | Use |
| --- | --- | --- | --- |
| `overlay-scrim` | `oklch(0.16 0 0 / 0.92)` | `oklch(0.985 0 0 / 0.92)` | Modal and lightbox scrim, with a 12px backdrop blur. |
| `overlay-nav` | `oklch(0.16 0 0 / 0.85)` | `oklch(0.985 0 0 / 0.85)` | Sticky top bar ground, with a 12px backdrop blur. |
| `crt-green` | `oklch(0.86 0.18 150)` | `oklch(0.86 0.18 150)` | Easter egg only: green phosphor of the CRT mode and terminal. Same in both themes (the CRT forces its own dark screen). |
| `crt-amber` | `oklch(0.83 0.15 75)` | `oklch(0.83 0.15 75)` | Easter egg only: amber phosphor variant of the CRT terminal. |

Tailwind equivalents for the overlays: `bg-bg/92` (scrim) and `bg-bg/85` (nav), each with `backdrop-blur-md`.

### 2.4 Contrast (WCAG 2.2 AA, checked in both themes)

| Pair | Dark | Paper | Needed |
| --- | --- | --- | --- |
| `ink` on bg / surface / inset | 16.4–18.4:1 | 17.0–19.4:1 | 4.5 |
| `ink-2` on any surface | 7.8–8.7:1 | 7.4–8.5:1 | 4.5 |
| `ink-3` on any surface | 4.9–5.5:1 | 5.3–6.0:1 | 4.5 |
| `red-ink` on any surface | 6.0–6.7:1 | 5.4–6.1:1 | 4.5 |
| `red` as a mark or focus ring on any surface | 4.6–5.1:1 | 4.2–4.8:1 | 3 |
| `line-3` as a control boundary | 3.5–3.6:1 | 3.3–3.4:1 | 3 |
| `on-red` on `red` (selection) | 5.0:1 | 4.8:1 | 4.5 |
| `bg` on `ink` (primary button) | 17.8:1 | 18.6:1 | 4.5 |
| `line`, `line-2` | 1.2–1.9:1 | 1.2–1.6:1 | decorative only |

**Rules**
- Never use `line` or `line-2` as the only cue that something is a control. The control's icon or label must carry 3:1, or the control uses `line-3`.
- `ink-3` is for meta only (labels, periods, counts, placeholders, hints), never a sentence.
- Never put `ink` on `red`. Text on red is `on-red`, and the only place it happens is `::selection`.
- Never lower opacity on text to show something is inactive. Dim media instead (`opacity-recede`).

## 3. Typography

- **Families:** `--font-sans` is "Schibsted Grotesk", system-ui, -apple-system, sans-serif (400–900). `--font-mono` is "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace (400–600). Both load from Google Fonts in `index.html`.
- **Base:** body `line-height: 1.65`. h1–h3: `line-height: 1`, `letter-spacing: -0.035em`, weight 800, `text-wrap: balance`. Paragraphs: `text-wrap: pretty`. `font-synthesis-weight: none`.
- **The No-Shout Rule:** only the hero name reaches 5.5rem; everything else tops out at 4.5rem. Tracking is never tighter than -0.04em.
- Mono is allowed only in the project rail (`[data-rail-card]` scope, the rail counter, DemoLink).

| Style | Size (fluid) | Weight / leading / tracking | Tailwind recipe | Use |
| --- | --- | --- | --- | --- |
| `display-xl` | `clamp(3.5rem, 12vw, 5.5rem)` | 900 / 0.9 / -0.04em | `text-[clamp(3.5rem,12vw,5.5rem)] font-black leading-[0.9] tracking-[-0.04em]` | Hero name only, once per site |
| `display` | `clamp(2.25rem, 7vw, 4.5rem)` | 900 / 0.92 / -0.04em | `text-[clamp(2.25rem,7vw,4.5rem)] font-black leading-[0.92] tracking-[-0.04em] max-w-[22ch]` | Contact headline, page statements |
| `headline` | `clamp(1.75rem, 4.5vw, 2.75rem)` | 800 / 1 / -0.04em | `text-[clamp(1.75rem,4.5vw,2.75rem)] font-extrabold tracking-[-0.04em]` | Section H2 (SheetHeading) |
| `title-lg` | `clamp(1.5rem, 2.8vw, 2.5rem)` | 900 / 0.95 / -0.04em | `text-[clamp(1.5rem,2.8vw,2.5rem)] font-black leading-[0.95] tracking-[-0.04em]` | Project card titles (always below `headline`) |
| `title` | `clamp(1.25rem, 2.5vw, 1.75rem)` | 800 / 1.05 / -0.035em | `text-xl sm:text-2xl font-extrabold tracking-tight` (role titles) | H3 role and sub-section titles |
| `wordmark` | 1rem | 800 / 1.5 / -0.025em | `text-base font-extrabold tracking-tight` | `kimrolx.` with a `text-red` period |
| `prompt` | `clamp(1.25rem, 2.5vw, 1.875rem)` | 500 / 1.2 / -0.02em | `text-[clamp(1.25rem,2.5vw,1.875rem)] font-medium tracking-[-0.02em]` | Contact input |
| `greeting` | 1.25rem (1.125rem < 640px) | 500 / 1.4 | `text-lg sm:text-xl font-medium text-ink-2` | Typewriter greeting |
| `subtitle` | 1.0625rem | 600 / 1.375 | `text-[1.0625rem] font-semibold leading-snug` | Project "kind" line |
| `body` | 1rem | 400 / 1.65 | `text-base` (+ `max-w-prose`) | Prose |
| `body-compact` | 0.9375rem | 400 / 1.62 | `text-[0.9375rem] leading-[1.62]` | Project descriptions, skill lines |
| `body-sm` | 0.875rem | 400 / 1.4286 | `text-sm` | Spec values, meta lines; buttons at 600 |
| `chip` | 0.8125rem | 500 / 1.65 | `text-[0.8125rem] font-medium` | Tech chips |
| `caption` | 0.75rem | 400 / 1.25 | `text-xs` | Field hints and errors |
| `label` | 0.6875rem | 600 / 1.3 / 0.14em, UPPERCASE | `.label` utility | Running labels, nav, meta, status |
| `mono-label` | 0.75rem | 500 / 1.3 / 0.14em, UPPERCASE | `label font-mono` (rail scope) | Rail counter, card labels, chips, buttons |
| `mono-link` | `clamp(1.25rem, 3.2vw, 2.5rem)` | 500 / 1.25 / -0.02em | `font-mono text-[clamp(1.25rem,3.2vw,2.5rem)] font-medium leading-tight tracking-[-0.02em]` | DemoLink URL |

## 4. Spacing, layout and sizes

A 4px scale. Token names match Tailwind integer steps (`space-4` = `p-4` = 16px), so use the Tailwind step. Half steps (`1.5`, `2.5`, `3.5` = 6/10/14px) are allowed only inside a component for optical padding.

| Token | Value | Use |
| --- | --- | --- |
| `space-1` | `4px` | Label to meta, dot to word. |
| `space-2` | `8px` | Icon to label inside a control; chip rows. |
| `space-3` | `12px` | Between controls in a row; heading to its description. |
| `space-4` | `16px` | Default gap between related blocks; spec-row column gap. |
| `space-5` | `20px` | Mobile page gutter; SheetHeading rule to title. |
| `space-6` | `24px` | Between parts of an entry (title, list, chips). |
| `space-8` | `32px` | Wide page gutter from 640px; above an entry's rule. |
| `space-10` | `40px` | Between groups inside a section; card side padding at desktop. |
| `space-12` | `48px` | Column gap of ruled two-column rows at desktop. |
| `space-14` | `56px` | Headline to content in Contact. |
| `space-16` | `64px` | Section padding on mobile. |
| `space-20` | `80px` | Section padding on tablet. |
| `space-28` | `112px` | Section padding at desktop. |

| Token | Value | Use |
| --- | --- | --- |
| `content-max` | `72rem` | The centered content column (max-w-6xl). |
| `measure` | `65ch` | Prose measure (max-w-prose). |
| `measure-display` | `22ch` | Max width of a display statement, so it breaks into 2–3 lines. |
| `gutter` | `20px` | Page side padding below 640px. |
| `gutter-wide` | `32px` | Page side padding from 640px. |
| `spec-label-col` | `6rem` | Label column of the hero SpecList. |
| `row-label-col` | `12rem` | Label column of NowGroupRow and other ruled rows at desktop. |
| `entry-meta-col` | `14rem` | Meta column of ExperienceEntry at desktop. |

| Token | Value | Use |
| --- | --- | --- |
| `size-target` | `44px` | Minimum touch target: icon keys, rail arrows, nav links, input rows. |
| `size-close` | `40px` | The modal close key. |
| `size-nav` | `64px` | Top bar height. |
| `size-tick` | `8px` | The red square tick on header rules. |
| `size-dot` | `6px` | Status dots and the portrait corner tick at rest. |
| `size-dash` | `16px` | Length of the red highlight dash and the active-nav rule. |
| `size-icon` | `16px` | Icons inside buttons and controls. |

| Token | Value | Use |
| --- | --- | --- |
| `radius-sm` | `2px` | The only corner: buttons, chips, icon keys, inputs, frames, cards. |
| `radius-full` | `9999px` | Circles only: status dots and slider thumbs. Never a pill-shaped control. |

`rounded-sm` is the only corner and `rounded-full` is for dots and slider thumbs only. Nothing is pill-shaped.

| Token | Value | Use |
| --- | --- | --- |
| `border-hairline` | `1px` | Every rule, frame and control border. |
| `border-thick` | `2px` | Input underline, scroll rule, progress steps, caret, focus ring. |

Flat system: no `box-shadow` for elevation, no glass beyond the two overlays. Depth is tone: inset → bg → surface.

## 5. Motion

| Token | Value | Use |
| --- | --- | --- |
| `duration-fast` | `200ms` | Hover color, border and 1px lift. |
| `duration-base` | `300ms` | Modal fade, nav rule growth, icon reveal. |
| `duration-slow` | `500ms` | Card border and focus shifts, image zoom. |
| `duration-reveal` | `700ms` | Scroll reveals and hero stagger steps (70ms apart). |

| Token | Value | Use |
| --- | --- | --- |
| `ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Default for reveals, stagger, card and frame transitions. |
| `ease-out-quint` | `cubic-bezier(0.22, 1, 0.36, 1)` | CRT boot flash and achievement pop. |

- Hover on buttons and keys lifts 1px (`hover:-translate-y-px`) and warms the border to `red` and the text to `red-ink`.
- Scroll reveals are an 18px fade-lift over 700ms `ease-out-expo` using `data-reveal`, visible by default. The hero stagger steps 70ms apart.
- Lenis smooth scroll and a 2px `bg-red` scroll rule at `z-progress`.
- **Never:** parallax, scroll-linked drift, draw-on schematics.
- **Reduced motion:** a static greeting, native scroll, resolved reveals, no HeroName tilt or glare, no stripe drift, transitions cut to ~0.

| Token | Value | Use |
| --- | --- | --- |
| `opacity-disabled` | `0.5` | Every disabled control (buttons and rail arrows alike). |
| `opacity-recede` | `0.6` | Off-center project card media. Never applied to a card's text. |
| `opacity-kicker` | `0.7` | Small kicker text on surface-inverse (App Store badge "Download on the"). |

| Token | Value | Use |
| --- | --- | --- |
| `z-content` | `10` | Content raised above section backgrounds. |
| `z-nav` | `100` | Sticky top bar. |
| `z-progress` | `110` | Red scroll rule, above the nav. |
| `z-transition` | `500` | Page wipe transition. |
| `z-crt-terminal` | `8000` | CRT terminal takeover, below the scanline overlay. |
| `z-crt` | `9000` | CRT scanline and boot overlays. |
| `z-crt-exit` | `9100` | CRT exit button, above everything. |

## 6. States

| State | Treatment |
| --- | --- |
| Hover | `hover:border-red hover:text-red-ink`, 1px lift. Primary key: `hover:bg-ink-2`. |
| Focus | Global `:focus-visible { outline: 2px solid var(--color-red); outline-offset: 3px }`. Never `outline-none` without a visible replacement; inputs use `focus-within:border-red` on their underline. |
| Active | `active:translate-y-0` |
| Disabled | `disabled:opacity-50 disabled:pointer-events-none` on every control |
| Error | Red underline, `aria-invalid`, a `text-xs text-red-ink` hint starting with "Error:" and `role="status"` |
| Live / done | StatusPill: a dot plus the word, never the dot alone |
| Selection | `::selection { background: var(--color-red); color: var(--color-on-red) }` |

## 7. Components

All live in `src/components/`. Anatomy uses Tailwind classes as written in code.

- **Button / ButtonLink** (`base-components/button.tsx`). `default` is `bg-ink text-bg`, hovering to `bg-ink-2`. `outline` is `border border-line-2 text-ink`, hovering to `border-red text-red-ink`. Sizes: `px-5 py-2.5 text-sm` or `lg` `px-6 py-3`. All are `rounded-sm font-semibold tracking-tight`. Labels are verb + object. At most one `default` per row. In the rail, labels switch to mono uppercase 12px.
- **TechList** (`TechTag.tsx`). `rounded-sm border border-line px-2.5 py-1 text-[0.8125rem] font-medium text-ink-2` chips, `gap-1.5`. No colors, no icons.
- **StatusPill.** `label` text. Production and In Progress are `text-red-ink` with a `bg-red` 6px dot; Completed is `text-ink-3` with a hollow ring.
- **SheetHeading.** A `border-t border-line-2 pt-3` rule, an 8px `bg-red` square tick, optional right-aligned `label text-ink-3` meta, then the H2 in `headline`, then optional `text-ink-2 max-w-prose` description. No eyebrow above the title.
- **SpecList** (Hero `SPECS`). A `<dl>`; each row is `grid grid-cols-[6rem_1fr] gap-4 border-t border-line py-2.5`, with `first:border-line-2`. Labels are `label text-ink-3`, values `text-sm text-ink`. At most one status row, with a red dot. Values are middle-dot spec lines.
- **ExperienceEntry.** A `border-t border-line-2 pt-8` row: `lg:grid-cols-[14rem_1fr] lg:gap-12`, with meta (period, logo well on `bg-surface`, company, type) on the left and content on the right. Highlights in `text-ink-2`, each led by a 16px × 1px `bg-red` dash. Ends with a TechList.
- **NowGroupRow.** `grid border-t border-line py-12 first:border-line-2 lg:grid-cols-[12rem_1fr] lg:gap-12`, with a `label text-ink-3` heading and optional meta.
- **SocialLinks.** 44px square keys, `rounded-sm border border-line text-ink`, a Font Awesome brand icon at 1.1rem, `aria-label` on each.
- **App Store badge** (inline in `ProjectPanel.tsx`). Apple's official black "Download on the App Store" badge (`src/assets/app_store_badge.svg`), unmodified, at 40px tall (Apple's on-screen minimum). App Store links only; never redraw it with tokens.
- **Modal.** A native `<dialog>` on a `bg-bg/92 backdrop-blur-md` scrim. The close key is 40px, `bg-surface/80 border border-line-2 rounded-sm`. Escape, backdrop click and the close key all dismiss it; Lenis pauses while it's open.
- **TopBar** (below lg) and **LeftRail** (lg and up). `bg-bg/85 backdrop-blur-md` with a hairline edge. The wordmark has a red period. Links are `label text-ink-3`; the current link is `text-ink` with a 16px red rule before it. Targets are 44px minimum.
- **HeroName.** The `display-xl` name on two lines with a red period, then a 40px red dash plus the role, then the typed role line (`>` in `text-red-ink`, a 2px red caret). Tilt and glare apply only on a fine pointer without reduced motion.
- **TypewriterGreeting.** `greeting` style in `text-ink-2`, a 2px red caret, Filipino first, with `sr-only` "Hello, welcome.". Don't reuse the typewriter effect anywhere else.
- **ProjectCard** (`ProjectPanel.tsx` in `ProjectRail.tsx`). `rounded-sm border border-line` over `bg-inset` with an 8px hairline-stripe texture. The number is `label text-red`, the title `title-lg`, then StatusPill and period, `subtitle` kind, a `body-compact text-ink-2` description clamped to 2 lines, a TechList, and actions. Hover gives `border-red`. Off-center cards dim their media only. The rail counter is `01 / 05` in mono; the arrows are 44px keys.
- **DemoLink** (`ProjectMedia.tsx`). A `label text-ink-3` note ("Live at"), then the URL in `mono-link` led by a red arrow-up-right. It's the honest stand-in for a missing screenshot.
- **PromptField** (`ContactPrompt.tsx`). The SheetHeading rule with a "Contact" label and 24×2px step bars. The field row is `min-h-11` with a red ▸ marker and the `prompt` input with `caret-red`. The underline is `border-b-2`: `border-line-3` at rest, `border-red` when focused, filled or errored. A `text-xs` hint sits below, and an outline `lg` submit key sits to the right.

## 8. Content and voice

- First person, engineer-forward, no hype. Real projects, real stack, real links.
- Sentence case. UPPERCASE only via `.label`.
- Spec lines use a middle dot: "TypeScript · NestJS · PostgreSQL · React".
- Indexes are two digits ("01 / 05"). Periods read like "2025 — Present".
- Errors start with "Error:" and say what to fix.
- No emoji in the interface.

## 9. Iconography and identity

- `react-icons`: **Feather** (`Fi*`) for UI arrows and actions, **Font Awesome** brands (`FaGithub`, `FaLinkedin`, `FaEnvelope`, `FaApple`), **Lucide** (`Lu*`) for music controls only.
- Icons take `currentColor`, are 16px in controls, and are always `aria-hidden` next to text or an `aria-label`.
- Typographic marks are part of the system: ▸ before the prompt, `>` before the role line, `→` after "Case study", and the middle dot in spec lines.
- **There's no logo mark.** The identity is the `kimrolx.` wordmark and "Kim Roland Berame." in `display-xl`, each with a red period. Never draw a mark.

## 10. Don't

- Don't reintroduce the retired blueprint look: schematic grids, flow fields, CAD title blocks, signal orange, draw-on rails.
- Don't add a second display typeface, or use mono outside the project rail.
- Don't let red fill a surface or set prose.
- Don't wrap content in cards, or nest frames.
- Don't add an uppercase eyebrow above every heading.
- Don't hard-code colors. Use `@theme` tokens only.
- Don't remove a focus indicator without replacing it.
- Don't invent metrics, projects, dates or links.
