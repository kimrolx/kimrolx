import { useEffect } from 'react';
import { resolveMeta, type RouteMeta } from '@/config/seo';

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

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
    const prevTitle = document.title;
    const prevDescription =
      document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
    const prevCanonical =
      document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '';
    const prevOgTitle =
      document.querySelector('meta[property="og:title"]')?.getAttribute('content') ?? '';
    const prevOgDescription =
      document.querySelector('meta[property="og:description"]')?.getAttribute('content') ?? '';
    const prevOgUrl =
      document.querySelector('meta[property="og:url"]')?.getAttribute('content') ?? '';
    const prevTwTitle =
      document.querySelector('meta[name="twitter:title"]')?.getAttribute('content') ?? '';
    const prevTwDescription =
      document.querySelector('meta[name="twitter:description"]')?.getAttribute('content') ?? '';

    document.title = fullTitle;
    setMetaTag('name', 'description', description);
    setCanonical(canonical);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonical);
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);

    return () => {
      document.title = prevTitle;
      setMetaTag('name', 'description', prevDescription);
      setCanonical(prevCanonical);
      setMetaTag('property', 'og:title', prevOgTitle);
      setMetaTag('property', 'og:description', prevOgDescription);
      setMetaTag('property', 'og:url', prevOgUrl);
      setMetaTag('name', 'twitter:title', prevTwTitle);
      setMetaTag('name', 'twitter:description', prevTwDescription);
    };
  }, [fullTitle, canonical, description]);
}
