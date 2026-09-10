type Fetcher = { fetch(request: Request): Promise<Response> };
type RateLimiter = { limit(options: { key: string }): Promise<{ success: boolean }> };
type KVStore = {
  get<T>(key: string, type: 'json'): Promise<T | null>;
  put(key: string, value: string): Promise<void>;
};

export interface Env {
  ASSETS: Fetcher;
  CONTACT_RATE_LIMIT: RateLimiter;
  SIGNALS_CACHE: KVStore;
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY?: string;
  GITHUB_USER: string;
  GITHUB_TOKEN?: string;
  CONTACT_TO: string;
  CONTACT_FROM: string;
}

const MAX = { name: 100, email: 200, message: 5000 };
const MIN_MESSAGE = 10;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fail = (status: number, error: string) =>
  new Response(JSON.stringify({ error }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

function trimmed(value: unknown, max: number): string | null {
  if (typeof value !== 'string' || value.length > max) return null;
  const text = value.trim();
  return text.length > 0 ? text : null;
}

const TURNSTILE_VERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

async function passesTurnstile(token: unknown, ip: string, secret: string): Promise<boolean> {
  if (typeof token !== 'string' || token.length === 0) return false;

  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  form.append('remoteip', ip);

  try {
    const response = await fetch(TURNSTILE_VERIFY, { method: 'POST', body: form });
    const outcome = (await response.json()) as { success?: boolean };
    return outcome.success === true;
  } catch {
    return false;
  }
}

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] ?? char);

type Submission = {
  name: string;
  email: string;
  message: string;
  country: string | null;
  sentAt: Date;
};

const stampOf = (sentAt: Date) =>
  sentAt.toLocaleString('en-PH', { timeZone: 'Asia/Manila', dateStyle: 'medium', timeStyle: 'short' });

function renderHtml({ name, email, message, country, sentAt }: Submission): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const body = escapeHtml(message).replace(/\r?\n/g, '<br />');
  const origin = ['kimrolx.com', country, stampOf(sentAt)].filter(Boolean).join(' &middot; ');

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
  </head>
  <body style="margin:0;padding:24px;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e4e4e7;">
      <tr>
        <td style="padding:28px 32px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td style="width:8px;height:8px;background:#e82a1e;font-size:0;line-height:0;">&nbsp;</td>
              <td style="padding-left:10px;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#71717a;">New message</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 32px 0;">
          <div style="font-size:24px;font-weight:700;letter-spacing:-0.02em;color:#18181b;">${safeName}</div>
          <a href="mailto:${safeEmail}" style="font-size:14px;color:#e82a1e;text-decoration:none;">${safeEmail}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 32px;">
          <div style="border-top:1px solid #e4e4e7;border-bottom:1px solid #e4e4e7;padding:20px 0;font-size:15px;line-height:1.65;color:#27272a;">${body}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:0 32px 28px;font-size:12px;color:#a1a1aa;">
          ${origin}<br />
          Reply to this email to answer ${safeName} directly.
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderText({ name, email, message, country, sentAt }: Submission): string {
  return [
    'NEW MESSAGE',
    '',
    `${name} <${email}>`,
    '',
    '----------------------------------------',
    message,
    '----------------------------------------',
    '',
    ['kimrolx.com', country, stampOf(sentAt)].filter(Boolean).join(' | '),
    'Reply to this email to answer them directly.',
  ].join('\n');
}

export type GithubEvent = {
  type: string;
  repo: { name: string };
  created_at: string;
};

export type Push = { repo: string; count: number; at: string };
export type Summary = { pushes: number; repos: number; days: 7 };

const WEEK = 7 * 86_400_000;

// The public events feed omits payload.size and commits[], so a push is the
// only unit this endpoint can honestly report.
const pushEvents = (events: GithubEvent[]) => events.filter((event) => event.type === 'PushEvent');

export function foldPushes(events: GithubEvent[]): Push[] {
  const rows: Push[] = [];
  for (const event of pushEvents(events)) {
    const last = rows.at(-1);
    if (last?.repo === event.repo.name) {
      last.count += 1;
      continue;
    }
    if (rows.length === 5) break;
    rows.push({ repo: event.repo.name, count: 1, at: event.created_at });
  }
  return rows;
}

export function summarize(events: GithubEvent[], now: number): Summary | null {
  const recent = pushEvents(events).filter((event) => now - Date.parse(event.created_at) < WEEK);
  if (recent.length === 0) return null;
  return {
    pushes: recent.length,
    repos: new Set(recent.map((event) => event.repo.name)).size,
    days: 7,
  };
}

export type Calendar = { total: number; from: string | null; weeks: number[][] };

type CalendarResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions?: number;
          weeks?: { contributionDays?: { contributionCount?: number; date?: string }[] }[];
        };
      };
    };
  };
};

