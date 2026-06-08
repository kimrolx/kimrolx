type SectionHeadingProps = {
  title: string;
  description?: string;
};

/** Section title with a short amber tick. One system motif, not a per-section eyebrow. */
export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <header className="flex flex-col gap-3">
      <h2 className="flex items-center gap-3 text-3xl font-bold sm:text-4xl">
        <span aria-hidden="true" className="h-6 w-1 rounded-full bg-amber sm:h-7" />
        {title}
      </h2>
      {description && (
        <p className="max-w-prose text-base text-ink-dim sm:text-lg">{description}</p>
      )}
    </header>
  );
}
