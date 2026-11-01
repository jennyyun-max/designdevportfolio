import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { projects, site } from "../content.js";
import Container from "../components/Container.jsx";
import Figure from "../components/Figure.jsx";
import BarChart from "../components/BarChart.jsx";
import Thumbnail from "../components/Thumbnail.jsx";
import Window from "../components/ui/Window.jsx";
import Tag from "../components/ui/Tag.jsx";
import NotFound from "./NotFound.jsx";

/* Project page template. Everything comes from `projects` in src/content.js. */

function Section({ section }) {
  const { id, label, heading, paragraphs = [], points = [], images = [], chart, code } = section;
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="border-t border-rule py-12 first:border-t-0 first:pt-0 sm:py-16">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{label}</p>
      <h2 id={`${id}-heading`} className="mt-3 max-w-[40rem] text-balance font-heading text-[clamp(2rem,4vw,2.75rem)] leading-[1.08]">
        {heading}
      </h2>

      {paragraphs.length > 0 && (
        <div className="mt-5 max-w-[38rem] space-y-4 text-lg leading-relaxed">
          {paragraphs.map((p) => <p key={p}>{p}</p>)}
        </div>
      )}

      {points.length > 0 && (
        <ol className="mt-6 max-w-[40rem]">
          {points.map((point, i) => (
            <li key={point} className="grid grid-cols-[2.5rem_1fr] border-t border-rule py-3.5 last:border-b">
              <span className="font-mono text-sm text-muted" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <span>{point}</span>
            </li>
          ))}
        </ol>
      )}

      {chart && (
        <div className="mt-8 max-w-[40rem]">
          <BarChart {...chart} />
        </div>
      )}

      {images.length > 0 && (
        <div className={`mt-8 grid gap-6 ${images.length > 1 ? "sm:grid-cols-2" : ""}`}>
          {images.map((img, i) => (
            <figure key={`${id}-${i}`}>
              <Figure src={img.src} alt={img.alt} aspect="aspect-[16/10]" className="border border-ink" />
              {img.caption && <figcaption className="mt-2 font-mono text-xs text-muted">{img.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}

      {code && (
        <p className="mt-6 font-mono text-sm">
          {code.href ? (
            <a href={code.href} target="_blank" rel="noreferrer" className="text-link">{code.label} →</a>
          ) : (
            <span className="text-muted">{code.label} — link coming soon</span>
          )}
        </p>
      )}
    </section>
  );
}

export default function Project() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];

  useEffect(() => {
    if (project) document.title = `${project.title} — ${site.name}`;
  }, [project]);

  if (!project) return <NotFound message="Project not found." />;

  const next = projects[(index + 1) % projects.length];
  const links = project.links.filter((l) => l.href);

  return (
    <article>
      {/* Overview */}
      <header className="bg-dots border-b border-rule">
        <Container className="py-10 sm:py-14">
          <Link to={{ pathname: "/", hash: "#work" }} className="text-link font-mono text-sm">
            <span aria-hidden="true">← </span>All projects
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-end lg:gap-12">
            <div>
              <Tag>{project.category}</Tag>
              <h1 className="mt-4 text-balance font-heading text-[clamp(3rem,8vw,5.5rem)] leading-[0.95]">{project.title}</h1>
              <p className="mt-5 max-w-[38rem] text-lg leading-relaxed sm:text-xl">{project.summary}</p>
            </div>
            <Window title="overview.txt" tone={project.tone}>
              <dl className="grid grid-cols-[5.5rem_1fr] gap-y-2.5">
                {[
                  ["Role", project.role],
                  ["Tools", project.tools.join(", ")],
                  ["Timeline", project.timeline],
                  ["Team", project.team],
                ].map(([term, value]) => (
                  <div key={term} className="contents">
                    <dt className="font-mono text-sm text-muted">{term}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 border-t border-rule pt-3 font-mono text-sm">
                {links.length > 0 ? (
                  <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {links.map((l) => (
                      <li key={l.label}><a href={l.href} target="_blank" rel="noreferrer" className="text-link">{l.label} →</a></li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted">Code & links coming soon</p>
                )}
              </div>
            </Window>
          </div>
          <div className="mt-10 overflow-hidden rounded-[var(--radius-window)] border border-ink shadow-[var(--shadow-window)]">
            <Thumbnail project={project} aspect="aspect-[4/3] md:aspect-[21/9]" />
          </div>
        </Container>
      </header>

      {/* Body + contents list on large screens */}
      <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[11rem_1fr] lg:gap-16">
        <nav aria-label="On this page" className="hidden lg:block">
          <ul className="sticky top-20 space-y-2.5 font-mono text-[0.8125rem]">
            {project.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-muted hover:text-ink hover:underline underline-offset-4">{s.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          {project.sections.map((s) => <Section key={s.id} section={s} />)}
        </div>
      </Container>

      {/* Next project */}
      {projects.length > 1 && (
        <nav aria-label="Next project" className="border-t border-rule">
          <Container className="py-14">
            <Link to={`/work/${next.slug}`} className="group inline-block">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">next project</span>
              <span className="mt-2 block font-heading text-[clamp(2.25rem,5vw,3.5rem)] leading-none group-hover:underline group-hover:decoration-1 group-hover:underline-offset-8">
                {next.title} <span aria-hidden="true">→</span>
              </span>
            </Link>
          </Container>
        </nav>
      )}
    </article>
  );
}
