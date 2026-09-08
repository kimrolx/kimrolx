import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker, { foldPushes, shapeCalendar, summarize, type Env } from './index.ts';

type Sent = { body: Record<string, unknown> } | null;

function harness(options: { allow?: boolean; ok?: boolean } = {}) {
  const sent: { last: Sent } = { last: null };
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async (_url: string, init: { body: string }) => {
    sent.last = { body: JSON.parse(init.body) };
    return new Response(null, { status: options.ok === false ? 500 : 200 });
  }) as typeof globalThis.fetch;

  const env = {
    ASSETS: { fetch: async () => new Response('the spa', { status: 200 }) },
    CONTACT_RATE_LIMIT: { limit: async () => ({ success: options.allow !== false }) },
    RESEND_API_KEY: 'test-key',
    CONTACT_TO: 'me@example.com',
    CONTACT_FROM: 'Portfolio <noreply@example.com>',
  } as unknown as Env;

  return { env, sent, restore: () => void (globalThis.fetch = realFetch) };
}

const post = (payload: unknown) =>
  new Request('https://kimrolx.com/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': '1.2.3.4' },
    body: JSON.stringify(payload),
  });

const valid = { name: 'Ada', email: 'ada@example.com', message: 'I have a project in mind for you.' };

test('non-api paths fall through to static assets', async () => {
  const { env, restore } = harness();
  const res = await worker.fetch(new Request('https://kimrolx.com/gear'), env);
  assert.equal(await res.text(), 'the spa');
  restore();
});

test('valid submission sends with reply-to set to the sender', async () => {
  const { env, sent, restore } = harness();
  const res = await worker.fetch(post(valid), env);
  assert.equal(res.status, 204);
  assert.equal(sent.last?.body.reply_to, 'ada@example.com');
  assert.deepEqual(sent.last?.body.to, ['me@example.com']);
  restore();
});

test('honeypot submissions look successful but send nothing', async () => {
  const { env, sent, restore } = harness();
  const res = await worker.fetch(post({ ...valid, company: 'Spam Co' }), env);
  assert.equal(res.status, 204);
  assert.equal(sent.last, null);
  restore();
});

test('missing fields, bad email, and short messages are rejected without sending', async () => {
  const { env, sent, restore } = harness();
  for (const payload of [
    { ...valid, name: '   ' },
    { ...valid, email: 'not-an-email' },
    { ...valid, message: 'hi' },
    { ...valid, name: 'x'.repeat(101) },
  ]) {
    assert.equal((await worker.fetch(post(payload), env)).status, 400);
  }
  assert.equal(sent.last, null);
  restore();
});

test('rate-limited requests are refused before sending', async () => {
  const { env, sent, restore } = harness({ allow: false });
  assert.equal((await worker.fetch(post(valid), env)).status, 429);
  assert.equal(sent.last, null);
  restore();
});

test('a failing provider surfaces as 502, not a silent success', async () => {
  const { env, restore } = harness({ ok: false });
  assert.equal((await worker.fetch(post(valid), env)).status, 502);
  restore();
});

test('GET on the contact endpoint is method-not-allowed', async () => {
  const { env, restore } = harness();
  const res = await worker.fetch(new Request('https://kimrolx.com/api/contact'), env);
  assert.equal(res.status, 405);
  restore();
});

test('message HTML is escaped, so a submitted script tag stays inert', async () => {
  const { env, sent, restore } = harness();
  await worker.fetch(
    post({
      name: 'Mallory & "friends"',
      email: 'mallory@example.com',
      message: '<script>alert(1)</script>\nsecond line',
    }),
    env,
  );
  const html = sent.last?.body.html as string;
  assert.ok(!html.includes('<script>'), 'raw script tag leaked into the email HTML');
  assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
  assert.ok(html.includes('&amp; &quot;friends&quot;'), 'name was not escaped');
  assert.ok(html.includes('second line') && html.includes('<br />'), 'newlines were not converted');
  restore();
});

test('email html declares utf-8 so non-ascii input is not mangled', async () => {
  const { env, sent, restore } = harness();
  await worker.fetch(post({ ...valid, message: 'Second test \u2014 an em dash, and a \u00f1.' }), env);
  const html = sent.last?.body.html as string;
  assert.match(html, /<meta charset="utf-8"/);
  assert.ok(html.includes('\u2014') && html.includes('\u00f1'));
  restore();
});

test('a plain-text alternative is sent alongside the HTML', async () => {
  const { env, sent, restore } = harness();
  await worker.fetch(post(valid), env);
  const text = sent.last?.body.text as string;
  assert.match(text, /Ada <ada@example\.com>/);
  assert.match(text, /I have a project in mind for you./);
  restore();
});

test('turnstile: a missing or bad token is rejected before Resend is called', async () => {
  const { env, sent, restore } = harness();
  const guarded = { ...env, TURNSTILE_SECRET_KEY: 'secret' } as Env;
  globalThis.fetch = (async (url: string) =>
    url.includes('siteverify')
      ? new Response(JSON.stringify({ success: false }), { status: 200 })
      : new Response(null, { status: 200 })) as typeof globalThis.fetch;

  assert.equal((await worker.fetch(post(valid), guarded)).status, 403);
  assert.equal(sent.last, null);
  restore();
});

