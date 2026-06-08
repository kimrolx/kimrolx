import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { SkillGroup } from "@/components/SkillGroup";

export function About() {
  return (
    <Section id="about" className="flex flex-col gap-14">
      <SectionHeading title="About" />

      <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
        <Reveal className="flex flex-col gap-5">
          {profile.about.map((paragraph) => (
            <p key={paragraph} className="text-ink-dim sm:text-lg">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-7">
          {skillGroups.map((group) => (
            <SkillGroup key={group.category} {...group} />
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
