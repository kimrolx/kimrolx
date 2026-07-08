import type { CaseStudy as CaseStudyData } from '@/types';

export function CaseStudyContent({ data, title }: { data: CaseStudyData; title: string }) {
  return (
    <div className="flex flex-col gap-px">
      <span className="sr-only">{title} case study</span>

      {data.stat && (
        <div className="mb-8 flex items-baseline gap-4">
          <span className="text-[clamp(2.25rem,6vw,3.75rem)] font-black leading-none tracking-[-0.04em] text-red">
            {data.stat.value}
          </span>
          <span className="label max-w-[15rem] text-ink-3">{data.stat.label}</span>
        </div>
      )}

      {data.sections.map((section) => (
        <div
          key={section.label}
          className="grid grid-cols-1 gap-3 border-t border-line py-6 first:border-t-0 first:pt-0 sm:grid-cols-[10rem_1fr] sm:gap-10"
        >
          <h4 className="label pt-0.5 text-ink-3">{section.label}</h4>
          {Array.isArray(section.body) ? (
            <ul className="flex max-w-prose flex-col gap-3">
              {section.body.map((point) => (
                <li key={point} className="flex gap-3.5 text-ink-2">
                  <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-red" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="max-w-prose text-ink-2">{section.body}</p>
          )}
        </div>
      ))}
    </div>
  );
}
