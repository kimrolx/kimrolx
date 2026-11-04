# Featured Projects Deck + `/projects` Archive Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the landing carousel with a 3-card stacked deck (MACHINA → Pars → Trimly) and add a filterable `/projects` archive fed by one project list.

**Architecture:**
- Pure list logic lives in `src/lib/projectList.ts` and is unit-tested with `node --test`.
- The deck is one React component whose two layouts (wide stacked / compact swipe) switch on **container width** via CSS `@container`. Card positions are CSS keyed on `data-depth`, so React only sets state.
- `/projects` is a new route. Its filters and the case-study modal are driven by URL search params.

**Tech Stack:** React 18, react-router-dom 7, Tailwind CSS v4 (`@theme` in `src/index.css`), react-icons (Fi*, FaApple, FaGithub), tsx `node:test`, cwebp.

**Spec:** `docs/superpowers/specs/2026-11-04-projects-deck-design.md`. Pixel geometry, copy and states come from `docs/superpowers/specs/2026-11-04-projects-deck/handoff/HANDOFF.md` (§2 deck, §3 archive). Read both before starting.

## Global Constraints

- **Never commit, push, branch or deploy.** CLAUDE.md overrides this skill's commit steps. Each task ends with a verification checkpoint; the owner commits.
- No new dependencies. No `tailwind.config`. Colors come only from tokens (`bg-inset`, `text-ink-2`, `border-line-3`, `text-red-ink`, `bg-red`, …); see the spec's token mapping table.
- Assets are `.webp` in `src/assets/`, imported. Never touch `dist/` or `index.html` head meta.
- No code comments unless intent is genuinely non-obvious.
- Every animation honors `usePrefersReducedMotion` (`src/hooks/usePrefersReducedMotion.ts`).
- Touch targets are ≥ 44px (`min-h-11`).
- **Never invent facts.** All copy and data values are fixed by the spec's "Entries" section. Copy them verbatim.
- Period strings use a spaced em dash: `2026 — Present`.
- Done means `npm run build && npm run lint && npm run test` all pass.

## Review Focus

1. **Unknown or garbage `?type=` values** (`?type=foo`, `?type=`) should fall back to "All", not show an empty list. Tested in Task 1 (`parseCategory`).
2. **`?stack=` case and whitespace mismatch** (`?stack=%20flutter`) should still match "Flutter". Tested in Task 1 (`filterProjects`).
3. **A filter combination with no matches** should show the empty message and all-zero counts, without crashing. Tested in Task 1; rendered in Task 5.
4. **Small or vertical gestures on the mobile deck** (|dx| ≤ 40px, or scrolling) must not swap cards. Tested in Task 1 (`swipeStep`); `touch-action: pan-y` in Task 4.
5. **`?case=` with an unknown id** should render no modal and not crash. Tested in Task 1 (`findProject`); used in Task 5.

---

### Task 1: Pure project-list helpers

**Files:**
- Create: `src/lib/projectList.ts`
- Create: `src/lib/projectList.test.ts`
- Modify: `src/types/index.ts`. Add `ProjectCategory` and the new `Project` shape now, so the helpers type-check. The full type is in the spec's "Data model" section; copy it exactly, including `FEATURED_IDS` (which goes in `projects.ts` in Task 3, not here).
- Modify: `package.json`. Append `src/lib/projectList.test.ts` to the `test` script.

`src/types/index.ts` changing breaks `ProjectPanel` and friends until Task 3. That's expected. Run only the unit test in this task, not `tsc`.

**Interfaces (Produces):**
```ts
export const CATEGORIES: readonly ProjectCategory[]; // ['Production','University','Experiment']
export function categorySlug(c: ProjectCategory): string;            // 'production' | 'university' | 'experiment'
export function parseCategory(slug: string | null): ProjectCategory | null;
export function filterProjects(list: Project[], f: { category: ProjectCategory | null; stack: string | null }): Project[];
export function countByCategory(list: Project[]): Record<ProjectCategory | 'All', number>;
export function pickFeatured(list: Project[], ids: readonly string[]): Project[]; // throws on unknown id
export function findProject(list: Project[], id: string | null): Project | undefined;
export function deckDepth(index: number, front: number, n: number): number;
export function stepFront(front: number, delta: number, n: number): number;      // wraps
export function swipeStep(dx: number): -1 | 0 | 1;                              // threshold 40px
export function initials(title: string): string;
```

