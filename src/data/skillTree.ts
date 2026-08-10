// Presentation config for the skill constellation. One entry per skillGroups
// category — arm direction + length only (no colour: the Swiss map is
// achromatic; the sole colour is each tech's own brand-coloured icon).
export type BranchConfig = {
  /** Must match a skillGroups[].category exactly. */
  category: string;
  /** Arm direction in degrees. 0 = right (+x); positive points visually up. */
  angleDeg: number;
  /**
   * Arm-length multiplier (hub distance + node radii scale by this). Lets each
   * main branch run a different length so the map doesn't look like a wheel.
   * Denser arms run longer for breathing room; sparse ones stay short.
   * Optional; defaults to 1 (base length) when omitted.
   */
  lenScale?: number;
};

export const branchConfigs: BranchConfig[] = [
  { category: 'Frontend', angleDeg: 90, lenScale: 1.05 },
  { category: 'Languages', angleDeg: 150, lenScale: 1.04 },
  { category: 'DevOps & Cloud', angleDeg: 210, lenScale: 1.22 },
  { category: 'Data', angleDeg: 270, lenScale: 1.28 },
  { category: 'State', angleDeg: 330, lenScale: 1.0 },
  { category: 'Backend', angleDeg: 18, lenScale: 1.0 },
];
