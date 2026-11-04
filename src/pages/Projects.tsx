import { useSearchParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import type { ProjectCategory } from '@/types';
import { useSEO } from '@/hooks/useSEO';
import { ROUTES } from '@/config/seo';
import { projects } from '@/data/projects';
import { socials } from '@/data/profile';
import {
  CATEGORIES,
  categorySlug,
  countByCategory,
  filterProjects,
  findProject,
  pad2,
  parseCategory,
} from '@/lib/projectList';
import { cn } from '@/lib/utils';
import { CaseStudyModal } from '@/components/CaseStudyModal';
import { ProjectRow } from '@/components/ProjectRow';
import { Section } from '@/components/Section';
import { SheetHeading } from '@/components/SheetHeading';
import { WipeLink } from '@/components/WipeLink';

const githubHref = socials.find((s) => s.label === 'GitHub')?.href ?? 'https://github.com/kimrolx';

const FILTERS: { category: ProjectCategory | null; label: string }[] = [
  { category: null, label: 'All' },
  ...CATEGORIES.map((category) => ({
    category,
    label: category === 'Experiment' ? 'Experiments' : category,
  })),
];

export function Projects() {
  useSEO(ROUTES['/projects']);
  const [params, setParams] = useSearchParams();
  const category = parseCategory(params.get('type'));
  const stack = params.get('stack')?.trim() || null;
  const counts = countByCategory(filterProjects(projects, { category: null, stack }));
  const shown = filterProjects(projects, { category, stack });

  const setParam = (key: string, value: string | null) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value === null) next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true },
    );

  const caseTo = (id: string) => {
    const next = new URLSearchParams(params);
    next.set('case', id);
    return `?${next}`;
  };

  return (
    <main className="relative" style={{ zIndex: 'var(--z-content)' }}>
      <Section id="archive" className="flex flex-col gap-10">
        <WipeLink to="/" className="mono-label inline-flex min-h-11 items-center gap-2 self-start text-ink-3 transition-colors hover:text-ink">
          <FiArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
          Home
        </WipeLink>

        <div className="flex flex-col gap-6">
          <SheetHeading label="Projects · Archive" meta={`${pad2(projects.length)} entries`} />
          <h1 className="text-[clamp(3rem,8vw,4.5rem)] font-black leading-[0.92] tracking-[-0.04em]">
            All projects<span className="text-red">.</span>
          </h1>
          <p className="max-w-prose text-ink-2">Everything I&rsquo;ve shipped, studied or tinkered with, newest first.</p>
        </div>

        <div role="group" aria-label="Filter projects by type" className="flex flex-wrap border-b border-line">
          {FILTERS.map((filter) => {
            const active = filter.category === category;
            return (
              <button
                key={filter.label}
                type="button"
                aria-pressed={active}
                onClick={() => setParam('type', filter.category && categorySlug(filter.category))}
                className={cn(
                  'mono-label -mb-px min-h-11 border-b-2 px-4 transition-colors',
                  active ? 'border-red text-ink' : 'border-transparent text-ink-2 hover:text-ink',
                )}
              >
                {filter.label} <span className="text-ink-3">{pad2(counts[filter.category ?? 'All'])}</span>
              </button>
            );
          })}
        </div>

        {stack && (
          <div className="-mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="label text-ink-3">Where I&rsquo;ve used</span>
            <span className="text-sm font-semibold tracking-tight text-ink">{stack}</span>
            <button
              type="button"
              onClick={() => setParam('stack', null)}
              className="mono-label ml-auto min-h-11 text-ink-3 transition-colors hover:text-red-ink"
            >
              Clear
            </button>
          </div>
        )}

        <div className="@container">
          <div
            aria-hidden="true"
            className="label hidden grid-cols-[56px_96px_1fr_160px_280px_96px_24px] gap-6 border-b border-line-2 pb-3 text-ink-3 @min-[64rem]:grid"
          >
            <span>No.</span>
            <span />
            <span>Project</span>
            <span>Type</span>
            <span>Stack</span>
            <span>Year</span>
          </div>
          {shown.length ? (
            <ol>
              {shown.map((project) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  number={pad2(projects.indexOf(project) + 1)}
                  caseTo={project.caseStudy && caseTo(project.id)}
                />
              ))}
            </ol>
          ) : (
            <p className="border-b border-line py-10 text-ink-3">No project lists it yet.</p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <span role="status" className="label text-ink-3">
            Showing {shown.length} of {projects.length}
          </span>
          <a
            href={githubHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label inline-flex min-h-11 items-center text-ink transition-colors hover:text-red-ink"
          >
            More on GitHub ↗
          </a>
        </div>
      </Section>

      <CaseStudyModal
        project={findProject(projects, params.get('case')) ?? null}
        onClose={() => setParam('case', null)}
      />
    </main>
  );
}
