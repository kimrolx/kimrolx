import type { BranchConfig } from '@/data/skillTree';

export type Point = { x: number; y: number };
export type LaidNode = { label: string; x: number; y: number };
export type LaidBranch = {
  category: string;
  hub: Point;
  nodes: LaidNode[];
};
export type TreeLayout = { core: Point; size: number; branches: LaidBranch[] };

type Group = { category: string; items: string[] };
type Opts = { size?: number; rHub?: number; rNode?: number; spreadDeg?: number; tierGap?: number };

const DEG = Math.PI / 180;

/**
 * Pure radial layout. Places a central core, a hub per branch along its arm,
 * and each skill node on a concentric "tier ring" beyond the hub. Deterministic
 * (positions are a pure function of index) so prerender + tests are stable.
 * Screen y grows downward, so sin is negated: a positive angle points up.
 *
 * Dense arms use TIERED RINGS: consecutive nodes alternate outward across
 * several concentric radii, so a 10-node arm never stacks its labels at one
 * distance — they separate by radius as well as by fan angle. The fan stays
 * below the 60° gap between arms so neighbours never collide.
 */
export function layoutSkillTree(
  groups: Group[],
  configs: BranchConfig[],
  opts: Opts = {},
): TreeLayout {
  const size = opts.size ?? 1000;
  const c = size / 2;
  const rHub = opts.rHub ?? size * 0.16;
  const rNode = opts.rNode ?? size * 0.26;
  const spreadDeg = opts.spreadDeg ?? 51;
  const tierGap = opts.tierGap ?? 0.36;
  const core: Point = { x: c, y: c };

  const branches: LaidBranch[] = configs.map((cfg) => {
    const group = groups.find((g) => g.category === cfg.category);
    if (!group) throw new Error(`No skillGroups entry for branch "${cfg.category}"`);

    // Each arm can run a different length (hub + node radii scale together) so
    // the constellation doesn't read as a uniform wheel.
    const len = cfg.lenScale ?? 1;
    const a = cfg.angleDeg * DEG;
    const armHub = rHub * len;
    const hub: Point = { x: c + Math.cos(a) * armHub, y: c - Math.sin(a) * armHub };

    const n = group.items.length;
    // More nodes -> more concentric rings (2..5), so each ring holds few nodes.
    const tiers = Math.max(1, Math.min(2 + Math.floor(n / 3), 5));
    // Denser arms fan a little wider, capped below the 60° gap between arms.
    const spread = Math.min(spreadDeg + (n - 1) * 3, 54);

    const nodes: LaidNode[] = group.items.map((label, i) => {
      // Fan EVERY node across the arc by its global index, so no two nodes sit
      // on the same ray (that would stack their labels along a diagonal). The
      // radius steps through the tiers so consecutive nodes also separate by
      // depth — together a zig-zag that keeps large labels apart both ways.
      const frac = n === 1 ? 0 : i / (n - 1) - 0.5;
      const na = (cfg.angleDeg + frac * spread) * DEG;
      const r = rNode * len * (1 + (i % tiers) * tierGap);
      return { label, x: c + Math.cos(na) * r, y: c - Math.sin(na) * r };
    });

    return { category: cfg.category, hub, nodes };
  });

  return { core, size, branches };
}