- [ ] **Step 1: Write the failing tests** in `src/lib/projectList.test.ts`.
  - Use a fixture builder `mk(id, category, techStack, title = id)` that returns a `Project` with `kind:'k'`, `year:2024`, `description:'d'`, `links:[]`.
  - Import only types from `../types/index.ts`; never import `src/data/*`, because `.webp` imports break under tsx.

```ts
test('parseCategory maps slugs and rejects junk', () => {
  assert.equal(parseCategory('production'), 'Production');
  assert.equal(parseCategory('experiment'), 'Experiment');
  assert.equal(parseCategory('foo'), null);
  assert.equal(parseCategory(''), null);
  assert.equal(parseCategory(null), null);
});
test('categorySlug round-trips', () => {
  for (const c of CATEGORIES) assert.equal(parseCategory(categorySlug(c)), c);
});
test('filterProjects: stack is case-insensitive and trimmed, ANDs with category', () => {
  const list = [mk('a','Experiment',['Flutter','Dart']), mk('b','University',['Flutter']), mk('c','Experiment',['React'])];
  assert.deepEqual(filterProjects(list,{category:null,stack:' flutter '}).map(p=>p.id), ['a','b']);
  assert.deepEqual(filterProjects(list,{category:'Experiment',stack:'FLUTTER'}).map(p=>p.id), ['a']);
  assert.deepEqual(filterProjects(list,{category:'Production',stack:'Flutter'}), []);
  assert.equal(filterProjects(list,{category:null,stack:''}).length, 3);
});
test('countByCategory counts each and All, zeros included', () => {
  const list = [mk('a','Experiment',[]), mk('b','Experiment',[]), mk('c','Production',[])];
  assert.deepEqual(countByCategory(list), { All:3, Production:1, University:0, Experiment:2 });
  assert.deepEqual(countByCategory([]), { All:0, Production:0, University:0, Experiment:0 });
});
test('pickFeatured keeps id order and throws on unknown id', () => {
  const list = [mk('trimly','Production',[]), mk('machina','Production',[]), mk('pars','Production',[])];
  assert.deepEqual(pickFeatured(list,['machina','pars','trimly']).map(p=>p.id), ['machina','pars','trimly']);
  assert.throws(() => pickFeatured(list,['nope']), /Unknown featured project: nope/);
});
test('findProject returns undefined for null or unknown id', () => {
  const list = [mk('machina','Production',[])];
  assert.equal(findProject(list,'machina')?.id, 'machina');
  assert.equal(findProject(list,'ghost'), undefined);
  assert.equal(findProject(list,null), undefined);
});
test('deckDepth rotates so front is 0', () => {
  assert.deepEqual([0,1,2].map(i=>deckDepth(i,0,3)), [0,1,2]);
  assert.deepEqual([0,1,2].map(i=>deckDepth(i,1,3)), [2,0,1]);
  assert.deepEqual([0,1].map(i=>deckDepth(i,1,2)), [1,0]);
});
test('stepFront wraps both ways', () => {
  assert.equal(stepFront(2,1,3), 0);
  assert.equal(stepFront(0,-1,3), 2);
});
test('swipeStep ignores |dx| <= 40', () => {
  assert.equal(swipeStep(-41), 1);
  assert.equal(swipeStep(41), -1);
  assert.equal(swipeStep(-40), 0);
  assert.equal(swipeStep(30), 0);
});
test('initials', () => {
  assert.equal(initials('Stats & Estates'), 'SE');
  assert.equal(initials('Haven'), 'HA');
  assert.equal(initials('PokeInfo'), 'PO');
});
```

