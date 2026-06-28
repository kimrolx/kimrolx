import { useState } from "react";
import { FiMaximize2 } from "react-icons/fi";
import type { Project } from "@/types";
import { Lightbox } from "./Lightbox";

/** Pull a bare hostname from the first http link. */
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
 * The project's visual: framed screenshots when they exist, opened in a
 * lightbox; otherwise an honest typographic block stating what it is and
 * where it lives. Never an empty rectangle, never invented metrics.
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
              className="group relative block overflow-hidden rounded-sm border border-line bg-inset transition-colors hover:border-line-2 focus-visible:border-red"
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
                className="pointer-events-none absolute inset-0 flex items-center justify-center bg-bg/0 opacity-0 transition-all duration-300 group-hover:bg-bg/45 group-hover:opacity-100"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line-2 bg-bg/80 text-ink backdrop-blur-sm">
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
    <div className="flex h-full flex-col justify-between gap-8 rounded-sm border border-line bg-inset p-6 sm:p-8">
      <span className="label text-ink-3">Detail</span>
      <dl className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <dt className="label text-ink-3">Project</dt>
          <dd className="text-lg font-semibold text-ink">{project.title}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="label text-ink-3">Live at</dt>
          <dd className="break-all text-red-ink">{domain}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="label text-ink-3">Type</dt>
          <dd className="text-ink-2">{project.kind}</dd>
        </div>
      </dl>
    </div>
  );
}
