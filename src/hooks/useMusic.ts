import { useContext } from 'react';
import { MusicContext } from '@/context/MusicProvider';

/** Returns playback state and controls; throws if used outside MusicProvider. */
export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error('useMusic must be used within MusicProvider');
  }
  return ctx;
}
