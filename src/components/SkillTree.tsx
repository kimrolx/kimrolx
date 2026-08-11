import { useMemo, useState, type MouseEvent } from 'react';
import { motion, type Variants } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { skillGroups } from '@/data/skills';
import { branchConfigs } from '@/data/skillTree';
import { skillIcons, FallbackIcon } from '@/data/skillIcons';
import { iconColor } from '@/data/skillIconColors';
import { layoutSkillTree } from '@/lib/skillTreeLayout';
import { skillTreeTimings, type Phase } from '@/lib/skillTreeAnim';
import { useWipeNavigate } from '@/hooks/useWipeNavigate';
import { WipeLink } from '@/components/WipeLink';
import { cn } from '@/lib/utils';

const ICON_SIZE = 30; // tech-icon box (SVG user units)
const HUB_R = 9; // hairline category-hub ring
const CORE = 24; // side of the red core square (the page's one red mark)
const NODE_FONT = 18;
const CAT_FONT = 16; // category caption

// Room for labels beyond the plotted nodes (labels reach out horizontally).
const PAD_X = 190;
const PAD_V = 112;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const MOBILE_ROW_MS = 60;
const MOBILE_CHIP_MS = 25;

// A drawing line carries the wavefront, so it must not ease — an eased arm and
// an eased spoke would visibly stall where they meet.
const travel = (p: Phase) => ({ delay: p.delay / 1000, duration: p.duration / 1000, ease: 'linear' as const });
const settle = (p: Phase) => ({ delay: p.delay / 1000, duration: p.duration / 1000, ease: EASE });

type DrawPhase = Phase & { len: number };

const drawIn: Variants = {
  hidden: (p: DrawPhase) => ({ strokeDashoffset: p.len }),
  show: (p: DrawPhase) => ({ strokeDashoffset: 0, transition: travel(p) }),
};

const popIn: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: (p: Phase) => ({ scale: 1, opacity: 1, transition: settle(p) }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (p: Phase) => ({ opacity: 1, transition: settle(p) }),
};

const nodeIn: Variants = {
  hidden: { opacity: 0, scale: 0.86 },
  show: (p: Phase) => ({ opacity: 1, scale: 1, transition: settle(p) }),
};

const riseIn: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: (p: Phase) => ({ opacity: 1, y: 0, transition: settle(p) }),
};

// Scale about the element's own box, not the SVG viewport (which the viewBox
// offsets by PAD_X/PAD_V).
const SELF_ORIGIN = { transformBox: 'fill-box', transformOrigin: 'center' } as const;

const hypot = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);

/** Jump to the Projects section, filtered to a given tech. */
function projectsHref(label: string): string {
  return `/?stack=${encodeURIComponent(label)}#projects`;
}

