import { motion, useReducedMotion } from "motion/react";
import { GearCard } from "@/components/GearCard";
import { gearByCategory } from "@/data/gearItems";

/* Entrance choreography mirrors the desk (GearScene): pieces rise + fade in a
   staggered cascade. Here it runs per category group as it scrolls in — the
   header lifts first, then the cards cascade one by one. Spring values match
   the desk so the two sections read as one system. */
const groupVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 22, mass: 0.9 },
  },
} as const;

/**
 * The canonical, complete kit — every item including the parts that never
 * make it onto the desk surface (CPU, PSU, and friends). Grouped by category,
 * always rendered, and the accessible fallback for the illustrations above.
 */
export function GearGrid() {
  const reduced = useReducedMotion();

  return (
    <div className="flex flex-col">
      {gearByCategory.map((group, i) => (
        <motion.div
          key={group.category.id}
          className="flex flex-col"
          variants={groupVariants}
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Editorial rule: gradient fill fades out at both ends. First rule
              (desk → grid) is the brighter structural line-2; the rest are the
              fine line token. */}
          <div
            aria-hidden="true"
            className="h-px"
            style={{
              background: `linear-gradient(to right, transparent 0%, var(${
                i === 0 ? "--color-line-2" : "--color-line"
              }) 20%, var(${
                i === 0 ? "--color-line-2" : "--color-line"
              }) 80%, transparent 100%)`,
            }}
          />

          <div className="grid gap-6 py-12 lg:grid-cols-[14rem_1fr] lg:gap-12">
            <motion.div variants={itemVariants} className="flex flex-col gap-2 lg:pt-1">
              <h3 className="label text-ink-3">{group.category.label}</h3>
              <p className="max-w-xs text-sm text-ink-2">{group.category.blurb}</p>
              <span className="label text-ink-3">
                {String(group.items.length).padStart(2, "0")} items
              </span>
            </motion.div>

            <motion.ul
              variants={listVariants}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
            >
              {group.items.map((item) => (
                <motion.li key={item.id} variants={itemVariants}>
                  <GearCard item={item} />
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
