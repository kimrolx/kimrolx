import type { ElementType } from 'react';
import { FiArrowUpRight, FiImage } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import type { GearItem } from '@/data/gearItems';

/** A full-color, hairline-framed photo — or a labeled placeholder until one exists. */
export function GearPhoto({ image, className }: { image: GearItem['image']; className?: string }) {
  return (
    <div className={cn('overflow-hidden rounded-sm border border-line bg-inset', className)}>
      {image.src ? (
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[600ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-ink-3 transition-[transform,color] duration-[600ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06] group-hover:text-ink-2">
          <FiImage aria-hidden="true" className="h-5 w-5" />
          <span className="label">Placeholder</span>
        </div>
      )}
    </div>
  );
}

/**
 * The canonical gear card: framed photo, name + maker, mono spec, personal note.
 * `compact` trims it down for the floating hover tooltip.
 */
export function GearCard({ item, compact = false }: { item: GearItem; compact?: boolean }) {
  // With a source, the full card becomes an external link (new tab); otherwise
  // it stays a plain <article>. The compact tooltip never links.
  const linked = !compact && !!item.source;
  const Root: ElementType = linked ? 'a' : 'article';
  const linkProps = linked
    ? {
        href: item.source,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `${item.name} — view source (opens in a new tab)`,
      }
    : {};

  return (
    <Root
      {...linkProps}
      className={cn(
        'flex flex-col gap-3',
        !compact &&
          'group relative h-full overflow-hidden rounded-sm border border-line bg-surface p-4 transition-[border-color,background-color,box-shadow] duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] hover:border-line-2 hover:bg-[oklch(0.225_0_0)] hover:shadow-[0_18px_44px_-16px_oklch(0_0_0/0.7)]',
        linked && 'cursor-pointer',
      )}
    >
      {!compact && (
        // Red hairline that wipes across the top edge on hover.
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-red transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
        />
      )}
      <GearPhoto image={item.image} className={compact ? 'aspect-[16/10]' : 'aspect-[4/3]'} />

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
              {item.name}
            </h4>
            {/* new-tab cue sits right of the name: reddens + nudges on hover */}
            {linked && (
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
    </Root>
  );
}
