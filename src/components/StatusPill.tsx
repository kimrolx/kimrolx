import { cn } from "@/lib/utils";

type StatusPillProps = { label: string; live: boolean; className?: string };

export function StatusPill({ label, live, className }: StatusPillProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", live ? "text-red-ink" : "text-ink-3", className)}>
      {live && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-red" />}
      {label}
    </span>
  );
}
