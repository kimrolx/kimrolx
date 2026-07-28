import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ROUTES, resolveMeta, SITE_URL } from './seo.ts';

test('home resolves with Software Engineer suffix and root canonical', () => {
  const m = resolveMeta(ROUTES['/']);
  assert.equal(m.fullTitle, 'Kim Roland Berame — Software Engineer');
  assert.equal(m.canonical, 'https://www.kimrolx.com/');
});

test('subpage resolves with site-name suffix and path canonical (no trailing slash)', () => {
  const m = resolveMeta(ROUTES['/now']);
  assert.equal(m.fullTitle, 'Now — Kim Roland Berame');
  assert.equal(m.canonical, 'https://www.kimrolx.com/now');
});

test('gear route present with a non-empty description', () => {
  assert.equal(ROUTES['/gear'].title, 'Gear');
  assert.ok(ROUTES['/gear'].description.length > 20);
});

test('skills route present with a non-empty description', () => {
  assert.equal(ROUTES['/skills'].title, 'Skills');
  assert.ok(ROUTES['/skills'].description.length > 20);
});

test('skills subpage resolves with site-name suffix and path canonical', () => {
  const m = resolveMeta(ROUTES['/skills']);
  assert.equal(m.fullTitle, 'Skills — Kim Roland Berame');
  assert.equal(m.canonical, 'https://www.kimrolx.com/skills');
});

test('SITE_URL has no trailing slash', () => {
  assert.equal(SITE_URL.endsWith('/'), false);
});
