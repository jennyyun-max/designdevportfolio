import { projects } from "@/content/projects";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import ProjectCard from "./ProjectCard";

export default function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-heading" className="relative z-10 bg-bg">
      <Container className="pb-24 pt-16 sm:pb-32 sm:pt-20">
        <SectionHeader id="work-heading" eyebrow="01 — selected work" index={`(${String(projects.length).padStart(2, "0")})`} heading="Selected *work*" />
        <ul className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2 sm:mt-16">
          {projects.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={i === 0 ? 0 : (i % 2) * 0.12} className={i === 0 ? "border-b border-line pb-16 md:col-span-2" : ""}>
              <ProjectCard project={project} index={i} featured={i === 0} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
