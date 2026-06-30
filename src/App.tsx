import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { WipeProvider } from "@/components/WipeProvider";
import { ScrollProgress } from "@/components/ScrollProgress";
import { TopBar } from "@/components/TopBar";
import { Home } from "@/pages/Home";
import { Now } from "@/pages/Now";
import { EasterEggProvider } from "@/context/EasterEggProvider";
import { useEasterEgg } from "@/hooks/useEasterEgg";
import { useKonami } from "@/hooks/useKonami";
import { CrtExitButton } from "@/components/CrtExitButton";
import { CrtTerminal } from "@/components/CrtTerminal";
import { CrtAchievementToast } from "@/components/CrtAchievementToast";

/** Reset to the top on route (path) changes; hash anchors are handled per page. */
function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, lenis]);
  return null;
}

/** Mounts the global Konami listener; renders nothing. */
function KonamiTrigger() {
  const { toggleCrt } = useEasterEgg();
  useKonami(toggleCrt);
  return null;
}

function App() {
  useEffect(() => {
    console.log(
      "%c the old machines still boot.  ↑ ↑ ↓ ↓ ← → ← → B A ",
      "font-family:monospace;color:#7CFFB2;background:#0a0a0a;padding:4px 8px;border-radius:2px;",
    );
  }, []);

  return (
    <SmoothScroll>
      <EasterEggProvider>
        <WipeProvider>
          <KonamiTrigger />
          <ScrollProgress />
          <ScrollToTop />
          <a
            href="#home"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:font-medium focus:text-bg"
          >
            Skip to content
          </a>
          <TopBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/now" element={<Now />} />
          </Routes>
          <CrtTerminal />
          <CrtExitButton />
          <CrtAchievementToast />
        </WipeProvider>
      </EasterEggProvider>
    </SmoothScroll>
  );
}

export default App;
