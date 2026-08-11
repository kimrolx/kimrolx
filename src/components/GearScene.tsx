import { useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { GearCard } from "@/components/GearCard";
import { gearById } from "@/data/gearItems";

/* ============================================================
   Isometric desk — the desktop hero. Each gear piece is a small
   iso solid built from three flat-shaded faces (top / left /
   right). Pieces carry just enough surface detail — a screen, a
   key grid, a dial, vents — to read as the real object without
   any gradients. Shapes are authored in grid units and projected
   on render, and their footprints never overlap.
   ============================================================ */

const TILE_W = 34; // iso tile half-width  (screen px per x/y unit, horizontal)
const TILE_H = 17; // iso tile half-height (2:1 iso)
const UNIT = 15; // screen px per z (height) unit
const OX = 470; // projection origin x, within the viewBox
const OY = 70; // projection origin y

const VB = { x: 235, y: -15, w: 690, h: 430 };

/** Project a grid point (x right-down, y left-down, z up) to screen space. */
function proj(x: number, y: number, z: number): [number, number] {
  return [OX + (x - y) * TILE_W, OY + (x + y) * TILE_H - z * UNIT];
}
const P = (x: number, y: number, z: number) => proj(x, y, z).join(",");

type Box = { x: number; y: number; z: number; w: number; d: number; h: number };
type Kind = "desk" | "item" | "dark";

/** The three visible faces of a box as `points` strings for <polygon>. */
function faces(b: Box) {
  const { x, y, z, w, d, h } = b;
  return {
    top: [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)].join(" "),
    right: [P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)].join(" "),
    left: [P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)].join(" "),
  };
}

/* Helpers to place detail marks on a box's top face (z = top) or its front
   (lower-left, y = y+d) face, in the box's own local offsets. */
const topZ = (b: Box) => b.z + b.h;
function topRect(b: Box, ox: number, oy: number, w: number, d: number) {
  const z = topZ(b), x = b.x + ox, y = b.y + oy;
  return [P(x, y, z), P(x + w, y, z), P(x + w, y + d, z), P(x, y + d, z)].join(" ");
}
function frontRect(b: Box, ox: number, oz: number, w: number, h: number) {
  const y = b.y + b.d, x = b.x + ox, z = b.z + oz;
  return [P(x, y, z), P(x + w, y, z), P(x + w, y, z + h), P(x, y, z + h)].join(" ");
}
/** Iso-projected disc on a box's top face (a circle → axis-aligned ellipse). */
function topDisc(b: Box, ox: number, oy: number, r: number) {
  const [cx, cy] = proj(b.x + ox, b.y + oy, topZ(b));
  return { cx, cy, rx: r * TILE_W, ry: r * TILE_H };
}

/* ---- Layout — authored back-to-front; footprints never overlap ---- */
const MONITOR = {
  foot: { x: 4.4, y: 0.2, z: 3.4, w: 1.6, d: 0.9, h: 0.12 },
  neck: { x: 4.95, y: 0.4, z: 3.52, w: 0.5, d: 0.5, h: 0.5 },
  screen: { x: 3.6, y: 0.0, z: 4.0, w: 3.2, d: 0.45, h: 2.6 },
};
const LIGHTBAR: Box = { x: 3.9, y: 0.05, z: 6.6, w: 2.8, d: 0.35, h: 0.2 };
const MACBOOK: Box = { x: 0.5, y: 2.6, z: 3.4, w: 2.6, d: 1.7, h: 0.22 };
const IPHONE: Box = { x: 0.6, y: 0.5, z: 3.4, w: 0.85, d: 1.7, h: 0.14 };
const AIRPODS: Box = { x: 2.0, y: 0.7, z: 3.4, w: 0.85, d: 0.85, h: 0.38 };
const KEYBOARD: Box = { x: 3.7, y: 3.6, z: 3.4, w: 3.4, d: 1.5, h: 0.32 };
const MOUSEPAD: Box = { x: 7.5, y: 3.2, z: 3.4, w: 2.5, d: 2.1, h: 0.06 };
const MOUSE: Box = { x: 8.4, y: 3.9, z: 3.46, w: 0.8, d: 1.2, h: 0.4 };
const AMAZFIT: Box = { x: 2.2, y: 4.6, z: 3.4, w: 1.0, d: 1.0, h: 0.3 };
const WALLET: Box = { x: 0.6, y: 4.5, z: 3.4, w: 1.3, d: 1.1, h: 0.22 };
const CASE: Box = { x: 10.7, y: 0.8, z: 0, w: 1.9, d: 3.8, h: 4.4 };
const CHAIR = { seat: { x: 5.2, y: 6.9, z: 1.5, w: 2.6, d: 2.5, h: 0.4 }, back: { x: 5.2, y: 8.8, z: 1.5, w: 2.6, d: 0.4, h: 2.5 }, cx: 6.5, cy: 8.15 };

