import { forwardRef, type MouseEvent } from "react";
import { Link, useLocation, type LinkProps } from "react-router-dom";
import { useWipeNavigate } from "@/hooks/useWipeNavigate";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Parse the pathname out of a string `to` (ignores hash/search). */
function pathOf(to: string): string {
  return to.split("#")[0].split("?")[0] || "/";
}

/**
 * Drop-in <Link> that plays the wipe transition when navigating to a
 * different pathname. Same-path/hash links, modifier clicks, and
 * reduced-motion fall through to normal <Link> behavior.
 */
export const WipeLink = forwardRef<HTMLAnchorElement, LinkProps>(function WipeLink(
  { to, onClick, ...rest },
  ref,
) {
  const wipeNavigate = useWipeNavigate();
  const { pathname } = useLocation();
  const reduced = usePrefersReducedMotion();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (typeof to !== "string") return; // only handle string targets
    if (reduced) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (pathOf(to) === pathname) return; // same page → let lenis/hash handle it
    e.preventDefault();
    wipeNavigate(to);
  };

  return <Link ref={ref} to={to} onClick={handleClick} {...rest} />;
});
