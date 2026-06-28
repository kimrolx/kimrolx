import { experiences } from "@/data/experience";
import { ExperienceEntry } from "@/components/ExperienceEntry";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SheetHeading } from "@/components/SheetHeading";

export function Experience() {
  const count = experiences.length;

  return (
    <Section id="experience" className="flex flex-col gap-16">
      <SheetHeading
        title="Experience"
        meta={`${count} role${count === 1 ? "" : "s"}`}
        description="Where I've been building, and what I owned there."
      />

      <Reveal>
        <ol className="flex flex-col gap-12">
          {experiences.map((experience) => (
            <ExperienceEntry key={experience.id} experience={experience} />
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
