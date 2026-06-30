import { FiArrowDown, FiArrowRight, FiDownload } from 'react-icons/fi';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { profile } from '@/data/profile';
import { ButtonLink } from '@/components/Button';
import { HeroName } from '@/components/HeroName';
import { SocialLinks } from '@/components/SocialLinks';
import { RoleLine, TypewriterGreeting } from '@/components/TypewriterGreeting';

const SPECS: { label: string; value: string; status?: boolean }[] = [
  { label: 'Discipline', value: 'Full-stack engineering' },
  { label: 'Stack', value: 'TypeScript · NestJS · PostgreSQL · React' },
  { label: 'Delivery', value: 'Docker · Azure · CI/CD · GitHub · Cloudflare' },
  { label: 'Currently', value: 'Building at Griffin31' },
  { label: 'Based in', value: profile.city },
  { label: 'Status', value: 'Available for work', status: true },
];

export function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
  };
  const item: Variants = reduce
    ? {}
    : {
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
      };

  return (
    <section id="home" className="relative px-5 sm:px-8">
      <div className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center py-28">
        <div className="grid items-end gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          {/* Identity */}
          <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-start">
            <motion.div variants={item}>
              <TypewriterGreeting />
            </motion.div>

            <motion.div variants={item} className="mt-6">
              <HeroName />
            </motion.div>

            <motion.div variants={item} className="mt-7 flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-10 bg-red" />
              <p className="text-lg font-semibold tracking-tight text-ink sm:text-xl">{profile.role}</p>
            </motion.div>

            <motion.div variants={item} className="mt-3 text-base sm:text-lg">
              <RoleLine />
            </motion.div>

            <motion.p variants={item} className="mt-6 max-w-prose text-ink-2 sm:text-lg">
              {profile.intro}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="#projects">
                View work
                <FiArrowRight aria-hidden="true" className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href={profile.resumeUrl} variant="ghost" download>
                <FiDownload aria-hidden="true" className="h-4 w-4" />
                Download CV
              </ButtonLink>
              <ButtonLink href="#contact" variant="ghost">
                Get in touch
              </ButtonLink>
            </motion.div>

            <motion.div variants={item} className="mt-8">
              <SocialLinks />
            </motion.div>
          </motion.div>

          {/* Spec list — Swiss ruled, no card */}
          <motion.dl
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-full flex-col"
          >
            {SPECS.map((spec) => (
              <div
                key={spec.label}
                className="grid grid-cols-[6rem_1fr] items-baseline gap-4 border-t border-line py-3.5 first:border-line-2"
              >
                <dt className="label text-ink-3">{spec.label}</dt>
                <dd className="flex items-center gap-2 text-sm text-ink">
                  {spec.status && <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-red" />}
                  <span>{spec.value}</span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <a
          href="#experience"
          aria-label="Scroll to experience"
          className="label mt-16 inline-flex items-center gap-2 self-start text-ink-3 transition-colors hover:text-ink"
        >
          Scroll
          <FiArrowDown aria-hidden="true" className="h-3.5 w-3.5 [animation:nudge_1.8s_ease-in-out_infinite]" />
        </a>
      </div>
    </section>
  );
}
