import { createContext, useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { motion } from 'motion/react';

type Phase = 'idle' | 'covering' | 'revealing';

export type WipeContextValue = { wipeNavigate: (to: string) => void };

// eslint-disable-next-line react-refresh/only-export-components
export const WipeContext = createContext<WipeContextValue | null>(null);

const EASE = [0.76, 0, 0.24, 1] as const;
const LEG_MS = 0.45; // seconds per leg (cover / reveal)

export function WipeProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const lenis = useLenis();
  const [phase, setPhase] = useState<Phase>('idle');
  const pendingTo = useRef<string | null>(null);

  const wipeNavigate = useCallback(
    (to: string) => {
      if (phase !== 'idle') return; // guard against double-trigger
      // Drop focus from the page being covered so keyboard users can't
      // interact with content hidden behind the panel mid-wipe.
      (document.activeElement as HTMLElement | null)?.blur();
      pendingTo.current = to;
      setPhase('covering');
    },
    [phase],
  );

  // Runs when the cover leg finishes: swap route + reset scroll while hidden.
  const onCovered = () => {
    const to = pendingTo.current;
    if (to !== null) navigate(to);
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    pendingTo.current = null;
    setPhase('revealing');
  };

  const covering = phase === 'covering';
  const showPanel = phase !== 'idle';

  const value = useMemo(() => ({ wipeNavigate }), [wipeNavigate]);

  return (
    <WipeContext.Provider value={value}>
      {children}
      {showPanel && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 'var(--z-transition)', backgroundColor: 'var(--color-red)' }}
          initial={{ y: '100%' }}
          animate={{ y: covering ? '0%' : '-100%' }}
          transition={{ duration: LEG_MS, ease: EASE }}
          onAnimationComplete={() => {
            if (covering) onCovered();
            else setPhase('idle');
          }}
        >
          <span className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--color-ink)' }}>
            kimrolx<span style={{ color: 'var(--color-bg)' }}>.</span>
          </span>
        </motion.div>
      )}
    </WipeContext.Provider>
  );
}
