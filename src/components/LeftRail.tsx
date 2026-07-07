import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { WipeLink } from '@/components/WipeLink';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useEasterEgg } from '@/hooks/useEasterEgg';
import { useTapSequence } from '@/hooks/useTapSequence';
import { cn } from '@/lib/utils';

type Item = {
  n: string;
  label: string;
  to: string;
  /** home-anchor section id (scroll-spy) */
  section?: string;
  /** standalone route path */
  route?: string;
};

const ITEMS: Item[] = [
  { n: '01', label: 'Experience', to: '/#experience', section: 'experience' },
  { n: '02', label: 'Projects', to: '/#projects', section: 'projects' },
  { n: '03', label: 'About', to: '/#about', section: 'about' },
  { n: '04', label: 'Contact', to: '/#contact', section: 'contact' },
  { n: '05', label: 'Gear', to: '/gear', route: '/gear' },
  { n: '06', label: 'Now', to: '/now', route: '/now' },
];

const SECTION_IDS = ['home', ...ITEMS.filter((i) => i.section).map((i) => i.section!)];

export function LeftRail() {
  const { pathname } = useLocation();
  const lenis = useLenis();
  const isHome = pathname === '/';
  const active = useActiveSection(isHome ? SECTION_IDS : []);

  const { toggleCrt } = useEasterEgg();
  const onDotTap = useTapSequence(toggleCrt, { count: 5, windowMs: 1500 });

  const isActive = (item: Item) => (isHome ? item.section === active : item.route === pathname);

  // The running folio: whatever destination we're currently sitting in.
  const current = isHome
    ? (ITEMS.find((i) => i.section === active) ?? null)
    : (ITEMS.find((i) => i.route === pathname) ?? null);

  return (
    <header
      className="fixed inset-y-0 left-0 hidden w-44 flex-col items-stretch border-r border-line bg-bg/85 backdrop-blur-md lg:flex"
      style={{ zIndex: 'var(--z-nav)' }}
    >
      {/* Wordmark — vertical, reads top→bottom */}
      <div className="flex h-28 shrink-0 items-center justify-center">
        <WipeLink
          to="/"
          aria-label="Kim Berame — back to top"
          onClick={() => {
            if (isHome) lenis?.scrollTo(0);
          }}
          className="text-base font-extrabold tracking-tight text-ink transition-colors hover:text-red-ink [writing-mode:vertical-rl]"
        >
          kimrolx
          <span
            className="text-red"
            style={{ cursor: 'default' }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDotTap();
            }}
          >
            .
          </span>
        </WipeLink>
      </div>

      {/* Index — numbered 01–06 with a small always-on label, red tick marks active */}
      <nav aria-label="Primary" className="flex flex-1 items-center">
        <ul className="flex w-full flex-col gap-1">
          {ITEMS.map((item) => {
            const on = isActive(item);
            return (
              <li key={item.n}>
                <WipeLink
                  to={item.to}
                  aria-current={on ? 'true' : undefined}
                  className="group relative flex min-h-11 items-center gap-3 pl-6 pr-5"
                >
                  {/* Red tick — grows from the left edge for the active item */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute left-0 h-px w-0 bg-red transition-[width] duration-300 ease-out',
                      on && 'w-4',
                    )}
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      'label w-5 shrink-0 tabular-nums text-ink-3 transition-colors group-hover:text-ink',
                      on && 'text-ink',
                    )}
                  >
                    {item.n}
                  </span>
                  <span
                    className={cn(
                      'text-[0.8125rem] font-medium tracking-tight text-ink-3 transition-colors group-hover:text-ink',
                      on && 'text-ink',
                    )}
                  >
                    {item.label}
                  </span>
                </WipeLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Running folio — names the current location, reads bottom→top */}
      <div className="flex h-40 shrink-0 items-center justify-center">
        <div
          aria-hidden="true"
          className="flex items-center gap-3 [writing-mode:vertical-rl] [transform:rotate(180deg)]"
        >
          <span
            className={cn(
              'h-px w-4 shrink-0 bg-line-2 transition-opacity duration-300',
              current ? 'opacity-100' : 'opacity-0',
            )}
          />
          {current ? (
            <span key={current.n} className="folio-swap flex items-baseline gap-2">
              <span className="label text-red-ink">{current.n}</span>
              <span className="text-sm font-bold tracking-wide text-ink-2">{current.label}</span>
            </span>
          ) : (
            <span className="label text-ink-3">Index</span>
          )}
        </div>
      </div>
    </header>
  );
}