export function shapeCalendar(payload: CalendarResponse): Calendar | null {
  const calendar = payload?.data?.user?.contributionsCollection?.contributionCalendar;
  const weeks = calendar?.weeks;
  if (!Array.isArray(weeks) || weeks.length === 0) return null;
  const shaped = weeks.map((week) => (week.contributionDays ?? []).map((day) => day.contributionCount ?? 0));

  // GitHub truncates the first week at the start of the window, so it can begin
  // mid-week. Front-pad it with -1 spacers to keep every row on its weekday.
  const pad = shaped[0].length < 7 ? 7 - shaped[0].length : 0;
  if (pad > 0) shaped[0] = [...Array(pad).fill(-1), ...shaped[0]];

  // One anchor date is enough: every cell sits pad-adjusted days after it, so
  // the client derives the rest by index instead of shipping 365 date strings.
  const firstDate = weeks[0]?.contributionDays?.[0]?.date;
  const from = firstDate ? new Date(Date.parse(`${firstDate}T00:00:00Z`) - pad * 86_400_000).toISOString().slice(0, 10) : null;

  return { total: calendar?.totalContributions ?? 0, from, weeks: shaped };
}

export type Signals = {
  fetchedAt: string;
  summary: Summary | null;
  pushes: Push[];
  calendar: Calendar | null;
};

const SIGNALS_KEY = 'signals';
const SIGNALS_TTL = 300_000;

type GithubInit = { method?: string; headers?: Record<string, string>; body?: string };

async function github<T>(env: Env, url: string, init: GithubInit, parse: (json: unknown) => T | null): Promise<T | null> {
  if (!env.GITHUB_TOKEN) return null;
  try {
    const response = await fetch(url, {
      ...init,
      // GitHub answers 403 to any request without a User-Agent.
      headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, 'User-Agent': 'kimrolx.com', ...init.headers },
    });
    return response.ok ? parse(await response.json()) : null;
  } catch {
    return null;
  }
}

const fetchEvents = (env: Env) =>
  github(
    env,
    `https://api.github.com/users/${env.GITHUB_USER}/events/public?per_page=100`,
    { headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' } },
    (json) => (Array.isArray(json) ? (json as GithubEvent[]) : null),
  );

const CALENDAR_QUERY =
  'query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{contributionCount date}}}}}}';

const fetchCalendar = (env: Env) =>
  github(
    env,
    'https://api.github.com/graphql',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: CALENDAR_QUERY, variables: { login: env.GITHUB_USER } }),
    },
    (json) => shapeCalendar(json as CalendarResponse),
  );

async function handleSignals(env: Env): Promise<Response> {
  const json = (signals: Signals) =>
    new Response(JSON.stringify(signals), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=120' },
    });

  const cached = await env.SIGNALS_CACHE.get<Signals>(SIGNALS_KEY, 'json');
  if (cached && Date.now() - Date.parse(cached.fetchedAt) < SIGNALS_TTL) return json(cached);

  const [events, calendar] = await Promise.all([fetchEvents(env), fetchCalendar(env)]);
  if (!events) {
    return json(cached ?? { fetchedAt: new Date().toISOString(), summary: null, pushes: [], calendar: null });
  }

  const fresh: Signals = {
    fetchedAt: new Date().toISOString(),
    summary: summarize(events, Date.now()),
    pushes: foldPushes(events),
    calendar,
  };
  await env.SIGNALS_CACHE.put(SIGNALS_KEY, JSON.stringify(fresh));
  return json(fresh);
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
  const { success } = await env.CONTACT_RATE_LIMIT.limit({ key: ip });
  if (!success) return fail(429, 'Too many messages just now. Try again in a minute.');

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail(400, 'Malformed request.');
  }
  if (typeof body !== 'object' || body === null) return fail(400, 'Malformed request.');
  const form = body as Record<string, unknown>;

  // Honeypot: a hidden field only a bot fills. Accept and drop on the floor.
  if (typeof form.company === 'string' && form.company.length > 0) {
    return new Response(null, { status: 204 });
  }

  // Fails open when the secret is unset so the form keeps working before
  // Turnstile is configured. The honeypot and rate limit still apply.
  if (env.TURNSTILE_SECRET_KEY) {
    const human = await passesTurnstile(form['cf-turnstile-response'], ip, env.TURNSTILE_SECRET_KEY);
    if (!human) return fail(403, 'Bot check failed. Reload the page and try again.');
  }

  const name = trimmed(form.name, MAX.name);
  const email = trimmed(form.email, MAX.email);
  const message = trimmed(form.message, MAX.message);
  if (!name || !email || !message) return fail(400, 'Name, email, and message are all required.');
  if (!EMAIL.test(email)) return fail(400, 'That email address looks off.');
  if (message.length < MIN_MESSAGE) return fail(400, 'Tell me a little more than that.');

  const submission: Submission = {
    name,
    email,
    message,
    country: (request as { cf?: { country?: string } }).cf?.country ?? null,
    sentAt: new Date(),
  };

  const sent = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: [env.CONTACT_TO],
      reply_to: email,
      subject: `Portfolio — ${name}`,
      html: renderHtml(submission),
      text: renderText(submission),
    }),
  });

  if (!sent.ok) return fail(502, 'Could not send that right now. Try again in a moment.');
  return new Response(null, { status: 204 });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/contact') {
      if (request.method !== 'POST') {
        return new Response(null, { status: 405, headers: { Allow: 'POST' } });
      }
      return handleContact(request, env);
    }
    if (pathname === '/api/signals') {
      if (request.method !== 'GET') {
        return new Response(null, { status: 405, headers: { Allow: 'GET' } });
      }
      return handleSignals(env);
    }
    return env.ASSETS.fetch(request);
  },
};
