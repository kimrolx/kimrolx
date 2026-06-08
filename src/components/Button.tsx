import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "ghost";
  children: ReactNode;
};

const VARIANTS = {
  primary:
    "bg-amber text-bg hover:bg-amber/90 focus-visible:outline-offset-2",
  ghost:
    "border border-border-strong text-ink hover:border-amber hover:text-amber",
} as const;

/** Link styled as a button. Verb-first labels live in the calling site. */
export function ButtonLink({ variant = "primary", className, children, ...props }: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-colors duration-200",
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
