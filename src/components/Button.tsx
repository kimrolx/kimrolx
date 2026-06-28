import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "ghost";
  children: ReactNode;
};

const VARIANTS = {
  // Solid white key: maximum contrast, the Swiss black/white move.
  primary:
    "bg-ink text-bg hover:-translate-y-px hover:bg-ink-2 active:translate-y-0",
  // Outline: hairline that warms to red on hover.
  ghost:
    "border border-line-2 text-ink hover:-translate-y-px hover:border-red hover:text-red-ink active:translate-y-0",
} as const;

/** A link styled as a button. Verb-first label, square edge. */
export function ButtonLink({ variant = "primary", className, children, ...props }: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-sm font-semibold tracking-tight transition-[transform,color,border-color,background-color] duration-200 ease-out",
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
