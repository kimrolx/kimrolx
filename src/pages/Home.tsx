import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import { Hero } from "@/sections/Hero";
import { Experience } from "@/sections/Experience";
import { Projects } from "@/sections/Projects";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { useSEO } from "@/hooks/useSEO";
import { ROUTES } from "@/config/seo";

export function Home() {
  useSEO(ROUTES['/']);
  const { hash } = useLocation();
  const lenis = useLenis();

  // Resolve a #section landing (e.g. arriving from /now via /#projects).
  // Deferred two frames so the freshly-mounted page (incl. the tall pinned
  // Projects track) has laid out; Lenis is re-measured first so it doesn't
  // clamp the target against the previous route's shorter scroll limit and
  // land short of the section.
  useEffect(() => {
    if (!hash) return;
    let raf = 0;
    const run = () => {
      const el = document.querySelector(hash);
      if (!el) return;
      if (lenis) {
        lenis.resize();
        lenis.scrollTo(el as HTMLElement, { force: true });
      } else {
        (el as HTMLElement).scrollIntoView();
      }
    };
    raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(run);
    });
    return () => cancelAnimationFrame(raf);
  }, [hash, lenis]);

  return (
    <main className="relative" style={{ zIndex: "var(--z-content)" }}>
      <Hero />
      <Experience />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
