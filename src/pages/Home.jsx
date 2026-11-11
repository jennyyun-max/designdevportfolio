import { useEffect } from "react";
import { site } from "../content.js";
import Hero from "../components/home/Hero.jsx";
import Marquee from "../components/home/Marquee.jsx";
import Work from "../components/Work.jsx";
import AboutTeaser from "../components/home/AboutTeaser.jsx";

export default function Home() {
  useEffect(() => {
    document.title = `${site.name} — UX & Product Design Portfolio`;
  }, []);

  return (
    <>
      <Hero />
      <Marquee />
      <Work />
      <AboutTeaser />
    </>
  );
}
