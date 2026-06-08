import type { ProjectStatus } from "@/types";
import { cn } from "@/lib/utils";

const STYLES: Record<ProjectStatus, string> = {
  Production: "text-signal",
  Completed: "text-teal-ink",
  "In Progress": "text-amber",
};

export function StatusPill({ status }: { status: ProjectStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs">
      <span className={cn("h-1.5 w-1.5 rounded-full bg-current", STYLES[status])} aria-hidden="true" />
      <span className={STYLES[status]}>{status}</span>
    </span>
  );
}
