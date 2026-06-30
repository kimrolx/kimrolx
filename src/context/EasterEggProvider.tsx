import { createContext, useCallback, useEffect, useRef, useState } from "react";

const MODE_KEY = "crt-mode";
const FINDS_KEY = "crt-finds";

export type EasterEggValue = {
  crt: boolean;
  toggleCrt: () => void;
  crtFinds: number;
  justAchieved: boolean;
  clearAchieved: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const EasterEggContext = createContext<EasterEggValue | null>(null);

function readMode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(MODE_KEY) === "1";
  } catch {
    return false;
  }
}

function readFinds(): number {
  if (typeof window === "undefined") return 0;
  try {
    const n = parseInt(window.localStorage.getItem(FINDS_KEY) ?? "", 10);
    return Number.isFinite(n) && n > 0 ? n : 0;
  } catch {
    return 0;
  }
}

export function EasterEggProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [crt, setCrt] = useState<boolean>(readMode);
  const [crtFinds, setCrtFinds] = useState<number>(readFinds);
  const [justAchieved, setJustAchieved] = useState(false);

  // Refs mirror state so toggleCrt can read current values without deps.
  const crtRef = useRef(crt);
  const findsRef = useRef(crtFinds);

  const toggleCrt = useCallback(() => {
    const next = !crtRef.current;
    crtRef.current = next;
    setCrt(next);
    if (next) {
      const count = findsRef.current + 1;
      findsRef.current = count;
      setCrtFinds(count);
      try {
        window.localStorage.setItem(FINDS_KEY, String(count));
      } catch {
        // ignore storage failures
      }
      if (count === 1) setJustAchieved(true);
    }
  }, []);

  const clearAchieved = useCallback(() => setJustAchieved(false), []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("crt", crt);
    try {
      if (crt) window.localStorage.setItem(MODE_KEY, "1");
      else window.localStorage.removeItem(MODE_KEY);
    } catch {
      // ignore storage failures (private mode, etc.)
    }
  }, [crt]);

  return (
    <EasterEggContext.Provider
      value={{ crt, toggleCrt, crtFinds, justAchieved, clearAchieved }}
    >
      {children}
    </EasterEggContext.Provider>
  );
}
