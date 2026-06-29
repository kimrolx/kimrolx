import type { Experience } from "@/types";
import { TechList } from "./TechTag";

export function ExperienceEntry({ experience }: { experience: Experience }) {
  return (
    <li className="grid grid-cols-1 gap-6 border-t border-line-2 pt-8 lg:grid-cols-[14rem_1fr] lg:gap-12">
      {/* Meta column */}
      <div className="flex flex-col gap-4">
        <span className="label text-ink-3">{experience.period}</span>
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-sm border border-line bg-surface">
            <img
              src={experience.logo}
              alt={`${experience.company} logo`}
              className="h-full w-full object-cover"
            />
          </span>
          <span className="flex flex-col">
            <span className="font-semibold text-ink">{experience.company}</span>
            <span className="text-sm text-ink-3">{experience.employmentType}</span>
          </span>
        </div>
      </div>

      {/* Content column */}
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{experience.role}</h3>

        <ul className="flex max-w-prose flex-col gap-3">
          {experience.highlights.map((point) => (
            <li key={point} className="flex gap-3.5 text-ink-2">
              <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-red" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <TechList items={experience.techStack} />
      </div>
    </li>
  );
}
