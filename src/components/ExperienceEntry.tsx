import type { Experience } from "@/types";
import { TechList } from "./TechTag";

type ExperienceEntryProps = {
  experience: Experience;
  isLast?: boolean;
};

export function ExperienceEntry({ experience, isLast }: ExperienceEntryProps) {
  return (
    <li className="relative flex gap-5 sm:gap-6">
      <div className="flex flex-col items-center">
        <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full border border-border bg-white">
          <img
            src={experience.logo}
            alt={`${experience.company} logo`}
            className="h-7 w-7 object-contain"
          />
        </span>
        {!isLast && <span aria-hidden="true" className="mt-2 w-px flex-1 bg-border" />}
      </div>

      <div className="flex flex-1 flex-col gap-4 pb-2">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-xl font-bold">{experience.role}</h3>
            <span className="font-mono text-xs text-ink-faint">{experience.period}</span>
          </div>
          <p className="font-mono text-sm text-ink-dim">
            {experience.company}
            <span className="text-ink-faint"> · {experience.employmentType}</span>
          </p>
        </div>

        <ul className="flex flex-col gap-2">
          {experience.highlights.map((point) => (
            <li key={point} className="flex gap-2.5 text-ink-dim">
              <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-teal-ink" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <TechList items={experience.techStack} />
      </div>
    </li>
  );
}
