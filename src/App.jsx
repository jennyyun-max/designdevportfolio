import { Routes, Route, useLocation } from "react-router-dom";
import { aboutPage } from "./aboutContent.js";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ScrollManager from "./components/ScrollManager.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import CaseStudy from "./pages/CaseStudy.jsx";

export default function App() {
  const { pathname } = useLocation();
  // Page-specific closing message in the footer (defaults to “Let’s connect.”)
  const closing = pathname === "/about" ? aboutPage.closing : {};

  return (
    <>
      <ScrollManager />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer {...closing} />
    </>
  );
}
