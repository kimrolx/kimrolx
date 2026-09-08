import { useState } from "react";
import type { Project } from "@/types";
import { CaseStudyModal } from "./CaseStudyModal";
import { ProjectRail } from "./ProjectRail";

/**
 * The projects layout: one horizontal rail at every width — swiped on touch,
 * driven by the arrows or the keyboard elsewhere. Owns the case-study modal
 * shared by every panel.
 */
export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);

  return (
    <>
      <ProjectRail projects={projects} onOpenCaseStudy={setActiveCaseStudy} />
      <CaseStudyModal project={activeCaseStudy} onClose={() => setActiveCaseStudy(null)} />
    </>
  );
}
