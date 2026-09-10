import { useState } from "react";
import { FiMaximize2 } from "react-icons/fi";
import { Modal } from "./Modal";

type LightboxImage = { src: string; alt: string };

/** Full-screen image preview. Keeps the last image on screen while it fades out. */
export function Lightbox({ image, onClose }: { image: LightboxImage | null; onClose: () => void }) {
  const [shown, setShown] = useState(image);
  if (image && image !== shown) setShown(image);

  return (
    <Modal open={!!image} onClose={onClose} label={shown?.alt ?? "Image preview"} closeLabel="Close preview">
      {shown && (
        <img
          src={shown.src}
          alt={shown.alt}
          className="max-h-full max-w-full rounded-sm border border-line-2 object-contain shadow-2xl transition-all duration-300 ease-out group-not-open/modal:scale-95 group-not-open/modal:opacity-0 starting:scale-95 starting:opacity-0"
          style={{ transitionTimingFunction: "var(--ease-out-quint)" }}
        />
      )}
    </Modal>
  );
}

/**
 * A photo that opens full screen on click, with a quiet expand cue on hover
 * and keyboard focus. Fills its frame; `className` styles the image itself.
 */
export function ZoomableImage({ src, alt, className }: LightboxImage & { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View full screen: ${alt}`}
        className="group/zoom relative block h-full w-full cursor-pointer focus-visible:-outline-offset-2"
      >
        <img src={src} alt="" loading="lazy" decoding="async" className={className} />
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-sm border border-line-2 bg-bg/80 text-ink opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100"
        >
          <FiMaximize2 className="h-4 w-4" />
        </span>
      </button>
      <Lightbox image={open ? { src, alt } : null} onClose={() => setOpen(false)} />
    </>
  );
}
