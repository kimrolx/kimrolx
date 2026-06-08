import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
};

/** Fades + lifts its children into view on scroll. Visible by default. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={className} style={{ transitionDelay: `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}
