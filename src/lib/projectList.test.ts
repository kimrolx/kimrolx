import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { Project, ProjectCategory } from '../types/index.ts';
import {
  CATEGORIES,
  categorySlug,
  countByCategory,
  deckDepth,
  filterProjects,
  findProject,
  initials,
  parseCategory,
  pickFeatured,
  stepFront,
  swipeStep,
} from './projectList.ts';

const mk = (id: string, category: ProjectCategory, techStack: string[], title = id): Project => ({
  id,
  title,
  kind: 'k',
  category,
  year: 2024,
  description: 'd',
  techStack,
  links: [],
});

test('parseCategory maps slugs and rejects junk', () => {
  assert.equal(parseCategory('production'), 'Production');
  assert.equal(parseCategory('experiment'), 'Experiment');
  assert.equal(parseCategory('foo'), null);
  assert.equal(parseCategory(''), null);
  assert.equal(parseCategory(null), null);
});

test('categorySlug round-trips through parseCategory', () => {
  for (const c of CATEGORIES) assert.equal(parseCategory(categorySlug(c)), c);
});

test('filterProjects matches stack case-insensitively and trimmed, ANDed with category', () => {
  const list = [
    mk('a', 'Experiment', ['Flutter', 'Dart']),
    mk('b', 'University', ['Flutter']),
    mk('c', 'Experiment', ['React']),
  ];
  assert.deepEqual(filterProjects(list, { category: null, stack: ' flutter ' }).map((p) => p.id), ['a', 'b']);
  assert.deepEqual(filterProjects(list, { category: 'Experiment', stack: 'FLUTTER' }).map((p) => p.id), ['a']);
  assert.deepEqual(filterProjects(list, { category: 'Production', stack: 'Flutter' }), []);
  assert.equal(filterProjects(list, { category: null, stack: '' }).length, 3);
  assert.equal(filterProjects(list, { category: null, stack: null }).length, 3);
});

test('countByCategory counts each category and All, zeros included', () => {
  const list = [mk('a', 'Experiment', []), mk('b', 'Experiment', []), mk('c', 'Production', [])];
  assert.deepEqual(countByCategory(list), { All: 3, Production: 1, University: 0, Experiment: 2 });
  assert.deepEqual(countByCategory([]), { All: 0, Production: 0, University: 0, Experiment: 0 });
});

test('pickFeatured keeps id order and throws on an unknown id', () => {
  const list = [mk('trimly', 'Production', []), mk('machina', 'Production', []), mk('pars', 'Production', [])];
  assert.deepEqual(pickFeatured(list, ['machina', 'pars', 'trimly']).map((p) => p.id), ['machina', 'pars', 'trimly']);
  assert.throws(() => pickFeatured(list, ['nope']), /Unknown featured project: nope/);
});

test('findProject returns undefined for a null or unknown id', () => {
  const list = [mk('machina', 'Production', [])];
  assert.equal(findProject(list, 'machina')?.id, 'machina');
  assert.equal(findProject(list, 'ghost'), undefined);
  assert.equal(findProject(list, null), undefined);
});

test('deckDepth rotates so the front card is depth 0', () => {
  assert.deepEqual([0, 1, 2].map((i) => deckDepth(i, 0, 3)), [0, 1, 2]);
  assert.deepEqual([0, 1, 2].map((i) => deckDepth(i, 1, 3)), [2, 0, 1]);
  assert.deepEqual([0, 1].map((i) => deckDepth(i, 1, 2)), [1, 0]);
});

test('stepFront wraps both ways', () => {
  assert.equal(stepFront(2, 1, 3), 0);
  assert.equal(stepFront(0, -1, 3), 2);
  assert.equal(stepFront(1, 0, 3), 1);
});

test('swipeStep ignores moves of 40px or less', () => {
  assert.equal(swipeStep(-41), 1);
  assert.equal(swipeStep(41), -1);
  assert.equal(swipeStep(-40), 0);
  assert.equal(swipeStep(30), 0);
});

test('initials takes word initials, or two letters of a single word', () => {
  assert.equal(initials('Stats & Estates'), 'SE');
  assert.equal(initials('Haven'), 'HA');
  assert.equal(initials('PokeInfo'), 'PO');
});
