import type { Tech } from "@/types";

/** A single technology label as a hairline chip. */
export function TechTag({ label }: Tech) {
  return (
    <li className="rounded-sm border border-line px-2.5 py-1 text-[0.8125rem] font-medium text-ink-2">
      {label}
    </li>
  );
}

/** A flex-wrapping set of technology chips. */
export function TechList({ items }: { items: Tech[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((tech) => (
        <TechTag key={tech.label} {...tech} />
      ))}
    </ul>
  );
}
