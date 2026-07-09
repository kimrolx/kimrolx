/**
 * Post-build meta-only prerender. After `vite build`, copies dist/index.html
 * into per-route dist/<route>/index.html with the <title>, description,
 * canonical, and OG/Twitter tags rewritten for each route. Social scrapers
 * (which do not run JS) then read the correct card for /now and /gear.
 *
 * Body content is untouched — Google renders the SPA's JS for indexing.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { argv } from 'node:process';
import { ROUTES, resolveMeta, type RouteMeta } from '../src/config/seo.ts';

/** Replaces the content="" of the first meta tag matching `attr="key"`. */
function replaceMeta(html: string, attr: 'name' | 'property', key: string, value: string): string {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`, 'i');
  return html.replace(re, `$1${value}$2`);
}

/** Applies all per-route meta rewrites to a copy of the home HTML. Pure. */
export function rewriteMeta(html: string, m: { fullTitle: string; canonical: string; description: string }): string {
  let out = html.replace(/<title>[^<]*<\/title>/i, `<title>${m.fullTitle}</title>`);
  out = out.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/i, `$1${m.canonical}$2`);
  out = replaceMeta(out, 'name', 'description', m.description);
  out = replaceMeta(out, 'property', 'og:title', m.fullTitle);
  out = replaceMeta(out, 'property', 'og:description', m.description);
  out = replaceMeta(out, 'property', 'og:url', m.canonical);
  out = replaceMeta(out, 'name', 'twitter:title', m.fullTitle);
  out = replaceMeta(out, 'name', 'twitter:description', m.description);
  return out;
}

async function main() {
  const distDir = resolve(fileURLToPath(new URL('../dist', import.meta.url)));
  const homeHtml = await readFile(resolve(distDir, 'index.html'), 'utf8');

  const routes = Object.values(ROUTES) as RouteMeta[];
  for (const route of routes) {
    if (route.path === '/') continue; // home index.html is already correct
    const html = rewriteMeta(homeHtml, resolveMeta(route));
    const outPath = resolve(distDir, `.${route.path}`, 'index.html');
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, html, 'utf8');
    console.log(`prerendered ${route.path} -> ${outPath}`);
  }
}

// Run only when invoked directly (e.g. `tsx scripts/prerender.ts`), not when
// imported by the test, which would trigger a build-less ENOENT on dist/.
if (argv[1] && fileURLToPath(import.meta.url) === resolve(argv[1])) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
