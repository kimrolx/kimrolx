import { FiDownload } from "react-icons/fi";
import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SocialLinks } from "@/components/SocialLinks";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <Section id="contact" className="flex flex-col gap-12">
      <Reveal className="flex flex-col items-start gap-6">
        <h2 className="text-3xl font-bold sm:text-5xl">
          Let&apos;s build something.
        </h2>
        <p className="max-w-prose text-ink-dim sm:text-lg">
          Got an idea that needs building? Whether you&apos;re a private client with a project in
          mind, a team looking for an engineer, or someone with a side build to get off the ground,
          I&apos;d love to hear about it. Email is the fastest way to reach me; my code lives on
          GitHub.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="mailto:beramekimrol@gmail.com">Email me</ButtonLink>
          <ButtonLink href={profile.resumeUrl} variant="ghost" download>
            <FiDownload aria-hidden="true" className="h-4 w-4" />
            Download CV
          </ButtonLink>
        </div>
      </Reveal>

      <SocialLinks variant="list" />

      <footer className="flex flex-col gap-1 border-t border-border pt-6 font-mono text-xs text-ink-faint">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Built with React, TypeScript, and Tailwind CSS.</span>
      </footer>
    </Section>
  );
}
