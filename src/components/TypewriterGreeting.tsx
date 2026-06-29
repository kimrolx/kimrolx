import { useTypewriter } from '@/hooks/useTypewriter';
import { profile } from '@/data/profile';

/** The multilingual greeting, cycling. The page's one human note. */
export function TypewriterGreeting() {
  const text = useTypewriter(profile.greetings, { typingSpeed: 120, pauseAfterComplete: 1600 });

  return (
    <p className="flex items-center h-2 gap-1 text-lg font-medium text-ink-2 sm:text-xl">
      <span className="sr-only">Hello, welcome.</span>
      <span aria-hidden="true">{text}</span>
      <span
        aria-hidden="true"
        className="inline-block h-[1.05em] w-[2px] translate-y-[0.1em] bg-red [animation:caret-blink_1s_steps(2)_infinite]"
      />
    </p>
  );
}

/** A typed line cycling what Kim builds, shown as "> {phrase}". */
export function RoleLine() {
  const text = useTypewriter(profile.roles, { typingSpeed: 60, pauseAfterComplete: 1900 });

  return (
    <p className="flex items-baseline gap-1.5 font-medium text-ink-2">
      <span aria-hidden="true" className="font-bold text-red-ink">
        &gt;
      </span>
      <span className="sr-only">Currently {profile.roles.join('; ')}.</span>
      <span aria-hidden="true">{text}</span>
      <span
        aria-hidden="true"
        className="inline-block h-[1em] w-[2px] translate-y-[0.1em] bg-red [animation:caret-blink_1s_steps(2)_infinite]"
      />
    </p>
  );
}
