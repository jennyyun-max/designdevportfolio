import { useEffect } from "react";
import { site } from "../content.js";
import Container from "../components/Container.jsx";
import Button from "../components/ui/Button.jsx";
import InteractivePotato from "../components/ui/InteractivePotato.jsx";

export default function NotFound({ message = "this page *wandered* off." }) {
  useEffect(() => {
    document.title = `Not found — ${site.name}`;
  }, []);
  const [a, b, c] = message.split("*");
  return (
    <section>
      <Container className="py-24 text-center sm:py-32">
        <InteractivePotato className="relative mx-auto mt-8 w-20" bubbleSide="center" />
        <h1 className="display mx-auto mt-6 max-w-[14ch] text-[clamp(2.75rem,7vw,4.5rem)]">
          {a}{b && <em>{b}</em>}{c}
        </h1>
        <p className="mt-4 text-plum-soft">The page you’re looking for doesn’t exist.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to={{ pathname: "/", hash: "#work" }} variant="primary">see my work</Button>
          <Button to="/">go home</Button>
        </div>
      </Container>
    </section>
  );
}
