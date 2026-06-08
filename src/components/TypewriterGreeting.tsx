import { useTypewriter } from "@/hooks/useTypewriter";
import { profile } from "@/data/profile";

/** Animated multilingual greeting with a blinking caret. */
export function TypewriterGreeting() {
  const text = useTypewriter(profile.greetings, { typingSpeed: 90, pauseAfterComplete: 1600 });

  return (
    <p className="flex items-center justify-center gap-1 text-2xl font-bold text-ink-dim sm:text-3xl">
      <span className="sr-only">Hello, welcome.</span>
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true">👋</span>
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block h-[1.1em] w-0.5 bg-amber [animation:caret-blink_1s_steps(2)_infinite]"
      />
    </p>
  );
}