- [ ] **Step 2: Run** `npx tsx --test src/lib/projectList.test.ts`. Expected: FAIL (module not found).
- [ ] **Step 3: Implement** `src/lib/projectList.ts` with the signatures above.
  - `filterProjects` trims and lower-cases `stack`; an empty or whitespace-only stack means no stack filter.
  - `initials` takes the first letter of each word that starts with a letter, at most 2. A single word gives its first two letters. Output is uppercase.
- [ ] **Step 4: Run** `npx tsx --test src/lib/projectList.test.ts`. Expected: all pass.

---

### Task 2: Capture and export the three cover images

**Files:**
- Create: `src/assets/projects/machina.webp`, `pars.webp`, `trimly.webp`

The framing and alt text are in the spec's "Images" table. The approved framing references are in `docs/superpowers/specs/2026-11-04-projects-deck/crops/`. Work in the session scratchpad and copy only the final `.webp` files into the repo.

- [ ] **Step 1: Pars + Trimly (headless).** Run `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --force-device-scale-factor=2 --window-size=1440,1080 --virtual-time-budget=8000 --screenshot=<out>.png https://splitpars.app` (the same for `https://www.trimmly.xyz`). Expected output is 2880×2160.
- [ ] **Step 2: Crop to 4:3.** Use `sips -c <h> <w> --cropOffset <y> <x>` (note: y before x).
  - Trimly: `-c 840 1120 --cropOffset 1180 880` reproduces the approved draft.
  - Pars: start from `-c 1440 1920 --cropOffset 320 960`, then increase x until no headline glyphs show on the left edge, keeping both phones whole.
- [ ] **Step 3: MACHINA (real browser).**
  - ridemachina.app animates on scroll; headless captures black frames.
  - With the claude-in-chrome tools, open ridemachina.app, scroll until the "See it in action" step `01 · Dashboard` phone is fully shown, and move the cursor off the phone.
  - Screenshot with `save_to_disk`. Prefer a `zoom` capture of the phone region if it returns higher resolution.
  - Crop to 4:3 with the phone centered. No nav, headline, cursor or scrollbar.
- [ ] **Step 4: Export.**
  - Pars and Trimly: `cwebp -q 80 -resize 1200 900 in.png -o src/assets/projects/<id>.webp`.
  - MACHINA: export at its native crop size if that's under 1200 wide; never upscale.
- [ ] **Step 5: Verify.** `sips -g pixelWidth -g pixelHeight src/assets/projects/*.webp` shows a 4:3 ratio for all three. View each file and confirm there's no stray UI chrome.

---

### Task 3: Data model swap and removing the carousel

**Files:**
- Modify: `src/data/projects.ts`. Rewrite it to the spec's 8 entries, in the spec's order, and export `FEATURED_IDS`.
- Delete: `src/data/archive.ts`, `src/components/{ProjectRail,ProjectPanel,ProjectMedia,Archive}.tsx`, `src/assets/machina/3.webp`, `src/assets/machina/5.webp`, `src/assets/mobile_cover_image2.webp`
- Modify: `src/index.css`. Delete the `[data-tone=*]` blocks, `.media-stripes` and its media query, `@keyframes stripe-drift`, all `.project-rail*` rules, and the `[data-rail-card]` rules, including those inside the reduced-motion block.
- Modify: `src/sections/Projects.tsx`. For now it renders only `<section id="projects" className="scroll-mt-20">` with the `SheetHeading`; `StackFilter` and `CaseStudyModal` usage are removed. Task 4 fills it in.
- Modify: `src/lib/crtCommands.ts`. List and `open` `pickFeatured(projects, FEATURED_IDS)` instead of `projects`.
- Modify: `src/components/StatusPill.tsx`. New signature `StatusPill({ label, live, className }: { label: string; live: boolean; className?: string })`: a 6px `bg-red` dot plus `text-red-ink` when live, the word alone in `text-ink-3` otherwise.

