import { useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { WipeLink } from "@/components/WipeLink";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SheetHeading } from "@/components/SheetHeading";
import { GearScene } from "@/components/GearScene";
import { GearMat } from "@/components/GearMat";
import { GearGrid } from "@/components/GearGrid";
import { gearIntro, gearUpdated } from "@/data/gearItems";

const updatedLabel = new Date(gearUpdated).toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
});

export function Gear() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Gear — Kim Roland Berame";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <main className="relative" style={{ zIndex: "var(--z-content)" }}>
      <Section id="gear" className="flex flex-col gap-16">
        <SheetHeading title="Gear" meta={`Updated ${updatedLabel}`} description={gearIntro} />

        {/* Interactive desk: isometric + hover on pointer devices, flat + tap on touch. */}
        <Reveal>
          <div className="hidden lg:block">
            <GearScene />
          </div>
          <div className="lg:hidden">
            <GearMat />
          </div>
        </Reveal>

        {/* The full, categorized kit — canonical list and accessible fallback. */}
        <GearGrid />

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
