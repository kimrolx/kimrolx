import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import type { Project } from "@/types";
import { ProjectPanel } from "./ProjectPanel";

/**
 * Desktop scroll-jack. The outer element is `count` viewports tall to provide
 * scroll distance; its sticky child pins to the viewport while the panel row
 * translates horizontally from 0 to -(count-1) viewport widths. A counter
 * reflects the nearest panel. Motion reads Lenis-driven window scroll, so no
 * special smooth-scroll integration is needed.
 */
export function PinnedTrack({ projects, onOpenCaseStudy }: { projects: Project[]; onOpenCaseStudy: (project: Project) => void }) {
  const spacerRef = useRef<HTMLDivElement>(null);
  const count = projects.length;
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(count - 1) * 100}vw`]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIndex(Math.min(count - 1, Math.max(0, Math.round(v * (count - 1)))));
  });

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
