import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { GearCard } from "@/components/GearCard";
import { gearById } from "@/data/gearItems";

/* ============================================================
   Flat top-down desk — the touch layout. Tapping a piece opens
   its card inline below the mat. Simpler geometry than the iso
   scene so hit targets stay generous on small screens.
   ============================================================ */

type Slot = { id: string; x: number; y: number; w: number; h: number; label?: boolean };

// Layout in a 100 × 74 top-down field. `label` marks rects wide enough for text.
const SLOTS: Slot[] = [
  { id: "lightbar", x: 20, y: 3, w: 44, h: 2.6 },
  { id: "monitor", x: 16, y: 6.5, w: 52, h: 5.5, label: true },
  { id: "iphone", x: 5, y: 6, w: 8, h: 15 },
  { id: "airpods", x: 15, y: 7, w: 8.5, h: 8.5 },
  { id: "macbook", x: 4, y: 24, w: 23, h: 17, label: true },
  { id: "keyboard", x: 20, y: 30, w: 40, h: 12, label: true },
  { id: "mousepad", x: 64, y: 26, w: 30, h: 22, label: true },
  { id: "mouse", x: 74, y: 32, w: 8, h: 12 },
  { id: "amazfit", x: 5, y: 50, w: 10, h: 10 },
  { id: "wallet", x: 18, y: 50, w: 13, h: 13 },
  { id: "case", x: 84, y: 4, w: 13, h: 20, label: true },
  { id: "chair", x: 36, y: 62, w: 26, h: 10, label: true },
];

export function GearMat() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const active = activeId ? gearById[activeId] : null;

  return (
    <div className="flex flex-col gap-4">
      <svg
        viewBox="0 0 100 74"
        className="w-full rounded-sm border border-line bg-inset"
        role="group"
        aria-label="Top-down map of my desk. Tap a piece to read about it."
      >
        {/* mat texture: hairline desk edge */}
        <rect x="1" y="1" width="98" height="72" rx="1.5" fill="oklch(0.185 0 0)" stroke="oklch(1 0 0 / 0.08)" strokeWidth="0.3" />

        {SLOTS.map((slot) => {
          const item = gearById[slot.id];
          const isActive = activeId === slot.id;
          return (
            <g
              key={slot.id}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              aria-label={item ? `${item.name}${item.spec ? `, ${item.spec}` : ""}` : slot.id}
              className="cursor-pointer outline-none"
              onClick={() => setActiveId(isActive ? null : slot.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveId(isActive ? null : slot.id);
                }
              }}
            >
              <rect
                x={slot.x}
                y={slot.y}
                width={slot.w}
                height={slot.h}
                rx="1"
                fill={isActive ? "oklch(0.3 0.06 25)" : "oklch(0.28 0 0)"}
                stroke={isActive ? "var(--color-red)" : "oklch(1 0 0 / 0.2)"}
                strokeWidth={isActive ? "0.6" : "0.3"}
                className="transition-[fill,stroke]"
              />
              {slot.label && item && (
                <text
                  x={slot.x + slot.w / 2}
                  y={slot.y + slot.h / 2}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isActive ? "var(--color-red-ink)" : "oklch(0.74 0 0)"}
                  style={{ fontSize: "2.4px", fontWeight: 600, letterSpacing: "0.02em" }}
                >
                  {item.name}
                </text>
              )}
              {/* corner tick marks the piece as tappable */}
              <circle cx={slot.x + slot.w - 1.4} cy={slot.y + 1.4} r="0.7" fill="var(--color-red)" opacity={isActive ? 1 : 0.55} />
            </g>
          );
        })}
      </svg>

      <p className="label text-center text-ink-3">Tap a piece to inspect it</p>

      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.id}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-sm border border-line-2 bg-surface p-4">
              <GearCard item={active} compact />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
