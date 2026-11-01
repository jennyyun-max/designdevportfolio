import { useEffect } from "react";
import { site } from "../content.js";
import Desktop from "../components/desk/Desktop.jsx";
import Work from "../components/Work.jsx";
import OnMyDesk from "../components/desk/OnMyDesk.jsx";

export default function Home() {
  useEffect(() => {
    document.title = `${site.name} — Portfolio`;
  }, []);

  return (
    <>
      <Desktop />
      <Work />
      <OnMyDesk />
    </>
  );
}
