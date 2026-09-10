import { socials } from "@/data/profile";

export function SocialLinks() {
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
