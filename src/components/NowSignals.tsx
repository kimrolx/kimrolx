import { useEffect, useState } from 'react';
import { NowGroupRow } from '@/components/NowGroupRow';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';
import type { Calendar, Signals } from '../../worker/index';

const relative = new Intl.RelativeTimeFormat('en', { numeric: 'always', style: 'narrow' });

const UNITS = [
  ['month', 2_592_000_000],
  ['week', 604_800_000],
  ['day', 86_400_000],
  ['hour', 3_600_000],
  ['minute', 60_000],
] as const;

function ago(iso: string): string {
  const elapsed = Date.now() - Date.parse(iso);
  for (const [unit, ms] of UNITS) {
    if (elapsed >= ms) return relative.format(-Math.floor(elapsed / ms), unit);
  }
  return 'just now';
}

const plural = (count: number, word: string, suffix = 's') => `${count} ${word}${count === 1 ? '' : suffix}`;

const RAMP = ['bg-line', 'bg-line-2', 'bg-ink-3', 'bg-red'] as const;

// Buckets come from percentiles of the active days, not a share of the busiest
// day: one 28-commit outlier would otherwise flatten every other day to level 1.
function thresholds(weeks: number[][]): [number, number] {
  const active = weeks
    .flat()
    .filter((count) => count > 0)
    .sort((a, b) => a - b);
  if (active.length === 0) return [1, 1];
  const at = (q: number) => active[Math.min(active.length - 1, Math.floor(active.length * q))];
  return [at(0.5), at(0.8)];
}

function level(count: number, mid: number, high: number): number {
  if (count === 0) return 0;
  return count >= high ? 3 : count >= mid ? 2 : 1;
}

const dayFormat = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

function tileLabel(from: string | null, index: number, count: number): string | undefined {
  if (!from) return undefined;
  const day = dayFormat.format(new Date(Date.parse(`${from}T00:00:00Z`) + index * 86_400_000));
  return `${count === 0 ? 'No contributions' : plural(count, 'contribution')} — ${day}`;
}

function ContributionGrid({ calendar }: { calendar: Calendar }) {
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [mid, high] = thresholds(calendar.weeks);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const shown = reduced || mounted;

  return (
    <figure className="flex flex-col gap-3">
      <div
        role="img"
        aria-label={`Contribution activity for the last 12 months — ${calendar.total} contributions`}
        className="overflow-x-auto px-px py-px"
      >
        <div className="grid w-full min-w-[34rem] auto-cols-fr grid-flow-col grid-rows-[repeat(7,minmax(0,1fr))] gap-[2px]">
          {calendar.weeks.flatMap((week, weekIndex) =>
            week.map((count, dayIndex) => {
              const tier = count < 0 ? -1 : level(count, mid, high);
              const glows = tier === 3 && !reduced;

              return (
                <span
                  key={`${weekIndex}-${dayIndex}`}
                  aria-hidden="true"
                  title={count < 0 ? undefined : tileLabel(calendar.from, weekIndex * 7 + dayIndex, count)}
                  style={
                    reduced
                      ? undefined
                      : {
                          transitionDelay: `${weekIndex * 12}ms`,
                          // offset each peak so the glow ripples instead of blinking in unison
                          animationDelay: glows ? `${(weekIndex * 130) % 2600}ms` : undefined,
                        }
                  }
                  className={cn(
                    'relative aspect-square w-full',
                    tier < 0 ? 'bg-transparent' : RAMP[tier],
                    !reduced && 'transition-[opacity,transform,box-shadow] duration-500 ease-[var(--ease-out-expo)]',
                    shown ? 'opacity-100' : 'opacity-0',
                    count >= 0 && 'hover:z-10 hover:ring-1 hover:ring-ink',
                    glows && shown && '[animation:signal-glow_3.4s_ease-in-out_infinite]',
                  )}
                />
              );
            }),
          )}
        </div>
      </div>

      <figcaption className="label flex flex-wrap items-center gap-x-4 gap-y-2 text-ink-3">
        <span>Contribution activity — last 12 months</span>
        <span className="ml-auto flex items-center gap-1">
          Less
          {RAMP.map((tone) => (
            <span key={tone} aria-hidden="true" className={cn('h-2 w-2', tone)} />
          ))}
          More
        </span>
      </figcaption>
    </figure>
  );
}

export function NowSignals() {
  const [signals, setSignals] = useState<Signals | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/signals', { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then(setSignals)
      .catch(() => {});
    return () => controller.abort();
  }, []);

  if (!signals || (!signals.pushes.length && !signals.calendar)) return null;

  const { summary, calendar } = signals;

  return (
    <NowGroupRow label="Signals" meta={`Updated ${ago(signals.fetchedAt)}`}>
      <div className="flex flex-col gap-8">
        {summary && (
          <p className="flex items-baseline gap-3 text-ink-2">
            <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-red" />
            Public activity — {plural(summary.pushes, 'push', 'es')} across {plural(summary.repos, 'repo')}, last{' '}
            {summary.days} days
          </p>
        )}

        {calendar && <ContributionGrid calendar={calendar} />}

        {signals.pushes.length > 0 && (
          <ul className="flex flex-col">
            {signals.pushes.map((push) => (
              <li
                key={`${push.repo}-${push.at}`}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-line py-3"
              >
                <span className="text-ink">{push.repo}</span>
                <span className="label text-ink-3">
                  {plural(push.count, 'push', 'es')} &middot; <time dateTime={push.at}>{ago(push.at)}</time>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </NowGroupRow>
  );
}
