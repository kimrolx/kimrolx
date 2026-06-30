import { useEffect, useRef } from 'react';

const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyK',
  'KeyR',
  'KeyB',
] as const;

export function useKonami(onMatch: () => void): void {
  // Keep the latest callback without re-binding the listener.
  const cb = useRef(onMatch);
  cb.current = onMatch;

  useEffect(() => {
    let index = 0;
    function onKeyDown(e: KeyboardEvent) {
      // Ignore typing in inputs/textareas.
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      const expected = SEQUENCE[index];
      if (e.code === expected) {
        index += 1;
        if (index === SEQUENCE.length) {
          index = 0;
          cb.current();
        }
      } else {
        // Restart, but allow the wrong key to be a fresh first key.
        index = e.code === SEQUENCE[0] ? 1 : 0;
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
}
