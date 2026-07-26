import { test } from 'node:test';
import assert from 'node:assert/strict';
import { skillGroups } from '../data/skills.ts';
import { branchConfigs } from '../data/skillTree.ts';
import { layoutSkillTree } from './skillTreeLayout.ts';

test('every skillGroups category has exactly one branch config and vice-versa', () => {
  const catA = skillGroups.map((g) => g.category).sort();
  const catB = branchConfigs.map((b) => b.category).sort();
  assert.deepEqual(catB, catA);
});

test('layout places every skill exactly once', () => {
  const layout = layoutSkillTree(skillGroups, branchConfigs);
  const laidLabels = layout.branches.flatMap((b) => b.nodes.map((n) => n.label)).sort();
  const sourceLabels = skillGroups.flatMap((g) => g.items).sort();
  assert.deepEqual(laidLabels, sourceLabels);
});

test('node count per branch matches the source data', () => {
  const layout = layoutSkillTree(skillGroups, branchConfigs);
  for (const branch of layout.branches) {
    const source = skillGroups.find((g) => g.category === branch.category);
    assert.ok(source, `source group for ${branch.category}`);
    assert.equal(branch.nodes.length, source.items.length);
  }
});

test('no two nodes in a branch share coordinates', () => {
  const layout = layoutSkillTree(skillGroups, branchConfigs);
  for (const branch of layout.branches) {
    const seen = new Set<string>();
    for (const n of branch.nodes) {
      const key = `${n.x.toFixed(3)},${n.y.toFixed(3)}`;
      assert.ok(!seen.has(key), `duplicate coord in ${branch.category}: ${key}`);
      seen.add(key);
    }
  }
});

test('layout throws if a config references a missing category', () => {
  assert.throws(() =>
    layoutSkillTree(skillGroups, [{ category: 'Nope', angleDeg: 0 }]),
  );
});
