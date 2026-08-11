import { useMediaQuery } from "./useMediaQuery";

/** Tracks the user's reduced-motion preference, reactively. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
