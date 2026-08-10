import type { IconType } from 'react-icons';
import {
  SiTypescript,
  SiJavascript,
  SiDart,
  SiOpenjdk,
  SiReact,
  SiNextdotjs,
  SiRemix,
  SiExpo,
  SiFlutter,
  SiTailwindcss,
  SiNodedotjs,
  SiNestjs,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiSqlite,
  SiRedis,
  SiFirebase,
  SiSupabase,
  SiDrizzle,
  SiPrisma,
  SiTypeorm,
  SiRedux,
  SiReactquery,
  SiGit,
  SiGithubactions,
  SiDocker,
  SiCloudflare,
  SiVercel,
} from 'react-icons/si';
import { TbBrandAzure, TbInfinity, TbHexagon } from 'react-icons/tb';

/**
 * Brand icon per skill, keyed by the exact label in `skillGroups`. Icons are
 * rendered in the branch colour (currentColor) — presentation only, no skill
 * facts. Simple Icons (`react-icons/si`) cover the brands; the four without an
 * official mark fall back to Tabler icons: Azure's brand mark, the CI/CD
 * infinity loop, and a neutral hexagon for NativeWind / Zustand.
 */
export const skillIcons: Record<string, IconType> = {
  // Languages
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Dart: SiDart,
  Java: SiOpenjdk,
  // Frontend
  React: SiReact,
  'Next.js': SiNextdotjs,
  Remix: SiRemix,
  'React Native': SiReact,
  Expo: SiExpo,
  Flutter: SiFlutter,
  'Tailwind CSS': SiTailwindcss,
  NativeWind: TbHexagon,
  // Backend
  'Node.js': SiNodedotjs,
  NestJS: SiNestjs,
  Firebase: SiFirebase,
  Supabase: SiSupabase,
  // State
  Zustand: TbHexagon,
  'Redux Toolkit': SiRedux,
  'TanStack Query': SiReactquery,
  'React Context': SiReact,
  // Data
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  SQLite: SiSqlite,
  Redis: SiRedis,
  'Drizzle ORM': SiDrizzle,
  Prisma: SiPrisma,
  TypeORM: SiTypeorm,
  // DevOps & Cloud
  Git: SiGit,
  'GitHub Actions': SiGithubactions,
  Docker: SiDocker,
  EAS: SiExpo,
  Azure: TbBrandAzure,
  'CI/CD': TbInfinity,
  Cloudflare: SiCloudflare,
  Vercel: SiVercel,
};

/** Fallback for any label that has no mapped icon. */
export const FallbackIcon: IconType = TbHexagon;
