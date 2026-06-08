import { experiences } from "@/data/experience";
import { ExperienceEntry } from "@/components/ExperienceEntry";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";

export function Experience() {
  return (
    <Section id="experience" className="flex flex-col gap-14">
      <SectionHeading title="Experience" description="Where I've been building." />

      <Reveal>
        <ol className="flex flex-col gap-10">
          {experiences.map((experience, i) => (
            <ExperienceEntry
              key={experience.id}
              experience={experience}
              isLast={i === experiences.length - 1}
            />
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
