import { useEffect, useRef } from "react";
import { useEasterEgg } from "@/hooks/useEasterEgg";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function CrtAchievementToast() {
  const { justAchieved, crtFinds, clearAchieved } = useEasterEgg();
  const reduced = usePrefersReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!justAchieved) return;
    cardRef.current?.focus();
    const id = window.setTimeout(clearAchieved, 4000);
    return () => window.clearTimeout(id);
  }, [justAchieved, clearAchieved]);

  if (!justAchieved) return null;

  return (
    <div
      onClick={clearAchieved}
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: "calc(var(--z-crt-exit) + 1)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        ref={cardRef}
        role="status"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            clearAchieved();
          }
        }}
        className={`crt-terminal ${reduced ? "" : "crt-achieve-pop"} flex cursor-pointer flex-col items-center gap-3 rounded-sm border-2 border-double border-current px-10 py-8 text-center font-mono outline-none`}
        style={{ backgroundColor: "oklch(0.12 0 0)" }}
      >
        <span className="text-5xl" aria-hidden="true">
          🏆
        </span>
        <span className="text-xl font-bold uppercase tracking-[0.2em]">
          Achievement Unlocked
        </span>
        <span className="text-sm opacity-80">you found the terminal</span>
        <span className="text-[0.7rem] uppercase tracking-widest opacity-50">
          session #{crtFinds}
        </span>
      </div>
    </div>
  );
}
