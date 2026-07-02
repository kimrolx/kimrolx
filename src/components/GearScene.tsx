import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { GearCard } from "@/components/GearCard";
import { gearById } from "@/data/gearItems";

/* ============================================================
   Isometric desk — the desktop hero. Each gear piece is a small
   iso solid built from three shaded faces (top / left / right).
   Shapes are authored in grid units and projected on render, so
   the layout stays adjustable without redrawing polygons by hand.
   ============================================================ */

const TILE_W = 34; // iso tile half-width  (screen px per x/y unit, horizontal)
const TILE_H = 17; // iso tile half-height (2:1 iso)
const UNIT = 15; // screen px per z (height) unit
const OX = 470; // projection origin x, within the viewBox
const OY = 70; // projection origin y

// viewBox fitted to the projected content (see scratch check) with margins.
const VB = { x: 235, y: -15, w: 690, h: 430 };

/** Project a grid point (x right-down, y left-down, z up) to screen space. */
function proj(x: number, y: number, z: number): [number, number] {
  return [OX + (x - y) * TILE_W, OY + (x + y) * TILE_H - z * UNIT];
}

type Box = { x: number; y: number; z: number; w: number; d: number; h: number };

/** The three visible faces of a box as `points` strings for <polygon>. */
function faces(b: Box) {
  const { x, y, z, w, d, h } = b;
  const p = (X: number, Y: number, Z: number) => proj(X, Y, Z).join(",");
  return {
    top: [p(x, y, z + h), p(x + w, y, z + h), p(x + w, y + d, z + h), p(x, y + d, z + h)].join(" "),
    // right face: constant x = x+w, faces lower-right
    right: [p(x + w, y, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x + w, y, z + h)].join(" "),
    // left face: constant y = y+d, faces lower-left
    left: [p(x, y + d, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x, y + d, z + h)].join(" "),
  };
}

/** Gear pieces, authored roughly back-to-front so <g> order handles overlap. */
const SHAPES: { id: string; boxes: Box[] }[] = [
  {
    id: "monitor",
    boxes: [
      { x: 3.2, y: 0.3, z: 3.4, w: 0.5, d: 0.5, h: 0.6 }, // stand neck
      { x: 2.6, y: -0.1, z: 4.0, w: 4.4, d: 0.5, h: 2.9 }, // screen
    ],
  },
  { id: "lightbar", boxes: [{ x: 2.9, y: 0.0, z: 6.9, w: 3.8, d: 0.4, h: 0.22 }] },
  { id: "macbook", boxes: [{ x: 0.3, y: 2.4, z: 3.4, w: 2.7, d: 1.9, h: 0.22 }] },
  { id: "iphone", boxes: [{ x: 0.5, y: 0.7, z: 3.4, w: 0.8, d: 1.6, h: 0.14 }] },
  { id: "airpods", boxes: [{ x: 1.9, y: 0.8, z: 3.4, w: 0.8, d: 0.8, h: 0.4 }] },
  { id: "keyboard", boxes: [{ x: 2.9, y: 3.3, z: 3.4, w: 4.1, d: 1.5, h: 0.34 }] },
  { id: "mousepad", boxes: [{ x: 7.3, y: 3.0, z: 3.4, w: 2.6, d: 2.1, h: 0.07 }] },
  { id: "mouse", boxes: [{ x: 8.2, y: 3.7, z: 3.47, w: 0.8, d: 1.2, h: 0.42 }] },
  { id: "amazfit", boxes: [{ x: 0.5, y: 4.7, z: 3.4, w: 1.0, d: 1.0, h: 0.3 }] },
  { id: "wallet", boxes: [{ x: 2.0, y: 4.6, z: 3.4, w: 1.3, d: 1.7, h: 0.24 }] },
  {
    id: "case",
    boxes: [{ x: 10.6, y: 0.6, z: 0, w: 1.9, d: 3.8, h: 4.4 }], // tower on the floor, right
  },
  {
    id: "chair",
    boxes: [
      { x: 5.2, y: 6.9, z: 1.5, w: 2.6, d: 2.5, h: 0.4 }, // seat
      { x: 5.2, y: 8.8, z: 1.5, w: 2.6, d: 0.4, h: 2.5 }, // backrest
    ],
  },
];

/** The desk slab everything sits on (backdrop, not a hotspot). */
const DESK: Box = { x: -0.2, y: -0.6, z: 2.9, w: 10.6, d: 6.4, h: 0.5 };

type Anchor = { id: string; left: number; top: number; width: number; height: number };

/* Entrance: the desk assembles itself. The slab and each piece rise from
   below and fade in, staggered back-to-front, when the scene scrolls in. */
const sceneVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};

const pieceVariants = {
  hidden: { opacity: 0, y: 38 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 22, mass: 0.9 },
  },
} as const;