**Interfaces:**
- Consumes: `Project`, `ProjectCategory` (Task 1), `pickFeatured` (Task 1).
- Produces:
  - `projects: Project[]` (newest first)
  - `FEATURED_IDS = ['machina','pars','trimly'] as const`
  - Covers imported from `@/assets/projects/*.webp` (Task 2) for machina, pars and trimly; EcoPoints uses `@/assets/web_desktop_cover_image2.webp`.
  - `StatusPill` with the new signature.

- [ ] **Step 1: Rewrite `projects.ts`** with values copied verbatim from the spec's "Entries" section.
  - Archive `techStack` = the old `tech` string split on `' · '`.
  - Archive `kind` = the old tagline.
  - Archive `links` = `[{ label: 'Source', href, icon: FaGithub }]`.
  - Keep MACHINA's `caseStudy` object unchanged.
- [ ] **Step 2: Delete** the listed files and CSS, and apply the `Projects.tsx`, `crtCommands.ts` and `StatusPill.tsx` changes.
- [ ] **Step 3: Verify no dangling references.** Run `grep -rn "ProjectRail\|ProjectPanel\|ProjectMedia\|data/archive\|data-rail-card\|media-stripes\|\.featured\|demoLink\|\.images" src`. Expected: no output.
- [ ] **Step 4: Verify.** Run `npm run build && npm run lint && npm run test`. Expected: all pass. Then `npm run dev`: the landing page shows the Projects heading with no carousel, and the Konami terminal's `projects` lists MACHINA, Pars, Trimly.

---

### Task 4: Landing stacked deck

**Files:**
- Create: `src/components/ProjectDeck.tsx`. It owns `front` state, the live region, both control sets and swipe.
- Create: `src/components/DeckCard.tsx`. It renders one card at a given depth.
- Modify: `src/components/SheetHeading.tsx`. Add an optional `label?: string`, rendered after the red tick as `mono-label text-ink-3`; `meta` stays on the right.
- Modify: `src/sections/Projects.tsx`. Render SheetHeading (`label="02 · Projects"`, `meta="03 selected"`, `title="Selected work"`, existing description), then `<ProjectDeck projects={pickFeatured(projects, FEATURED_IDS)} onOpenCaseStudy={setCaseStudy} />`, then `CaseStudyModal`.
- Modify: `src/index.css`. Add the `.mono-label` utility (`font-family: var(--font-mono); font-size: .75rem; font-weight: 500; letter-spacing: .14em; text-transform: uppercase;`) and the deck position rules below.

**Interfaces:**
- Consumes: `deckDepth`, `stepFront`, `swipeStep` (Task 1); `StatusPill` (Task 3); `ButtonLink` from `base-components/button`; `WipeLink`; `app_store_badge.svg`.
- Produces:
  - `ProjectDeck({ projects, onOpenCaseStudy }: { projects: Project[]; onOpenCaseStudy: (p: Project) => void })`
  - `DeckCard({ project, number, total, depth, onBring, onOpenCaseStudy })`, where `number` is `'01'…` and `depth` is `0|1|2`
  - `.mono-label`, also used by Task 5

**Layout mechanics:**
- The deck wrapper gets Tailwind's `@container` class. The wide layout is `@container (min-width: 67rem)`; everything below it is compact. In TSX, use the `@min-[67rem]:` variant for show/hide and grid changes.
- Positions are plain CSS on `.deck-card[data-depth]`, with values from HANDOFF:

| | container height | card w × h | depth 0 | depth 1 | depth 2 |
|---|---|---|---|---|---|
| compact | 744px | `min(calc(100% - 32px), 560px)` × 680px | `left:0; top:64px; scale:1` | `16px; 32px; .97` | `32px; 0; .94` |
| wide (≥67rem) | 656px | 880 × 560px | `0; 96px; 1` | `96px; 48px; .96` | `192px; 0; .92` |

  - Use `transform-origin: top right` and `z-index: 3 - depth`.
  - Transition `left, top, scale` over 500ms `var(--ease-out-expo)`. Also transition `translate` over 200ms for the back-card hover lift (`translate: 0 -6px`).
  - The whole transition is disabled when `usePrefersReducedMotion()` is true: apply `transition-none` via a class on the wrapper.

