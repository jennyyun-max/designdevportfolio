import { projects } from "../content.js";
import { caseStudies } from "../caseStudies.js";
import Container from "./Container.jsx";
import SectionHeading from "./SectionHeading.jsx";
import ProjectCard from "./ProjectCard.jsx";

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="border-t border-rule">
      <Container className="py-16 sm:py-24">
        <SectionHeading id="work-heading">Selected work</SectionHeading>
        <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:mt-14 md:grid-cols-2">
          {projects.map((project) => (
            <li key={project.title} className={project.featured ? "md:col-span-2" : ""}>
              <ProjectCard
                project={project}
                href={caseStudies[project.slug] ? `/work/${project.slug}` : project.href}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