export function GearScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const reduced = useReducedMotion();

  const activate = (id: string, target: SVGGElement) => {
    const container = containerRef.current;
    if (!container) return;
    const box = target.getBoundingClientRect();
    const base = container.getBoundingClientRect();
    setAnchor({
      id,
      left: box.left - base.left,
      top: box.top - base.top,
      width: box.width,
      height: box.height,
    });
  };

  const onEnter = (id: string) => (e: PointerEvent<SVGGElement>) =>
    activate(id, e.currentTarget);
  const clear = () => setAnchor(null);
  const onKey = (id: string) => (e: KeyboardEvent<SVGGElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activate(id, e.currentTarget);
    }
    if (e.key === "Escape") clear();
  };

  const active = anchor ? gearById[anchor.id] : null;
  // Card floats BESIDE the hovered piece so it never covers it. Prefer the
  // right side; flip to the left when there isn't room. Vertically centred on
  // the piece, clamped inside the frame. CARD_H is an estimate for clamping.
  const CARD_W = 300;
  const CARD_H = 280;
  const GAP = 16;
  const cw = containerRef.current?.clientWidth ?? 900;
  const ch = containerRef.current?.clientHeight ?? 500;

  let cardLeft = 0;
  let cardTop = 0;
  if (anchor) {
    const pieceRight = anchor.left + anchor.width;
    if (pieceRight + GAP + CARD_W <= cw) {
      cardLeft = pieceRight + GAP; // room on the right
    } else if (anchor.left - GAP - CARD_W >= 0) {
      cardLeft = anchor.left - GAP - CARD_W; // flip to the left
    } else {
      cardLeft = Math.min(Math.max(pieceRight + GAP, 8), cw - CARD_W - 8); // narrow frame
    }
    const pieceMid = anchor.top + anchor.height / 2;
    cardTop = Math.min(Math.max(pieceMid, CARD_H / 2 + 8), Math.max(ch - CARD_H / 2 - 8, CARD_H / 2 + 8));
  }

  return (
    <div ref={containerRef} className="relative w-full" onPointerLeave={clear}>
      <svg
        viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
        className="w-full"
        role="group"
        aria-label="Interactive isometric illustration of my desk. Hover or focus a piece to read about it."
      >
        <defs>
          {/* Soft contact shadow under the whole scene. */}
          <radialGradient id="gear-floor" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0 0 0 / 0.35)" />
            <stop offset="100%" stopColor="oklch(0 0 0 / 0)" />
          </radialGradient>
        </defs>

        <ellipse cx={569} cy={352} rx={345} ry={90} fill="url(#gear-floor)" />

        <motion.g
          variants={sceneVariants}
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Desk slab — backdrop, rises first */}
          <motion.g variants={pieceVariants}>
            <BoxFaces box={DESK} kind="desk" />
          </motion.g>

          {SHAPES.map((shape) => {
            const isActive = anchor?.id === shape.id;
            const item = gearById[shape.id];
            return (
              // Outer wrapper owns the entrance rise; inner <g> keeps the hover
              // lift/glow, so the two transforms never collide.
              <motion.g key={shape.id} variants={pieceVariants}>
                <g
                  tabIndex={0}
                  role="button"
                  aria-label={item ? `${item.name}${item.spec ? `, ${item.spec}` : ""}` : shape.id}
                  className="cursor-pointer outline-none [&_polygon]:transition-[fill,stroke] [&_polygon]:duration-150 [&_polygon]:ease-out"
                  // Block reacts on hover before the card mounts: brighten + red
                  // outline (see BoxFaces), a fading red bloom, and a small lift.
                  // CSS drop-shadow (not the SVG filter) so the glow interpolates.
                  style={{
                    filter: isActive
                      ? "drop-shadow(0 0 7px oklch(0.63 0.23 25 / 0.55))"
                      : "drop-shadow(0 0 0 oklch(0.63 0.23 25 / 0))",
                    transform: !reduced && isActive ? "translateY(-4px)" : undefined,
                    transition: reduced
                      ? "filter 250ms ease-out"
                      : "filter 250ms ease-out, transform 200ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onPointerEnter={onEnter(shape.id)}
                  onFocus={(e) => activate(shape.id, e.currentTarget)}
                  onBlur={clear}
                  onKeyDown={onKey(shape.id)}
                >
                  {shape.boxes.map((box, i) => (
                    <BoxFaces key={i} box={box} kind={isActive ? "active" : "item"} />
                  ))}
                </g>
              </motion.g>
            );
          })}
        </motion.g>
      </svg>

      <AnimatePresence>
        {active && anchor && (
          <motion.div
            key={active.id}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.97 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-10 w-[300px]"
            style={{
              left: cardLeft,
              top: cardTop,
              transform: "translateY(-50%)",
            }}
          >
            <div className="rounded-sm border border-line-2 bg-surface/95 p-4 shadow-2xl backdrop-blur-sm">
              <GearCard item={active} compact />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** One box rendered as three shaded faces. Fills vary by role for depth. */
function BoxFaces({ box, kind }: { box: Box; kind: "desk" | "item" | "active" }) {
  const f = faces(box);
  const palette =
    kind === "desk"
      ? { top: "oklch(0.245 0 0)", left: "oklch(0.185 0 0)", right: "oklch(0.15 0 0)", stroke: "oklch(1 0 0 / 0.14)" }
      : kind === "active"
        ? // brighter achromatic faces + a red outline — red marks, never fills
          { top: "oklch(0.44 0 0)", left: "oklch(0.33 0 0)", right: "oklch(0.26 0 0)", stroke: "var(--color-red)" }
        : { top: "oklch(0.32 0 0)", left: "oklch(0.235 0 0)", right: "oklch(0.18 0 0)", stroke: "oklch(1 0 0 / 0.22)" };

  return (
    <g strokeLinejoin="round" strokeWidth={kind === "active" ? 1.5 : 1}>
      <polygon points={f.left} fill={palette.left} stroke={palette.stroke} />
      <polygon points={f.right} fill={palette.right} stroke={palette.stroke} />
      <polygon points={f.top} fill={palette.top} stroke={palette.stroke} />
    </g>
  );
}
