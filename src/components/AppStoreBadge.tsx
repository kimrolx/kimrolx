import { FaApple } from "react-icons/fa";

/**
 * Apple-style "Download on the App Store" badge: white Apple mark on a
 * black pill, small kicker over a bold wordmark. Mirrors how apps are
 * advertised, instead of a generic accent button.
 */
export function AppStoreBadge({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 rounded-sm border border-ink/20 bg-ink px-4 py-2.5 text-bg transition-transform duration-200 hover:-translate-y-px"
    >
      <FaApple aria-hidden="true" className="h-7 w-7" />
      <span className="flex flex-col leading-none">
        <span className="text-[0.625rem] font-medium tracking-wide text-bg/70">
          Download on the
        </span>
        <span className="text-lg font-semibold tracking-tight">App Store</span>
      </span>
    </a>
  );
}
