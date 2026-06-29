import { Bento } from "@/components/Bento";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SheetHeading } from "@/components/SheetHeading";

export function About() {
  return (
    <Section id="about" className="flex flex-col gap-16">
      <SheetHeading title="About" />
      <Reveal>
        <Bento />
      </Reveal>
    </Section>
  );
}
