import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

/** A sheet in the specimen: centered column, generous vertical rhythm. */
export function Section({ id, children, className }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20 px-5 sm:px-8">
      <div
        className={cn(
          "mx-auto w-full max-w-6xl py-24 sm:py-32 lg:py-40",
          className,
        )}
      >
        {children}
      </div>
    </section>
  );
}
