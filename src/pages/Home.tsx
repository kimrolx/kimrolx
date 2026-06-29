import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import { Hero } from "@/sections/Hero";
import { Experience } from "@/sections/Experience";
import { Projects } from "@/sections/Projects";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";

export function Home() {
  const { hash } = useLocation();
  const lenis = useLenis();

  // Resolve a #section landing (e.g. arriving from /now via /#projects).
  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (!el) return;
    if (lenis) lenis.scrollTo(el as HTMLElement);
    else el.scrollIntoView();
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
