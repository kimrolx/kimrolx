import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import type { Project } from '@/types';
import { initials } from '@/lib/projectList';
import { StatusPill } from './StatusPill';

type ProjectRowProps = {
  project: Project;
  number: string;
  /** In-page link that opens the case study; rows without one link out to `links[0]`. */
  caseTo?: string;
};

const ROW =
  'group grid grid-cols-[72px_1fr_20px] items-center gap-4 py-4 @min-[64rem]:grid-cols-[56px_96px_1fr_160px_280px_96px_24px] @min-[64rem]:gap-6';

export function ProjectRow({ project, number, caseTo }: ProjectRowProps) {
  const live = project.category === 'Production';
  const cells = (
    <>
      <span className="mono-label hidden text-ink-3 @min-[64rem]:block">{number}</span>
      <span className="block aspect-[4/3] overflow-hidden rounded-sm border border-line bg-inset">
        {project.cover ? (
          <img src={project.cover.src} alt="" loading="lazy" className="size-full object-cover" />
        ) : (
          <span className="mono-label grid size-full place-items-center text-ink-3">{initials(project.title)}</span>
        )}
      </span>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="mono-label text-[0.6875rem] text-ink-3 @min-[64rem]:hidden">
          {number} · {project.category} · {project.year}
        </span>
        <span className="text-[1.375rem] font-extrabold leading-tight tracking-[-0.03em] transition-colors group-hover:text-red-ink @min-[64rem]:text-[1.75rem]">
          {project.title}
        </span>
        <span className="text-sm text-ink-2 @min-[64rem]:text-[0.9375rem]">{project.kind}</span>
      </span>
      <span className="hidden @min-[64rem]:block">
        <StatusPill label={project.category} live={live} className="mono-label" />
      </span>
      <span className="hidden text-sm text-ink-2 @min-[64rem]:block">
        {(project.stack ?? project.techStack).join(' · ')}
      </span>
      <span className="mono-label hidden text-ink-3 @min-[64rem]:block">{project.year}</span>
      <FiArrowRight
        aria-hidden="true"
        className="h-5 w-5 text-ink-3 transition group-hover:translate-x-1 group-hover:text-red-ink"
      />
    </>
  );

  return <li className="border-b border-line">{rowLink(project, caseTo, cells)}</li>;
}

function rowLink(project: Project, caseTo: string | undefined, cells: ReactNode) {
  if (caseTo) {
    return (
      <Link to={caseTo} className={ROW}>
        {cells}
      </Link>
    );
  }
  return (
    <a href={project.links[0]?.href} target="_blank" rel="noopener noreferrer" className={ROW}>
      {cells}
    </a>
  );
}
