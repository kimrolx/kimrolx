import { FiArrowUpRight } from "react-icons/fi";
import { archive } from "@/data/archive";

/** A compact ruled list of smaller builds. Each row links to source. */
export function Archive() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3 border-t border-line-2 pt-3">
        <span aria-hidden="true" className="h-2 w-2 bg-red" />
        <h3 className="label text-ink-3">Archive</h3>
        <span className="label ml-auto text-ink-3">More on GitHub</span>
      </div>

      <ul className="flex flex-col">
        {archive.map((entry) => (
          <li key={entry.name} className="border-t border-line first:border-t-0">
            <a
              href={entry.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-1 items-baseline gap-1 py-5 sm:grid-cols-[12rem_1fr_auto] sm:gap-8"
            >
              <span className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink transition-colors group-hover:text-red-ink">
                {entry.name}
                <FiArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 text-ink-3 transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red-ink"
                />
              </span>
              <span className="max-w-prose text-ink-2">{entry.tagline}</span>
              <span className="label whitespace-nowrap text-ink-3 sm:text-right">{entry.tech}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
