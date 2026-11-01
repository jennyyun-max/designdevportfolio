import { projects } from "../content.js";
import Container from "./Container.jsx";
import ProjectCard from "./ProjectCard.jsx";

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-heading">
      <Container className="py-16 sm:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">~/projects</p>
        <h2 id="work-heading" className="mt-3 font-heading text-[clamp(2.5rem,5vw,3.75rem)] leading-none">
          Selected work
        </h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
