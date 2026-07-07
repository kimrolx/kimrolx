import type { Project } from '@/types';
import { cn } from '@/lib/utils';
import { AppStoreBadge } from './AppStoreBadge';
import { ButtonLink } from './Button';
import { ProjectMedia } from './ProjectMedia';
import { StatusPill } from './StatusPill';
import { TechList } from './TechTag';

type ProjectPanelProps = {
  project: Project;
  index: number;
  variant: 'full-bleed' | 'stacked';
  /** Add scroll-snap alignment (native-snap path). */
  snap?: boolean;
  onOpenCaseStudy: (project: Project) => void;
};

/**
 * A single project shown sparse: index, title, one line, media, tech, links,
 * and a case-study trigger. `full-bleed` fills the viewport for the horizontal
 * paths; `stacked` flows in normal document order for mobile.
 */
export function ProjectPanel({ project, index, variant, snap = false, onOpenCaseStudy }: ProjectPanelProps) {
  const fullBleed = variant === 'full-bleed';

  return (
    <article
      id={project.id}
      className={cn(
        'scroll-mt-24',
        fullBleed
          ? 'flex h-screen w-screen shrink-0 items-center justify-center px-5 sm:px-8'
          : 'border-t border-line-2 py-12 sm:py-16',
        snap && 'snap-start snap-always',
      )}
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className="flex min-w-0 flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span
              aria-hidden="true"
              className="text-[clamp(2rem,6vw,3.5rem)] font-black leading-none tracking-[-0.04em] text-line-2"
            >
              {String(index + 1).padStart(2, '0')}
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
                  variant={project.featured ? 'primary' : 'ghost'}
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
                className="label text-ink transition-colors hover:text-red-ink hover:cursor-pointer"
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
