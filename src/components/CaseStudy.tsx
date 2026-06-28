import { useId, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { CaseStudy as CaseStudyData } from "@/types";
import { cn } from "@/lib/utils";

/**
 * An expandable, ruled deep-dive under a project. Collapsed by default
 * (skim-first); opens to structured sections on demand. Accessible via a
 * labelled disclosure button; content mounts on open. Reduced motion drops
 * the height/opacity animation and just shows the region.
 */
export function CaseStudy({ data, title }: { data: CaseStudyData; title: string }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const regionId = useId();

  return (
    <div className="w-full border-t border-line pt-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={regionId}
        className="group flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="label text-ink transition-colors group-hover:text-red-ink">
          {open ? "Hide case study" : "Read the case study"}
        </span>
        <span
          aria-hidden="true"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-sm border border-line-2 text-ink-2 transition-colors group-hover:border-red group-hover:text-red-ink"
        >
          <FiPlus
            className={cn(
              "h-4 w-4 transition-transform duration-300 ease-out",
              open && "rotate-45",
            )}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={regionId}
            key="region"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-px pt-8">
              <span className="sr-only">{title} case study</span>

              {data.stat && (
                <div className="mb-8 flex items-baseline gap-4">
                  <span className="text-[clamp(3rem,8vw,5rem)] font-black leading-none tracking-[-0.04em] text-red">
                    {data.stat.value}
                  </span>
                  <span className="label max-w-[10ch] text-ink-3">{data.stat.label}</span>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
