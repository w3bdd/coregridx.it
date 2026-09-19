import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "sonner";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Solutions from "@/pages/Solutions";
import Industries from "@/pages/Industries";
import Approach from "@/pages/Approach";
import Technology from "@/pages/Technology";
import WorkWithUs from "@/pages/WorkWithUs";
import Contact from "@/pages/Contact";

const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          if (window.__lenis) window.__lenis.scrollTo(el, { offset: -90 });
          else el.scrollIntoView();
        }, 120);
        return;
      }
    }
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollManager />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/approach" element={<Approach />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/work-with-us" element={<WorkWithUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{ style: { background: "#0F131C", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 0, color: "#E2E8F0" } }}
      />
    </BrowserRouter>
  );
}

export default App;
