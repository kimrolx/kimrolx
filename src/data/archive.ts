export type ArchiveEntry = {
  name: string;
  tagline: string;
  tech: string;
  href: string;
};

/**
 * Smaller builds and experiments — shown as a compact list under the main
 * projects. Honest one-liners; links go straight to source.
 */
export const archive: ArchiveEntry[] = [
  {
    name: 'Haven',
    tagline: 'Real-time anonymous chat rooms.',
    tech: 'Next.js · TypeScript',
    href: 'https://github.com/kimrolx/Haven',
  },
  {
    name: 'Stats & Estates',
    tagline: 'Real estate browsing app with property listings and detail views.',
    tech: 'Flutter · Dart',
    href: 'https://github.com/kimrolx/Stats-and-Estates',
  },
  {
    name: 'SoundSense',
    tagline: 'Android app that captures ambient noise and reads its decibel level.',
    tech: 'Flutter · Dart',
    href: 'https://github.com/kimrolx/SoundSense',
  },
  {
    name: 'PokeInfo',
    tagline: 'Pokémon lookup built on the PokéAPI.',
    tech: 'React · TypeScript',
    href: 'https://github.com/kimrolx/PokeInfo',
  },
];
