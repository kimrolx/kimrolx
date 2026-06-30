import { useCallback, useEffect, useRef, useState } from 'react';
import { useEasterEgg } from '@/hooks/useEasterEgg';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useCrtSound } from '@/hooks/useCrtSound';
import { runCommand } from '@/lib/crtCommands';

const BOOT_LINES = [
  'KIMOS v1.0 — visitor terminal',
  'booting...',
  'memory check: OK',
  'loading portfolio modules: OK',
  '',
  "welcome visitor. type 'help' to begin.",
  '',
];

export function CrtTerminal() {
  const { crt, crtFinds, toggleCrt } = useEasterEgg();
  const reduced = usePrefersReducedMotion();
  const { boot, blip } = useCrtSound();

  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [phosphor, setPhosphor] = useState<'green' | 'amber'>('green');

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<string[]>([]);
  const histIndexRef = useRef<number>(-1);

  const append = useCallback((newLines: string[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  // Boot when the terminal opens.
  useEffect(() => {
    if (!crt) return;
    setLines(BOOT_LINES);
    setInput('');
    setPhosphor('green');
    historyRef.current = [];
    histIndexRef.current = -1;
    if (!reduced) boot();
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
    // Only re-run when the terminal opens/closes; boot/reduced are stable enough.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crt]);

  // Auto-scroll to bottom on new output.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  // Random glitches while open (skipped under reduced motion).
  useEffect(() => {
    if (!crt || reduced) return;
    let timer = 0;
    let inner = 0;
    const schedule = () => {
      const delay = 4000 + Math.random() * 5000;
      timer = window.setTimeout(() => {
        const node = rootRef.current;
        if (node) {
          node.classList.add('crt-glitch');
          inner = window.setTimeout(() => node.classList.remove('crt-glitch'), 160);
        }
        schedule();
      }, delay);
    };
    schedule();
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(inner);
    };
  }, [crt, reduced]);

  // Escape closes the terminal.
  useEffect(() => {
    if (!crt) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') toggleCrt();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [crt, toggleCrt]);

  const submit = useCallback(() => {
    const raw = input;
    const trimmed = raw.trim();
    setInput('');
    histIndexRef.current = -1;
    append([`visitor@kimrolx:~$ ${raw}`]);
    if (trimmed === '') return;
    historyRef.current = [...historyRef.current, trimmed];
    if (!reduced) blip();

    const result = runCommand(trimmed);
    if (result.action?.type === 'clear') {
      setLines([]);
      return;
    }
    if (result.lines.length) append(result.lines);

    const action = result.action;
    if (!action) return;
    if (action.type === 'exit') {
      window.setTimeout(() => toggleCrt(), 250);
    } else if (action.type === 'openUrl') {
      window.open(action.url, '_blank', 'noopener,noreferrer');
    } else if (action.type === 'theme') {
      setPhosphor((prev) => action.phosphor ?? (prev === 'green' ? 'amber' : 'green'));
    }
  }, [input, reduced, append, blip, toggleCrt]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const h = historyRef.current;
      if (h.length === 0) return;
      const idx = histIndexRef.current === -1 ? h.length - 1 : Math.max(0, histIndexRef.current - 1);
      histIndexRef.current = idx;
      setInput(h[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const h = historyRef.current;
      if (histIndexRef.current === -1) return;
      const next = histIndexRef.current + 1;
      if (next >= h.length) {
        histIndexRef.current = -1;
        setInput('');
      } else {
        histIndexRef.current = next;
        setInput(h[next]);
      }
    } else if (e.key === 'Tab') {
      // The input is the only focusable control; trap Tab so focus can't
      // escape to the page hidden behind the full-screen terminal.
      e.preventDefault();
    }
  };

  if (!crt) return null;

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="CRT terminal — type help, or press Escape to exit"
      className="crt-terminal fixed inset-0 flex flex-col overflow-hidden bg-[oklch(0.12_0_0)] p-4 font-mono text-sm leading-relaxed sm:p-6"
      style={{ zIndex: 'var(--z-crt-terminal)' }}
      data-phosphor={phosphor}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="mb-2 shrink-0 border-b border-current/30 pb-2 text-xs uppercase tracking-widest opacity-80">
        KIMOS v1.0 — visitor terminal · sessions: {crtFinds}
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto whitespace-pre-wrap break-words">
        {lines.map((line, i) => (
          <div key={i}>{line === '' ? ' ' : line}</div>
        ))}
      </div>
      <div className="mt-2 flex shrink-0 items-center gap-2">
        <span aria-hidden="true">visitor@kimrolx:~$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="terminal input"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          className="flex-1 bg-transparent text-current outline-none"
        />
      </div>
    </div>
  );
}
