import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { projects, site } from "../content.js";
import { caseStudies } from "../caseStudies.js";
import Container from "../components/Container.jsx";
import Figure from "../components/Figure.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import PlaceholderVisual from "../components/PlaceholderVisual.jsx";
import { toneBg } from "../components/ProjectCard.jsx";

/* Template for every case study. Content comes from src/caseStudies.js;
   title, tags and cover image come from the matching project in src/content.js. */

function NotFound() {
  return (
    <Container className="py-24 sm:py-32">
      <h1 className="font-heading text-[clamp(2.5rem,6vw,4rem)] leading-none">Case study not found.</h1>
      <Link to={{ pathname: "/", hash: "#work" }} className="text-link mt-8 inline-block">
        <span aria-hidden="true">← </span>Back to all work
      </Link>
    </Container>
  );
}

function CaseSection({ section }) {
  const { id, label, heading, paragraphs = [], points = [], images = [] } = section;
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="border-t border-rule py-14 first:border-t-0 first:pt-0 sm:py-20">
      <SectionLabel>{label}</SectionLabel>
      <h2
        id={`${id}-heading`}
        className="mt-4 max-w-[40rem] text-balance font-heading text-[clamp(2rem,4vw,2.75rem)] leading-[1.08]"
      >
        {heading}
      </h2>

      {paragraphs.length > 0 && (
        <div className="mt-6 max-w-[38rem] space-y-5 text-lg leading-relaxed">
          {paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      )}

      {points.length > 0 && (
        <ol className="mt-8 max-w-[40rem]">
          {points.map((point, i) => (
            <li key={point} className="grid grid-cols-[3rem_1fr] gap-2 border-t border-rule py-5 text-lg last:border-b">
              <span className="font-heading text-2xl leading-none text-muted" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ol>
      )}

      {images.length > 0 && (
        <div className={`mt-10 grid gap-6 ${images.length > 1 ? "sm:grid-cols-2" : ""}`}>
          {images.map((image, i) => (
            <figure key={`${id}-${i}`}>
              <Figure src={image.src} alt={image.alt} aspect="aspect-[16/10]" />
              {image.caption && (
                <figcaption className="mt-3 text-sm text-muted">{image.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const study = caseStudies[slug];

  useEffect(() => {
    document.title = project ? `${project.title} — ${site.name}` : `Not found — ${site.name}`;
  }, [project]);

  if (!project || !study) return <NotFound />;

  // Next project that also has a case study (wraps around); none → back to all work
  const index = projects.indexOf(project);
  const next = [...projects.slice(index + 1), ...projects.slice(0, index)].find(
    (p) => caseStudies[p.slug]
  );

  return (
    <article>
      {/* Title */}
      <header>
        <Container className="pb-10 pt-12 sm:pb-14 sm:pt-16">
          <Link to={{ pathname: "/", hash: "#work" }} className="text-link text-sm">
            <span aria-hidden="true">← </span>All work
          </Link>
          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Project type and skills">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-sm border border-rule px-2 py-0.5 text-[0.8125rem] text-muted">
                {tag}
              </li>
            ))}
          </ul>
          <h1 className="mt-5 text-balance font-heading text-[clamp(3rem,8vw,6rem)] leading-[0.98] tracking-[-0.01em]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-[40rem] text-lg leading-relaxed text-muted sm:text-xl">{study.summary}</p>
        </Container>

        {/* Cover: the project's image, or its placeholder art */}
        <Container>
          <div className={`overflow-hidden ${toneBg[project.tone] ?? "bg-rule"} aspect-[4/3] md:aspect-[21/9]`}>
            {project.image ? (
              <img src={project.image} alt="" className="h-full w-full object-cover" />
            ) : (
              <PlaceholderVisual variant={project.visual} />
            )}
          </div>
        </Container>

        {/* Overview facts */}
        {study.overview?.length > 0 && (
          <Container>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-b border-rule py-10 lg:grid-cols-4">
              {study.overview.map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-sm uppercase tracking-[0.12em] text-muted">{label}</dt>
                  <dd className="mt-2">{value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        )}
      </header>

      {/* Body with an "On this page" list on large screens */}
      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[11rem_1fr] lg:gap-16">
        <nav aria-label="On this page" className="hidden lg:block">
          <ul className="sticky top-24 space-y-3 text-sm">
            {study.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-muted hover:text-ink hover:underline underline-offset-4">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          {study.sections.map((section) => (
            <CaseSection key={section.id} section={section} />
          ))}
        </div>
      </Container>

      {/* Next project */}
      <nav aria-label="More work" className="border-t border-rule">
        <Container className="py-14 sm:py-20">
          {next ? (
            <Link to={`/work/${next.slug}`} className="group block">
              <SectionLabel>Next project</SectionLabel>
              <span className="mt-3 block font-heading text-[clamp(2.25rem,5vw,3.5rem)] leading-none group-hover:underline group-hover:decoration-1 group-hover:underline-offset-8">
                {next.title} <span aria-hidden="true">→</span>
              </span>
            </Link>
          ) : (
            <Link to={{ pathname: "/", hash: "#work" }} className="text-link text-lg">
              <span aria-hidden="true">← </span>Back to all work
            </Link>
          )}
        </Container>
      </nav>
    </article>
  );
}
