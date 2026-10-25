import Header from "./components/Header.jsx";
import Intro from "./components/Intro.jsx";
import Work from "./components/Work.jsx";
import About from "./components/About.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Intro />
        <Work />
        <About />
      </main>
      <Footer />
    </>
  );
}
