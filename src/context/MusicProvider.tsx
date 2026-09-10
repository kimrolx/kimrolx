import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { tracks } from '@/data/tracks';

/** Kept low so the soundtrack sits under the page, never over it. */
const BACKGROUND_VOLUME = 0.05;
const FADE_MS = 2500;

export type MusicValue = {
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

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const current = tracks[index];

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
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(Math.max((now - start) / FADE_MS, 0), 1);
      el.volume = BACKGROUND_VOLUME * t;
      fadeRef.current = t < 1 ? requestAnimationFrame(step) : null;
    };
    fadeRef.current = requestAnimationFrame(step);
  }, [cancelFade]);

  const play = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = BACKGROUND_VOLUME;
    el.play()
      .then(() => {
        setIsPlaying(true);
        fadeIn();
      })
      .catch(() => setIsPlaying(false));
  }, [fadeIn]);

  const pause = useCallback(() => {
    cancelFade();
    audioRef.current?.pause();
    setIsPlaying(false);
  }, [cancelFade]);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const next = useCallback(() => setIndex((i) => (i + 1) % tracks.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + tracks.length) % tracks.length), []);

  const seek = useCallback((seconds: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = seconds;
    setCurrentTime(seconds);
  }, []);

  // Load the current track's source; resume playback if we were already playing.
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
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
  }, [current.src]);

  useEffect(() => cancelFade, [cancelFade]);

  // Start on the visitor's first interaction (pointerdown also covers touch).
  useEffect(() => {
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
  }, [play]);

  return (
    <MusicContext.Provider
      value={{
        title: current.title,
        artist: current.artist,
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
