import { test } from 'node:test';
import assert from 'node:assert/strict';
import { skillGroups } from '../data/skills.ts';
import { branchConfigs } from '../data/skillTree.ts';
import { layoutSkillTree } from './skillTreeLayout.ts';
import { skillTreeTimings, MAX_INTRO_MS } from './skillTreeAnim.ts';

const layout = layoutSkillTree(skillGroups, branchConfigs);
const timings = skillTreeTimings(layout);

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
  Math.hypot(a.x - b.x, a.y - b.y);

const branchOf = (category: string) => {
  const t = timings.branches.find((b) => b.category === category);
  assert.ok(t, `timings for ${category}`);
  return t;
};

test('the core leads the sequence', () => {
  assert.equal(timings.core.delay, 0);
  for (const branch of timings.branches) {
    assert.ok(branch.arm.delay > 0, `${branch.category} arm waits for the core`);
  }
});

test('every laid node gets a spoke and a node timing', () => {
  for (const branch of layout.branches) {
    const timed = branchOf(branch.category);
    for (const node of branch.nodes) {
      assert.ok(timed.nodes[node.label], `timing for ${node.label}`);
    }
    assert.equal(Object.keys(timed.nodes).length, branch.nodes.length);
  }
});

test('the hub pops exactly when its arm finishes drawing', () => {
  for (const branch of timings.branches) {
    assert.equal(branch.hub.delay, branch.arm.delay + branch.arm.duration);
  }
});

test('a spoke starts when its hub pops and lands when its node blooms', () => {
  for (const branch of layout.branches) {
    const timed = branchOf(branch.category);
    for (const node of branch.nodes) {
      const { spoke, node: bloom } = timed.nodes[node.label];
      assert.equal(spoke.delay, timed.hub.delay, `${node.label} spoke leaves the hub`);
      const landed = spoke.delay + spoke.duration;
      assert.ok(
        bloom.delay <= landed && landed <= bloom.delay + bloom.duration,
        `${node.label} blooms across its spoke landing (${bloom.delay}..${bloom.delay + bloom.duration} vs ${landed})`,
      );
    }
  }
});

test('the wave travels outward at one speed — arrival scales with distance from the core', () => {
  for (const branch of layout.branches) {
    const timed = branchOf(branch.category);
    const armSpeed = dist(layout.core, branch.hub) / timed.arm.duration;
    for (const node of branch.nodes) {
      const { spoke } = timed.nodes[node.label];
      const reach = dist(layout.core, node) - dist(layout.core, branch.hub);
      const spokeSpeed = reach / spoke.duration;
      assert.ok(
        Math.abs(spokeSpeed - armSpeed) < 1e-9,
        `${node.label} travels at the arm's speed (${spokeSpeed} vs ${armSpeed})`,
      );
    }
  }
});

test('within a branch, nodes arrive in order of distance from the core', () => {
  for (const branch of layout.branches) {
    const timed = branchOf(branch.category);
    const byDistance = [...branch.nodes].sort(
      (a, b) => dist(a, layout.core) - dist(b, layout.core),
    );
    let previous = -Infinity;
    for (const node of byDistance) {
      const delay = timed.nodes[node.label].node.delay;
      assert.ok(delay >= previous, `${node.label} does not precede a nearer node`);
      previous = delay;
    }
  }
});

test('nothing animates before the element it grows out of has started', () => {
  for (const branch of timings.branches) {
    for (const [label, { node }] of Object.entries(branch.nodes)) {
      assert.ok(node.delay >= branch.hub.delay, `${label} blooms after its hub starts`);
    }
  }
});

test('the whole intro stays within the stated ceiling', () => {
  assert.ok(
    timings.total <= MAX_INTRO_MS,
    `intro runs ${timings.total}ms, ceiling is ${MAX_INTRO_MS}ms`,
  );
  assert.ok(timings.total > 0);
});

test('timings are pure — same layout in, same numbers out', () => {
  assert.deepEqual(skillTreeTimings(layout), skillTreeTimings(layout));
});