type Shape = { id: string; kind: Kind; boxes: Box[]; detail?: ReactNode; shadow?: boolean };

const SHAPES: Shape[] = [
  { id: "monitor", kind: "item", boxes: [MONITOR.foot, MONITOR.neck, MONITOR.screen], detail: <Screen box={MONITOR.screen} /> },
  { id: "lightbar", kind: "item", boxes: [LIGHTBAR], detail: <BarGlow box={LIGHTBAR} /> },
  { id: "iphone", kind: "dark", boxes: [IPHONE], detail: <Phone box={IPHONE} /> },
  { id: "airpods", kind: "item", boxes: [AIRPODS], detail: <Buds box={AIRPODS} /> },
  { id: "macbook", kind: "item", boxes: [MACBOOK], detail: <Laptop box={MACBOOK} /> },
  { id: "wallet", kind: "dark", boxes: [WALLET], detail: <Fold box={WALLET} /> },
  { id: "amazfit", kind: "item", boxes: [AMAZFIT], detail: <Watch box={AMAZFIT} /> },
  { id: "keyboard", kind: "dark", boxes: [KEYBOARD], detail: <KeyGrid box={KEYBOARD} /> },
  { id: "mousepad", kind: "dark", boxes: [MOUSEPAD] },
  { id: "mouse", kind: "item", boxes: [MOUSE], detail: <MouseTop box={MOUSE} /> },
  { id: "case", kind: "dark", boxes: [CASE], detail: <Tower box={CASE} />, shadow: true },
  {
    id: "chair",
    kind: "item",
    shadow: true,
    boxes: [
      { x: CHAIR.cx - 1.25, y: CHAIR.cy - 1.25, z: 0, w: 0.9, d: 0.9, h: 0.18 },
      { x: CHAIR.cx + 0.35, y: CHAIR.cy - 1.25, z: 0, w: 0.9, d: 0.9, h: 0.18 },
      { x: CHAIR.cx - 1.25, y: CHAIR.cy + 0.35, z: 0, w: 0.9, d: 0.9, h: 0.18 },
      { x: CHAIR.cx + 0.35, y: CHAIR.cy + 0.35, z: 0, w: 0.9, d: 0.9, h: 0.18 },
      { x: CHAIR.cx - 0.45, y: CHAIR.cy - 0.45, z: 0.18, w: 0.9, d: 0.9, h: 0.32 },
      { x: CHAIR.cx - 0.3, y: CHAIR.cy - 0.3, z: 0.5, w: 0.6, d: 0.6, h: 1.0 },
      CHAIR.seat,
      CHAIR.back,
    ],
  },
];

/** The desk slab everything sits on (backdrop, not a hotspot). */
const DESK: Box = { x: -0.2, y: -0.6, z: 2.9, w: 10.6, d: 6.4, h: 0.5 };

type Anchor = { id: string; left: number; top: number; width: number; height: number };

const sceneVariants = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } };
const pieceVariants = {
  hidden: { opacity: 0, y: 38 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 220, damping: 22, mass: 0.9 } },
} as const;

