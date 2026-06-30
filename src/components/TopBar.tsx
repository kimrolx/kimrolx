import { useLocation } from "react-router-dom";
import { WipeLink } from "@/components/WipeLink";
import { useLenis } from "lenis/react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { useEasterEgg } from "@/hooks/useEasterEgg";
import { useTapSequence } from "@/hooks/useTapSequence";

const SECTIONS = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

const SECTION_IDS = ["home", ...SECTIONS.map((s) => s.id)];

export function TopBar() {
  const { pathname } = useLocation();
  const lenis = useLenis();
  const isHome = pathname === "/";
  // Only track section scroll-spy on the home page.
  const active = useActiveSection(isHome ? SECTION_IDS : []);

  const { toggleCrt } = useEasterEgg();
  const onDotTap = useTapSequence(toggleCrt, { count: 5, windowMs: 1500 });

  return (
    <header
      className="sticky top-0 border-b border-line bg-bg/85 backdrop-blur-md"
      style={{ zIndex: "var(--z-nav)" }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <WipeLink
          to="/"
          aria-label="Back to top"
          onClick={() => {
            if (isHome) lenis?.scrollTo(0);
          }}
          className="shrink-0 whitespace-nowrap text-base font-extrabold tracking-tight text-ink transition-colors hover:text-red-ink"
        >
          Kim Berame
          <span
            className="text-red"
            style={{ cursor: "default" }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDotTap();
            }}
          >
            .
          </span>
        </WipeLink>

        <ul className="flex items-center gap-5 lg:gap-8">
          {SECTIONS.map((section) => {
            const current = isHome && active === section.id;
            return (
              <li key={section.id} className="hidden sm:block">
                <WipeLink
                  to={`/#${section.id}`}
                  aria-current={current ? "true" : undefined}
                  className={cn(
                    "label inline-flex min-h-11 items-center text-ink-3 transition-colors hover:text-ink",
                    current && "text-ink",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mr-2 h-px w-0 bg-red transition-[width] duration-300",
                      current && "w-4",
                    )}
                  />
                  {section.label}
                </WipeLink>
              </li>
            );
          })}

          <li>
            <WipeLink
              to="/now"
              aria-current={pathname === "/now" ? "true" : undefined}
              className={cn(
                "label inline-flex min-h-11 items-center text-ink-3 transition-colors hover:text-ink",
                pathname === "/now" && "text-ink",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "mr-2 h-px w-0 bg-red transition-[width] duration-300",
                  pathname === "/now" && "w-4",
                )}
              />
              Now
            </WipeLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
