import { FiArrowDown, FiDownload } from "react-icons/fi";
import { profile } from "@/data/profile";
import { ButtonLink } from "@/components/Button";
import { SocialLinks } from "@/components/SocialLinks";
import { TypewriterGreeting } from "@/components/TypewriterGreeting";

export function Hero() {
  return (
    <section
      id="home"
      className="mx-auto flex min-h-svh max-w-3xl flex-col items-center justify-center gap-8 px-5 py-24 text-center sm:px-8"
    >
      <TypewriterGreeting />

      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold sm:text-6xl">
          I&apos;m {profile.name}
        </h1>
        <p className="flex flex-wrap items-center justify-center gap-x-2 text-xl font-semibold sm:text-2xl">
          <span className="text-amber">{profile.role}</span>
          <span className="text-ink-dim">from the</span>
          <span className="bg-gradient-to-r from-[#3b6fe0] to-[#e23b52] bg-clip-text text-transparent">
            {profile.location}
          </span>
        </p>
      </div>

      <p className="max-w-xl text-balance text-ink-dim sm:text-lg">{profile.intro}</p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <ButtonLink href="#projects">View my work</ButtonLink>
        <ButtonLink href={profile.resumeUrl} variant="ghost" download>
          <FiDownload aria-hidden="true" className="h-4 w-4" />
          Download CV
        </ButtonLink>
        <ButtonLink href="#contact" variant="ghost">
          Get in touch
        </ButtonLink>
      </div>

      <SocialLinks />

      <a
        href="#experience"
        aria-label="Scroll to experience"
        className="mt-6 text-ink-faint transition-colors hover:text-ink"
      >
        <FiArrowDown
          aria-hidden="true"
          className="h-5 w-5 [animation:nudge_1.8s_ease-in-out_infinite]"
        />
      </a>
    </section>
  );
}
