import { useState } from "react";
import type { Project } from "@/types";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CaseStudyModal } from "./CaseStudyModal";
import { ProjectPanel } from "./ProjectPanel";
import { ProjectRail } from "./ProjectRail";

/**
 * Chooses the projects layout: a horizontal rail on md+, a vertical stack
 * below it. Owns one case-study modal shared by every panel.
 */
export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const isDesktop = useMediaQuery("(min-width: 48rem)");
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);

  return (
    <>
      {isDesktop ? (
        <ProjectRail projects={projects} onOpenCaseStudy={setActiveCaseStudy} />
      ) : (
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          {projects.map((project, i) => (
            <ProjectPanel
              key={project.id}
              project={project}
              index={i}
              variant="stacked"
              onOpenCaseStudy={setActiveCaseStudy}
            />
          ))}
        </div>
      )}
      <CaseStudyModal project={activeCaseStudy} onClose={() => setActiveCaseStudy(null)} />
    </>
  );
}
