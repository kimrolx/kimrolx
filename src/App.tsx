import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { TopBar } from "@/components/TopBar";
import { Home } from "@/pages/Home";
import { Now } from "@/pages/Now";

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

function App() {
  return (
    <SmoothScroll>
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
    </SmoothScroll>
  );
}

export default App;
