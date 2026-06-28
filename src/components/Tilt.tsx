import { useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

type TiltProps = {
  children: ReactNode;
  /** Maximum tilt in degrees at the screen edge. */
  max?: number;
  className?: string;
};

/**
 * Tilts its children in 3D toward the cursor. Rotation is driven by the
 * pointer's position relative to the element's center, normalized across the
 * viewport and spring-smoothed. Inert under reduced motion or a coarse
 * (touch) pointer, where it renders a plain, untransformed block.
 */
export function Tilt({ children, max = 7, className }: TiltProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const spring = { stiffness: 150, damping: 22, mass: 0.4 };
  const srx = useSpring(rx, spring);
  const sry = useSpring(ry, spring);
  const transform = useMotionTemplate`perspective(1100px) rotateX(${srx}deg) rotateY(${sry}deg)`;

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;

    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const nx = clamp((e.clientX - cx) / (window.innerWidth / 2));
      const ny = clamp((e.clientY - cy) / (window.innerHeight / 2));
      ry.set(nx * max);
      rx.set(ny * -max);
    };
    const reset = () => {
      rx.set(0);
      ry.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", reset);
    };
  }, [reduce, max, rx, ry]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div ref={ref} className={className} style={{ transform, transformStyle: "preserve-3d" }}>
      {children}
    </motion.div>
  );
}
