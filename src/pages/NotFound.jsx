import { useEffect } from "react";
import { site } from "../content.js";
import Container from "../components/Container.jsx";
import Window from "../components/ui/Window.jsx";
import Button from "../components/ui/Button.jsx";

export default function NotFound({ message = "This file wandered off." }) {
  useEffect(() => {
    document.title = `Not found — ${site.name}`;
  }, []);
  return (
    <section className="bg-dots">
      <Container className="py-20 sm:py-28">
        <Window title="404.txt" tone="peach" className="mx-auto max-w-lg" bodyClassName="p-8">
          <h1 className="font-heading text-[2.75rem] leading-none">{message}</h1>
          <p className="mt-4 text-muted">The page you’re looking for doesn’t exist.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button to={{ pathname: "/", hash: "#work" }} variant="primary">See my work</Button>
            <Button to="/">Go home</Button>
          </div>
        </Window>
      </Container>
    </section>
  );
}
