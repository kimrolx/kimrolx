import type { ReactNode } from "react";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { experiences } from "@/data/experience";
import { cn } from "@/lib/utils";
import { SkillGroup } from "./SkillGroup";

type TileProps = {
  label: string;
  children: ReactNode;
  className?: string;
  /** Marks the label with a red tick. */
  accent?: boolean;
};

/** A single hairline bento tile: corner label, then content. */
function Tile({ label, children, className, accent }: TileProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 rounded-sm border border-line bg-bg p-6 transition-colors duration-200 hover:border-line-2 sm:p-7",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {accent && <span aria-hidden="true" className="h-2 w-2 bg-red" />}
        <span className="label text-ink-3">{label}</span>
      </div>
      {children}
    </div>
  );
}

const current = experiences[0];

/**
 * The About section as a bento grid: mixed tile sizes and content types on a
 * near-black field, separated by hairlines. Bio and Toolkit are the two large
 * tiles; Currently, Education, and Status fill the lower band.
 */
export function Bento() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Tile label="Profile" className="sm:col-span-2 lg:col-span-2">
        <div className="flex max-w-prose flex-col gap-4 text-ink-2 sm:text-lg">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Tile>

      <Tile label="Toolkit" className="sm:col-span-2 lg:col-span-2">
        <div className="-mt-1 flex flex-col">
          {skillGroups.map((group) => (
            <SkillGroup key={group.category} {...group} />
          ))}
        </div>
      </Tile>

      <Tile label="Currently" className="sm:col-span-2 lg:col-span-2">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-sm border border-line bg-surface">
            <img src={current.logo} alt={`${current.company} logo`} className="h-7 w-7 object-contain" />
          </span>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-ink">
              {current.role}, {current.company}
            </span>
            <span className="text-sm text-ink-3">{current.period}</span>
          </div>
        </div>
        <p className="mt-auto max-w-prose text-ink-2">
          Owning features end to end, from system design and APIs to the React frontend and cloud
          delivery.
        </p>
      </Tile>

      <Tile label="Education">
        <div className="mt-auto flex flex-col gap-1">
          <span className="text-lg font-bold tracking-tight text-ink">{profile.education.degree}</span>
          <span className="text-sm text-ink-3">{profile.education.school}</span>
        </div>
      </Tile>

      <Tile label="Status" accent>
        <div className="mt-auto flex flex-col gap-2">
          <span className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-red" />
            Available for work
          </span>
          <span className="text-sm text-ink-3">Open to roles and freelance builds.</span>
        </div>
      </Tile>
    </div>
  );
}
