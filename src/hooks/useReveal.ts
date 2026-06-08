import { useEffect, useRef } from "react";

/**
 * Progressive scroll reveal. Content is visible by default; JS opts the
 * element into a hidden-then-shown transition only when motion is allowed
 * and IntersectionObserver exists. Never gates content on the animation.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    el.dataset.reveal = "hidden";
    const show = () => {
      el.dataset.reveal = "shown";
    };

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          show();
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);

    // Safety net: never let content stay hidden if the observer doesn't fire
    // (background tabs, headless renderers, programmatic scroll).
    const fallback = window.setTimeout(show, 1400);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return ref;
}
