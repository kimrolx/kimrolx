import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

const SECTION_IDS = ["home", ...SECTIONS.map((s) => s.id)];

export function TopBar() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <header
      className="sticky top-0 border-b border-line bg-bg/85 backdrop-blur-md"
      style={{ zIndex: "var(--z-nav)" }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#home"
          aria-label="Back to top"
          className="text-base font-extrabold tracking-tight text-ink transition-colors hover:text-red-ink"
        >
          Kim Berame<span className="text-red">.</span>
        </a>

        <ul className="flex items-center gap-5 sm:gap-8">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active === section.id ? "true" : undefined}
                className={cn(
                  "label inline-flex min-h-11 items-center text-ink-3 transition-colors hover:text-ink",
                  active === section.id && "text-ink",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mr-2 h-px w-0 bg-red transition-[width] duration-300",
                    active === section.id && "w-4",
                  )}
                />
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