- [ ] **Step 1: Build `DeckCard`** per HANDOFF §2.3 and §2.4.
  - **Article:** `<article aria-label="Project {n} of {total}: {title}">`.
  - **Header strip (all depths):** 48px wide / 32px compact. Left: the 8px `bg-red` square (front only), `number` in `text-ink-3`, then the title. Right: `StatusPill label={status} live={status==='Production'}`.
  - **Front body:**
    - `cover` in a 4:3 frame (wide) or 16:10 frame (compact), using `object-cover`, `border-line` and `rounded-sm`.
    - Then: `period`, title, `kind`, `description` (`line-clamp-2`), and the stack line (`stack ?? techStack` joined with `' · '`). In compact, show only the first 4 items.
    - Then the CTA row:
      - **Primary:** `links[0]`. An `apps.apple.com` href renders the badge `<img>` with alt "Download on the App Store", `h-12` wide / `h-[52px]` compact. Anything else is a `ButtonLink` styled `min-h-12 px-5 mono-label` showing `{label} ↗`.
      - **Secondary:** `links[1]`, a text link in `mono-label text-ink min-h-11 hover:text-red-ink` reading `{label} ↗`.
      - **Tertiary:** if `caseStudy`, a `<button>` in `mono-label text-ink-2` reading `Case study →` that calls `onOpenCaseStudy`.
      - In compact, the CTAs stack full-width.
    - All external links use `target="_blank" rel="noopener noreferrer"`.
  - **Back body (depth > 0):**
    - The cover fills the body at `opacity-60`. No text and no links.
    - A full-cover `<button type="button" aria-label="Show {title}">` calls `onBring`.
    - Hover (via `group`): border becomes `border-red`, the header title becomes `text-red-ink`, cover opacity goes to `.85`, and the card lifts.
  - Resting borders: front `border-line-2`, back `border-line`. No shadows.
- [ ] **Step 2: Build `ProjectDeck`.**
  - **State and cards:** `front` state, initially 0. Each card gets `depth = deckDepth(i, front, n)`.
  - **Live region:** visually hidden (`sr-only`), `aria-live="polite"`, reading `Showing {title}, {front+1} of {n}`. Leave it empty on first render so nothing is announced on page load.
  - **Wide footer** (`hidden @min-[67rem]:flex`, justify-between):
    - Left: a tab group of `<button aria-pressed>` with `mono-label`, `min-h-11 px-4` and a 2px bottom border (`border-red` when active). The number is `text-ink-3`; the label is `text-ink` when active, `text-ink-2` otherwise.
    - Right: the "See all projects" link.
  - **Compact controls** (`@min-[67rem]:hidden`):
    - Counter `0{front+1} / 0{n}` in mono.
    - n progress steps, each 24×2px (`bg-red` when active, else `bg-line-2`).
    - Prev/next `size-11 border border-line-3` buttons with `FiArrowLeft`/`FiArrowRight` and `aria-label` "Previous project" / "Next project", calling `stepFront`.
    - Below these, the full-width 52px "See all projects" link.
  - **"See all projects →":** a `WipeLink to="/projects"` styled as the outline button (`border border-line-3 text-ink min-h-12 px-6 mono-label`) with `FiArrowRight`.
  - **Swipe:** on the front card, record `clientX` on `pointerdown`. On `pointerup`, call `setFront(stepFront(front, swipeStep(dx), n))`. Ignore `pointercancel`. Set `touch-action: pan-y` on the card.
