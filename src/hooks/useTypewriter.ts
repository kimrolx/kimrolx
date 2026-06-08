import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type TypewriterOptions = {
  /** Milliseconds per character. */
  typingSpeed?: number;
  /** Pause after a word finishes, before the next one. */
  pauseAfterComplete?: number;
};

const pickDifferent = (words: readonly string[], current: string): string => {
  if (words.length <= 1) return words[0] ?? "";
  let next = current;
  while (next === current) next = words[Math.floor(Math.random() * words.length)];
  return next;
};

/**
 * Types words out one character at a time, cycling at random.
 * Under reduced-motion, returns the first word statically.
 */
export function useTypewriter(words: readonly string[], options: TypewriterOptions = {}): string {
  const { typingSpeed = 220, pauseAfterComplete = 2000 } = options;
  const reduced = usePrefersReducedMotion();

  const [word, setWord] = useState(() => words[Math.floor(Math.random() * words.length)] ?? "");
  const [text, setText] = useState("");
  const wordsRef = useRef(words);
  wordsRef.current = words;

  useEffect(() => {
    if (reduced || !word) return;

    let index = 0;
    let pauseTimer: ReturnType<typeof setTimeout>;

    const typeTimer = setInterval(() => {
      index += 1;
      setText(word.slice(0, index));

      if (index >= word.length) {
        clearInterval(typeTimer);
        pauseTimer = setTimeout(() => {
          setText("");
          setWord(pickDifferent(wordsRef.current, word));
        }, pauseAfterComplete);
      }
    }, typingSpeed);

    return () => {
      clearInterval(typeTimer);
      clearTimeout(pauseTimer);
    };
  }, [word, reduced, typingSpeed, pauseAfterComplete]);

  return reduced ? word : text;
}
