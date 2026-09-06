import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import type { Project } from '@/types';
import { socials } from '@/data/profile';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ButtonLink } from '@/components/base-components/button';
import { ProjectPanel } from './ProjectPanel';

/** Matches `mx-auto max-w-6xl px-5 sm:px-8`, but on a full-bleed scroller. */
const RAIL_GUTTER =
  'px-[max(1.25rem,calc((100%_-_72rem)/2))] sm:px-[max(2rem,calc((100%_-_72rem)/2))]';

const CONTROL =
  'flex h-11 w-11 items-center justify-center rounded-sm border border-line text-ink-2 transition-colors hover:border-red hover:text-red-ink disabled:pointer-events-none disabled:opacity-30';

const github = socials.find((social) => social.label === 'GitHub');

/**
 * The projects rail: a normal-height horizontal scroller the reader drives
 * with the trackpad, the arrows, the keyboard, or the native scrollbar. It
 * owns its own overflow, so page scroll is never captured and Lenis is
 * untouched; CSS scroll-snap does the centring.
 */
export function ProjectRail({
  projects,
  onOpenCaseStudy,
}: {
  projects: Project[];
  onOpenCaseStudy: (project: Project) => void;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();
  const { hash } = useLocation();

  const count = projects.length;

  const scrollToIndex = useCallback(
    (target: number, behavior: ScrollBehavior) => {
      const cards = railRef.current?.querySelectorAll<HTMLElement>('[data-rail-card]');
      cards?.[Math.max(0, Math.min(count - 1, target))]?.scrollIntoView({
        behavior,
        inline: 'center',
        block: 'nearest',
      });
    },
    [count],
  );

  // Only the card crossing the rail's centre line intersects this band, so
  // the observer reports exactly one current card.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const cards = Array.from(rail.querySelectorAll<HTMLElement>('[data-rail-card]'));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setIndex(cards.indexOf(entry.target as HTMLElement));
        }
      },
      { root: rail, rootMargin: '0px -49% 0px -49%' },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [projects]);

  useEffect(() => {
    const target = projects.findIndex((project) => project.id === decodeURIComponent(hash.slice(1)));
    if (target >= 0) scrollToIndex(target, 'auto');
  }, [projects, hash, scrollToIndex]);

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    scrollToIndex(index + (event.key === 'ArrowRight' ? 1 : -1), reduced ? 'auto' : 'smooth');
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-4 px-5 sm:px-8">
        <span aria-hidden="true" className="label font-mono text-ink-2">
          {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </span>

        <div className="flex items-center gap-3">
          {github && (
            <ButtonLink
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="label font-mono"
            >
              More on GitHub →
            </ButtonLink>
          )}
          <button
            type="button"
            onClick={() => scrollToIndex(index - 1, reduced ? 'auto' : 'smooth')}
            disabled={index === 0}
            aria-label="Previous project"
            className={CONTROL}
          >
            <FiArrowLeft aria-hidden="true" className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(index + 1, reduced ? 'auto' : 'smooth')}
            disabled={index >= count - 1}
            aria-label="Next project"
            className={CONTROL}
          >
            <FiArrowRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        role="group"
        aria-label="Projects"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className={`project-rail flex gap-10 overflow-x-auto pb-8 ${RAIL_GUTTER}`}
      >
        {projects.map((project, i) => (
          <ProjectPanel
            key={project.id}
            project={project}
            index={i}
            variant="rail"
            active={i === index}
            onOpenCaseStudy={onOpenCaseStudy}
          />
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        {projects[index]?.title}, project {index + 1} of {count}
      </p>
    </div>
  );
}
