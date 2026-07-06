import { projects } from "@/data/projects";
import { Archive } from "@/components/Archive";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SheetHeading } from "@/components/SheetHeading";

export function Projects() {
  const count = projects.length;

  return (
    <Section id="projects" className="flex flex-col gap-12 sm:gap-16">
      <SheetHeading
        title="Selected work"
        meta={`${count} projects`}
        description="Production builds, university work, and the things I keep tending."
      />

      <div className="flex flex-col gap-14 sm:gap-20">
        {projects.map((project, i) => (
          <Reveal key={project.id}>
            <ProjectCard project={project} reversed={i % 2 === 1} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 sm:mt-20">
        <Archive />
      </Reveal>
    </Section>
  );
}
