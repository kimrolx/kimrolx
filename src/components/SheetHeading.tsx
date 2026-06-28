import type { ReactNode } from "react";

type SheetHeadingProps = {
  title: string;
  /** Optional short meta aligned to the right of the top rule, e.g. a count. */
  meta?: string;
  description?: ReactNode;
};

/**
 * A Swiss section header: a full-width hairline rule marked by a single red
 * tick, then an oversized title. No repeated eyebrow; the title carries it.
 */
export function SheetHeading({ title, meta, description }: SheetHeadingProps) {
  return (
    <header className="flex flex-col gap-6">
      <div className="flex items-center gap-3 border-t border-line-2 pt-3">
        <span aria-hidden="true" className="h-2 w-2 bg-red" />
        {meta && <span className="label ml-auto text-ink-3">{meta}</span>}
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-[clamp(2.25rem,6vw,3.75rem)] font-extrabold tracking-[-0.04em]">
          {title}
        </h2>
        {description && (
          <p className="max-w-prose text-ink-2 sm:text-lg">{description}</p>
        )}
      </div>
    </header>
  );
}
