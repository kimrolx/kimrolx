import { GearCard } from "@/components/GearCard";
import { gearByCategory } from "@/data/gearItems";

/**
 * The canonical, complete kit — every item including the parts that never
 * make it onto the desk surface (CPU, PSU, and friends). Grouped by category,
 * always rendered, and the accessible fallback for the illustrations above.
 */
export function GearGrid() {
  return (
    <div className="flex flex-col">
      {gearByCategory.map((group) => (
        <div
          key={group.category.id}
          className="grid gap-6 border-t border-line py-12 first:border-line-2 lg:grid-cols-[14rem_1fr] lg:gap-12"
        >
          <div className="flex flex-col gap-2 lg:pt-1">
            <h3 className="label text-ink-3">{group.category.label}</h3>
            <p className="max-w-xs text-sm text-ink-2">{group.category.blurb}</p>
            <span className="label text-ink-3">
              {String(group.items.length).padStart(2, "0")} items
            </span>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {group.items.map((item) => (
              <li key={item.id}>
                <GearCard item={item} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
