import { useEffect, useRef, type ReactNode } from "react";
import { useLenis } from "lenis/react";
import { FiX } from "react-icons/fi";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  label: string;
  closeLabel: string;
  children: ReactNode;
};

/**
 * Full-screen native <dialog>: the platform supplies the top layer, focus
 * trap, Escape, and focus restore. Darkens + blurs the page; closes on
 * Escape, backdrop click, or the close button. Fades in via @starting-style,
 * which the global reduced-motion override flattens.
 */
export function Modal({ open, onClose, label, closeLabel, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    dialog.showModal();
    // Lenis drives scroll off window wheel events and ignores body overflow,
    // so pause it explicitly — otherwise the page pans behind the dialog.
    lenis?.stop();
    return () => {
      dialog.close();
      lenis?.start();
    };
  }, [open, lenis]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
      className="group/modal fixed inset-0 m-0 hidden h-full max-h-none w-full max-w-none items-center justify-center bg-bg/92 p-4 text-ink backdrop-blur-md transition-[display,overlay,opacity] transition-discrete duration-300 ease-out backdrop:bg-transparent open:flex not-open:opacity-0 starting:opacity-0 sm:p-8"
    >
      <button
        type="button"
        aria-label={closeLabel}
        onClick={() => ref.current?.close()}
        className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line-2 bg-surface/80 text-ink backdrop-blur transition-colors hover:border-red hover:text-red-ink sm:right-6 sm:top-6"
      >
        <FiX className="h-5 w-5" />
      </button>
      {children}
    </dialog>
  );
}
