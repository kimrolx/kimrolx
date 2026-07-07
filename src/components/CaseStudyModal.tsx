import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";
import { FiX } from "react-icons/fi";
import type { Project } from "@/types";
import { CaseStudyContent } from "./CaseStudy";

/**
 * Full-screen case-study overlay. Darkens + blurs the page, scrollable panel,
 * closes on Escape / backdrop / button. Locks body scroll while open. Mirrors
 * Lightbox's mount/transition lifecycle; honors reduced motion via the global
 * transition override in index.css.
 */
export function CaseStudyModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const lenis = useLenis();
  const close = useCallback(() => setShown(false), []);

  useEffect(() => {
    if (project?.caseStudy) {
      setMounted(true);
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }
    close();
  }, [project, close]);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    // Lenis ignores body overflow (it drives scroll off window wheel events),
    // so pause it explicitly — otherwise the page pans behind the modal.
    lenis?.stop();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      lenis?.start();
    };
  }, [mounted, close, lenis]);

  if (!mounted || !project?.caseStudy) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      onClick={close}
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget && !shown) {
          setMounted(false);
          onClose();
        }
      }}
      style={{ zIndex: "var(--z-lightbox)" }}
      className={[
        "fixed inset-0 flex items-center justify-center p-4 sm:p-8",
        "bg-bg/92 backdrop-blur-md transition-opacity duration-300 ease-out",
        shown ? "opacity-100" : "opacity-0",
      ].join(" ")}
    >
      <button
        type="button"
        aria-label="Close case study"
        onClick={close}
        className="fixed right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line-2 bg-surface/80 text-ink backdrop-blur transition-colors hover:border-red hover:text-red-ink sm:right-6 sm:top-6"
      >
        <FiX className="h-5 w-5" />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className={[
          "flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-sm border border-line-2 bg-surface shadow-2xl",
          "transition-all duration-300 ease-out",
          shown ? "scale-100 opacity-100" : "scale-95 opacity-0",
        ].join(" ")}
      >
        <div data-lenis-prevent className="overflow-y-auto overscroll-contain p-6 sm:p-10">
          <h3 className="mb-8 text-[clamp(1.5rem,3.5vw,2.375rem)] font-extrabold tracking-[-0.04em]">
            {project.title}
          </h3>
          <CaseStudyContent data={project.caseStudy} title={project.title} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