test('turnstile: a verified token lets the message through', async () => {
  const { env, sent, restore } = harness();
  const guarded = { ...env, TURNSTILE_SECRET_KEY: 'secret' } as Env;
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async (url: string, init: { body: string }) => {
    if (url.includes('siteverify')) return new Response(JSON.stringify({ success: true }), { status: 200 });
    sent.last = { body: JSON.parse(init.body) };
    return new Response(null, { status: 200 });
  }) as typeof globalThis.fetch;

  const res = await worker.fetch(post({ ...valid, 'cf-turnstile-response': 'token' }), guarded);
  assert.equal(res.status, 204);
  assert.ok(sent.last, 'a verified submission should still send');
  globalThis.fetch = realFetch;
  restore();
});

// The public events feed carries no commit count, so these fixtures mirror the
// real trimmed payload: type, repo, created_at, and nothing else we rely on.
const pushEvent = (repo: string, at: string) => ({
  type: 'PushEvent',
  repo: { name: repo },
  created_at: at,
});

const agoIso = (ms: number) => new Date(Date.now() - ms).toISOString();
const DAY = 86_400_000;

test('foldPushes keeps only push events', () => {
  const at = agoIso(DAY);
  const rows = foldPushes([
    { type: 'WatchEvent', repo: { name: 'kimrolx/haven' }, created_at: at },
    pushEvent('kimrolx/machina', at),
  ]);
  assert.deepEqual(rows, [{ repo: 'kimrolx/machina', count: 1, at }]);
});

test('foldPushes folds consecutive pushes to the same repo', () => {
  const newest = agoIso(DAY);
  const rows = foldPushes([
    pushEvent('kimrolx/machina', newest),
    pushEvent('kimrolx/machina', agoIso(2 * DAY)),
    pushEvent('kimrolx/haven', agoIso(3 * DAY)),
  ]);
  assert.deepEqual(rows, [
    { repo: 'kimrolx/machina', count: 2, at: newest },
    { repo: 'kimrolx/haven', count: 1, at: rows[1].at },
  ]);
});

test('foldPushes caps at five rows', () => {
  const events = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((name, i) =>
    pushEvent(`kimrolx/${name}`, agoIso((i + 1) * DAY)),
  );
  assert.equal(foldPushes(events).length, 5);
});

test('summarize counts pushes and distinct repos inside the last seven days', () => {
  const summary = summarize(
    [
      pushEvent('kimrolx/machina', agoIso(DAY)),
      pushEvent('kimrolx/haven', agoIso(2 * DAY)),
      pushEvent('kimrolx/machina', agoIso(3 * DAY)),
      pushEvent('kimrolx/old', agoIso(30 * DAY)),
    ],
    Date.now(),
  );
  assert.deepEqual(summary, { pushes: 3, repos: 2, days: 7 });
});

test('summarize returns null when the window is empty', () => {
  assert.equal(summarize([pushEvent('kimrolx/old', agoIso(30 * DAY))], Date.now()), null);
});

function signalsHarness(
  options: { cached?: unknown; events?: unknown; calendar?: unknown; ok?: boolean; token?: string | null } = {},
) {
  const store = new Map<string, string>();
  if (options.cached !== undefined) store.set('signals', JSON.stringify(options.cached));

  let calls = 0;
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    calls += 1;
    if (options.ok === false) return new Response('forbidden', { status: 403 });
    if (String(input).includes('/graphql')) {
      return new Response(JSON.stringify(options.calendar ?? {}), { status: 200 });
    }
    return new Response(JSON.stringify(options.events ?? []), { status: 200 });
  }) as typeof globalThis.fetch;

  const env = {
    ASSETS: { fetch: async () => new Response('the spa', { status: 200 }) },
    SIGNALS_CACHE: {
      get: async (key: string) => {
        const raw = store.get(key);
        return raw ? JSON.parse(raw) : null;
      },
      put: async (key: string, value: string) => void store.set(key, value),
    },
    GITHUB_USER: 'kimrolx',
    GITHUB_TOKEN: options.token === null ? undefined : (options.token ?? 'test-token'),
  } as unknown as Env;

  return { env, store, calls: () => calls, restore: () => void (globalThis.fetch = realFetch) };
}

const getSignals = () => new Request('https://kimrolx.com/api/signals');

test('a fresh cache is served without calling GitHub', async () => {
  const cached = {
    fetchedAt: new Date().toISOString(),
    summary: null,
    pushes: [{ repo: 'kimrolx/haven', count: 2, at: agoIso(DAY) }],
  };
  const { env, calls, restore } = signalsHarness({ cached });
  const res = await worker.fetch(getSignals(), env);
  assert.deepEqual(await res.json(), cached);
  assert.equal(calls(), 0);
  restore();
});

