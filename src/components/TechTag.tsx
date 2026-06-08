import type { Tech } from "@/types";

/** Tech chip: a brand-color dot plus the label on a subtle surface. */
export function TechTag({ label, color }: Tech) {
  return (
    <li className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-ink-dim">
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: color }}
      />
      {label}
    </li>
  );
}

/** A flex-wrapping list of TechTags. */
export function TechList({ items }: { items: Tech[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((tech) => (
        <TechTag key={tech.label} {...tech} />
      ))}
    </ul>
  );
}
