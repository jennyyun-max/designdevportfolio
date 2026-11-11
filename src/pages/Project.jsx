import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { projects, site } from "../content.js";
import Container from "../components/Container.jsx";
import Figure from "../components/Figure.jsx";
import BarChart from "../components/BarChart.jsx";
import Thumbnail from "../components/Thumbnail.jsx";
import Tag from "../components/ui/Tag.jsx";
import { Sparkle } from "../components/ui/Potato.jsx";
import NotFound from "./NotFound.jsx";

/* Project page template. Everything comes from `projects` in src/content.js. */

function Section({ section }) {
  const { id, label, heading, paragraphs = [], points = [], images = [], chart, code } = section;
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="border-t border-line py-12 first:border-t-0 first:pt-0 sm:py-16">
      <p className="eyebrow">{label}</p>
      <h2 id={`${id}-heading`} className="display mt-4 max-w-[22ch] text-balance text-[clamp(1.9rem,3.6vw,2.6rem)] tracking-[-0.025em]">
        {heading}
      </h2>

      {paragraphs.length > 0 && (
        <div className="mt-5 max-w-[38rem] space-y-4 text-lg leading-relaxed text-plum-soft">
          {paragraphs.map((p) => <p key={p}>{p}</p>)}
        </div>
      )}

      {points.length > 0 && (
        <ol className="mt-6 max-w-[40rem]">
          {points.map((point, i) => (
            <li key={point} className="grid grid-cols-[3rem_1fr] items-baseline border-t border-line py-4 last:border-b">
              <span className="serif-italic text-2xl leading-none text-bloom" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <span>{point}</span>
            </li>
          ))}
        </ol>
      )}

      {chart && <div className="mt-8 max-w-[40rem]"><BarChart {...chart} /></div>}

      {images.length > 0 && (
        <div className={`mt-8 grid gap-6 ${images.length > 1 ? "sm:grid-cols-2" : ""}`}>
          {images.map((img, i) => (
            <figure key={`${id}-${i}`}>
              <Figure src={img.src} alt={img.alt} aspect="aspect-[16/10]" />
              {img.caption && <figcaption className="mt-2 text-sm text-plum-soft">{img.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}

      {code && (
        <p className="mt-6 font-semibold">
          {code.href ? (
            <a href={code.href} target="_blank" rel="noreferrer" className="text-link">{code.label} ↗</a>
          ) : (
            <span className="text-plum-soft">{code.label} · link coming soon</span>
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

  if (!project) return <NotFound message="project *not* found." />;

  const next = projects[(index + 1) % projects.length];
  const links = project.links.filter((l) => l.href);
  const facts = [
    ["Role", project.role],
    ["Tools", project.tools.join(", ")],
    ["Timeline", project.timeline],
    ["Team", project.team],
  ];

  return (
    <article>
      {/* Overview */}
      <header>
        <Container className="pb-12 pt-8 sm:pt-12">
          <Link to={{ pathname: "/", hash: "#work" }} className="text-link text-sm font-semibold">
            <span aria-hidden="true">← </span>all projects
          </Link>
          <div className="mt-10 flex items-center gap-3">
            <span className="serif-italic text-3xl leading-none text-bloom" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <Tag>{project.category}</Tag>
          </div>
          <h1 className="display mt-5 max-w-[16ch] text-balance text-[clamp(3rem,8vw,6rem)]">{project.title}</h1>
          <p className="mt-6 max-w-[40rem] text-lg leading-relaxed text-plum-soft sm:text-xl">{project.summary}</p>

          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-line py-7 lg:grid-cols-5">
            {facts.map(([term, value]) => (
              <div key={term}>
                <dt className="eyebrow">{term}</dt>
                <dd className="mt-1.5">{value}</dd>
              </div>
            ))}
            <div className="col-span-2 lg:col-span-1">
              <dt className="eyebrow">Links</dt>
              <dd className="mt-1.5">
                {links.length > 0 ? (
                  <ul className="space-y-1">
                    {links.map((l) => (
                      <li key={l.label}><a href={l.href} target="_blank" rel="noreferrer" className="text-link font-semibold">{l.label} ↗</a></li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-plum-soft">coming soon</span>
                )}
              </dd>
            </div>
          </dl>

          <div className="mt-10 overflow-hidden rounded-[var(--radius-card)] border border-plum/10">
            <Thumbnail project={project} aspect="aspect-[4/3] md:aspect-[21/9]" />
          </div>
        </Container>
      </header>

      {/* Body + contents list on large screens */}
      <Container className="grid gap-10 pb-16 pt-8 sm:pb-24 lg:grid-cols-[11rem_1fr] lg:gap-16">
        <nav aria-label="On this page" className="hidden lg:block">
          <ul className="sticky top-24 space-y-1 text-sm font-semibold">
            {project.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="block rounded-full px-3 py-1.5 text-plum-soft transition-colors hover:bg-blush hover:text-plum">
                  {s.label}
                </a>
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
        <nav aria-label="Next project" className="border-t border-line bg-shell">
          <Container className="py-16">
            <Link to={`/work/${next.slug}`} className="group inline-block">
              <span className="eyebrow flex items-center gap-2">
                <Sparkle className="h-3.5 w-3.5" color="var(--color-bloom)" /> next project
              </span>
              <span className="display mt-3 block text-[clamp(2.25rem,5vw,3.75rem)] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-8">
                {next.title} <span aria-hidden="true">↗</span>
              </span>
            </Link>
          </Container>
        </nav>
      )}
    </article>
  );
}
