/** A flex-wrapping set of technology labels as hairline chips. */
export function TechList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((label) => (
        <li
          key={label}
          className="tech-chip rounded-sm border border-line px-2.5 py-1 text-[0.8125rem] font-medium text-ink-2"
        >
          {label}
        </li>
      ))}
    </ul>
  );
}
