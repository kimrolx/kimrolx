import { cn } from "@/lib/utils"

const BASE =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-sm outline-none transition-[transform,translate,color,border-color,background-color,opacity] duration-200 ease-out select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0"

const VARIANTS = {
  // Solid white key: maximum contrast, the Swiss black/white move.
  default: "bg-ink text-bg hover:-translate-y-px hover:bg-ink-2 active:translate-y-0",
  // Outline: hairline that warms to red on hover.
  outline: "border border-line-3 text-ink hover:-translate-y-px hover:border-red hover:text-red-ink active:translate-y-0",
}

const SIZES = {
  default: "px-5 py-2.5 text-sm font-semibold tracking-tight",
  lg: "px-6 py-3 text-sm font-semibold tracking-tight",
  mono: "min-h-12 px-5 mono-label",
}

export type ButtonVariants = { variant?: keyof typeof VARIANTS; size?: keyof typeof SIZES }

export const buttonClasses = ({ variant = "default", size = "default" }: ButtonVariants, className?: string) =>
  cn(BASE, VARIANTS[variant], SIZES[size], className)
