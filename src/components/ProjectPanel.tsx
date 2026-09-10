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
  /** The centred card reads full strength, its neighbours recede. */
  active?: boolean;
  onOpenCaseStudy: (project: Project) => void;
};

export function ProjectPanel({ project, index, active = true, onOpenCaseStudy }: ProjectPanelProps) {
  const number = String(index + 1).padStart(2, '0');

  return (
    <article
      id={project.id}
      data-rail-card=""
      className={cn(
        'group relative flex h-[min(720px,calc(100svh-9rem))] min-h-[26rem] w-[86vw] max-w-[900px] shrink-0 snap-center flex-col overflow-hidden rounded-sm border border-line transition-[border-color,opacity] duration-500 ease-out-expo hover:border-red hover:opacity-100 sm:min-h-[31.25rem]',
        active ? 'opacity-100' : 'opacity-45',
      )}
    >
      <div
        aria-hidden="true"
        data-tone={project.id}
        className="media-stripes pointer-events-none absolute inset-0 bg-inset"
      />

      <div className="relative min-h-[100px] flex-1 px-5 pt-5 sm:px-14 sm:pt-8">
        <div className="h-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]">
          <ProjectMedia project={project} />
        </div>
      </div>

      <div className="relative flex items-baseline gap-3 px-5 pb-2 pt-5 sm:gap-4 sm:px-10 sm:pt-7">
        <span aria-hidden="true" className="label text-red">
          {number}
        </span>
        <h3 className="text-[clamp(1.5rem,2.8vw,3rem)] font-black leading-[0.95] tracking-[-0.04em] transition-transform duration-500 ease-out-expo group-hover:translate-x-2.5">
          {project.title}
        </h3>
      </div>

      <div className="relative flex flex-col gap-3 px-5 pb-6 pt-4 sm:gap-3.5 sm:px-10 sm:pb-8 sm:pt-5">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <StatusPill status={project.status} />
          <span className="label text-ink-3">{project.period}</span>
        </div>

        <p className="text-[1.0625rem] font-semibold leading-snug text-ink">{project.kind}</p>
        <p className="line-clamp-2 text-[0.9375rem] leading-[1.62] text-ink-3">{project.description}</p>

        <TechList items={project.techStack} />

        <div className="mt-2 flex flex-wrap items-center gap-3">
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
            <Button variant="outline" onClick={() => onOpenCaseStudy(project)}>
              Case study →
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
