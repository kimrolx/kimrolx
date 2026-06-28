import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { TopBar } from "@/components/TopBar";
import { Hero } from "@/sections/Hero";
import { Experience } from "@/sections/Experience";
import { Projects } from "@/sections/Projects";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";

function App() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:font-medium focus:text-bg"
      >
        Skip to content
      </a>
      <TopBar />
      <main className="relative" style={{ zIndex: "var(--z-content)" }}>
        <Hero />
        <Experience />
        <Projects />
        <About />
        <Contact />
      </main>
    </SmoothScroll>
  );
}

export default App;