test('a failing GitHub call serves stale data and leaves the cache alone', async () => {
  const cached = {
    fetchedAt: agoIso(DAY),
    summary: null,
    pushes: [{ repo: 'kimrolx/haven', count: 2, at: agoIso(DAY) }],
  };
  const { env, store, restore } = signalsHarness({ cached, ok: false });
  const res = await worker.fetch(getSignals(), env);
  assert.deepEqual(await res.json(), cached);
  assert.deepEqual(JSON.parse(store.get('signals')!), cached);
  restore();
});

test('no token means no GitHub call and an empty payload', async () => {
  const { env, calls, restore } = signalsHarness({ token: null });
  const res = await worker.fetch(getSignals(), env);
  const body = (await res.json()) as { pushes: unknown[]; summary: unknown };
  assert.deepEqual(body.pushes, []);
  assert.equal(body.summary, null);
  assert.equal(calls(), 0);
  restore();
});

test('a cold cache shapes and stores the real trimmed GitHub payload', async () => {
  const events = [pushEvent('kimrolx/machina', agoIso(DAY)), pushEvent('kimrolx/machina', agoIso(2 * DAY))];
  const { env, store, restore } = signalsHarness({ events });
  const res = await worker.fetch(getSignals(), env);
  const body = (await res.json()) as {
    pushes: { repo: string; count: number; at: string }[];
    summary: { pushes: number; repos: number };
  };
  assert.deepEqual(body.pushes, [{ repo: 'kimrolx/machina', count: 2, at: events[0].created_at }]);
  assert.deepEqual(body.summary, { pushes: 2, repos: 1, days: 7 });
  assert.ok(store.has('signals'));
  restore();
});

test('signals rejects non-GET methods', async () => {
  const { env, restore } = signalsHarness();
  const res = await worker.fetch(new Request('https://kimrolx.com/api/signals', { method: 'POST' }), env);
  assert.equal(res.status, 405);
  assert.equal(res.headers.get('Allow'), 'GET');
  restore();
});

test('a cold cache plus a failing GitHub call returns an empty payload and writes nothing', async () => {
  const { env, store, restore } = signalsHarness({ ok: false });
  const res = await worker.fetch(getSignals(), env);
  const body = (await res.json()) as { pushes: unknown[]; summary: unknown };
  assert.deepEqual(body.pushes, []);
  assert.equal(body.summary, null);
  assert.equal(store.size, 0);
  restore();
});

test('shapeCalendar flattens the GraphQL calendar into weeks of counts', () => {
  const payload = {
    data: {
      user: {
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: 7,
            weeks: [
              {
                contributionDays: [
                  { contributionCount: 1, date: '2026-01-03' },
                  { contributionCount: 0, date: '2026-01-04' },
                ],
              },
              { contributionDays: [{ contributionCount: 6, date: '2026-01-05' }] },
            ],
          },
        },
      },
    },
  };
  assert.deepEqual(shapeCalendar(payload), {
    total: 7,
    // first real day is Jan 3 with 5 spacers ahead of it, so the grid starts Dec 29
    from: '2025-12-29',
    weeks: [[-1, -1, -1, -1, -1, 1, 0], [6]],
  });
});

test('shapeCalendar returns null for a malformed or empty calendar', () => {
  assert.equal(shapeCalendar({}), null);
  assert.equal(
    shapeCalendar({ data: { user: { contributionsCollection: { contributionCalendar: { weeks: [] } } } } }),
    null,
  );
});

test('shapeCalendar leaves a full first week unpadded', () => {
  const week = (counts: number[]) => ({ contributionDays: counts.map((contributionCount) => ({ contributionCount })) });
  const payload = {
    data: {
      user: {
        contributionsCollection: {
          contributionCalendar: { totalContributions: 8, weeks: [week([1, 1, 1, 1, 1, 1, 1]), week([1])] },
        },
      },
    },
  };
  assert.deepEqual(shapeCalendar(payload)?.weeks[0], [1, 1, 1, 1, 1, 1, 1]);
});

test('the calendar rides along in the signals payload', async () => {
  const week = (counts: number[]) => ({ contributionDays: counts.map((contributionCount) => ({ contributionCount })) });
  const calendar = {
    data: {
      user: {
        contributionsCollection: {
          contributionCalendar: { totalContributions: 9, weeks: [week([1, 2, 3, 0, 1, 1, 1]), week([0, 0])] },
        },
      },
    },
  };
  const { env, restore } = signalsHarness({ events: [pushEvent('kimrolx/haven', agoIso(DAY))], calendar });
  const res = await worker.fetch(getSignals(), env);
  const body = (await res.json()) as { calendar: { total: number; weeks: number[][] } };
  assert.deepEqual(body.calendar, { total: 9, from: null, weeks: [[1, 2, 3, 0, 1, 1, 1], [0, 0]] });
  restore();
});

test('a failing calendar call still returns the push payload', async () => {
  const { env, restore } = signalsHarness({ events: [pushEvent('kimrolx/haven', agoIso(DAY))], calendar: {} });
  const res = await worker.fetch(getSignals(), env);
  const body = (await res.json()) as { calendar: unknown; pushes: unknown[] };
  assert.equal(body.calendar, null);
  assert.equal(body.pushes.length, 1);
  restore();
});
