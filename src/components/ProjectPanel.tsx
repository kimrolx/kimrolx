import type { Project } from '@/types';
import { cn } from '@/lib/utils';
import { AppStoreBadge } from './AppStoreBadge';
import { Button, ButtonLink } from '@/components/base-components/button';
import { ProjectMedia } from './ProjectMedia';
import { StatusPill } from './StatusPill';
import { TechList } from './TechTag';

type ProjectPanelProps = {
  project: Project;
  index: number;
  variant: 'rail' | 'stacked';
  /** Rail only: the centred card reads full strength, its neighbours recede. */
  active?: boolean;
  onOpenCaseStudy: (project: Project) => void;
};

export function ProjectPanel({
  project,
  index,
  variant,
  active = true,
  onOpenCaseStudy,
}: ProjectPanelProps) {
  const number = String(index + 1).padStart(2, '0');

  if (variant === 'rail') {
    return (
      <article
        id={project.id}
        data-rail-card=""
        className={cn(
          'group relative flex h-[min(720px,calc(100vh-12rem))] min-h-[500px] w-[min(900px,86vw)] shrink-0 snap-center flex-col overflow-hidden rounded-sm border border-line transition-[border-color,opacity] duration-500 ease-out-expo hover:border-red hover:opacity-100',
          active ? 'opacity-100' : 'opacity-45',
        )}
      >
        <div
          aria-hidden="true"
          data-tone={project.id}
          className="media-stripes pointer-events-none absolute inset-0 bg-inset"
        />

        <div className="relative min-h-[120px] flex-1 px-8 pt-8 sm:px-14">
          <div className="h-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]">
            <ProjectMedia project={project} variant="rail" />
          </div>
        </div>

        <div className="relative flex items-baseline gap-4 px-8 pb-2 pt-7 sm:px-10">
          <span aria-hidden="true" className="label text-red">
            {number}
          </span>
          <h3 className="text-[clamp(1.75rem,2.8vw,3rem)] font-black leading-[0.95] tracking-[-0.04em] transition-transform duration-500 ease-out-expo group-hover:translate-x-2.5">
            {project.title}
          </h3>
        </div>

        <div className="relative flex flex-col gap-3.5 px-8 pb-8 pt-5 sm:px-10">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <StatusPill status={project.status} />
            <span className="label text-ink-3">{project.period}</span>
          </div>

          <p className="text-[1.0625rem] font-semibold leading-snug text-ink">{project.kind}</p>
          <p className="line-clamp-2 text-[0.9375rem] leading-[1.62] text-ink-3">{project.description}</p>

          <TechList items={project.techStack} />

          <div className="mt-2 flex flex-wrap items-center gap-3">
            {project.links.map(({ label, href, icon: Icon }) => (
              <ButtonLink
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variant={project.featured ? 'default' : 'outline'}
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
                {label}
              </ButtonLink>
            ))}
            {project.caseStudy && (
              <Button variant="outline" onClick={() => onOpenCaseStudy(project)}>
                Case study →
              </Button>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article id={project.id} className="scroll-mt-24 border-t border-line-2 py-12 sm:py-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className="flex min-w-0 flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span
              aria-hidden="true"
              className="text-[clamp(2rem,6vw,3.5rem)] font-black leading-none tracking-[-0.04em] text-line-2"
            >
              {number}
            </span>
            <h3 className="text-[clamp(1.5rem,3.5vw,2.375rem)] font-extrabold tracking-[-0.04em]">{project.title}</h3>
            <p className="text-ink-2">{project.kind}</p>
            <div className="flex items-center gap-4">
              <StatusPill status={project.status} />
              <span className="label text-ink-3">{project.period}</span>
            </div>
          </div>

          <p className="max-w-prose text-ink-2">{project.description}</p>

          <TechList items={project.techStack} />

          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-3">
            {project.links.map(({ label, href, icon: Icon }) =>
              href.includes('apps.apple.com') ? (
                <AppStoreBadge key={label} href={href} />
              ) : (
                <ButtonLink
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant={project.featured ? 'default' : 'outline'}
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  {label}
                </ButtonLink>
              ),
            )}
            {project.caseStudy && (
              <button
                type="button"
                onClick={() => onOpenCaseStudy(project)}
                className="label text-ink transition-colors hover:cursor-pointer hover:text-red-ink"
              >
                Case study →
              </button>
            )}
          </div>
        </div>

        <div className="min-w-0">
          <ProjectMedia project={project} />
        </div>
      </div>
    </article>
  );
}
