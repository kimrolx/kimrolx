import { useCallback, useRef } from 'react';

type AudioCtor = typeof AudioContext;

function getCtor(): AudioCtor | null {
  if (typeof window === 'undefined') return null;
  return window.AudioContext ?? (window as unknown as { webkitAudioContext?: AudioCtor }).webkitAudioContext ?? null;
}

export function useCrtSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback((): AudioContext | null => {
    if (ctxRef.current) {
      if (ctxRef.current.state === 'suspended') void ctxRef.current.resume();
      return ctxRef.current;
    }
    const Ctor = getCtor();
    if (!Ctor) return null;
    ctxRef.current = new Ctor();
    return ctxRef.current;
  }, []);

  const boot = useCallback(() => {
    const ac = getCtx();
    if (!ac) return;
    const now = ac.currentTime;

    // rising chirp
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
    osc.connect(g).connect(ac.destination);
    osc.start(now);
    osc.stop(now + 0.22);

    // low power hum that fades out
    const hum = ac.createOscillator();
    const hg = ac.createGain();
    hum.type = 'sine';
    hum.frequency.setValueAtTime(80, now);
    hg.gain.setValueAtTime(0.0001, now);
    hg.gain.exponentialRampToValueAtTime(0.05, now + 0.05);
    hg.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    hum.connect(hg).connect(ac.destination);
    hum.start(now);
    hum.stop(now + 1.3);
  }, [getCtx]);

  const blip = useCallback(() => {
    const ac = getCtx();
    if (!ac) return;
    const now = ac.currentTime;
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(660, now);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.03, now + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
    osc.connect(g).connect(ac.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  }, [getCtx]);

  return { boot, blip };
}
