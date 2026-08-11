import { useState } from "react";
import type { JSX } from "react";
import type { Project } from "@/types";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { CaseStudyModal } from "./CaseStudyModal";
import { PinnedTrack } from "./PinnedTrack";
import { ProjectPanel } from "./ProjectPanel";

/**
 * Chooses the projects layout: desktop + motion → pinned scroll-jack;
 * reduced-motion on desktop → native horizontal snap; anything narrower than
 * md → vertical stack. Owns one case-study modal shared by every panel.
 */
export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const reduced = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 48rem)");
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);

  let body: JSX.Element;
  if (isDesktop && !reduced) {
    body = <PinnedTrack projects={projects} onOpenCaseStudy={setActiveCaseStudy} />;
  } else if (isDesktop && reduced) {
    body = (
      <div className="flex snap-x snap-mandatory overflow-x-auto">
        {projects.map((project, i) => (
          <ProjectPanel
            key={project.id}
            project={project}
            index={i}
            variant="full-bleed"
            snap
            onOpenCaseStudy={setActiveCaseStudy}
          />
        ))}
      </div>
    );
  } else {
    body = (
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
    );
  }

  return (
    <>
      {body}
      <CaseStudyModal project={activeCaseStudy} onClose={() => setActiveCaseStudy(null)} />
    </>
  );
}
