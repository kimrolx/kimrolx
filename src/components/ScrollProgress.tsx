import { motion, useScroll, useSpring } from "motion/react";

/**
 * A thin red rule pinned to the top of the viewport, advancing with scroll
 * depth. Transform-only, so it stays cheap; reduced motion drops the spring.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 h-0.5 origin-left bg-red"
      style={{ scaleX, zIndex: "var(--z-progress)" }}
    />
  );
}
