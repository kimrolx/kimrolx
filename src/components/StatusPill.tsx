import type { ProjectStatus } from "@/types";
import { cn } from "@/lib/utils";

const STYLES: Record<ProjectStatus, string> = {
  Production: "text-red-ink",
  "In Progress": "text-red-ink",
  Completed: "text-ink-3",
};

export function StatusPill({ status }: { status: ProjectStatus }) {
  const live = status !== "Completed";
  return (
    <span
      className={cn(
        "label inline-flex items-center gap-1.5",
        STYLES[status],
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          live ? "bg-red" : "border border-ink-3",
        )}
      />
      {status}
    </span>
  );
}
