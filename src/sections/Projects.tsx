import { useState } from "react";
import type { Project } from "@/types";
import { featuredProjects } from "@/data/projects";
import { pad2 } from "@/lib/projectList";
import { CaseStudyModal } from "@/components/CaseStudyModal";
import { ProjectDeck } from "@/components/ProjectDeck";
import { Section } from "@/components/Section";
import { SheetHeading } from "@/components/SheetHeading";

export function Projects() {
  const [caseStudy, setCaseStudy] = useState<Project | null>(null);

  return (
    <Section id="projects" className="flex flex-col gap-12">
      <SheetHeading
        label="02 · Projects"
        title="Selected work"
        meta={`${pad2(featuredProjects.length)} selected`}
        description="Production builds, university work, and the things I keep tending."
      />
      <ProjectDeck projects={featuredProjects} onOpenCaseStudy={setCaseStudy} />
      <CaseStudyModal project={caseStudy} onClose={() => setCaseStudy(null)} />
    </Section>
  );
}
