# Featured projects deck + `/projects` archive

**Date:** 2026-11-04
**Status:** Draft, awaiting owner approval
**Reference:** the designer handoff is copied into
`docs/superpowers/specs/2026-11-04-projects-deck/handoff/` (`HANDOFF.md`, screenshots,
`.dc.html` mockups, token export). This doc says what to build. **HANDOFF.md is the
source for pixel geometry, spacing, type sizes and interaction states.** Where the two
disagree, this doc wins: it records the owner's decisions made after the handoff.

## Intent

The landing page's projects section is a horizontal carousel with three equal-weight
CTAs, an 8-chip tech row, a red border on the resting card, and two of three projects
hidden behind arrows. The handoff replaces it with a **stacked deck** of three featured
projects. In the deck, every project's name and status is always visible and each card
has one clear primary action. Everything else moves to a new **`/projects`** archive
page with type filters.

The owner's priorities:
- Show the three shipped production apps first, in this order: **MACHINA, Pars, Trimly**.
- Hold the line on honesty: real screenshots, no invented facts.

## Goals

- Landing `#projects` shows exactly the three featured projects as a stacked deck
  (desktop) or a swipeable deck (mobile/tablet). It is linked to `/projects` with
  "See all projects →".
- `/projects` lists every project, newest first, filterable by type
  (All / Production / University / Experiments) and by tech (`?stack=`).
- One project list in `src/data/projects.ts` feeds the deck, the archive, both
  filters and the CRT easter egg.
- Every card image is a real capture of the product, with honest alt text.

## Non-goals

- No light theme. The repo has none; the handoff's "Paper theme" acceptance item does
  not apply. Using tokens only is still required.
- No new case studies. Only MACHINA has one today, and that stays as is.
- No change to the nav. "02 Projects" still scrolls to `/#projects`; `/projects` is
  reached via the deck CTA and from the skill map.
- No new dependencies. Motion is CSS transitions, already-installed `motion` is not needed.

## Anti-goals (would be a failure even if it works)

- Any fabricated fact: a project, date, metric, ranking or link the owner did not give.
- `accent` (red) border on the **resting** front card; red only on hover/focus and the
  8px tick.
- Alt text or captions painted over screenshots.
- Text peeking out of back cards (back cards are media-only).
- Vertical page scroll blocked by the mobile swipe.
- An animation that ignores `usePrefersReducedMotion` / `prefers-reduced-motion`.

## Constraints (from CLAUDE.md, restated because they bite here)

- Tokens only, no hardcoded colors. No `tailwind.config`. Assets go in `src/assets/` as `.webp`, imported.
- Adding the route means updating `ROUTES` in `seo.ts`, its test and `public/sitemap.xml`.
  The prerender picks the route up from `ROUTES` automatically.
- Done = `npm run build && npm run lint && npm run test` all pass.
- No code comments unless genuinely non-obvious.

## Owner decisions

| Topic | Decision |
|---|---|
| Featured order | MACHINA → Pars → Trimly. (The handoff had EcoPoints third. "Termly" in the request = Trimly.) |
| EcoPoints | Not featured. Shown on `/projects` under **University**. |
| Archive list (Haven, Stats & Estates, SoundSense, PokeInfo) | Removed from the landing page. These become `/projects` rows under **Experiments**. |
| Deck copy | Use the handoff's short copy for MACHINA and Trimly (kind, two-line description, stack line). |
| Pars facts | Given by owner, see data below. TypeScript confirmed. |
| Images | Capture from the live marketing sites; picks approved (see Images). |
| Skill-map `?stack=` links | Point at `/projects?stack=<tech>` instead of `/?stack=<tech>#projects`. |

## Data model (`src/data/projects.ts`, `src/types/index.ts`)

Merge `src/data/archive.ts` into `projects.ts` and delete `archive.ts`. The `projects` array
order **is** the `/projects` order (newest first). Changes to `Project`:

