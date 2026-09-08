import { useState } from "react";
import { FiArrowUpRight, FiMaximize2 } from "react-icons/fi";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { Lightbox } from "./Lightbox";

type ProjectImage = { src: string; alt: string };

/**
 * One screenshot, opened full size on click. `fill` pins it to the card's
 * media band so a row of plates stays even whatever the aspect ratios are;
 * otherwise it flows at its natural height.
 */
function Shot({
  image,
  fill,
  onOpen,
}: {
  image: ProjectImage;
  fill: boolean;
  onOpen: (image: ProjectImage) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(image)}
      aria-label={`View full screen: ${image.alt}`}
      className={cn(
        "group/shot relative block cursor-pointer overflow-hidden rounded-sm border border-line bg-inset transition-colors focus-visible:border-red",
        fill ? "min-h-0 text-left hover:border-red" : "hover:border-line-2",
      )}
    >
      <img
        src={image.src}
        alt={fill ? "" : image.alt}
        loading="lazy"
        decoding="async"
        className={cn(
          "h-full w-full object-cover transition-transform duration-500 ease-out group-hover/shot:scale-[1.03]",
          fill && "absolute inset-0 object-top",
        )}
      />
      {fill ? (
        <>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-bg/85 to-transparent"
          />
          <span className="label absolute left-5 right-5 top-5 line-clamp-2 text-ink-2">
            {image.alt}
          </span>
          <FiMaximize2
            aria-hidden="true"
            className="absolute bottom-4 right-4 h-8 w-8 rounded-sm border border-line-2 bg-bg/80 p-2 text-ink opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/shot:opacity-100"
          />
        </>
      ) : (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-bg/0 opacity-0 transition-all duration-300 group-hover/shot:bg-bg/45 group-hover/shot:opacity-100"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line-2 bg-bg/80 text-ink backdrop-blur-sm">
            <FiMaximize2 className="h-4 w-4" />
          </span>
        </span>
      )}
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
 * The project's visual. `rail` fills the card's media band; `stacked` flows
 * the screenshots inline. A project without images shows its live link —
 * never an empty rectangle, never an invented metric.
 */
export function ProjectMedia({
  project,
  variant = "stacked",
}: {
  project: Project;
  variant?: "rail" | "stacked";
}) {
  const images = project.images ?? [];
  const fill = variant === "rail";
  const [active, setActive] = useState<ProjectImage | null>(null);

  if (images.length === 0) return <DemoLink project={project} />;

  return (
    <>
      <div
        className={cn(
          fill && "grid h-full gap-3 sm:gap-7",
          images.length > 1 && (fill ? "grid-cols-2" : "grid grid-cols-2 gap-3"),
        )}
      >
        {images.map((image) => (
          <Shot key={image.src} image={image} fill={fill} onOpen={setActive} />
        ))}
      </div>
      <Lightbox image={active} onClose={() => setActive(null)} />
    </>
  );
}
