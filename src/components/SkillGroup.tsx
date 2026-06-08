import type { SkillGroup as SkillGroupData } from "@/types";

export function SkillGroup({ category, items }: SkillGroupData) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-mono text-xs uppercase tracking-wider text-ink-faint">{category}</h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-md border border-border bg-surface px-2.5 py-1 text-sm text-ink-dim"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