```ts
export type ProjectCategory = 'Production' | 'University' | 'Experiment';

export type Project = {
  id: string;
  title: string;            // short display name: 'MACHINA', 'Pars', 'Trimly'
  kind: string;             // one line
  category: ProjectCategory;
  year: number;             // /projects Year column + sort sanity
  period?: string;          // deck only, '2026 — Present' (em dash, spaced)
  status?: ProjectStatus;   // deck only; archive entries omit it
  description: string;      // the two-line deck copy
  techStack: string[];      // FULL list: drives ?stack= matching
  stack?: string[];         // display subset for the deck + /projects; defaults to techStack
  links: ProjectLink[];     // links[0] = primary CTA, links[1] = secondary text link
  cover?: { src: string; alt: string };  // the single 4:3 image
  caseStudy?: CaseStudy;
};

export const FEATURED_IDS = ['machina', 'pars', 'trimly'] as const;
```

Removed: `featured`, `version` (unused in the new UI), `images`, `demoLink`.
`ProjectLink.label` for the secondary link is the bare domain ("ridemachina.app"); the
component appends "↗". An `apps.apple.com` href renders as the App Store badge
(existing detection rule, kept).

### Entries (newest first)

| # | id | title | category | year | status | period |
|---|---|---|---|---|---|---|
| 01 | pars | Pars | Production | 2026 | Production | 2026 — Present |
| 02 | machina | MACHINA | Production | 2026 | Production | 2026 — Present |
| 03 | trimly | Trimly | Production | 2026 | Production | 2026 — Present |
| 04 | ecopoints | EcoPoints | University | 2024 | Completed | Jun 2024 — Apr 2025 |
| 05 | haven | Haven | Experiment | 2024 | — | — |
| 06 | soundsense | SoundSense | Experiment | 2024 | — | — |
| 07 | pokeinfo | PokeInfo | Experiment | 2024 | — | — |
| 08 | stats-and-estates | Stats & Estates | Experiment | 2023 | — | — |

The archive years come from each GitHub repo's `created_at`: Haven 2024-05, SoundSense
2024-04, PokeInfo 2024-03, Stats & Estates 2023-11.

**Pars** (owner-supplied):
- kind: `Mobile app for splitting trip expenses`
- description: `A mobile app for friend groups who split expenses on trips. Log who paid, split it fair, and settle up in a tap.`
- techStack: TypeScript, React Native, Expo, TanStack Query, Hono, Astro, GSAP, Preact
- stack: TypeScript, React Native, Expo, TanStack Query, Hono
- links: App Store `https://apps.apple.com/us/app/pars-split-bills-expenses/id6822402266` (FaApple), then `splitpars.app` → `https://splitpars.app` (FiExternalLink)
- no case study

The owner's feature list (receipt OCR, five split modes, nudges, etc.) is kept below in
"Raw material" for a future case study. It is **not** rendered.

**MACHINA**
- kind: `iOS motorcycle maintenance tracker`
- description: `Offline-first app that tracks service intervals, history and costs per bike. Multi-bike, no account, fully on-device.`
- techStack: unchanged (8 items)
- stack: TypeScript, React Native, Expo, SQLite, Drizzle ORM
- links: the existing App Store URL, then `ridemachina.app` → `https://ridemachina.app`
- caseStudy: unchanged. The "#3 in Utilities" ranking lives there and stays.

**Trimly**
- kind: `URL shortener and link manager`
- description: `Shorten long links and manage them in one place. Built on a NestJS backend with MongoDB and Redis.`
- techStack: unchanged
- stack: TypeScript, NestJS, React, MongoDB, Redis
- links: `Visit trimmly.xyz` → `https://www.trimmly.xyz` (solid primary)

**EcoPoints**
- kind: `Gamified recycling platform: mobile app + admin dashboard`
- description: first two sentences of the current copy
- techStack: unchanged
- links: unchanged (two GitHub repos)
- cover: existing `web_desktop_cover_image2.webp`

**Archive four**
- kind = the current tagline
- techStack = the current `tech` string split on " · "
- links = one GitHub link (FaGithub)
- no cover

Today's long descriptions for MACHINA, Trimly and EcoPoints have no surface left in the
new UI, so they are replaced, not kept alongside.

