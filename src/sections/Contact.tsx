import { FiArrowUpRight, FiDownload } from 'react-icons/fi';
import { ContactPrompt } from '@/components/ContactPrompt';
import { WipeLink } from '@/components/WipeLink';
import { Reveal } from '@/components/Reveal';
import { profile, socials } from '@/data/profile';
import type { IconType } from 'react-icons';

type Channel = { label: string; href: string; value: string; icon: IconType; download?: boolean };

const channels: Channel[] = [
  ...socials.map(({ label, href, handle, icon }) => ({ label, href, value: handle, icon })),
  { label: 'Résumé', href: profile.resumeUrl, value: 'Download PDF', icon: FiDownload, download: true },
];

export function Contact() {
  const year = new Date().getFullYear();

  return (
    <section id="contact" className="scroll-mt-20 px-5 sm:px-8">
      <div className="mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-13 pb-10 pt-16 sm:pt-20">
        <Reveal>
          <ContactPrompt />
        </Reveal>

        <ul className="grid grid-cols-1 border-t border-line-2 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ label, href, value, icon: Icon, download }) => (
            <li key={label}>
              <a
                href={href}
                download={download}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex h-full flex-col gap-1.5 px-3 py-4 transition-colors hover:bg-surface"
              >
                <span className="label flex items-center gap-2 text-ink-3 transition-colors group-hover:text-red">
                  <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                  {label}
                </span>
                <span className="text-[1.0625rem] font-bold tracking-[-0.02em] text-ink-2 transition-colors group-hover:text-ink">
                  {value}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <footer className="mt-auto flex flex-col gap-4 border-t border-line pt-6 text-[0.8125rem] text-ink-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1">
            <span>
              © {year} {profile.name} · {profile.city}
            </span>
            <span>Built with React, TypeScript, Tailwind, and Motion.</span>
            <span aria-hidden="true" className="select-none font-mono text-[0.7rem] opacity-30">
              {/* boot sequence */} ↑↑↓↓←→←→KRB
            </span>
          </div>
          <WipeLink
            to="/now"
            className="group inline-flex items-center gap-1.5 self-start text-ink-2 transition-colors hover:text-ink sm:self-auto"
          >
            What I&apos;m up to now
            <FiArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </WipeLink>
        </footer>
      </div>
    </section>
  );
}
