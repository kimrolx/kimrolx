import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react"
import { buttonClasses, type ButtonVariants } from "./button-styles"

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