## Landing section (`src/sections/Projects.tsx`)

Structure, geometry, card anatomy, CTA tiers, footer row, states and a11y: **follow
HANDOFF.md §2 exactly**, with these repo specifics:

- **Heading.** Extend `SheetHeading` with an optional left `label` ("02 · Projects");
  meta = "03 selected". Title "Selected work". Description unchanged.
- **Featured list.** `FEATURED_IDS.map(id => projects.find(...)!)`. The deck renders
  whatever `n` that yields (≤ 3). `depth = (i - front + n) % n`.
- **One component, two layouts by container width, not viewport.** The content
  column sits beside the 11rem `LeftRail`. The desktop deck needs 880 + 192 = 1072px,
  which the column only reaches at roughly a 1312px viewport. Use Tailwind v4's native
  container queries: `@container` on the deck wrapper, and the wide deck at
  `@min-[67rem]`. Below that, use the mobile deck (HANDOFF §2.8) with the card width
  `min(100%, 560px)`; that one layout covers tablet too.
  - Positions live in CSS keyed on `data-depth="0|1|2"` per layout, so React only
    sets `data-depth`.
  - Tabs show in the wide layout. Counter, progress steps and prev/next show in the
    compact one.
- **Motion.** CSS transitions on `left`, `top`, `transform` with `duration-500
  ease-out-expo`; hover lift on `translate` at 200ms. With reduced motion, skip all
  transitions and swap instantly. Card internals must not shift on swap.
- **Section id.** Keep `<section id="projects" className="scroll-mt-20">`; the nav
  scroll-spy and `/#projects` links depend on it.
- **Card number.** `01–03` is the position in the deck, not in `/projects`.
- **Compact stack line.** Show the first 4 items of `stack ?? techStack`, so MACHINA
  drops Drizzle ORM and stays within two lines (HANDOFF §2.9). The wide layout shows all.
