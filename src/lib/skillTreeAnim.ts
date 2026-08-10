import type { TreeLayout } from '@/lib/skillTreeLayout';

export type Phase = { delay: number; duration: number };
export type NodeTiming = { spoke: Phase; node: Phase };
export type BranchTimings = {
  category: string;
  arm: Phase;
  hub: Phase;
  nodes: Record<string, NodeTiming>;
};
export type TreeTimings = {
  core: Phase;
  branches: BranchTimings[];
  total: number;
};

const CORE_MS = 280;
/** Head start so the core reads as the source, not just the first thing drawn. */
const LEAD_MS = 150;
/** Arms leave a beat apart, so six simultaneous rays don't read as a starburst. */
const ARM_STAGGER_MS = 30;
/** Wavefront speed, in SVG user units per millisecond. */
const SPEED = 0.85;
const HUB_MS = 240;
const NODE_MS = 300;
/** A node starts blooming just before the spoke reaches it, so the two overlap. */
const NODE_LEAD_MS = 90;

/** Upper bound the intro must stay under, so adding skills can't stretch it. */
export const MAX_INTRO_MS = 1800;

const distance = (a: { x: number; y: number }, b: { x: number; y: number }) =>
  Math.hypot(a.x - b.x, a.y - b.y);

/**
 * Entrance choreography for the skill constellation: a single wavefront leaving
 * the core at a constant speed. Every duration is a distance divided by that
 * speed, so an arm and the spokes continuing past its hub draw as one
 * uninterrupted travelling line rather than a sequence of timed steps.
 *
 * Pure numbers — no React, no DOM — so the timing is testable on its own.
 */
export function skillTreeTimings(layout: TreeLayout): TreeTimings {
  const core: Phase = { delay: 0, duration: CORE_MS };
  let total = CORE_MS;

  const branches = layout.branches.map((branch, index) => {
    const hubReach = distance(layout.core, branch.hub);
    const arm: Phase = {
      delay: LEAD_MS + index * ARM_STAGGER_MS,
      duration: hubReach / SPEED,
    };
    const hubAt = arm.delay + arm.duration;
    const hub: Phase = { delay: hubAt, duration: HUB_MS };

    const nodes: Record<string, NodeTiming> = {};
    for (const node of branch.nodes) {
      const spoke: Phase = {
        delay: hubAt,
        duration: (distance(layout.core, node) - hubReach) / SPEED,
      };
      const arrival = spoke.delay + spoke.duration;
      const bloom: Phase = {
        delay: Math.max(hubAt, arrival - NODE_LEAD_MS),
        duration: NODE_MS,
      };
      nodes[node.label] = { spoke, node: bloom };
      total = Math.max(total, bloom.delay + bloom.duration);
    }

    return { category: branch.category, arm, hub, nodes };
  });

  return { core, branches, total };
}
