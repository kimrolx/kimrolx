import type { SkillGroup } from '@/types';

export const skillGroups: SkillGroup[] = [
  { category: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Dart', 'C#'] },
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'Remix', 'React Native', 'Expo', 'Flutter', 'Tailwind CSS', 'NativeWind'],
  },
  { category: 'Backend', items: ['Node.js', 'NestJS'] },
  { category: 'State', items: ['Zustand'] },
  {
    category: 'Data',
    items: [
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'SQLite',
      'Redis',
      'Firebase',
      'Supabase',
      'Drizzle ORM',
      'Prisma',
      'TypeORM',
    ],
  },
  {
    category: 'DevOps & Cloud',
    items: ['Git', 'GitHub Actions', 'Docker', 'EAS', 'Azure', 'Google Cloud', 'CI/CD', 'Cloudflare', 'Vercel'],
  },
];
