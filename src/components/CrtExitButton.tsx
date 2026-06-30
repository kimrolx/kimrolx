import { useEasterEgg } from "@/hooks/useEasterEgg";

export function CrtExitButton() {
  const { crt, toggleCrt } = useEasterEgg();
  if (!crt) return null;
  return (
    <button
      type="button"
      onClick={toggleCrt}
      aria-label="Exit CRT mode"
      className="fixed bottom-4 right-4 rounded-sm border border-current px-3 py-2 font-mono text-xs uppercase tracking-widest"
      style={{ zIndex: "var(--z-crt-exit)" }}
    >
      ⏻ Exit CRT
    </button>
  );
}
