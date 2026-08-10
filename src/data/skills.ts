import type { SkillGroup } from '@/types';

export const skillGroups: SkillGroup[] = [
  { category: 'Languages', items: ['TypeScript', 'JavaScript', 'Dart', 'Java'] },
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'Remix', 'React Native', 'Expo', 'Flutter', 'Tailwind CSS', 'NativeWind'],
  },
  { category: 'Backend', items: ['Node.js', 'NestJS', 'Firebase', 'Supabase'] },
  { category: 'State', items: ['Zustand', 'Redux Toolkit', 'TanStack Query', 'React Context'] },
  {
    category: 'Data',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Redis', 'Drizzle ORM', 'Prisma', 'TypeORM'],
  },
  {
    category: 'DevOps & Cloud',
    items: ['Git', 'GitHub Actions', 'Docker', 'EAS', 'Azure', 'CI/CD', 'Cloudflare', 'Vercel'],
  },
];
