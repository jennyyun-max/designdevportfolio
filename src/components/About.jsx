import { about } from "../content.js";
import Container from "./Container.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-t border-rule">
      <Container className="grid gap-8 py-16 sm:py-24 md:grid-cols-[1fr_2fr] md:gap-16">
        <SectionHeading id="about-heading">About</SectionHeading>
        <div className="max-w-[38rem] space-y-5 text-lg leading-relaxed">
          {about.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}
