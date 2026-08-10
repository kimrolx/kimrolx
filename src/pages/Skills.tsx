import { FiArrowLeft } from 'react-icons/fi';
import { useSEO } from '@/hooks/useSEO';
import { ROUTES } from '@/config/seo';
import { WipeLink } from '@/components/WipeLink';
import { Section } from '@/components/Section';
import { SheetHeading } from '@/components/SheetHeading';
import { SkillTree } from '@/components/SkillTree';

export function Skills() {
  useSEO(ROUTES['/skills']);

  return (
    <main className="relative" style={{ zIndex: 'var(--z-content)' }}>
      <Section id="skills" className="flex flex-col gap-6">
        <SheetHeading
          title="Skills"
          description="Not a list — a map. The stack I build with, from a single core outward: languages, frontend, backend, state, data, and cloud. Hover on a node to see where it belongs, or click to see the relevant projects in my folio."
        />
      </Section>

      {/* Constellation — centred, capped width so it stays proportional and
          doesn't overwhelm. (Mobile fallback inside stays constrained + readable.) */}
      <div className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-8">
        <SkillTree />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
        <div className="border-t border-line pt-6">
          <WipeLink to="/" className="label inline-flex items-center gap-2 text-ink-3 transition-colors hover:text-ink">
            <FiArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
            Home
          </WipeLink>
        </div>
      </div>
    </main>
  );
}
