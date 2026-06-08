import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./Button";
import { ProjectMedia } from "./ProjectMedia";
import { StatusPill } from "./StatusPill";
import { TechList } from "./TechTag";

type ProjectCardProps = {
  project: Project;
  /** Flip the column order for visual rhythm on desktop. */
  reversed?: boolean;
};

export function ProjectCard({ project, reversed }: ProjectCardProps) {
  return (
    <article className="grid items-center gap-6 md:grid-cols-2 md:gap-12">
      <div className={cn("min-w-0", reversed && "md:order-2")}>
        <ProjectMedia project={project} />
      </div>

      <div className={cn("flex min-w-0 flex-col items-start gap-4", reversed && "md:order-1")}>
        <div className="flex items-center gap-3">
          <StatusPill status={project.status} />
          <span className="font-mono text-xs text-ink-faint">{project.period}</span>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-bold">{project.title}</h3>
          <p className="font-mono text-sm text-ink-dim">{project.kind}</p>
        </div>

        <p className="text-ink-dim">{project.description}</p>

        <TechList items={project.techStack} />

        <div className="mt-1 flex flex-wrap gap-3">
          {project.links.map(({ label, href, icon: Icon }) => (
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
          ))}
        </div>
      </div>
    </article>
  );
}
