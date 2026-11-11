import { projects } from "@/content/projects";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import ProjectCard from "./ProjectCard";

export default function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-heading">
      <Container className="py-24 sm:py-32">
        <SectionHeader id="work-heading" eyebrow="selected work" index={`(${String(projects.length).padStart(2, "0")})`} heading="things i’ve *made*" />
        <ul className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2 sm:mt-20">
          {projects.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={i === 0 ? 0 : (i % 2) * 0.12} className={i === 0 ? "md:col-span-2" : ""}>
              <ProjectCard project={project} index={i} featured={i === 0} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
