import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/lib/utils';

const SECTIONS = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const;

const SECTION_IDS = ['home', ...SECTIONS.map((s) => s.id)];

export function TopBar() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <header
      className="sticky top-0 border-b border-border bg-bg/70 backdrop-blur-md"
      style={{ zIndex: 'var(--z-nav)' }}
    >
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-8">
        <a
          href="#home"
          aria-label="Back to top"
          className="font-mono text-sm font-medium tracking-tight text-ink transition-colors hover:text-amber"
        >
          <span className="sm:hidden">
            kim<span className="text-amber">rol</span>
          </span>
          <span className="hidden sm:inline">
            kim<span className="text-amber">.berame</span>
          </span>
        </a>

        <ul className="flex items-center gap-3.5 font-mono text-xs sm:gap-7 sm:text-[0.8125rem]">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active === section.id ? 'true' : undefined}
                className={cn(
                  'inline-flex min-h-11 items-center text-ink-dim transition-colors hover:text-ink',
                  active === section.id && 'text-amber hover:text-amber',
                )}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
