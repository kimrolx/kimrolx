import { FiArrowUpRight } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import { ZoomableImage } from '@/components/Lightbox';
import type { GearItem } from '@/data/gearItems';

const PHOTO_CLASS =
  'h-full w-full object-cover transition-transform duration-[600ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]';

/** A full-color, hairline-framed photo; `zoomable` opens it full screen on click. */
function GearPhoto({ image, zoomable, className }: { image: GearItem['image']; zoomable: boolean; className?: string }) {
  return (
    <div className={cn('relative z-10 overflow-hidden rounded-sm border border-line bg-inset', className)}>
      {zoomable ? (
        <ZoomableImage src={image.src} alt={image.alt} className={PHOTO_CLASS} />
      ) : (
        <img src={image.src} alt={image.alt} loading="lazy" className={PHOTO_CLASS} />
      )}
    </div>
  );
}

/**
 * The canonical gear card: framed photo, name + maker, mono spec, personal note.
 * The full card links out through its name, stretched over the card, while the
 * photo sits above that link and opens full screen. `compact` trims it down for
 * the floating hover tooltip.
 */
export function GearCard({ item, compact = false }: { item: GearItem; compact?: boolean }) {
  return (
    <article
      className={cn(
        'flex flex-col gap-3',
        !compact &&
          'group relative h-full overflow-hidden rounded-sm border border-line bg-surface p-4 transition-[border-color,background-color,box-shadow] duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] hover:border-line-2 hover:bg-[oklch(0.225_0_0)] hover:shadow-[0_18px_44px_-16px_oklch(0_0_0/0.7)]',
      )}
    >
      {!compact && (
        // Red hairline that wipes across the top edge on hover.
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-red transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
        />
      )}
      <GearPhoto image={item.image} zoomable={!compact} className={compact ? 'aspect-[16/10]' : 'aspect-[4/3]'} />

      <div className={cn('flex flex-col gap-2', !compact && 'flex-1')}>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-baseline justify-between gap-3">
            <h4
              className={cn(
                'min-w-0 font-bold tracking-tight text-ink',
                // name keeps a single row — spec moved to the card footer
                compact ? 'truncate text-base' : 'truncate text-md leading-[1.25]',
              )}
            >
              {compact ? (
                item.name
              ) : (
                <a
                  href={item.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.name} — view source (opens in a new tab)`}
                  className="after:absolute after:inset-0 after:rounded-sm focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-red"
                >
                  {item.name}
                </a>
              )}
            </h4>
            {/* new-tab cue sits right of the name: reddens + nudges on hover */}
            {!compact && (
              <FiArrowUpRight
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-ink-3 opacity-60 transition-[color,opacity,transform] duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red group-hover:opacity-100"
              />
            )}
            {/* compact tooltip keeps the spec inline; full card footers it */}
            {compact && item.spec && <span className="label shrink-0 text-[0.625rem] text-red-ink">{item.spec}</span>}
          </div>
          {item.brand && <span className="label text-ink-3">{item.brand}</span>}
        </div>

        <p
          className={cn(
            'text-ink-2',
            compact
              ? 'text-xs leading-relaxed'
              : // clamp + reserve two lines so every card is the same height
                'line-clamp-2 min-h-[3em] text-sm leading-[1.5]',
          )}
        >
          {item.note}
        </p>

        {!compact && item.spec && <span className="label mt-auto pt-1 text-[0.625rem] text-red-ink">{item.spec}</span>}
      </div>
    </article>
  );
}
