import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

/** Consistent section rhythm: centered max-width column, vertical padding,
    scroll offset for the sticky nav. */
export function Section({ id, children, className }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-16 border-t border-border px-5 sm:px-8">
      <div className={cn("mx-auto w-full max-w-5xl py-20 sm:py-28", className)}>{children}</div>
    </section>
  );
}
