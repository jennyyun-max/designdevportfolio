import { projects } from "../content.js";
import Container from "./Container.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { Sparkle } from "./ui/Bloom.jsx";

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-heading">
      <Container className="py-20 sm:py-28">
        <div className="flex items-center gap-4">
          <p className="eyebrow flex items-center gap-2">
            <Sparkle className="h-3.5 w-3.5" color="var(--color-bloom)" /> selected work
          </p>
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
        </div>
        <h2 id="work-heading" className="display mt-5 text-[clamp(2.5rem,5.5vw,4.25rem)]">
          recent <em>projects</em>
        </h2>
        <ul className="mt-12 space-y-16 sm:mt-16 sm:space-y-24">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <ProjectCard project={project} index={i} flip={i % 2 === 1} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