- [ ] **Step 3: Verify.** Run `npm run build && npm run lint && npm run test`. Expected: pass. Then in `npm run dev` check:
  - **1440×900:** layout matches handoff screenshots 01–04. Clicking a back card or a tab swaps cards in 500ms. Each back card's header strip is fully visible at every depth. The resting front card has no red border.
  - **1024 and 390 widths:** compact deck with no horizontal overflow. Swipe and arrows cycle the cards, and a vertical drag scrolls the page (DevTools touch emulation).
  - **Reduced motion** (DevTools rendering emulation): swaps are instant.
  - **Keyboard:** Tab reaches the tabs or arrows and every front-card link; Enter or Space swaps; the focus ring is visible.
  - **Case study:** "Case study →" on MACHINA opens the modal.

---

### Task 5: `/projects` page, route, SEO, skill-map link

**Files:**
- Create: `src/pages/Projects.tsx`
- Create: `src/components/ProjectRow.tsx`
- Modify: `src/App.tsx`. Add `<Route path="/projects" element={<Projects />} />`. Import it as `ProjectsPage` to avoid clashing with the `Projects` section.
- Modify: `src/config/seo.ts`. Add `ROUTES['/projects']` with `title: 'Projects'` and the spec's description verbatim.
- Modify: `src/config/seo.test.ts`
- Modify: `public/sitemap.xml`. Add a `/projects` `<url>` with `<changefreq>monthly</changefreq><priority>0.8</priority>`.
- Modify: `src/components/SkillTree.tsx:67-69`. `projectsHref` returns `` `/projects?stack=${encodeURIComponent(label)}` ``.

**Interfaces:**
- Consumes: `parseCategory`, `categorySlug`, `CATEGORIES`, `filterProjects`, `countByCategory`, `findProject`, `initials` (Task 1); `projects` (Task 3); `StatusPill`, `.mono-label` (Tasks 3–4); `SheetHeading` with `label` (Task 4); `CaseStudyModal`, `Section`, `WipeLink`, `useSEO`.
- Produces: `ProjectRow({ project, number }: { project: Project; number: string })`, rendering an `<li>` that contains one link.

- [ ] **Step 1: Write the failing SEO test** in `src/config/seo.test.ts`:

```ts
test('projects route resolves with path canonical', () => {
  assert.equal(ROUTES['/projects'].title, 'Projects');
  assert.ok(ROUTES['/projects'].description.length > 20);
  const m = resolveMeta(ROUTES['/projects']);
  assert.equal(m.fullTitle, 'Projects — Kim Roland Berame');
  assert.equal(m.canonical, 'https://www.kimrolx.com/projects');
});
```

- [ ] **Step 2: Run** `npx tsx --test src/config/seo.test.ts`. Expected: FAIL (TS error or undefined route).
- [ ] **Step 3: Add the `ROUTES` entry.** Run the test again; expected: PASS.
- [ ] **Step 4: Build `ProjectRow`** per HANDOFF §3.1 and §3.2.
  - **Link target:** with `caseStudy`, a react-router `<Link to={`?case=${id}`}>` that keeps any existing `type`/`stack` params. Otherwise an `<a href={links[0].href} target="_blank" rel="noopener noreferrer">`.
  - **Thumbnail:** `cover` with `object-cover`. Without one, a `bg-inset border-line` box showing `initials(title)` in `mono-label text-ink-3`.
  - **Type cell:** `StatusPill label={category} live={category==='Production'}`.
  - **Wide grid:** `56px 96px 1fr 160px 280px 96px 24px`.
  - **Mobile grid:** `72px 1fr 20px`.
  - **Hover:** the name becomes `text-red-ink`, and the `FiArrowRight` moves `translate-x-1` and turns `text-red-ink`. The arrow movement is disabled under `motion-reduce:`.
