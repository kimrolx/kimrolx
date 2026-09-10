import { useState } from "react";
import type { Project } from "@/types";
import { CaseStudyContent } from "./CaseStudy";
import { Modal } from "./Modal";

/** Full-screen case-study overlay with a scrollable panel. Keeps the last project on screen while it fades out. */
export function CaseStudyModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [shown, setShown] = useState(project);
  if (project && project !== shown) setShown(project);

  return (
    <Modal
      open={!!project?.caseStudy}
      onClose={onClose}
      label={`${shown?.title ?? "Project"} case study`}
      closeLabel="Close case study"
    >
      {shown?.caseStudy && (
        <div className="flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-sm border border-line-2 bg-surface shadow-2xl transition-all duration-300 ease-out group-not-open/modal:scale-95 group-not-open/modal:opacity-0 starting:scale-95 starting:opacity-0">
          <div data-lenis-prevent className="overflow-y-auto overscroll-contain p-6 sm:p-10">
            <h3 className="mb-8 pr-12 text-[clamp(1.5rem,3.5vw,2.375rem)] font-extrabold tracking-[-0.04em] sm:pr-0">
              {shown.title}
            </h3>
            <CaseStudyContent data={shown.caseStudy} title={shown.title} />
          </div>
        </div>
      )}
    </Modal>
  );
}
