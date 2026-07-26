/**
 * Single source of truth for per-route SEO meta. Imported by the client-side
 * `useSEO` hook (live SPA updates) and by `scripts/prerender.ts` (static build
 * output). Plain data + pure helpers only — no DOM access — so it is safe in
 * both the browser and Node.
 */

export const SITE_NAME = 'Kim Roland Berame';
export const SITE_URL = 'https://kimrolx.com';
export const OG_IMAGE = 'https://kimrolx.com/og.png';

export type RouteMeta = {
  /** Page title without the site-name/role suffix, e.g. "Gear". */
  title: string;
  description: string;
  /** Route path, e.g. "/", "/now", "/gear". */
  path: string;
};

export const ROUTES = {
  '/': {
    title: SITE_NAME,
    description:
      "I'm Kim Roland Berame — a software engineer building full-stack systems based in Cebu City, Philippines.",
    path: '/',
  },
  '/now': {
    title: 'Now',
    description:
      'What Kim Roland Berame is building, learning, and living right now — a standing snapshot of current focus, from side projects to freediving and the gym.',
    path: '/now',
  },
  '/gear': {
    title: 'Gear',
    description:
      'The gear Kim Roland Berame carries and the battlestation he builds on — a working inventory of daily-carry tech, desk setup, and PC build.',
    path: '/gear',
  },
  '/skills': {
    title: 'Skills',
    description:
      'The stack Kim Roland Berame builds with — languages, frontend, backend, data, and cloud, mapped as an interactive skill constellation from a single core outward.',
    path: '/skills',
  },
} satisfies Record<string, RouteMeta>;

export type ResolvedMeta = {
  fullTitle: string;
  canonical: string;
  description: string;
};

/** Applies the title + canonical conventions shared by the hook and the build script. */
export function resolveMeta(route: RouteMeta): ResolvedMeta {
  const fullTitle =
    route.path === '/' ? `${route.title} — Software Engineer` : `${route.title} — ${SITE_NAME}`;
  const canonical = route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
  return { fullTitle, canonical, description: route.description };
}
