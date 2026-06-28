import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { Tilt } from "@/components/Tilt";

/** The name, line by line; the last line carries the red period. */
const LINES = ["Kim Roland", "Berame"];

/**
 * The hero name as a depth-layered type specimen. The two lines and the red
 * period sit on different Z planes for parallax depth under the tilt, and a
 * soft glare tracks the pointer across the glyphs. Inert (a plain bold name)
 * under reduced motion or a coarse pointer.
 */
export function HeroName() {
  const reduce = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const scene = sceneRef.current;
    const glare = glareRef.current;
    if (!scene || !glare) return;

    let frame = 0;
    let px = 0;
    let py = 0;
    let active = false;

    const apply = () => {
      frame = 0;
      const box = scene.getBoundingClientRect();
      glare.style.setProperty("--gx", `${px - box.left}px`);
      glare.style.setProperty("--gy", `${py - box.top}px`);
      glare.style.opacity = active ? "1" : "0";
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      active = true;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      active = false;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce]);

  const lines = (
    <>
      {LINES.map((line, i) => (
        <span
          key={line}
          className="block [transform-style:preserve-3d]"
          style={{ transform: `translateZ(${i * 45}px)` }}
        >
          {line}
          {i === LINES.length - 1 && (
            <span className="text-red" style={{ transform: "translateZ(55px)" }}>
              .
            </span>
          )}
        </span>
      ))}
    </>
  );

  // Plain bold name for reduced motion / touch.
  if (reduce) {
    return (
      <h1 className="text-[clamp(3rem,11vw,6rem)] font-black leading-[0.9] tracking-[-0.04em]">
        <span className="block">Kim Roland</span>
        <span className="block">
          Berame<span className="text-red">.</span>
        </span>
      </h1>
    );
  }

  return (
    <Tilt className="inline-block [transform-style:preserve-3d]" max={16}>
      <div ref={sceneRef} className="relative [transform-style:preserve-3d]">
        <h1
          aria-label="Kim Roland Berame"
          className="text-[clamp(3rem,11vw,6rem)] font-black leading-[0.9] tracking-[-0.04em] [text-shadow:0_18px_40px_rgba(0,0,0,0.55)]"
        >
          {lines}
        </h1>

        {/* Glare overlay: a white highlight clipped to the glyphs, tracking the cursor. */}
        <span
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 select-none text-[clamp(3rem,11vw,6rem)] font-black leading-[0.9] tracking-[-0.04em] opacity-0 transition-opacity duration-200 [-webkit-background-clip:text] [background-clip:text] [mix-blend-mode:screen]"
          style={{
            color: "transparent",
            backgroundImage:
              "radial-gradient(circle 180px at var(--gx) var(--gy), rgba(255,255,255,0.55), rgba(255,255,255,0) 70%)",
          }}
        >
          {lines}
        </span>
      </div>
    </Tilt>
  );
}
