import { useEffect } from "react";
import { FiArrowLeft, FiImage } from "react-icons/fi";
import { WipeLink } from "@/components/WipeLink";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SheetHeading } from "@/components/SheetHeading";
import { cn } from "@/lib/utils";
import { nowGroups, nowIntro, nowUpdated, type NowEntry, type NowImage } from "@/data/now";

const updatedLabel = new Date(nowUpdated).toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
});

/** A full-color, hairline-framed photo (or a labeled placeholder until one exists). */
function NowMedia({ image }: { image: NowImage }) {
  const ratio =
    image.aspect === "portrait"
      ? "aspect-[4/5]"
      : image.aspect === "square"
        ? "aspect-square"
        : "aspect-[16/10]";
  return (
    <figure className="flex flex-col gap-2">
      <div className={cn("overflow-hidden rounded-sm border border-line bg-surface", ratio)}>
        {image.src ? (
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-ink-3">
            <FiImage aria-hidden="true" className="h-6 w-6" />
            <span className="label">Placeholder</span>
          </div>
        )}
      </div>
      {image.caption && <figcaption className="label text-ink-3">{image.caption}</figcaption>}
    </figure>
  );
}

function EntryHead({ entry }: { entry: NowEntry }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <h4 className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink sm:text-xl">
        {entry.active && (
          <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-red" />
        )}
        {entry.title}
      </h4>
      {entry.meta && <span className="label text-ink-3">{entry.meta}</span>}
    </div>
  );
}

function Entry({ entry }: { entry: NowEntry }) {
  // A pair/set of photos: text, then the frames as a row.
  if (entry.images?.length) {
    return (
      <li className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <EntryHead entry={entry} />
          <p className="max-w-prose text-ink-2">{entry.detail}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {entry.images.map((image) => (
            <NowMedia key={image.alt} image={image} />
          ))}
        </div>
      </li>
    );
  }

  // Text-only entries stay compact.
  if (!entry.image) {
    return (
      <li className="flex flex-col gap-2">
        <EntryHead entry={entry} />
        <p className="max-w-prose text-ink-2">{entry.detail}</p>
      </li>
    );
  }

  // Pictured entries break into text + framed media, alternating sides at md+.
  const mediaLeft = entry.image.side === "left";
  return (
    <li className="grid items-start gap-6 md:grid-cols-2 md:gap-10">
      <div className={cn("flex flex-col gap-2", mediaLeft && "md:order-2")}>
        <EntryHead entry={entry} />
        <p className="max-w-prose text-ink-2">{entry.detail}</p>
      </div>
      <div className={cn(mediaLeft && "md:order-1")}>
        <NowMedia image={entry.image} />
      </div>
    </li>
  );
}

export function Now() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Now — Kim Roland Berame";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <main className="relative" style={{ zIndex: "var(--z-content)" }}>
      <Section id="now" className="flex flex-col gap-16">
        <SheetHeading
          title="Now"
          meta={`Updated ${updatedLabel}`}
          description={nowIntro}
        />

        <div className="flex flex-col">
          {nowGroups.map((group, i) => (
            <Reveal key={group.label} delay={i * 60}>
              <div className="grid gap-6 border-t border-line py-12 first:border-line-2 lg:grid-cols-[12rem_1fr] lg:gap-12">
                <h3 className="label pt-1 text-ink-3">{group.label}</h3>

                <ul className="flex flex-col gap-12">
                  {group.entries.map((entry) => (
                    <Entry key={entry.title} entry={entry} />
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="border-t border-line pt-6">
          <WipeLink
            to="/"
            className="label inline-flex items-center gap-2 text-ink-3 transition-colors hover:text-ink"
          >
            <FiArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
            Back home
          </WipeLink>
        </div>
      </Section>
    </main>
  );
}