export function SkillTree() {
  const layout = useMemo(() => layoutSkillTree(skillGroups, branchConfigs), []);
  const timings = useMemo(() => skillTreeTimings(layout), [layout]);
  const wipeNavigate = useWipeNavigate();
  const reduced = usePrefersReducedMotion();

  const [hoveredBranch, setHoveredBranch] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isolated, setIsolated] = useState<string | null>(null);

  const anim = (variants: Variants, custom: object) =>
    reduced ? {} : { variants, custom, initial: 'hidden' as const, animate: 'show' as const };

  // label -> category, to resolve which arm a hovered node belongs to.
  const nodeCat = useMemo(() => {
    const m: Record<string, string> = {};
    for (const b of layout.branches) for (const n of b.nodes) m[n.label] = b.category;
    return m;
  }, [layout]);

  const activeCat = isolated ?? hoveredBranch ?? (hoveredNode ? (nodeCat[hoveredNode] ?? null) : null);

  // Fit the viewBox to the actual plotted extent (+ label padding).
  const pts = [layout.core, ...layout.branches.flatMap((b) => [b.hub, ...b.nodes])];
  const minX = Math.min(...pts.map((p) => p.x));
  const maxX = Math.max(...pts.map((p) => p.x));
  const minY = Math.min(...pts.map((p) => p.y));
  const maxY = Math.max(...pts.map((p) => p.y));
  const vb = `${minX - PAD_X} ${minY - PAD_V} ${maxX - minX + PAD_X * 2} ${maxY - minY + PAD_V * 2}`;

  return (
    <div>
      <div className="hidden lg:block">
        <svg
          viewBox={vb}
          aria-hidden="true"
          className="mx-auto block h-auto w-full max-w-5xl"
          // Click on empty map area exits an isolated branch (back to default).
          onClick={() => setIsolated(null)}
        >
          {layout.branches.map((branch, bi) => {
            const num = String(bi + 1).padStart(2, '0');
            const on = activeCat === branch.category;
            const opacity = isolated ? (on ? 1 : 0.1) : activeCat && !on ? 0.4 : 1;
            const armColor = on ? 'var(--color-red)' : 'var(--color-ink-2)';
            // A node in this branch is hovered -> trace only its spoke.
            const nodeHere = hoveredNode != null && nodeCat[hoveredNode] === branch.category;

            const time = timings.branches[bi];

            const toggleIsolate = (e: MouseEvent) => {
              e.stopPropagation(); // don't let the svg's outside-click reset fire
              setIsolated((prev) => (prev === branch.category ? null : branch.category));
            };

            return (
              <g
                key={branch.category}
                style={{ color: armColor, opacity }}
                className="transition-[opacity,color] duration-200"
                onMouseEnter={() => setHoveredBranch(branch.category)}
                onMouseLeave={() => setHoveredBranch(null)}
              >
                {/* Core → hub link */}
                <motion.line
                  x1={layout.core.x}
                  y1={layout.core.y}
                  x2={branch.hub.x}
                  y2={branch.hub.y}
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="transition-[stroke-opacity] duration-150"
                  style={{ strokeOpacity: on ? 0.9 : 0.4 }}
                  {...(reduced
                    ? {}
                    : {
                        strokeDasharray: hypot(layout.core, branch.hub),
                        ...anim(drawIn, { ...time.arm, len: hypot(layout.core, branch.hub) }),
                      })}
                />
                {/* Hub → node links */}
                {branch.nodes.map((node) => {
                  const isHov = node.label === hoveredNode;
                  const so = nodeHere ? (isHov ? 0.95 : 0.1) : on ? 0.5 : 0.22;
                  const len = hypot(branch.hub, node);
                  return (
                    <motion.line
                      key={`l-${node.label}`}
                      x1={branch.hub.x}
                      y1={branch.hub.y}
                      x2={node.x}
                      y2={node.y}
                      stroke="currentColor"
                      strokeWidth={1}
                      className="transition-[stroke-opacity] duration-150"
                      style={{ strokeOpacity: so }}
                      {...(reduced
                        ? {}
                        : {
                            strokeDasharray: len,
                            ...anim(drawIn, { ...time.nodes[node.label].spoke, len }),
                          })}
                    />
                  );
                })}
                {/* Hub — a hairline ring; click to isolate this branch */}
                <motion.circle
                  cx={branch.hub.x}
                  cy={branch.hub.y}
                  r={HUB_R}
                  fill="var(--color-bg)"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="cursor-pointer transition-[stroke-opacity] duration-150"
                  style={{ strokeOpacity: on ? 1 : 0.75, ...SELF_ORIGIN }}
                  onClick={toggleIsolate}
                  {...anim(popIn, time.hub)}
                />
                {/* Skill nodes: brand-coloured icon + white ink label */}
                {branch.nodes.map((node) => {
                  const rightHalf = node.x >= layout.core.x;
                  const Icon = skillIcons[node.label] ?? FallbackIcon;
                  const isHov = node.label === hoveredNode;
                  const nodeOpacity = nodeHere && !isHov ? 0.45 : 1;
                  const phase = time.nodes[node.label].node;
                  return (
                    <g
                      key={node.label}
                      className="cursor-pointer transition-opacity duration-150"
                      style={{ opacity: nodeOpacity }}
                      onMouseEnter={() => setHoveredNode(node.label)}
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        wipeNavigate(projectsHref(node.label));
                      }}
                    >
                      <motion.g style={SELF_ORIGIN} {...anim(nodeIn, phase)}>
                        {/* bg backing disc so the hairlines don't cut through the icon */}
                        <circle cx={node.x} cy={node.y} r={ICON_SIZE / 2 + 4} fill="var(--color-bg)" />
                        {/* icon lifts a touch on hover */}
                        <g
                          className="transition-transform duration-150"
                          style={{ transform: isHov ? 'translateY(-2px)' : undefined }}
                        >
                          <Icon
                            x={node.x - ICON_SIZE / 2}
                            y={node.y - ICON_SIZE / 2}
                            width={ICON_SIZE}
                            height={ICON_SIZE}
                            style={{ color: iconColor(node.label) }}
                          />
                        </g>
                      </motion.g>
                      <motion.text
                        x={node.x + (rightHalf ? ICON_SIZE / 2 + 8 : -(ICON_SIZE / 2 + 8))}
                        y={node.y}
                        textAnchor={rightHalf ? 'start' : 'end'}
                        dominantBaseline="middle"
                        className="fill-ink transition-colors duration-150"
                        fontSize={NODE_FONT}
                        fontWeight={isHov ? 700 : 500}
                        // bg halo knocks the hairlines out from behind the label
                        stroke="var(--color-bg)"
                        strokeWidth={4}
                        strokeLinejoin="round"
                        paintOrder="stroke"
                        style={{ fill: isHov ? 'var(--color-red)' : undefined }}
                        {...anim(fadeIn, phase)}
                      >
                        {node.label}
                      </motion.text>
                    </g>
                  );
                })}
                {/* Category caption — a numbered Swiss index (01–06); click to isolate */}
                <motion.text
                  x={branch.hub.x}
                  y={branch.hub.y - HUB_R - 12}
                  textAnchor="middle"
                  fill="currentColor"
                  fontSize={CAT_FONT}
                  fontWeight={700}
                  letterSpacing="0.1em"
                  stroke="var(--color-bg)"
                  strokeWidth={4}
                  strokeLinejoin="round"
                  paintOrder="stroke"
                  className="cursor-pointer"
                  onClick={toggleIsolate}
                  {...anim(fadeIn, time.hub)}
                >
                  <tspan className="fill-ink-3" fontWeight={600}>
                    {num}
                  </tspan>
                  <tspan dx={CAT_FONT * 0.5}>{branch.category.toUpperCase()}</tspan>
                </motion.text>
              </g>
            );
          })}

          {/* Core — the single red square; click to clear an isolated branch */}
          <motion.rect
            x={layout.core.x - CORE / 2}
            y={layout.core.y - CORE / 2}
            width={CORE}
            height={CORE}
            fill="var(--color-red)"
            className={cn(isolated && 'cursor-pointer')}
            style={SELF_ORIGIN}
            onClick={(e) => {
              e.stopPropagation();
              setIsolated(null);
              setHoveredNode(null);
            }}
            {...anim(popIn, timings.core)}
          />
        </svg>

        {/* Screen-reader / crawler access to the same skills the decorative SVG
            shows. Visually hidden; this whole desktop block is display:none
            below lg, so it never double-announces with the mobile list. */}
        <div className="sr-only">
          <h3>Skills by area</h3>
          {skillGroups.map((group) => (
            <section key={group.category} aria-label={group.category}>
              <h4>{group.category}</h4>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      {/* Mobile / narrow: Swiss ruled rows — a category caption, then its techs
          as hairline chips (tap a chip to jump to projects using it). */}
      <div className="mx-auto flex w-full max-w-2xl flex-col lg:hidden">
        {branchConfigs.map((cfg, ci) => {
          const group = skillGroups.find((g) => g.category === cfg.category);
          if (!group) return null;
          const rowDelay = ci * MOBILE_ROW_MS;
          return (
            <div key={cfg.category} className="flex flex-col gap-3 border-t border-line py-5 first:border-line-2">
              <motion.h3 className="label text-ink-3" {...anim(riseIn, { delay: rowDelay, duration: 280 })}>
                {cfg.category}
              </motion.h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item, ii) => {
                  const Icon = skillIcons[item] ?? FallbackIcon;
                  return (
                    <motion.li
                      key={item}
                      {...anim(riseIn, { delay: rowDelay + 40 + ii * MOBILE_CHIP_MS, duration: 280 })}
                    >
                      <WipeLink
                        to={projectsHref(item)}
                        className="flex items-center gap-1.5 rounded-sm border border-line px-2.5 py-1 text-[0.9375rem] text-ink transition-colors hover:border-line-2"
                      >
                        <Icon aria-hidden="true" className="h-4 w-4 shrink-0" style={{ color: iconColor(item) }} />
                        {item}
                      </WipeLink>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
