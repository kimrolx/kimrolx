import { socials } from "@/data/profile";

type SocialLinksProps = {
  /** "row" for inline icon buttons, "list" for icon + handle rows. */
  variant?: "row" | "list";
};

export function SocialLinks({ variant = "row" }: SocialLinksProps) {
  if (variant === "list") {
    return (
      <ul className="flex flex-col gap-3">
        {socials.map(({ label, href, handle, icon: Icon }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group inline-flex items-center gap-3 text-ink-dim transition-colors hover:text-ink"
            >
              <span className="grid h-10 w-10 place-items-center rounded-md border border-border bg-surface text-ink transition-colors group-hover:border-amber group-hover:text-amber">
                <Icon aria-hidden="true" className="h-4 w-4" />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-medium text-ink">{label}</span>
                <span className="font-mono text-xs">{handle}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex items-center gap-3">
      {socials.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={label}
            className="grid h-11 w-11 place-items-center rounded-md border border-border bg-surface text-ink transition-colors hover:border-amber hover:text-amber"
          >
            <Icon aria-hidden="true" className="h-[1.1rem] w-[1.1rem]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
