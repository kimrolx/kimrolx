import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker, { type Env } from './index.ts';

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
