import type { AnchorHTMLAttributes } from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-sm font-semibold tracking-tight outline-none transition-[transform,color,border-color,background-color,opacity] duration-200 ease-out select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Solid white key: maximum contrast, the Swiss black/white move.
        default: "bg-ink text-bg hover:-translate-y-px hover:bg-ink-2 active:translate-y-0",
        // Outline: hairline that warms to red on hover.
        outline:
          "border border-line-2 text-ink hover:-translate-y-px hover:border-red hover:text-red-ink active:translate-y-0",
        // Chromeless, for icon affordances that sit inside other surfaces.
        ghost: "text-ink-3 hover:bg-surface hover:text-ink",
      },
      size: {
        default: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3 text-sm",
        "icon-sm": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonVariants = VariantProps<typeof buttonVariants>

function Button({ className, variant, size, ...props }: ButtonPrimitive.Props & ButtonVariants) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

/** A link styled as a button. Verb-first label, square edge. */
function ButtonLink({
  className,
  variant,
  size,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & ButtonVariants) {
  return <a data-slot="button-link" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, ButtonLink, buttonVariants }