- [ ] **Step 5: Build `pages/Projects.tsx`.**
  - **Wrapper:** the same `<main>` + `Section` wrapper as `Gear.tsx`, plus `useSEO(ROUTES['/projects'])`.
  - **Back link:** "← Home" via `WipeLink`, `min-h-11`.
  - **Heading:**
    - SheetHeading rule with `label="Projects · Archive"` and `meta` = `` `${String(projects.length).padStart(2, '0')} entries` ``.
    - Then an `h1` "All projects" plus a `<span className="text-red">.</span>`, sized `text-[clamp(3rem,8vw,4.5rem)] font-black leading-[0.92] tracking-[-0.04em]`.
    - Then the intro "Everything I've shipped, studied or tinkered with, newest first." in `text-ink-2`.
  - **Filters from `useSearchParams`:**
    - `category = parseCategory(params.get('type'))`, `stack = params.get('stack')`.
    - `stackMatched = filterProjects(projects, { category: null, stack })`; `counts = countByCategory(stackMatched)`; `shown = filterProjects(projects, { category, stack })`.
  - **Filter group:** `role="group" aria-label="Filter projects by type"`. The buttons are All plus `CATEGORIES`, labelled "Experiments" for `Experiment`, each with a zero-padded count. Each sets or deletes `type` with `replace: true` and keeps `stack`.
  - **Stack strip** (when `stack` is set): `Where I've used {stack}` and a Clear button that deletes only `stack`. This is the old `StackFilter` markup moved here.
  - **List:**
    - Desktop header row (`aria-hidden`): No. · Project · Type · Stack · Year.
    - Then `<ol>` of `ProjectRow`, where `number` is the 1-based position in the full `projects` list, zero-padded.
    - When `shown` is empty, show `No project lists it yet.` in `text-ink-3` instead of the `<ol>`.
  - **Footer:** `Showing {shown.length} of {projects.length}` on the left, and "More on GitHub ↗" on the right, linking to `https://github.com/kimrolx`.
  - **Case-study modal:** `<CaseStudyModal project={findProject(projects, params.get('case')) ?? null} onClose={...}>`, where `onClose` deletes only `case`.
- [ ] **Step 6: Add the route, sitemap entry and `SkillTree` href change.**
- [ ] **Step 7: Verify.** Run `npm run build && npm run lint && npm run test`. Expected: pass. Then:
  - `grep -c "<title>Projects — Kim Roland Berame</title>" dist/projects/index.html` → `1`
  - In `npm run dev`:
    - `/projects` matches handoff screenshots 07–08.
    - `/projects?type=experiment&stack=Flutter` shows SoundSense and Stats & Estates, "Showing 2 of 8".
    - Clear keeps `type=experiment`.
    - `/projects?type=foo` shows all 8.
    - `/projects?case=machina` opens the case study, and closing it removes `case`.
    - `/projects?case=ghost` shows no modal.
    - Clicking a skill node on `/skills` lands on `/projects?stack=…`.
    - "See all projects" on the landing page navigates with the wipe.

---

### Task 6: Design-doc sync and final check

**Files:**
- Modify: `DESIGN.md:117,137`. "IBM Plex Mono appears only inside the project rail (counter, card labels, chips, buttons, DemoLink)" becomes "…only inside the projects deck and the `/projects` archive (header strips, labels, tabs, filters, CTAs)". Make the same change in the "Don't" line.
- Modify: `DESIGN-SYSTEM.md`:
  - Line 11: drop the DemoLink clause. A project with no screenshot shows its initials on `/projects` and never appears in the deck.
  - Line 101: change the mono scope to match `DESIGN.md`.
  - Line 121: remove the `mono-link` row.
  - Line 232: StatusPill is now a `label` + `live` boolean (dot + `text-red-ink` when live, word in `text-ink-3` otherwise).
  - Lines 238, 243 and 244: replace ProjectCard, DemoLink and the App Store badge's location with three entries:
    - **DeckCard / ProjectDeck:** header strip, depth geometry, CTA tiers, container-query switch at 67rem.
    - **ProjectRow:** grid, hover, initials fallback.
    - **`.mono-label`:** the utility's values.

- [ ] **Step 1: Apply both doc edits.**
- [ ] **Step 2: Run** `grep -n "project rail\|DemoLink\|ProjectPanel\|mono-link" DESIGN.md DESIGN-SYSTEM.md`. Expected: no output.
- [ ] **Step 3: Final verification.** Run `npm run build && npm run lint && npm run test`. Expected: all pass. Report each command's result to the owner.
