import type { SkillGroup as SkillGroupData } from "@/types";

/** One ruled row: discipline label, then its components as a spec line. */
export function SkillGroup({ category, items }: SkillGroupData) {
  return (
    <div className="grid grid-cols-1 gap-2 border-t border-line py-5 sm:grid-cols-[8rem_1fr] sm:gap-8">
      <h3 className="label pt-0.5 text-ink-3">{category}</h3>
      <ul className="flex flex-wrap gap-x-2 gap-y-1.5 text-[0.9375rem] text-ink">
        {items.map((item, i) => (
          <li key={item} className="flex items-center">
            {item}
            {i < items.length - 1 && (
              <span aria-hidden="true" className="ml-2 text-line-2">
                ·
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
