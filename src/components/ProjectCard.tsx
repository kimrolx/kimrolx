import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { AppStoreBadge } from "./AppStoreBadge";
import { ButtonLink } from "./Button";
import { CaseStudy } from "./CaseStudy";
import { ProjectMedia } from "./ProjectMedia";
import { StatusPill } from "./StatusPill";
import { TechList } from "./TechTag";

type ProjectCardProps = {
  project: Project;
  /** Flip the media to the other column for rhythm on desktop. */
  reversed?: boolean;
};

export function ProjectCard({ project, reversed }: ProjectCardProps) {
  return (
    <article className="flex scroll-mt-24 flex-col gap-8" id={project.id}>
      {/* Title block */}
      <div className="flex flex-col gap-4 border-t border-line-2 pt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h3 className="text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-[-0.04em]">
            {project.title}
          </h3>
          <div className="flex items-center gap-4">
            <StatusPill status={project.status} />
            <span className="label text-ink-3">{project.period}</span>
          </div>
        </div>
        <p className="max-w-prose text-ink-2">{project.kind}</p>
      </div>

      {/* Media + detail */}
      <div className="grid items-start gap-8 md:grid-cols-2 md:gap-12">
        <div className={cn("min-w-0", reversed && "md:order-2")}>
          <ProjectMedia project={project} />
        </div>

        <div className={cn("flex min-w-0 flex-col items-start gap-6", reversed && "md:order-1")}>
          <p className="max-w-prose text-ink-2 sm:text-lg">{project.description}</p>
          <TechList items={project.techStack} />

          <div className="mt-1 flex flex-wrap items-center gap-3">
            {project.links.map(({ label, href, icon: Icon }) =>
              href.includes("apps.apple.com") ? (
                <AppStoreBadge key={label} href={href} />
              ) : (
                <ButtonLink
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant={project.featured ? "primary" : "ghost"}
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  {label}
                </ButtonLink>
              ),
            )}
          </div>
        </div>
      </div>

      {project.caseStudy && <CaseStudy data={project.caseStudy} title={project.title} />}
    </article>
  );
}
