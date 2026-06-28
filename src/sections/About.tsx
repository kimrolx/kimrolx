import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SheetHeading } from "@/components/SheetHeading";
import { SkillGroup } from "@/components/SkillGroup";

export function About() {
  return (
    <Section id="about" className="flex flex-col gap-16">
      <SheetHeading title="About" />

      <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        {/* Prose + education */}
        <Reveal className="flex flex-col gap-8">
          <div className="flex max-w-prose flex-col gap-5">
            {profile.about.map((paragraph) => (
              <p key={paragraph} className="text-ink-2 sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-2 border-t border-line-2 pt-5 sm:grid-cols-[8rem_1fr] sm:gap-8">
            <h3 className="label pt-0.5 text-ink-3">Education</h3>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-ink">{profile.education.degree}</span>
              <span className="text-sm text-ink-3">{profile.education.school}</span>
            </div>
          </div>
        </Reveal>

        {/* Toolkit */}
        <Reveal delay={120} className="flex flex-col">
          <h3 className="label border-t border-line-2 pt-3 text-ink-3">Toolkit</h3>
          <div className="flex flex-col">
            {skillGroups.map((group) => (
              <SkillGroup key={group.category} {...group} />
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
