# Hero Portrait Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one grayscale-to-color portrait to the hero right column, above the spec list, without breaking the Swiss typographic aesthetic.

**Architecture:** A self-contained portrait block is added to the top of the existing right-hand column in `src/sections/Hero.tsx`. It reuses the project-media frame idiom (`rounded-sm border border-line bg-inset`), folds into the existing Motion stagger as one more `variants={item}` child, and carries a Swiss-aligned red corner tick. Grayscale-by-default with color-on-hover is expressed with Tailwind utilities plus one small `@media (hover: hover)` rule in `index.css` so touch devices show full color.

**Tech Stack:** React 18, TypeScript, Tailwind CSS v4, Motion (`motion/react`), Vite.

## Global Constraints

- **Achromatic only:** no color introduced except the existing `red`/`red-ink` tokens. Copied verbatim from DESIGN.md: "Don't tint the neutrals warm or cool."
- **Rules, Not Boxes:** single hairline frame, no shadow, no nested frame, no card.
- **The Red Rule:** red is accent, never fill of a surface; the tick is a 6px square, nothing more.
- **Reveal-to-Visible / reduced motion:** every animation has a reduced-motion fallback; content is visible without JS.
- **One family:** no new typeface, no new dependency.
- **No test runner exists** in this repo. Verification is `npm run lint`, `npm run build`, and visual check via `npm run dev`. Do not add a test framework.
- Import assets via the existing pattern: `import x from '@/assets/...'`.

---

### Task 1: Add the portrait asset and grayscale hover CSS

**Files:**
- Create: `src/assets/portrait.jpg` (provided by Kim; a 4:5 portrait, min 880×1100, ideally 1760×2200)
- Modify: `src/index.css` (add one `@media (hover: hover)` utility)

**Interfaces:**
- Consumes: nothing.
- Produces: the asset path `@/assets/portrait.jpg`, and a CSS class `.portrait-photo` that is grayscale only where hover is available, color otherwise.

- [ ] **Step 1: Place the portrait asset**

Save the provided photo to `src/assets/portrait.jpg`. If Kim has not provided it yet, use any temporary 4:5 placeholder image at that path so the build resolves, and flag it for replacement.

- [ ] **Step 2: Add the grayscale/hover rule to `src/index.css`**

Add this block near the other component-level rules (after the base layer, alongside the reveal/crt utilities). Tailwind cannot express "grayscale only when hover is available" inline, so this owns that logic:

```css
/* Hero portrait: grayscale where hover exists (desktop), full color on hover.
   Touch/coarse pointers have no hover, so they show full color always. */
.portrait-photo {
  filter: none;
  transition: filter 0.5s var(--ease-out-expo);
}

@media (hover: hover) {
  .portrait-photo {
    filter: grayscale(1);
  }
  .group:hover .portrait-photo,
  .group:focus-visible .portrait-photo {
    filter: grayscale(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .portrait-photo {
    transition: none;
  }
}
```

- [ ] **Step 3: Verify build resolves the asset and CSS**

Run: `npm run build`
Expected: build succeeds, no "cannot resolve `@/assets/portrait.jpg`" error.

- [ ] **Step 4: Commit**

```bash
git add src/assets/portrait.jpg src/index.css
git commit -m "feat: add hero portrait asset and grayscale-on-hover CSS"
```

---

### Task 2: Render the portrait in the hero right column

**Files:**
- Modify: `src/sections/Hero.tsx`

**Interfaces:**
- Consumes: `@/assets/portrait.jpg` and the `.portrait-photo` class from Task 1; the existing `container`/`item` Motion variants and `profile` already in the file.
- Produces: the visible hero portrait. No exported API.

- [ ] **Step 1: Import the asset**

At the top of `src/sections/Hero.tsx`, with the other imports:

```tsx
import portrait from '@/assets/portrait.jpg';
```

- [ ] **Step 2: Wrap the right column so the portrait stacks above the spec list**

The right column is currently the `motion.dl` (the spec list) as the second grid child. Wrap it and the new portrait in a `motion.div` column so the portrait sits above the specs. Replace the opening of the spec-list block. Change from:

```tsx
        {/* Spec list — Swiss ruled, no card */}
        <motion.dl
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full flex-col"
        >
```

to:

```tsx
        {/* Right column — portrait over the Swiss ruled spec list */}
        <div className="flex w-full flex-col gap-8">
          {/* Portrait: hairline frame, grayscale → color on hover, Swiss red corner tick */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="group relative w-full max-w-xs self-start"
          >
            <motion.div
              variants={item}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-line bg-inset transition-colors group-hover:border-line-2"
            >
              <img
                src={portrait}
                alt={profile.name}
                width={1760}
                height={2200}
                loading="eager"
                decoding="async"
                className="portrait-photo h-full w-full object-cover"
              />
            </motion.div>
            {/* Swiss-aligned red tick: 6px square flush to the frame's top-left corner */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 h-1.5 w-1.5 bg-red"
            />
          </motion.div>

          {/* Spec list — Swiss ruled, no card */}
          <motion.dl
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-full flex-col"
          >
```

- [ ] **Step 3: Close the new wrapper div**

The spec list currently ends with `</motion.dl>` followed by the grid-closing `</div>`. Add a closing `</div>` for the new right-column wrapper immediately after `</motion.dl>`:

```tsx
            ))}
          </motion.dl>
        </div>
      </div>
```

(The first `</div>` closes the new right-column wrapper; the second is the existing grid close. Verify brace/tag balance after editing.)

- [ ] **Step 4: Verify lint and build pass**

Run: `npm run lint && npm run build`
Expected: no errors, no unbalanced-JSX TypeScript errors.

- [ ] **Step 5: Visual check**

Run: `npm run dev`, open the site.
Expected:
- Portrait appears at the top of the hero right column, above the six spec rows.
- It is grayscale on desktop; hovering it warms to full color and the border brightens.
- A small red square sits flush in the frame's top-left corner, aligned to the edges (not floating outside).
- On a narrow viewport (or touch device / dev-tools mobile emulation), the portrait shows full color and still lands early in the stack.
- Portrait fades/lifts in with the hero load stagger.

- [ ] **Step 6: Verify reduced-motion**

In dev-tools, emulate `prefers-reduced-motion: reduce`.
Expected: portrait is present and correctly colored (grayscale on desktop, color on touch), with no filter transition and no load-stagger movement.

- [ ] **Step 7: Commit**

```bash
git add src/sections/Hero.tsx
git commit -m "feat: render grayscale hero portrait above the spec list"
```

---

## Self-Review

**Spec coverage:**
- One portrait, hero right, above specs → Task 2, Step 2. ✓
- Grayscale → color on hover, touch shows color → Task 1 CSS + Task 2 img class. ✓
- Frame `rounded-sm border border-line bg-inset` → Task 2, Step 2. ✓
- Swiss-aligned red corner tick → Task 2, Step 2 (`absolute left-0 top-0 h-1.5 w-1.5 bg-red`). ✓
- 4:5 crop, object-cover → Task 2, Step 2 (`aspect-[4/5]`, `object-cover`). ✓
- Load motion via `variants={item}` → Task 2, Step 2. ✓
- Reduced-motion fallback → Task 1 CSS + Task 2 Step 6 verify. ✓
- a11y: alt, eager, async, width/height → Task 2, Step 2. ✓
- Export spec for the photo → Task 1, Step 1. ✓

**Placeholder scan:** No TBD/TODO left except the deliberate "temporary placeholder image" fallback in Task 1 Step 1, which is a real instruction, not a gap.

**Type consistency:** `.portrait-photo` class name used identically in Task 1 CSS and Task 2 img. Asset import name `portrait` consistent. `group` / `group-hover` wiring consistent between the frame border and the CSS hover selector.

## Notes / risks

- The `.portrait-photo` hover CSS keys off the ancestor `.group` class, which Task 2 puts on the outer `motion.div`. If that class is removed, hover recoloring breaks — keep `group` on the wrapper.
- `max-w-xs` caps the portrait width so it doesn't dominate the column; adjust to taste during visual check.
