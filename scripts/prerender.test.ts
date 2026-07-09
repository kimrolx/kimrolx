import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rewriteMeta } from './prerender.ts';

const SAMPLE = `<!doctype html><html><head>
<title>Kim Roland Berame — Software Engineer</title>
<meta name="description" content="OLD DESC" />
<link rel="canonical" href="https://kimrolx.com/" />
<meta property="og:title" content="OLD OG TITLE" />
<meta property="og:description" content="OLD OG DESC" />
<meta property="og:url" content="https://kimrolx.com/" />
<meta name="twitter:title" content="OLD TW TITLE" />
<meta name="twitter:description" content="OLD TW DESC" />
</head><body>keep me</body></html>`;

const M = {
  fullTitle: 'Now — Kim Roland Berame',
  canonical: 'https://kimrolx.com/now',
  description: 'NEW DESC',
};

test('rewrites title', () => {
  assert.match(rewriteMeta(SAMPLE, M), /<title>Now — Kim Roland Berame<\/title>/);
});

test('rewrites description, og:description, twitter:description', () => {
  const out = rewriteMeta(SAMPLE, M);
  assert.match(out, /name="description" content="NEW DESC"/);
  assert.match(out, /property="og:description" content="NEW DESC"/);
  assert.match(out, /name="twitter:description" content="NEW DESC"/);
  assert.doesNotMatch(out, /OLD DESC|OLD OG DESC|OLD TW DESC/);
});

test('rewrites canonical and og:url to route path', () => {
  const out = rewriteMeta(SAMPLE, M);
  assert.match(out, /rel="canonical" href="https:\/\/kimrolx\.com\/now"/);
  assert.match(out, /property="og:url" content="https:\/\/kimrolx\.com\/now"/);
});

test('rewrites og:title and twitter:title', () => {
  const out = rewriteMeta(SAMPLE, M);
  assert.match(out, /property="og:title" content="Now — Kim Roland Berame"/);
  assert.match(out, /name="twitter:title" content="Now — Kim Roland Berame"/);
});

test('leaves body untouched', () => {
  assert.match(rewriteMeta(SAMPLE, M), /<body>keep me<\/body>/);
});
