import { useCallback, useRef } from "react";

export function useTapSequence(
  onMatch: () => void,
  opts?: { count?: number; windowMs?: number },
): () => void {
  const count = opts?.count ?? 5;
  const windowMs = opts?.windowMs ?? 1500;

  const cb = useRef(onMatch);
  cb.current = onMatch;

  const taps = useRef(0);
  const firstAt = useRef(0);

  return useCallback(() => {
    const now = Date.now();
    if (taps.current === 0 || now - firstAt.current > windowMs) {
      taps.current = 1;
      firstAt.current = now;
      return;
    }
    taps.current += 1;
    if (taps.current >= count) {
      taps.current = 0;
      firstAt.current = 0;
      cb.current();
    }
  }, [count, windowMs]);
}
