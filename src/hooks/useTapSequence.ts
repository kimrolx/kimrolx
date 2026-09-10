import { useCallback, useRef } from "react";

const COUNT = 5;
const WINDOW_MS = 1500;

export function useTapSequence(onMatch: () => void): () => void {
  const cb = useRef(onMatch);
  cb.current = onMatch;

  const taps = useRef(0);
  const firstAt = useRef(0);

  return useCallback(() => {
    const now = Date.now();
    if (taps.current === 0 || now - firstAt.current > WINDOW_MS) {
      taps.current = 1;
      firstAt.current = now;
      return;
    }
    taps.current += 1;
    if (taps.current >= COUNT) {
      taps.current = 0;
      firstAt.current = 0;
      cb.current();
    }
  }, []);
}
