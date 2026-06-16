import { useState } from "react";
import { FiMaximize2 } from "react-icons/fi";
import type { Project } from "@/types";
import { Lightbox } from "./Lightbox";

/** Pull a bare hostname from the first http link, for the terminal motif. */
function primaryDomain(project: Project): string {
  const httpLink = project.links.find((link) => link.href.startsWith("http"));
  if (!httpLink) return project.title.toLowerCase();
  try {
    return new URL(httpLink.href).hostname.replace(/^www\./, "");
  } catch {
    return project.title.toLowerCase();
  }
}

/**
 * The visual side of a project row. Shows screenshots when they exist,
 * otherwise a small terminal motif so no project ships as an empty block.
 * The motif is honest: it states what the project is and where it lives,
 * never invented usage metrics.
 */
export function ProjectMedia({ project }: { project: Project }) {
  const images = project.images ?? [];
  const [active, setActive] = useState<{ src: string; alt: string } | null>(null);

  if (images.length > 0) {
    return (
      <>
        <div className={images.length > 1 ? "grid grid-cols-2 gap-3" : ""}>
          {images.map((image) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActive(image)}
              aria-label={`Preview: ${image.alt}`}
              className="group relative block overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-border-strong focus-visible:border-amber"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/35 group-hover:opacity-100"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white backdrop-blur-sm">
                  <FiMaximize2 className="h-4 w-4" />
                </span>
              </span>
            </button>
          ))}
        </div>
        <Lightbox image={active} onClose={() => setActive(null)} />
      </>
    );
  }

  const domain = primaryDomain(project);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface font-mono text-xs sm:text-sm">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-ink-faint" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-faint" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-faint" />
        <span className="ml-2 text-xs text-ink-faint">{project.title.toLowerCase()}</span>
      </div>
      <div className="flex flex-col gap-3 p-5 sm:p-6">
        <p className="break-all text-ink-dim">
          <span className="text-teal-ink">$</span> open{" "}
          <span className="text-ink-faint">{domain}</span>
        </p>
        <p className="break-words text-ink">
          <span className="text-amber">→</span> {project.title}{" "}
          <span className="text-ink-faint">· live</span>
        </p>
        <p className="text-ink-faint">{project.kind}</p>
      </div>
    </div>
  );
}
