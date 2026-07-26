/**
 * Authentic brand colour per skill — the single splash of colour on an
 * otherwise achromatic Swiss page. Keyed by the exact `skillGroups` label.
 * Brands that are black/near-black (Next.js, Vercel, Remix, Expo…) or have no
 * standard mark fall back to white ink so they stay legible on near-black.
 */
export const skillIconColors: Record<string, string> = {
  // Languages
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Dart: '#0175C2',
  Java: '#ED8B00',
  // Frontend
  React: '#61DAFB',
  'React Native': '#61DAFB',
  Flutter: '#54C5F8',
  'Tailwind CSS': '#38BDF8',
  // Backend
  'Node.js': '#5FA04E',
  NestJS: '#E0234E',
  Firebase: '#FFCA28',
  Supabase: '#3ECF8E',
  // State
  'Redux Toolkit': '#764ABC',
  'TanStack Query': '#FF4154',
  'React Context': '#61DAFB',
  // Data
  PostgreSQL: '#4E8CC7',
  MySQL: '#5B9BD5',
  MongoDB: '#4DB33D',
  SQLite: '#4F9BD6',
  Redis: '#FF4438',
  'Drizzle ORM': '#C5F74F',
  // DevOps & Cloud
  Git: '#F05032',
  'GitHub Actions': '#2088FF',
  Docker: '#2496ED',
  Azure: '#3CA5F0',
  Cloudflare: '#F38020',
};

/** Brand colour for a skill, or white ink when there's no legible brand mark. */
export function iconColor(label: string): string {
  return skillIconColors[label] ?? 'var(--color-ink)';
}
