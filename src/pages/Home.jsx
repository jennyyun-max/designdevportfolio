import { useEffect } from "react";
import Intro from "../components/Intro.jsx";
import Work from "../components/Work.jsx";
import AboutPreview from "../components/AboutPreview.jsx";

export default function Home() {
  useEffect(() => {
    document.title = "Chloe Yun — UI/UX Design Portfolio";
  }, []);

  return (
    <>
      <Intro />
      <Work />
      <AboutPreview />
    </>
  );
}
