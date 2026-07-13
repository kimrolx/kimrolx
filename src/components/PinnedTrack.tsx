import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useLenis } from "lenis/react";
import Snap from "lenis/snap";
import type { Project } from "@/types";
import { ProjectPanel } from "./ProjectPanel";

/** Delay after scrolling stops before the view eases to the nearest project. */
const SETTLE_DEBOUNCE_MS = 200;
/** Duration (s) of the settle glide. */
const SNAP_DURATION_S = 0.8;
/** ease-in-out cubic for the settle glide. */
const snapEasing = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Desktop scroll-jack. The outer element is `count` viewports tall to provide
 * scroll distance; its sticky child pins to the viewport while the panel row
 * translates horizontally from 0 to -(count-1) viewport widths. A counter
 * reflects the nearest panel. Motion reads Lenis-driven window scroll, so no
 * special smooth-scroll integration is needed.
 *
 * Each project occupies exactly one viewport-height of vertical scroll, so
 * soft-settle snapping is done by registering a Lenis snap point per project at
 * `spacerTop + i * innerHeight`. Snapping the vertical scroll makes the
 * horizontal panel row glide to match via the transform above. `proximity` with
 * a 50%-viewport threshold locks onto the nearest project anywhere inside the
 * band while never pulling the user in from unrelated sections.
 */
export function PinnedTrack({ projects, onOpenCaseStudy }: { projects: Project[]; onOpenCaseStudy: (project: Project) => void }) {
  const spacerRef = useRef<HTMLDivElement>(null);
  const count = projects.length;
  const [index, setIndex] = useState(0);
  const lenis = useLenis();

  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(count - 1) * 100}vw`]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIndex(Math.min(count - 1, Math.max(0, Math.round(v * (count - 1)))));
  });

  useEffect(() => {
    const spacer = spacerRef.current;
    if (!lenis || !spacer) return;

    const snap = new Snap(lenis, {
      type: "proximity",
      distanceThreshold: "50%",
      debounce: SETTLE_DEBOUNCE_MS,
      duration: SNAP_DURATION_S,
      easing: snapEasing,
    });

    let removePoints: Array<() => void> = [];
    const buildPoints = () => {
      removePoints.forEach((remove) => remove());
      const top = spacer.offsetTop;
      removePoints = Array.from({ length: count }, (_, i) =>
        snap.add(top + i * window.innerHeight),
      );
    };
    buildPoints();

    window.addEventListener("resize", buildPoints);
    return () => {
      window.removeEventListener("resize", buildPoints);
      removePoints.forEach((remove) => remove());
      snap.destroy();
    };
  }, [lenis, count]);

  return (
    <div ref={spacerRef} style={{ height: `${count * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="flex h-full" style={{ x }}>
          {projects.map((project, i) => (
            <ProjectPanel
              key={project.id}
              project={project}
              index={i}
              variant="full-bleed"
              onOpenCaseStudy={onOpenCaseStudy}
            />
          ))}
        </motion.div>

        <div
          aria-hidden="true"
          className="label pointer-events-none absolute bottom-6 right-6 text-ink-3 sm:bottom-8 sm:right-8"
        >
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}
