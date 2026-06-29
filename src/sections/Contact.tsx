import { FiArrowRight, FiArrowUpRight, FiDownload } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SocialLinks } from "@/components/SocialLinks";
import { profile } from "@/data/profile";

export function Contact() {
  const year = new Date().getFullYear();

  return (
    <Section id="contact" className="flex flex-col gap-16">
      <Reveal className="flex flex-col gap-10">
        <div className="flex items-center gap-3 border-t border-line-2 pt-3">
          <span aria-hidden="true" className="h-2 w-2 bg-red" />
          <span className="label text-ink-3">Contact</span>
        </div>

        <div className="flex flex-col gap-8">
          <h2 className="max-w-[14ch] text-[clamp(2.75rem,9vw,6rem)] font-black leading-[0.92] tracking-[-0.04em]">
            Let&apos;s build something.
          </h2>
          <p className="max-w-prose text-ink-2 sm:text-lg">
            Whether you&apos;re a private client with a project in mind, a team looking for an
            engineer, or someone with a side build to get off the ground, I&apos;d like to hear
            about it. Email reaches me fastest; my code lives on GitHub.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="mailto:beramekimrol@gmail.com">
              Email me
              <FiArrowRight aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href={profile.resumeUrl} variant="ghost" download>
              <FiDownload aria-hidden="true" className="h-4 w-4" />
              Download CV
            </ButtonLink>
          </div>
        </div>

        <div className="grid gap-8 sm:max-w-2xl">
          <SocialLinks variant="list" />
        </div>
      </Reveal>

      <footer className="flex flex-col gap-4 border-t border-line pt-6 text-sm text-ink-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <span>
            © {year} {profile.name} · {profile.city}
          </span>
          <span>Built with React, TypeScript, Tailwind, and Motion.</span>
        </div>
        <Link
          to="/now"
          className="group inline-flex items-center gap-1.5 self-start text-ink-2 transition-colors hover:text-ink sm:self-auto"
        >
          What I&apos;m up to now
          <FiArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </footer>
    </Section>
  );
}