- **Swipe (compact).** Pointer events on the front card, `touch-action: pan-y`,
  |dx| > 40px. Wrap around at the ends (it's a rotation, like the tabs).
- **Live region.** Visually hidden `aria-live="polite"`: "Showing Pars, 2 of 3".
- **Remove.** The old `StackFilter`, `ProjectRail`, `Archive`, `CaseStudyModal` trigger via
  rail. The **Case study →** tertiary link on the MACHINA card still opens
  `CaseStudyModal` in place.
- **"See all projects →"** is an internal link to `/projects`, using `WipeLink` like the
  other internal links, styled as the outline button.

### Token mapping (handoff role name → repo)

| Handoff | Repo |
|---|---|
| surface-sunken / surface-page / surface-inverse | `bg-inset` / `bg-bg` / `bg-ink` |
| text-primary / secondary / meta / inverse | `text-ink` / `text-ink-2` / `text-ink-3` / `text-bg` |
| text-accent | `text-red-ink` |
| accent (tick, active rule, live dot) | `bg-red` / `border-red` |
| border-subtle / strong / control / accent | `border-line` / `border-line-2` / `border-line-3` / `border-red` |
| radius-sm | `rounded-sm` |
| focus-ring | the global `:focus-visible` rule already in `index.css`, nothing to add |
| opacity-recede | `opacity-60` |
| size-target | `min-h-11` / `size-11` (44px) |
| mono-label (12px/500/0.14em/upper, Plex Mono) | **new** `.mono-label` utility in `index.css` |
| title-lg, subtitle, body-compact, body-sm, display | arbitrary-value classes matching HANDOFF sizes, as `ProjectPanel` does today |

## `/projects` page (`src/pages/Projects.tsx`)

Follow **HANDOFF.md §3** for layout, type and states. Repo specifics:

- **Route.** Add `<Route path="/projects">` in `App.tsx`. Wrap the page in the same
  `<main>` + `Section` pattern as `Gear.tsx`, and call `useSEO(ROUTES['/projects'])`.
- **SEO.** Add a `ROUTES['/projects']` entry:
  - title: `Projects`
  - description: factual, for example `Everything Kim Roland Berame has shipped, studied, or tinkered with — production apps, university work, and experiments.`
  - Add a `seo.test.ts` case (title + description length, canonical
    `https://www.kimrolx.com/projects`).
  - Add a `<url>` to `public/sitemap.xml` (priority 0.8).
- **Back link.** "← Home" uses the `Gear.tsx` `WipeLink` pattern.
- **Heading.** SheetHeading label "Projects · Archive", meta "08 entries". The page `h1`
  is "All projects." in display size, with the period in `text-red`.
- **URL-driven filters.** `useSearchParams` for:
  - `?type=production|university|experiment`: button group with `aria-pressed` and
    zero-padded counts.
  - `?stack=<tech>`: when present, show the existing "Where I've used X" strip (move
    `StackFilter` here) with a Clear control that removes only `stack`.
  - Both combine with AND. Tech matching is case-insensitive against `techStack`.
  - No matches shows "No project lists it yet." in place of the list.
  - "Showing {shown} of {total}" reflects both filters.
- **Rows.** An `<ol>`, with each row a single link:
  - Case study → `/projects?case=<id>` (react-router `Link`, no wipe), and the page renders
    `CaseStudyModal` when `case` is set. Closing removes `case`.
  - Otherwise → `links[0].href`, external with `target="_blank" rel="noopener noreferrer"`.
- **Thumbnails.** `cover` with `object-cover`. Without a cover, show a `bg-inset` box with
  the project's initials in `label text-ink-3`.
- **Footer.** "More on GitHub ↗" (the link the landing section used to carry).
- **Mobile.** As HANDOFF §3.2, with full filter labels allowed to wrap.

## Skill map + CRT

- `src/components/SkillTree.tsx` `projectsHref` returns `/projects?stack=${encodeURIComponent(label)}`.
- `src/lib/crtCommands.ts` lists and `open <n>`s **featured** projects in deck order.
  Its "featured work" description stays accurate; `projectUrl` keeps using `links[0]`.

## Images

Final assets are 4:3 `.webp` (1200×900, `cwebp -q 80`, already installed at
`/opt/homebrew/bin/cwebp`), saved to `src/assets/projects/{machina,pars,trimly}.webp`.
The same file serves the desktop 4:3 frame, the mobile 16:10 frame (`object-cover`,
centered) and the 96×72 / 72×54 thumbnails. The approved draft crops are in
`docs/superpowers/specs/2026-11-04-projects-deck/crops/`. They show the framing only;
recapture cleanly:

| Project | Source | Framing | Alt |
|---|---|---|---|
| MACHINA | ridemachina.app, "See it in action" section, step "01 · Dashboard". The site is scroll-animated, so headless capture gives black frames; capture in a real browser after scrolling it into view, at 2× DPR. | The phone centered on its dark orange glow. No nav, no headline, no cursor, no scrollbar. | "MACHINA dashboard showing estimated odometer, urgent and due-soon service counts" |
| Pars | The owner's App Store preview `~/Pictures/pars/previews/preview-01-hero-1179x2556.png`. The splitpars.app hero loops a fade on its front phone, so every capture came out washed out. | The phone below the headline (home screen: Siargao trip, Other groups), padded left and right with the preview's flat `#8ecae6` to 4:3. | "Pars home screen showing a Siargao trip where you get back ₱2,450, with other groups below" |
| Trimly | trimmly.xyz hero, captured in a real browser with the hero text hidden locally. | The URL-shortener browser mockup centred at about 50% width on the indigo hero, so it survives the full-bleed card's tall 380px column (owner asked for full-bleed brand colour on the front card, 2026-11-04). | "Trimly shortening a long URL into a trimmly.xyz short link" |

Check the mobile 16:10 crop of each by eye. If one cuts badly, add a per-project
`object-position`; don't make a second asset.

## Deletions

- `src/components/ProjectRail.tsx`, `ProjectPanel.tsx`, `ProjectMedia.tsx`, `Archive.tsx`
- `src/data/archive.ts`
- `src/assets/machina/3.webp`, `5.webp`, and `src/assets/mobile_cover_image2.webp`, once
  nothing imports them
- In `index.css`: the `[data-tone=*]` gradients, `.media-stripes` + `stripe-drift`,
  `.project-rail*`, and the `[data-rail-card]` mono and reduced-motion rules. They are
  replaced by `.mono-label` and the deck's own reduced-motion handling.
- Keep `Lightbox` (Hero, Gear and Now use it) and `TechTag` (ExperienceEntry uses it).

## Design docs to update

The handoff widens where mono is allowed. Today `DESIGN.md` and `DESIGN-SYSTEM.md` limit
IBM Plex Mono to "the project rail". Update both to "the projects deck and the
`/projects` archive". In `DESIGN-SYSTEM.md`, replace the ProjectCard, DemoLink and App
Store badge entries with the deck card, the deck controls and the archive row.

## Verification

1. `npm run build && npm run lint && npm run test` pass. Check that `dist/projects/index.html`
   exists with the `/projects` title and canonical.
2. Run `npm run dev` and check by eye against the handoff screenshots:
   - **Desktop:** 1440px; compare with screenshots 01–04 and 07.
   - **Compact deck:** 390px (compare with 05, 06, 08) and 1024px; the compact deck must not overflow.
   - **Breakpoint:** the switch to the wide deck at about a 1312px viewport.
3. Keyboard: Tab reaches the tabs (wide) or the arrows (compact) and every front-card
   link. Enter or Space swaps cards, and the focus ring is visible.
4. With `prefers-reduced-motion: reduce` emulated, the swap is instant and nothing
   animates.
5. On touch emulation, a horizontal swipe cycles cards and a vertical drag scrolls the
   page.
6. `/projects?type=experiment&stack=Flutter` shows SoundSense and Stats & Estates.
   Clearing the stack filter keeps `type`. `/projects?case=machina` opens the case study.
7. A skill-map node click lands on `/projects?stack=…`.

## Left to the builder

- Component names and file split for the deck (suggested: `ProjectDeck.tsx` + `DeckCard.tsx`).
- How `SheetHeading` takes the label (prop shape), and whether `/projects` reuses it for
  the rule only.
- Exact arbitrary-value classes for the handoff type sizes.

## Calls made without the owner (check these)

1. **Pars period:** "2026 — Present". The owner said "September to present" without
   giving a year.
2. **Pars kind line** wording: "Mobile app for splitting trip expenses".
3. **`/projects` order within 2026:** Pars, MACHINA, Trimly. Trimly's start month isn't
   in the repo, so it's placed last.
4. **Archive years from GitHub repo creation dates:** Haven 2024, SoundSense 2024,
   PokeInfo 2024, Stats & Estates 2023.
5. **EcoPoints kind line** reworded to sentence case to match the others. The
   description is cut to its first two sentences.
6. **Long descriptions dropped** for MACHINA, Trimly and EcoPoints, because nothing renders
   them any more. The MACHINA ranking survives in its case study.
7. **Tablet:** handled by the compact deck capped at 560px. The wide deck switches on by
   container width (~1312px viewport), not at `lg`.
8. **The CRT easter egg** lists only the three featured projects.

## Raw material: Pars features (owner-supplied, not rendered)

- **Home:** net owed to you, net you owe, and who to settle with soon.
- **Groups:** each group is a trip (beach, mountains, city, party), with dates and members.
- **Add expense:** five split modes (evenly, by shares, exact amounts, by percent, itemized). Supports more than one payer.
- **Receipt scan:** OCR fills in the merchant, items and prices. The user confirms and taps who had what. Service charge is split proportionally.
- **Balances:** simplified "who pays whom" transfers, or the raw per-expense view. Same totals either way.
- **Settle up:** records payments made outside the app (GCash, Maya, bank transfer, cash). Partial payments are supported.
- **Nudge:** gentle, straight or cheeky reminder tones, rate-limited, sent as a push notification.
- **Invite:** a join link, or text a friend's PH mobile number.
- **Activity:** a live feed of expenses, settlements, nudges and joins.
- **Tagline:** "Split the trip, not the friendship."
