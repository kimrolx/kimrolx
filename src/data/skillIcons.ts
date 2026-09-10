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
 * Brand mark per skill, keyed by the exact label in `skillGroups` —
 * presentation only, no skill facts. The colour is the brand's own, the single
 * splash of colour on an otherwise achromatic Swiss page; black/near-black
 * brands (Next.js, Vercel, Remix, Expo…) and those without a standard mark
 * fall back to white ink so they stay legible on near-black. Simple Icons
 * cover the brands; the rest fall back to Tabler icons: Azure's brand mark,
 * the CI/CD infinity loop, and a neutral hexagon for NativeWind / Zustand.
 */
const SKILL_MARKS: Record<string, { icon: IconType; color?: string }> = {
  // Languages
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  JavaScript: { icon: SiJavascript, color: '#F7DF1E' },
  Dart: { icon: SiDart, color: '#0175C2' },
  Java: { icon: SiOpenjdk, color: '#ED8B00' },
  // Frontend
  React: { icon: SiReact, color: '#61DAFB' },
  'Next.js': { icon: SiNextdotjs },
  Remix: { icon: SiRemix },
  'React Native': { icon: SiReact, color: '#61DAFB' },
  Expo: { icon: SiExpo },
  Flutter: { icon: SiFlutter, color: '#54C5F8' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#38BDF8' },
  NativeWind: { icon: TbHexagon },
  // Backend
  'Node.js': { icon: SiNodedotjs, color: '#5FA04E' },
  NestJS: { icon: SiNestjs, color: '#E0234E' },
  Firebase: { icon: SiFirebase, color: '#FFCA28' },
  Supabase: { icon: SiSupabase, color: '#3ECF8E' },
  // State
  Zustand: { icon: TbHexagon },
  'Redux Toolkit': { icon: SiRedux, color: '#764ABC' },
  'TanStack Query': { icon: SiReactquery, color: '#FF4154' },
  'React Context': { icon: SiReact, color: '#61DAFB' },
  // Data
  PostgreSQL: { icon: SiPostgresql, color: '#4E8CC7' },
  MySQL: { icon: SiMysql, color: '#5B9BD5' },
  MongoDB: { icon: SiMongodb, color: '#4DB33D' },
  SQLite: { icon: SiSqlite, color: '#4F9BD6' },
  Redis: { icon: SiRedis, color: '#FF4438' },
  'Drizzle ORM': { icon: SiDrizzle, color: '#C5F74F' },
  Prisma: { icon: SiPrisma },
  TypeORM: { icon: SiTypeorm },
  // DevOps & Cloud
  Git: { icon: SiGit, color: '#F05032' },
  'GitHub Actions': { icon: SiGithubactions, color: '#2088FF' },
  Docker: { icon: SiDocker, color: '#2496ED' },
  EAS: { icon: SiExpo },
  Azure: { icon: TbBrandAzure, color: '#3CA5F0' },
  'CI/CD': { icon: TbInfinity },
  Cloudflare: { icon: SiCloudflare, color: '#F38020' },
  Vercel: { icon: SiVercel },
};

/** Icon + brand colour for a skill; unmapped labels get a neutral hexagon in white ink. */
export function skillMark(label: string): { Icon: IconType; color: string } {
  const mark = SKILL_MARKS[label];
  return { Icon: mark?.icon ?? TbHexagon, color: mark?.color ?? 'var(--color-ink)' };
}
