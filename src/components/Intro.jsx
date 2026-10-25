import { intro } from "../content.js";
import Container from "./Container.jsx";

export default function Intro() {
  return (
    <section id="top" aria-labelledby="intro-heading">
      <Container className="pb-16 pt-20 sm:pb-24 sm:pt-28">
        <h1
          id="intro-heading"
          className="font-heading text-[clamp(3.25rem,10vw,7rem)] leading-[0.95] tracking-[-0.01em]"
        >
          {intro.headline}
        </h1>
        <p className="mt-8 max-w-[38rem] text-lg leading-relaxed text-muted sm:text-xl">
          {intro.text}
        </p>
        <a href="#work" className="text-link mt-8 inline-block">
          Explore my work <span aria-hidden="true">↓</span>
        </a>
      </Container>
    </section>
  );
}
