import { useEffect } from 'react';
import { META_TAGS, resolveMeta, type RouteMeta } from '@/config/seo';

/**
 * Updates document title, meta description, canonical URL, and OG/Twitter
 * title+description for the current route, restoring the previous values on
 * unmount so navigating between routes never leaves stale tags behind —
 * important since this is a client-rendered SPA. Static per-route meta for
 * crawlers/scrapers is emitted separately by `scripts/prerender.ts`.
 */
export function useSEO(route: RouteMeta) {
  const { fullTitle, canonical, description } = resolveMeta(route);

  useEffect(() => {
    const meta = { fullTitle, canonical, description };
    const link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const tags = META_TAGS.map(({ attr, key, field }) => ({
      el: document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`),
      value: meta[field],
    }));

    const prevTitle = document.title;
    const prevCanonical = link?.getAttribute('href') ?? '';
    const prevContents = tags.map(({ el }) => el?.getAttribute('content') ?? '');

    document.title = fullTitle;
    link?.setAttribute('href', canonical);
    tags.forEach(({ el, value }) => el?.setAttribute('content', value));

    return () => {
      document.title = prevTitle;
      link?.setAttribute('href', prevCanonical);
      tags.forEach(({ el }, i) => el?.setAttribute('content', prevContents[i]));
    };
  }, [fullTitle, canonical, description]);
}
