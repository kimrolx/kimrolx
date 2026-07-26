import { useSearchParams } from "react-router-dom";
import { projects } from "@/data/projects";
import { Archive } from "@/components/Archive";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Reveal } from "@/components/Reveal";
import { SheetHeading } from "@/components/SheetHeading";

/** A hairline strip that names which projects use a tech, when arriving from
 *  the skill map via `/?stack=<tech>#projects`. Non-invasive: it sits above the
 *  showcase and never touches the pinned track. */
function StackFilter() {
  const [params, setParams] = useSearchParams();
  const stack = params.get("stack");
  if (!stack) return null;

  const matches = projects.filter((p) =>
    p.techStack.some((t) => t.label.toLowerCase() === stack.toLowerCase()),
  );

  const clear = () => {
    const next = new URLSearchParams(params);
    next.delete("stack");
    setParams(next, { replace: true });
  };

  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-4">
      <span className="label text-ink-3">Where I&rsquo;ve used</span>
      <span className="text-sm font-semibold tracking-tight text-ink">{stack}</span>
      <span className="text-sm text-ink-2">
        {matches.length
          ? `— ${matches.map((p) => p.title).join(" · ")}`
          : "— no selected project lists it yet"}
      </span>
      <button
        type="button"
        onClick={clear}
        className="label ml-auto text-ink-3 transition-colors hover:text-red-ink"
      >
        Clear
      </button>
    </div>
  );
}

export function Projects() {
  const count = projects.length;

  return (
    <section id="projects" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-6xl px-5 pt-16 sm:px-8 sm:pt-20 lg:pt-28">
        <SheetHeading
          title="Selected work"
          meta={`${count} projects`}
          description="Production builds, university work, and the things I keep tending."
        />
        <StackFilter />
      </div>

      <ProjectShowcase projects={projects} />

      <div className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 sm:pb-20 lg:pb-28">
        <Reveal className="mt-16 sm:mt-20">
          <Archive />
        </Reveal>
      </div>
    </section>
  );
}
