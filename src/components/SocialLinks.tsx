import { socials } from "@/data/profile";

type SocialLinksProps = {
  /** "row" for inline icon keys, "list" for icon + handle rows. */
  variant?: "row" | "list";
};

export function SocialLinks({ variant = "row" }: SocialLinksProps) {
  if (variant === "list") {
    return (
      <ul className="flex flex-col">
        {socials.map(({ label, href, handle, icon: Icon }) => (
          <li key={label} className="border-t border-line first:border-t-0">
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between gap-4 py-3.5 transition-colors hover:text-red-ink"
            >
              <span className="flex items-center gap-3">
                <Icon aria-hidden="true" className="h-4 w-4 text-ink-3 transition-colors group-hover:text-red-ink" />
                <span className="font-semibold text-ink transition-colors group-hover:text-red-ink">
                  {label}
                </span>
              </span>
              <span className="text-sm text-ink-3">{handle}</span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex items-center gap-2.5">
      {socials.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={label}
            className="grid h-11 w-11 place-items-center rounded-sm border border-line text-ink transition-[transform,color,border-color] duration-200 hover:-translate-y-px hover:border-red hover:text-red-ink"
          >
            <Icon aria-hidden="true" className="h-[1.1rem] w-[1.1rem]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
