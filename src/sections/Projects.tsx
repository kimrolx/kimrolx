import { projects } from "@/data/projects";
import { Archive } from "@/components/Archive";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SheetHeading } from "@/components/SheetHeading";

export function Projects() {
  const count = projects.length;

  return (
    <Section id="projects" className="flex flex-col gap-16 sm:gap-20">
      <SheetHeading
        title="Selected work"
        meta={`${count} projects`}
        description="Production builds, university work, and the things I keep tending."
      />

      <div className="flex flex-col gap-20 sm:gap-28">
        {projects.map((project, i) => (
          <Reveal key={project.id}>
            <ProjectCard project={project} reversed={i % 2 === 1} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-24 sm:mt-28">
        <Archive />
      </Reveal>
    </Section>
  );
}
