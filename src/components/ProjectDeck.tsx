import { useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';
import { deckDepth, pad2, stepFront, swipeStep } from '@/lib/projectList';
import { buttonClasses } from '@/components/base-components/button-styles';
import { DeckCard } from './DeckCard';
import { WipeLink } from './WipeLink';

type ProjectDeckProps = {
  projects: Project[];
  onOpenCaseStudy: (project: Project) => void;
};

export function ProjectDeck({ projects, onOpenCaseStudy }: ProjectDeckProps) {
  const [front, setFront] = useState(0);
  const swipeStartX = useRef<number | null>(null);
  const n = projects.length;
  const step = (delta: number) => setFront((f) => stepFront(f, delta, n));

  // Mouse drags are text selection, not swipes.
  const onPointerDown = (e: PointerEvent) => {
    swipeStartX.current = e.pointerType === 'mouse' ? null : e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (swipeStartX.current !== null) step(swipeStep(e.clientX - swipeStartX.current));
    swipeStartX.current = null;
  };

  return (
    <div className="@container flex flex-col gap-12">
      <div
        className="deck-stage touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          swipeStartX.current = null;
        }}
      >
        {projects.map((project, i) => (
          <DeckCard
            key={project.id}
            project={project}
            index={i}
            total={n}
            depth={deckDepth(i, front, n)}
            onBring={() => setFront(i)}
            onOpenCaseStudy={onOpenCaseStudy}
          />
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {projects[front].title}, {front + 1} of {n}
      </p>

      <div className="hidden items-center justify-between gap-6 @min-[67rem]:flex">
        <div className="flex border-b border-line">
          {projects.map((project, i) => (
            <button
              key={project.id}
              type="button"
              aria-pressed={i === front}
              onClick={() => setFront(i)}
              className={cn(
                'mono-label -mb-px min-h-11 border-b-2 px-4 transition-colors',
                i === front ? 'border-red text-ink' : 'border-transparent text-ink-2 hover:text-ink',
              )}
            >
              <span className="text-ink-3">{pad2(i + 1)}</span> {project.title}
            </button>
          ))}
        </div>
        <SeeAllProjects />
      </div>

      <div className="flex flex-col gap-6 @min-[67rem]:hidden">
        <div className="flex items-center gap-4">
          <span className="mono-label text-ink-3">
            {pad2(front + 1)} / {pad2(n)}
          </span>
          <div aria-hidden="true" className="flex gap-1.5">
            {projects.map((project, i) => (
              <span key={project.id} className={cn('h-0.5 w-6', i === front ? 'bg-red' : 'bg-line-2')} />
            ))}
          </div>
          <div className="ml-auto flex gap-2">
            <DeckArrow label="Previous project" onClick={() => step(-1)}>
              <FiArrowLeft aria-hidden="true" />
            </DeckArrow>
            <DeckArrow label="Next project" onClick={() => step(1)}>
              <FiArrowRight aria-hidden="true" />
            </DeckArrow>
          </div>
        </div>
        <SeeAllProjects className="w-full" />
      </div>
    </div>
  );
}

function DeckArrow({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-sm border border-line-3 text-ink transition-colors hover:border-red hover:text-red-ink"
    >
      {children}
    </button>
  );
}

function SeeAllProjects({ className }: { className?: string }) {
  return (
    <WipeLink to="/projects" className={buttonClasses({ variant: 'outline', size: 'mono' }, className)}>
      See all projects
      <FiArrowRight aria-hidden="true" className="h-4 w-4" />
    </WipeLink>
  );
}
