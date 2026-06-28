import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Inertial smooth scroll via Lenis, with native anchor handling. Disabled
 * entirely under reduced-motion, where the browser's own scrolling is the
 * correct, accessible behavior.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, smoothWheel: true, anchors: true }}
    >
      {children}
    </ReactLenis>
  );
}
