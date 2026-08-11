import { LuPause, LuPlay, LuSkipBack, LuSkipForward } from 'react-icons/lu';
import { useMusic } from '@/hooks/useMusic';

function fmt(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function MusicPlayer() {
  const { title, artist, isPlaying, currentTime, duration, toggle, next, prev, seek } = useMusic();

  const pct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section aria-label="Music player" className="flex flex-col gap-2.5 border-t border-line px-5 py-4">
      <div className="min-w-0">
        <p className="label text-ink-3">{isPlaying ? 'Now playing' : 'Paused'}</p>
        <p className="truncate text-[0.8125rem] font-semibold tracking-tight text-ink">{title}</p>
        <p className="truncate text-[0.6875rem] text-ink-3">{artist}</p>
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          disabled={duration === 0}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label="Seek"
          className="music-seek"
          style={{ '--seek': `${pct}%` } as React.CSSProperties}
        />
        <div className="flex justify-between font-sans text-[0.625rem] tabular-nums text-ink-3">
          <span>{fmt(currentTime)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous track"
          className="text-ink-3 transition-colors hover:text-ink cursor-pointer"
        >
          <LuSkipBack size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line-2 text-ink transition-colors hover:border-red hover:text-red-ink cursor-pointer"
        >
          {isPlaying ? (
            <LuPause size={16} aria-hidden="true" />
          ) : (
            <LuPlay size={16} aria-hidden="true" className="translate-x-px" />
          )}
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next track"
          className="text-ink-3 transition-colors hover:text-ink cursor-pointer"
        >
          <LuSkipForward size={16} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
