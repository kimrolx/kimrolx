import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { tracks } from '@/data/tracks';

/** Kept low so the soundtrack sits under the page, never over it. */
const BACKGROUND_VOLUME = 0.05;
const FADE_MS = 2500;

export type MusicValue = {
  /** The active track's title/artist, or null when nothing is loaded. */
  title: string;
  artist: string;
  isPlaying: boolean;
  /** Seconds. */
  currentTime: number;
  duration: number;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (seconds: number) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const MusicContext = createContext<MusicValue | null>(null);

const playable = tracks.filter((t) => t.src);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const ready = playable.length > 0;
  const current = playable[index];

  const cancelFade = useCallback(() => {
    if (fadeRef.current != null) {
      cancelAnimationFrame(fadeRef.current);
      fadeRef.current = null;
    }
  }, []);

  // Ramp volume from silent up to the low background level. Skipped under
  // reduced-motion, which lands straight on the target volume.
  const fadeIn = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    cancelFade();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.volume = BACKGROUND_VOLUME;
      return;
    }
    el.volume = 0;
    const from = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / FADE_MS, 1);
      el.volume = from + (BACKGROUND_VOLUME - from) * t;
      fadeRef.current = t < 1 ? requestAnimationFrame(step) : null;
    };
    fadeRef.current = requestAnimationFrame(step);
  }, [cancelFade]);

  const play = useCallback(() => {
    const el = audioRef.current;
    if (!el || !ready) return;
    el.volume = BACKGROUND_VOLUME;
    el.play()
      .then(() => {
        setIsPlaying(true);
        fadeIn();
      })
      .catch(() => setIsPlaying(false));
  }, [ready, fadeIn]);

  const pause = useCallback(() => {
    cancelFade();
    audioRef.current?.pause();
    setIsPlaying(false);
  }, [cancelFade]);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const next = useCallback(() => {
    if (!ready) return;
    setIndex((i) => (i + 1) % playable.length);
  }, [ready]);

  const prev = useCallback(() => {
    if (!ready) return;
    setIndex((i) => (i - 1 + playable.length) % playable.length);
  }, [ready]);

  const seek = useCallback((seconds: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = seconds;
    setCurrentTime(seconds);
  }, []);

  // Load the current track's source; resume playback if we were already playing.
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !current?.src) return;
    el.src = current.src;
    el.load();
    setCurrentTime(0);
    setDuration(0);
    if (isPlaying) {
      el.volume = BACKGROUND_VOLUME;
      el.play()
        .then(() => fadeIn())
        .catch(() => setIsPlaying(false));
    }
    // isPlaying intentionally omitted: we only want this on track change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, current?.src]);

  useEffect(() => cancelFade, [cancelFade]);

  // Start on the visitor's first interaction (pointerdown also covers touch).
  useEffect(() => {
    if (!ready) return;
    let armed = true;
    const start = () => {
      if (!armed) return;
      armed = false;
      remove();
      play();
    };
    const remove = () => {
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
    };
    window.addEventListener('pointerdown', start);
    window.addEventListener('keydown', start);
    return remove;
  }, [ready, play]);

  return (
    <MusicContext.Provider
      value={{
        title: current?.title ?? '',
        artist: current?.artist ?? '',
        isPlaying,
        currentTime,
        duration,
        toggle,
        next,
        prev,
        seek,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onEnded={next}
      />
    </MusicContext.Provider>
  );
}
