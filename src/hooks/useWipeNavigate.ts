import { useContext } from "react";
import { WipeContext } from "@/components/WipeProvider";

/** Returns wipeNavigate; throws if used outside WipeProvider. */
export function useWipeNavigate() {
  const ctx = useContext(WipeContext);
  if (!ctx) throw new Error("useWipeNavigate must be used within WipeProvider");
  return ctx.wipeNavigate;
}
