import { useEffect } from "react";
import { aboutPage } from "../aboutContent.js";
import AboutIntro from "../components/about/AboutIntro.jsx";
import InvolvementSection from "../components/about/InvolvementSection.jsx";
import ValuesSection from "../components/about/ValuesSection.jsx";

export default function About() {
  useEffect(() => {
    document.title = "About — Chloe Yun";
  }, []);

  return (
    <>
      <AboutIntro intro={aboutPage.intro} />
      <InvolvementSection involvement={aboutPage.involvement} />
      <ValuesSection values={aboutPage.values} />
    </>
  );
}
