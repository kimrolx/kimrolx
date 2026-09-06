import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FiArrowRight, FiCornerDownLeft } from 'react-icons/fi';
import { Button } from '@/components/base-components/button';
import { toast } from '@/components/base-components/toast';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

type TurnstileOptions = {
  sitekey: string;
  theme?: string;
  execution?: 'render' | 'execute';
  appearance?: 'always' | 'execute' | 'interaction-only';
  callback?: (token: string) => void;
  'error-callback'?: (code: string) => void;
  'before-interactive-callback'?: () => void;
  'after-interactive-callback'?: () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (host: HTMLElement, options: TurnstileOptions) => string;
      execute: (id: string) => void;
      remove: (id: string) => void;
      reset: (id?: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

type Status = 'idle' | 'sending' | 'sent';

const TURNSTILE_SITEKEY = import.meta.env.VITE_TURNSTILE_SITEKEY as string | undefined;
const TURNSTILE_SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
const TURNSTILE_TIMEOUT = 20_000;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Values = { message: string; name: string; email: string };

type StepDef = {
  key: keyof Values;
  label: string;
  placeholder: string;
  hint: string;
  type: string;
  autoComplete: string;
  maxLength: number;
  validate: (value: string) => string;
};

const STEPS: StepDef[] = [
  {
    key: 'message',
    label: 'Message',
    placeholder: "Tell me what you're building…",
    hint: 'Press Enter to continue.',
    type: 'text',
    autoComplete: 'off',
    maxLength: 5000,
    validate: (value) => (value.length >= 10 ? '' : 'Tell me a little more than that.'),
  },
  {
    key: 'name',
    label: 'Name',
    placeholder: 'Your name — who am I replying to?',
    hint: 'Enter to continue · Esc to edit your message.',
    type: 'text',
    autoComplete: 'name',
    maxLength: 100,
    validate: (value) => (value ? '' : 'A name, so I know who I am talking to.'),
  },
  {
    key: 'email',
    label: 'Email',
    placeholder: 'your@email — so I can reply',
    hint: 'Enter to send · Esc to go back.',
    type: 'email',
    autoComplete: 'email',
    maxLength: 200,
    validate: (value) => (EMAIL.test(value) ? '' : 'That email address looks off.'),
  },
];

const EMPTY: Values = { message: '', name: '', email: '' };

export function ContactPrompt() {
  const [index, setIndex] = useState(0);
  const [values, setValues] = useState<Values>(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [problem, setProblem] = useState('');
  const [challenging, setChallenging] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const widgetHost = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const awaitingToken = useRef<((token: string | null) => void) | null>(null);
  const reduced = usePrefersReducedMotion();

  const step = STEPS[index];
  const sent = status === 'sent';
  const sending = status === 'sending';
  const busy = sending || challenging;

  // Explicit rendering, because implicit only scans the DOM once when the script
  // loads — a client-side route back to this page would leave an empty widget.
  // `interaction-only` + `execute` keeps it out of the layout until a challenge fires.
  useEffect(() => {
    const sitekey = TURNSTILE_SITEKEY;
    if (!sitekey) return;

    const settle = (token: string | null) => {
      awaitingToken.current?.(token);
      awaitingToken.current = null;
    };

    const render = () => {
      if (!widgetHost.current || widgetId.current !== undefined) return;
      widgetId.current = window.turnstile?.render(widgetHost.current, {
        sitekey,
        theme: 'dark',
        execution: 'execute',
        appearance: 'interaction-only',
        callback: settle,
        'error-callback': () => settle(null),
        'before-interactive-callback': () => setChallenging(true),
        'after-interactive-callback': () => setChallenging(false),
      });
    };

    if (window.turnstile) {
      render();
    } else {
      window.onTurnstileLoad = render;
      if (!document.querySelector(`script[src^="${TURNSTILE_SCRIPT}"]`)) {
        const script = document.createElement('script');
        script.src = `${TURNSTILE_SCRIPT}?render=explicit&onload=onTurnstileLoad`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    }

    return () => {
      if (widgetId.current === undefined) return;
      window.turnstile?.remove(widgetId.current);
      widgetId.current = undefined;
    };
  }, []);

  function requestToken(): Promise<string | null> {
    const id = widgetId.current;
    if (!id || !window.turnstile) return Promise.resolve(null);

    return new Promise((resolve) => {
      const finish = (token: string | null) => {
        clearTimeout(timer);
        resolve(token);
      };
      const timer = setTimeout(() => {
        awaitingToken.current = null;
        finish(null);
      }, TURNSTILE_TIMEOUT);

      awaitingToken.current = finish;
      window.turnstile?.execute(id);
    });
  }

  async function send(value: Values) {
    setStatus('sending');
    setProblem('');

    try {
      const token = await requestToken();
      // A doomed POST comes back as the Worker's generic 403. Failing here instead
      // says which half broke: the widget never rendered, or it never resolved.
      if (TURNSTILE_SITEKEY && !token) {
        throw new Error(
          widgetId.current
            ? "Bot check didn't finish. Reload the page and try again."
            : 'Bot check could not load — turn off any ad blocker, then reload.',
        );
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: value.message.trim(),
          name: value.name.trim(),
          email: value.email.trim(),
          company: honeypot.current?.value ?? '',
          'cf-turnstile-response': token ?? '',
        }),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? `Something went wrong on the way out (${response.status}).`);
      }
      setStatus('sent');
      toast.add({
        title: 'Message sent',
        description: 'Your message has been sent. I will reply as soon as possible.',
        type: 'success',
      });
    } catch (cause) {
      const text = cause instanceof Error ? cause.message : 'Something went wrong on the way out.';
      setProblem(text);
      setStatus('idle');
      toast.add({ title: 'Message not sent', description: text, type: 'error' });
    } finally {
      setChallenging(false);
      // A token is single-use; re-arm the widget so a retry can execute again.
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    }
  }

  async function advance() {
    if (busy) return;
    if (sent) {
      setValues(EMPTY);
      setIndex(0);
      setStatus('idle');
      setProblem('');
      return;
    }

    const invalid = step.validate(values[step.key].trim());
    if (invalid) {
      setProblem(invalid);
      return;
    }

    setProblem('');
    if (index < STEPS.length - 1) {
      setIndex(index + 1);
      return;
    }
    await send(values);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void advance();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Escape' || index === 0) return;
    event.preventDefault();
    setIndex(index - 1);
    setProblem('');
  }

  const value = values[step.key];
  const duration = reduced ? 0 : 0.35;
  const fade = reduced ? 'transition-none' : 'transition-colors duration-[400ms] ease-out-expo';
  const rise = reduced ? 0 : 10;
  const stepLabel = sent ? 'Sent' : `${step.label} · ${index + 1} of ${STEPS.length}`;
  const buttonLabel = sent
    ? 'Start over'
    : challenging
      ? 'Waiting'
      : sending
        ? 'Sending'
        : index < STEPS.length - 1
          ? 'Continue'
          : 'Send';
  const hint = problem
    ? problem
    : challenging
      ? "Confirm you're human to finish sending."
      : sent
        ? "Sent. I'll reply as soon as I can."
        : step.hint;

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 border-t border-line-2 pt-3.5">
        <span aria-hidden="true" className="h-2 w-2 bg-red" />
        <span className="label text-ink-3">Contact</span>
        <span className="ml-auto flex items-center gap-3">
          <span aria-hidden="true" className="flex items-center gap-1.5">
            {STEPS.map((s, i) => (
              <span key={s.key} className={cn('h-0.5 w-6', fade, sent || i < index ? 'bg-red' : 'bg-line-2')} />
            ))}
          </span>
          <span className="label text-ink-3">{stepLabel}</span>
        </span>
      </div>

      <h2 className="mt-14 max-w-[22ch] text-[clamp(2.25rem,7vw,4.75rem)] font-black leading-[0.92] tracking-[-0.045em]">
        Say the thing. I&apos;ll build it<span className="text-red">.</span>
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mt-9 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-x-6 sm:gap-y-3.5"
      >
        <div
          className={cn(
            'flex min-h-11 items-center gap-3 border-b-2 pb-2 sm:col-start-1 sm:row-start-1',
            fade,
            value || sent ? 'border-red' : 'border-line-2',
          )}
        >
          <span aria-hidden="true" className="text-[1.625rem] leading-none text-red">
            ▸
          </span>
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.p
                key="sent"
                initial={{ opacity: 0, y: rise }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -rise }}
                transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 text-[clamp(1.25rem,2.5vw,1.875rem)] font-medium tracking-[-0.02em] text-ink-2"
              >
                Message away.
              </motion.p>
            ) : (
              <motion.span
                key={step.key}
                initial={{ opacity: 0, y: rise }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -rise }}
                transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1"
              >
                <label htmlFor="contact-prompt" className="sr-only">
                  {step.label}
                </label>
                <input
                  id="contact-prompt"
                  name={step.key}
                  type={step.type}
                  value={value}
                  autoFocus={index > 0}
                  autoComplete={step.autoComplete}
                  maxLength={step.maxLength}
                  disabled={busy}
                  aria-invalid={problem ? true : undefined}
                  aria-describedby="contact-hint"
                  placeholder={step.placeholder}
                  onKeyDown={handleKeyDown}
                  onChange={(event) => {
                    setValues({ ...values, [step.key]: event.target.value });
                    setProblem('');
                  }}
                  className="w-full appearance-none bg-transparent text-[clamp(1.25rem,2.5vw,1.875rem)] font-medium tracking-[-0.02em] text-ink caret-red placeholder:text-ink-3 focus:outline-none disabled:opacity-60"
                />
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Row 2 so a painted challenge and the hint sit under the field and above
            the button on mobile. The host is zero-height until it has content. */}
        <div className="sm:col-span-2 sm:row-start-2">
          {TURNSTILE_SITEKEY && <div ref={widgetHost} className="[&:not(:empty)]:mb-4" />}
          <p
            id="contact-hint"
            role="status"
            aria-live="polite"
            className={cn('min-h-5 text-xs', problem ? 'text-red-ink' : 'text-ink-3')}
          >
            {hint}
          </p>
        </div>

        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="contact-company">Company</label>
          <input id="contact-company" ref={honeypot} name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <Button
          type="submit"
          variant="outline"
          size="lg"
          disabled={busy}
          className="w-full sm:col-start-2 sm:row-start-1 sm:w-auto"
        >
          {buttonLabel}
          {sent ? (
            <FiArrowRight aria-hidden="true" className="size-4" />
          ) : (
            <FiCornerDownLeft aria-hidden="true" className="size-4" />
          )}
        </Button>
      </form>
    </div>
  );
}
