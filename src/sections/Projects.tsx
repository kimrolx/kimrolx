import { projects } from "@/data/projects";
import { Archive } from "@/components/Archive";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Reveal } from "@/components/Reveal";
import { SheetHeading } from "@/components/SheetHeading";

export function Projects() {
  const count = projects.length;

  return (
    <section id="projects" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-6xl px-5 pt-16 sm:px-8 sm:pt-20 lg:pt-28">
        <SheetHeading
          title="Selected work"
          meta={`${count} projects`}
          description="Production builds, university work, and the things I keep tending."
        />
      </div>

      <ProjectShowcase projects={projects} />

      <div className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 sm:pb-20 lg:pb-28">
        <Reveal className="mt-16 sm:mt-20">
          <Archive />
        </Reveal>
      </div>
    </section>
  );
}
