import { useMemo, useState, type MouseEvent } from 'react';
import { skillGroups } from '@/data/skills';
import { branchConfigs } from '@/data/skillTree';
import { skillIcons, FallbackIcon } from '@/data/skillIcons';
import { iconColor } from '@/data/skillIconColors';
import { layoutSkillTree } from '@/lib/skillTreeLayout';
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

/** Jump to the Projects section, filtered to a given tech. */
function projectsHref(label: string): string {
  return `/?stack=${encodeURIComponent(label)}#projects`;
}

export function SkillTree() {
  const layout = useMemo(() => layoutSkillTree(skillGroups, branchConfigs), []);
  const wipeNavigate = useWipeNavigate();

  const [hoveredBranch, setHoveredBranch] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isolated, setIsolated] = useState<string | null>(null);

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
                <line
                  x1={layout.core.x}
                  y1={layout.core.y}
                  x2={branch.hub.x}
                  y2={branch.hub.y}
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="transition-[stroke-opacity] duration-150"
                  style={{ strokeOpacity: on ? 0.9 : 0.4 }}
                />
                {/* Hub → node links */}
                {branch.nodes.map((node) => {
                  const isHov = node.label === hoveredNode;
                  const so = nodeHere ? (isHov ? 0.95 : 0.1) : on ? 0.5 : 0.22;
                  return (
                    <line
                      key={`l-${node.label}`}
                      x1={branch.hub.x}
                      y1={branch.hub.y}
                      x2={node.x}
                      y2={node.y}
                      stroke="currentColor"
                      strokeWidth={1}
                      className="transition-[stroke-opacity] duration-150"
                      style={{ strokeOpacity: so }}
                    />
                  );
                })}
                {/* Hub — a hairline ring; click to isolate this branch */}
                <circle
                  cx={branch.hub.x}
                  cy={branch.hub.y}
                  r={HUB_R}
                  fill="var(--color-bg)"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="cursor-pointer transition-[stroke-opacity] duration-150"
                  style={{ strokeOpacity: on ? 1 : 0.75 }}
                  onClick={toggleIsolate}
                />
                {/* Skill nodes: brand-coloured icon + white ink label */}
                {branch.nodes.map((node) => {
                  const rightHalf = node.x >= layout.core.x;
                  const Icon = skillIcons[node.label] ?? FallbackIcon;
                  const isHov = node.label === hoveredNode;
                  const nodeOpacity = nodeHere && !isHov ? 0.45 : 1;
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
                      <text
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
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
                {/* Category caption — a numbered Swiss index (01–06); click to isolate */}
                <text
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
                >
                  <tspan className="fill-ink-3" fontWeight={600}>
                    {num}
                  </tspan>
                  <tspan dx={CAT_FONT * 0.5}>{branch.category.toUpperCase()}</tspan>
                </text>
              </g>
            );
          })}

          {/* Core — the single red square; click to clear an isolated branch */}
          <rect
            x={layout.core.x - CORE / 2}
            y={layout.core.y - CORE / 2}
            width={CORE}
            height={CORE}
            fill="var(--color-red)"
            className={cn(isolated && 'cursor-pointer')}
            onClick={(e) => {
              e.stopPropagation();
              setIsolated(null);
              setHoveredNode(null);
            }}
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
        {branchConfigs.map((cfg) => {
          const group = skillGroups.find((g) => g.category === cfg.category);
          if (!group) return null;
          return (
            <div key={cfg.category} className="flex flex-col gap-3 border-t border-line py-5 first:border-line-2">
              <h3 className="label text-ink-3">{cfg.category}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const Icon = skillIcons[item] ?? FallbackIcon;
                  return (
                    <li key={item}>
                      <WipeLink
                        to={projectsHref(item)}
                        className="flex items-center gap-1.5 rounded-sm border border-line px-2.5 py-1 text-[0.9375rem] text-ink transition-colors hover:border-line-2"
                      >
                        <Icon aria-hidden="true" className="h-4 w-4 shrink-0" style={{ color: iconColor(item) }} />
                        {item}
                      </WipeLink>
                    </li>
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
