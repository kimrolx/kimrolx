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
      className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-black px-5 py-2.5 text-white transition-transform duration-200 hover:-translate-y-0.5 hover:border-white/30"
    >
      <FaApple aria-hidden="true" className="h-7 w-7" />
      <span className="flex flex-col leading-none">
        <span className="text-[0.625rem] font-medium tracking-wide text-white/80">
          Download on the
        </span>
        <span className="text-lg font-semibold tracking-tight">App Store</span>
      </span>
    </a>
  );
}
