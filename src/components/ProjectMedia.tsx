import { useState } from "react";
import { FiArrowUpRight, FiMaximize2 } from "react-icons/fi";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { Lightbox } from "./Lightbox";

type ProjectImage = { src: string; alt: string };

/**
 * One screenshot pinned to the card's media band, so a row of plates stays
 * even whatever the aspect ratios are. Opens full size on click.
 */
function Shot({ image, onOpen }: { image: ProjectImage; onOpen: (image: ProjectImage) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(image)}
      aria-label={`View full screen: ${image.alt}`}
      className="group/shot relative block min-h-0 cursor-pointer overflow-hidden rounded-sm border border-line bg-inset text-left transition-colors hover:border-red focus-visible:border-red"
    >
      <img
        src={image.src}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover/shot:scale-[1.03]"
      />
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-bg/85 to-transparent" />
      <span className="label absolute left-5 right-5 top-5 line-clamp-2 text-ink-2">{image.alt}</span>
      <FiMaximize2
        aria-hidden="true"
        className="absolute bottom-4 right-4 h-8 w-8 rounded-sm border border-line-2 bg-bg/80 p-2 text-ink opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/shot:opacity-100"
      />
    </button>
  );
}

/**
 * The honest stand-in for a project with no screenshots: its own live link,
 * set big and actually clickable. No metrics, nothing invented.
 */
function DemoLink({ project }: { project: Project }) {
  const demo =
    project.demoLink ?? { href: project.links.find((link) => link.href.startsWith("http"))?.href, note: "Live at" };
  if (!demo.href) return null;

  return (
    <div className="flex h-full flex-col justify-center gap-5">
      <span className="label text-ink-3">{demo.note}</span>
      <a
        href={demo.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-baseline gap-3 break-all font-mono text-[clamp(1.25rem,3.2vw,2.5rem)] font-medium leading-tight tracking-[-0.02em] text-ink transition-colors hover:text-red-ink"
      >
        <FiArrowUpRight aria-hidden="true" className="h-[0.7em] w-[0.7em] shrink-0 text-red" />
        {demo.href.replace(/^https?:\/\/(www\.)?/, "")}
      </a>
    </div>
  );
}

/**
 * The project's visual, filling the card's media band. A project without
 * images shows its live link — never an empty rectangle, never an invented metric.
 */
export function ProjectMedia({ project }: { project: Project }) {
  const images = project.images ?? [];
  const [active, setActive] = useState<ProjectImage | null>(null);

  if (images.length === 0) return <DemoLink project={project} />;

  return (
    <>
      <div className={cn("grid h-full gap-3 sm:gap-7", images.length > 1 && "grid-cols-2")}>
        {images.map((image) => (
          <Shot key={image.src} image={image} onOpen={setActive} />
        ))}
      </div>
      <Lightbox image={active} onClose={() => setActive(null)} />
    </>
  );
}
