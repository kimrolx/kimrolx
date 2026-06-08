import type { CSSProperties } from "react";

type Orb = {
  top: string;
  left: string;
  duration: string;
  delay: string;
  origin: string;
  shadow: string;
  tone: "amber" | "teal";
};

/** Slow-drifting, blurred light sources. The room's ambient glow. */
const ORBS: Orb[] = [
  { top: "77%", left: "88%", duration: "40s", delay: "-3s", origin: "16vw -2vh", shadow: "40vmin 0 5.7vmin", tone: "teal" },
  { top: "42%", left: "2%", duration: "53s", delay: "-29s", origin: "-19vw 21vh", shadow: "-40vmin 0 5.18vmin", tone: "amber" },
  { top: "28%", left: "18%", duration: "49s", delay: "-8s", origin: "-22vw 3vh", shadow: "40vmin 0 5.25vmin", tone: "teal" },
  { top: "50%", left: "79%", duration: "26s", delay: "-21s", origin: "-17vw -6vh", shadow: "40vmin 0 5.28vmin", tone: "amber" },
  { top: "46%", left: "15%", duration: "36s", delay: "-40s", origin: "4vw 0vh", shadow: "-40vmin 0 5.96vmin", tone: "teal" },
  { top: "77%", left: "16%", duration: "31s", delay: "-10s", origin: "18vw 4vh", shadow: "40vmin 0 5.18vmin", tone: "amber" },
];

const TONE_COLOR: Record<Orb["tone"], string> = {
  amber: "var(--color-amber)",
  teal: "var(--color-teal)",
};

export function GlowBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden bg-bg"
      style={{ zIndex: "var(--z-glow)" }}
    >
      {ORBS.map((orb, i) => (
        <span
          key={i}
          className="absolute rounded-full opacity-55 [will-change:transform] [backface-visibility:hidden]"
          style={
            {
              top: orb.top,
              left: orb.left,
              width: "20vmin",
              height: "20vmin",
              color: TONE_COLOR[orb.tone],
              boxShadow: `${orb.shadow} currentColor`,
              transformOrigin: orb.origin,
              animation: `orb-drift ${orb.duration} linear infinite`,
              animationDelay: orb.delay,
            } as CSSProperties
          }
        />
      ))}
      {/* Vignette keeps text legible over the brightest glow. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-bg)_95%)]" />
    </div>
  );
}
