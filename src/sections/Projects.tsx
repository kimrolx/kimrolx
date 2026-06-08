import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";

export function Projects() {
  return (
    <Section id="projects" className="flex flex-col gap-14 sm:gap-20">
      <SectionHeading
        title="Projects"
        description="Production work, university builds, and the things I keep tending."
      />

      <div className="flex flex-col gap-16 sm:gap-24">
        {projects.map((project, i) => (
          <Reveal key={project.id}>
            <ProjectCard project={project} reversed={i % 2 === 1} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
