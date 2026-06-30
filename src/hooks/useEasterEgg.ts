import { useContext } from "react";
import { EasterEggContext } from "@/context/EasterEggProvider";

/** Returns CRT-mode state and toggle; throws if used outside EasterEggProvider. */
export function useEasterEgg() {
  const ctx = useContext(EasterEggContext);
  if (!ctx) {
    throw new Error("useEasterEgg must be used within EasterEggProvider");
  }
  return ctx;
}
