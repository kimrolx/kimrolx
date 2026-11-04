import type { Project, ProjectCategory } from '@/types';

export const CATEGORIES: readonly ProjectCategory[] = ['Production', 'University', 'Experiment'];

export const categorySlug = (category: ProjectCategory): string => category.toLowerCase();

export const parseCategory = (slug: string | null): ProjectCategory | null =>
  CATEGORIES.find((c) => categorySlug(c) === slug) ?? null;

export function filterProjects(
  list: Project[],
  { category, stack }: { category: ProjectCategory | null; stack: string | null },
): Project[] {
  const tech = stack?.trim().toLowerCase();
  return list.filter(
    (p) =>
      (!category || p.category === category) &&
      (!tech || p.techStack.some((t) => t.toLowerCase() === tech)),
  );
}

export function countByCategory(list: Project[]): Record<ProjectCategory | 'All', number> {
  const counts = { All: list.length, Production: 0, University: 0, Experiment: 0 };
  for (const p of list) counts[p.category]++;
  return counts;
}

export function pickFeatured(list: Project[], ids: readonly string[]): Project[] {
  return ids.map((id) => {
    const project = findProject(list, id);
    if (!project) throw new Error(`Unknown featured project: ${id}`);
    return project;
  });
}

export const findProject = (list: Project[], id: string | null): Project | undefined =>
  list.find((p) => p.id === id);

export const deckDepth = (index: number, front: number, n: number): number => (index - front + n) % n;

export const stepFront = (front: number, delta: number, n: number): number => (front + delta + n) % n;

const SWIPE_THRESHOLD = 40;

export const swipeStep = (dx: number): -1 | 0 | 1 =>
  dx < -SWIPE_THRESHOLD ? 1 : dx > SWIPE_THRESHOLD ? -1 : 0;

export function initials(title: string): string {
  const words = title.split(/\s+/).filter((w) => /^\p{L}/u.test(w));
  const letters = words.length > 1 ? words.map((w) => w[0]).join('') : (words[0] ?? '').slice(0, 2);
  return letters.slice(0, 2).toUpperCase();
}

export const pad2 = (n: number): string => String(n).padStart(2, '0');
