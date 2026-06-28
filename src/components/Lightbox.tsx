import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

type LightboxImage = { src: string; alt: string };

type LightboxProps = {
  image: LightboxImage | null;
  onClose: () => void;
};

/**
 * Full-screen image preview. Darkens + blurs the page behind a soft
 * scale-and-fade entrance. Closes on Escape, backdrop click, or the
 * close button. Locks body scroll while open. Honors reduced motion
 * via the global transition override in index.css.
 */
export function Lightbox({ image, onClose }: LightboxProps) {
  // `mounted` keeps the node alive through the exit transition; `shown`
  // drives the opacity/scale so the first paint starts from the hidden state.
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);

  const close = useCallback(() => setShown(false), []);

  useEffect(() => {
    if (image) {
      setMounted(true);
      // Next frame so the transition runs from the hidden start state.
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }
    close();
  }, [image, close]);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [mounted, close]);

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image?.alt ?? "Image preview"}
      onClick={close}
      onTransitionEnd={(e) => {
        // When the backdrop finishes fading out, unmount and notify parent.
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
        aria-label="Close preview"
        onClick={close}
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line-2 bg-surface/80 text-ink backdrop-blur transition-colors hover:border-red hover:text-red-ink sm:right-6 sm:top-6"
      >
        <FiX className="h-5 w-5" />
      </button>

      <img
        src={image?.src}
        alt={image?.alt}
        onClick={(e) => e.stopPropagation()}
        className={[
          "max-h-full max-w-full rounded-sm border border-line-2 object-contain shadow-2xl",
          "transition-all duration-300 ease-out",
          shown ? "scale-100 opacity-100" : "scale-95 opacity-0",
        ].join(" ")}
        style={{ transitionTimingFunction: "var(--ease-out-quint)" }}
      />
    </div>,
    document.body,
  );
}
