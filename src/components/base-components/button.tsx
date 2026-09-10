import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

const BASE =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-sm font-semibold tracking-tight outline-none transition-[transform,color,border-color,background-color,opacity] duration-200 ease-out select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0"

const VARIANTS = {
  // Solid white key: maximum contrast, the Swiss black/white move.
  default: "bg-ink text-bg hover:-translate-y-px hover:bg-ink-2 active:translate-y-0",
  // Outline: hairline that warms to red on hover.
  outline: "border border-line-2 text-ink hover:-translate-y-px hover:border-red hover:text-red-ink active:translate-y-0",
}

const SIZES = {
  default: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-sm",
}

type ButtonVariants = { variant?: keyof typeof VARIANTS; size?: keyof typeof SIZES }

const buttonClasses = ({ variant = "default", size = "default" }: ButtonVariants, className?: string) =>
  cn(BASE, VARIANTS[variant], SIZES[size], className)

function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants) {
  return <button data-slot="button" type={type} className={buttonClasses({ variant, size }, className)} {...props} />
}

/** A link styled as a button. Verb-first label, square edge. */
function ButtonLink({ className, variant, size, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & ButtonVariants) {
  return <a data-slot="button-link" className={buttonClasses({ variant, size }, className)} {...props} />
}

export { Button, ButtonLink }