export function GearScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const reduced = usePrefersReducedMotion();

  const activate = (id: string, target: SVGGElement) => {
    const container = containerRef.current;
    if (!container) return;
    const box = target.getBoundingClientRect();
    const base = container.getBoundingClientRect();
    setAnchor({ id, left: box.left - base.left, top: box.top - base.top, width: box.width, height: box.height });
  };

  const onEnter = (id: string) => (e: PointerEvent<SVGGElement>) => activate(id, e.currentTarget);
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
    if (pieceRight + GAP + CARD_W <= cw) cardLeft = pieceRight + GAP;
    else if (anchor.left - GAP - CARD_W >= 0) cardLeft = anchor.left - GAP - CARD_W;
    else cardLeft = Math.min(Math.max(pieceRight + GAP, 8), cw - CARD_W - 8);
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
          <radialGradient id="gear-floor" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0 0 0 / 0.4)" />
            <stop offset="100%" stopColor="oklch(0 0 0 / 0)" />
          </radialGradient>
          <filter id="gear-soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.2" />
          </filter>
          <filter id="gear-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4.5" />
          </filter>
        </defs>

        <ellipse cx={569} cy={352} rx={345} ry={90} fill="url(#gear-floor)" />

        <motion.g variants={sceneVariants} initial={reduced ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          {/* Desk slab — flat, backdrop, rises first */}
          <motion.g variants={pieceVariants}>
            <BoxFaces box={DESK} kind="desk" />
          </motion.g>

          {SHAPES.map((shape) => {
            const isActive = anchor?.id === shape.id;
            const item = gearById[shape.id];
            const base = shape.boxes.reduce((a, b) => (b.z < a.z ? b : a), shape.boxes[0]);
            return (
              // Outer wrapper owns the entrance rise; inner <g> keeps the hover
              // lift/glow, so the two transforms never collide.
              <motion.g key={shape.id} variants={pieceVariants}>
                <g
                  tabIndex={0}
                  role="button"
                  aria-label={item ? `${item.name}${item.spec ? `, ${item.spec}` : ""}` : shape.id}
                  className={
                    "cursor-pointer outline-none [&_polygon]:transition-[fill,stroke] [&_polygon]:duration-150 [&_polygon]:ease-out" +
                    (isActive ? " [&_polygon]:[stroke:var(--color-red)]" : "")
                  }
                  style={{
                    filter: isActive
                      ? "brightness(1.28) drop-shadow(0 0 7px oklch(0.63 0.23 25 / 0.55))"
                      : "brightness(1) drop-shadow(0 0 0 oklch(0.63 0.23 25 / 0))",
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
                  {shape.shadow && <Shadow box={base} />}
                  {shape.boxes.map((box, i) => (
                    <BoxFaces key={i} box={box} kind={shape.kind} />
                  ))}
                  {shape.detail}
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
            style={{ left: cardLeft, top: cardTop, transform: "translateY(-50%)" }}
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

/* ---- Flat face shading (three achromatic tones per box) ------------------ */
const KIND_L: Record<Kind, { top: string; left: string; right: string; stroke: string }> = {
  desk: { top: "oklch(0.245 0 0)", left: "oklch(0.185 0 0)", right: "oklch(0.15 0 0)", stroke: "oklch(1 0 0 / 0.14)" },
  item: { top: "oklch(0.34 0 0)", left: "oklch(0.245 0 0)", right: "oklch(0.185 0 0)", stroke: "oklch(1 0 0 / 0.22)" },
  dark: { top: "oklch(0.22 0 0)", left: "oklch(0.16 0 0)", right: "oklch(0.13 0 0)", stroke: "oklch(1 0 0 / 0.2)" },
};

/** One box rendered as three flat-shaded faces. */
function BoxFaces({ box, kind }: { box: Box; kind: Kind }) {
  const f = faces(box);
  const p = KIND_L[kind];
  return (
    <g strokeLinejoin="round" strokeWidth={1}>
      <polygon points={f.left} fill={p.left} stroke={p.stroke} />
      <polygon points={f.right} fill={p.right} stroke={p.stroke} />
      <polygon points={f.top} fill={p.top} stroke={p.stroke} />
    </g>
  );
}

/** Soft blurred contact shadow for floor-standing pieces (tower, chair). */
function Shadow({ box, grow = 0.2, op = 0.3 }: { box: Box; grow?: number; op?: number }) {
  const x = box.x - grow, y = box.y - grow, w = box.w + grow * 2, d = box.d + grow * 2, z = box.z;
  const pts = [P(x, y, z), P(x + w, y, z), P(x + w, y + d, z), P(x, y + d, z)].join(" ");
  return <polygon points={pts} fill={`oklch(0 0 0 / ${op})`} filter="url(#gear-soft)" />;
}

/* ---- Per-piece surface detail (flat marks, no gradients) ----------------- */

/** Monitor: dark screen panel with a faint red bloom on the front face. */
function Screen({ box }: { box: Box }) {
  const inset = 0.18;
  const sx = box.x + inset, sw = box.w - inset * 2, sz = box.z + inset, sh = box.h - inset * 2, y = box.y + box.d;
  const poly = [P(sx, y, sz), P(sx + sw, y, sz), P(sx + sw, y, sz + sh), P(sx, y, sz + sh)].join(" ");
  return (
    <>
      <polygon points={poly} fill="var(--color-red)" opacity={0.14} filter="url(#gear-glow)" />
      <polygon points={poly} fill="oklch(0.185 0.03 25)" stroke="oklch(1 0 0 / 0.08)" strokeWidth={0.5} />
    </>
  );
}

/** Downward light wash from the light-bar onto the screen below. */
function BarGlow({ box }: { box: Box }) {
  const y = box.y + box.d;
  const poly = [P(box.x, y, box.z), P(box.x + box.w, y, box.z), P(box.x + box.w, y, box.z - 1.6), P(box.x, y, box.z - 1.6)].join(" ");
  return <polygon points={poly} fill="oklch(0.95 0 0 / 0.09)" filter="url(#gear-glow)" />;
}

/** Phone: dark screen inset + a small camera square. */
function Phone({ box }: { box: Box }) {
  return (
    <>
      <polygon points={topRect(box, 0.1, 0.14, box.w - 0.2, box.d - 0.28)} fill="oklch(0.13 0 0)" stroke="oklch(1 0 0 / 0.12)" strokeWidth={0.4} />
      <polygon points={topRect(box, box.w - 0.34, 0.18, 0.2, 0.2)} fill="oklch(0.28 0 0)" />
    </>
  );
}

/** AirPods case: lid seam + two earbud discs. */
function Buds({ box }: { box: Box }) {
  const seam = topRect(box, box.w / 2 - 0.03, 0.12, 0.06, box.d - 0.24);
  const a = topDisc(box, box.w * 0.3, box.d * 0.5, 0.14);
  const b = topDisc(box, box.w * 0.7, box.d * 0.5, 0.14);
  return (
    <>
      <polygon points={seam} fill="oklch(0.12 0 0)" />
      <ellipse cx={a.cx} cy={a.cy} rx={a.rx} ry={a.ry} fill="oklch(0.14 0 0)" />
      <ellipse cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} fill="oklch(0.14 0 0)" />
    </>
  );
}

/** Laptop: dark lid inset + hinge line to read as a closed MacBook. */
function Laptop({ box }: { box: Box }) {
  return (
    <>
      <polygon points={topRect(box, 0.16, 0.16, box.w - 0.32, box.d - 0.32)} fill="oklch(0.3 0 0)" stroke="oklch(1 0 0 / 0.14)" strokeWidth={0.4} />
      <polygon points={topRect(box, 0.16, box.d - 0.24, box.w - 0.32, 0.06)} fill="oklch(0.2 0 0)" />
    </>
  );
}

/** Wallet: a fold seam across the top. */
function Fold({ box }: { box: Box }) {
  return <polygon points={topRect(box, 0.12, box.d / 2 - 0.03, box.w - 0.24, 0.06)} fill="oklch(0.1 0 0)" />;
}

/** Watch: round dial inset + a side crown. */
function Watch({ box }: { box: Box }) {
  const d = topDisc(box, box.w / 2, box.d / 2, 0.32);
  return (
    <>
      <ellipse cx={d.cx} cy={d.cy} rx={d.rx} ry={d.ry} fill="oklch(0.13 0 0)" stroke="oklch(1 0 0 / 0.14)" strokeWidth={0.5} />
      <polygon points={frontRect(box, box.w - 0.05, box.h * 0.4, 0.12, 0.1)} fill="oklch(0.3 0 0)" />
    </>
  );
}

/** Mouse: a button split line down the top. */
function MouseTop({ box }: { box: Box }) {
  return (
    <>
      <polygon points={topRect(box, box.w / 2 - 0.025, 0.08, 0.05, box.d * 0.5)} fill="oklch(0.14 0 0)" />
      <polygon points={topRect(box, box.w / 2 - 0.06, 0.2, 0.12, 0.14)} fill="oklch(0.5 0 0)" />
    </>
  );
}

/** PC tower: front intake vents, a power button, and a red status LED. */
function Tower({ box }: { box: Box }) {
  const vents = [0, 1, 2].map((i) => (
    <polygon key={i} points={frontRect(box, 0.25, 3.4 + i * 0.35, box.w - 0.5, 0.14)} fill="oklch(0.1 0 0)" />
  ));
  return (
    <>
      {vents}
      <polygon points={frontRect(box, 0.3, 2.7, 0.3, 0.3)} fill="oklch(0.28 0 0)" stroke="oklch(1 0 0 / 0.18)" strokeWidth={0.4} />
      <polygon points={frontRect(box, 0.3, 0.5, 0.25, 0.25)} fill="var(--color-red)" filter="url(#gear-glow)" />
      <polygon points={frontRect(box, 0.3, 0.5, 0.25, 0.25)} fill="var(--color-red)" />
    </>
  );
}

/** Keyboard: raised keycaps patterned across the top face. */
function KeyGrid({ box }: { box: Box }) {
  const cols = 12, rows = 4, inx = 0.18, iny = 0.14;
  const gw = (box.w - inx * 2) / cols, gh = (box.d - iny * 2) / rows;
  const ztop = box.z + box.h;
  const keys: ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const kx = box.x + inx + c * gw + gw * 0.12;
      const ky = box.y + iny + r * gh + gh * 0.12;
      const kw = gw * 0.76, kh = gh * 0.76;
      const pp = [P(kx, ky, ztop), P(kx + kw, ky, ztop), P(kx + kw, ky + kh, ztop), P(kx, ky + kh, ztop)].join(" ");
      keys.push(<polygon key={`${r}-${c}`} points={pp} fill="oklch(0.28 0 0)" stroke="oklch(0 0 0 / 0.4)" strokeWidth={0.5} />);
    }
  }
  return <>{keys}</>;
}
