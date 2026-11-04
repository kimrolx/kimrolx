import type { Project, ProjectLink } from '@/types';
import appStoreBadge from '@/assets/app_store_badge.svg';
import { cn } from '@/lib/utils';
import { pad2 } from '@/lib/projectList';
import { ButtonLink } from '@/components/base-components/button';
import { StatusPill } from './StatusPill';

type DeckCardProps = {
  project: Project;
  index: number;
  total: number;
  depth: number;
  onBring: () => void;
  onOpenCaseStudy: (project: Project) => void;
};

const COMPACT_STACK_ITEMS = 4;

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

export function DeckCard({ project, index, total, depth, onBring, onOpenCaseStudy }: DeckCardProps) {
  const front = depth === 0;

  return (
    <article
      aria-label={`Project ${index + 1} of ${total}: ${project.title}`}
      data-depth={depth}
      className={cn(
        'deck-card flex flex-col overflow-hidden rounded-sm border bg-inset',
        front ? 'border-line-2' : 'group border-line hover:-translate-y-1.5 hover:border-red',
      )}
    >
      <header className="mono-label flex h-8 shrink-0 items-center gap-3 border-b border-line px-4 text-[0.6875rem] @min-[67rem]:h-12 @min-[67rem]:px-6 @min-[67rem]:text-xs">
        {front && <span aria-hidden="true" className="size-2 bg-red" />}
        <span className="text-ink-3">{pad2(index + 1)}</span>
        <span className="text-ink transition-colors group-hover:text-red-ink">{project.title}</span>
        {project.status && (
          <StatusPill label={project.status} live={project.status === 'Production'} className="ml-auto" />
        )}
      </header>

      {front ? (
        <FrontBody project={project} onOpenCaseStudy={onOpenCaseStudy} />
      ) : (
        <>
          <div className="min-h-0 flex-1 opacity-60 transition-opacity group-hover:opacity-85">
            {project.cover && <img src={project.cover.src} alt="" className="size-full object-cover" />}
          </div>
          {/* Pointer shortcut only: the tabs and arrows are the keyboard path. */}
          <button
            type="button"
            tabIndex={-1}
            aria-label={`Show ${project.title}`}
            onClick={onBring}
            className="absolute inset-0"
          />
        </>
      )}
    </article>
  );
}

function FrontBody({ project, onOpenCaseStudy }: Pick<DeckCardProps, 'project' | 'onOpenCaseStudy'>) {
  const [primary, secondary] = project.links;
  const stack = project.stack ?? project.techStack;

  return (
    <div className="flex min-h-0 flex-1 flex-col @min-[67rem]:grid @min-[67rem]:grid-cols-[380px_1fr]">
      <div className="min-h-0 flex-1 border-b border-line bg-bg @min-[67rem]:border-r @min-[67rem]:border-b-0">
        {project.cover && (
          <img src={project.cover.src} alt={project.cover.alt} className="size-full object-cover" />
        )}
      </div>

      <div className="flex flex-col gap-3 p-4 @min-[67rem]:p-8">
        {project.period && <p className="mono-label text-ink-3">{project.period}</p>}
        <h3 className="text-[1.75rem] font-black leading-[0.95] tracking-[-0.04em] @min-[67rem]:text-[2.5rem]">
          {project.title}
        </h3>
        <p className="text-base font-semibold leading-snug @min-[67rem]:text-[1.0625rem]">{project.kind}</p>
        <p className="line-clamp-2 text-[0.9375rem] leading-[1.62] text-ink-2">{project.description}</p>
        <p className="text-sm text-ink-3">
          {stack.slice(0, COMPACT_STACK_ITEMS).join(' · ')}
          <span className="hidden @min-[67rem]:inline">
            {stack.slice(COMPACT_STACK_ITEMS).map((item) => ` · ${item}`)}
          </span>
        </p>

        <div className="mt-auto flex flex-col gap-1 @min-[67rem]:flex-row @min-[67rem]:flex-wrap @min-[67rem]:items-center @min-[67rem]:gap-x-6">
          {primary && <PrimaryCta link={primary} />}
          {secondary && (
            <a
              href={secondary.href}
              {...external}
              className="mono-label inline-flex min-h-11 items-center text-ink transition-colors hover:text-red-ink"
            >
              {secondary.label} ↗
            </a>
          )}
          {project.caseStudy && (
            <button
              type="button"
              onClick={() => onOpenCaseStudy(project)}
              className="mono-label inline-flex min-h-11 items-center text-ink-2 transition-colors hover:text-red-ink"
            >
              Case study →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function PrimaryCta({ link }: { link: ProjectLink }) {
  if (link.href.includes('apps.apple.com')) {
    return (
      <a href={link.href} {...external} className="inline-flex self-start transition-transform duration-200 hover:-translate-y-px">
        <img src={appStoreBadge} alt="Download on the App Store" width={144} height={48} className="h-12 w-auto" />
      </a>
    );
  }
  return (
    <ButtonLink href={link.href} {...external} size="mono" className="w-full @min-[67rem]:w-auto">
      {link.label} ↗
    </ButtonLink>
  );
}
