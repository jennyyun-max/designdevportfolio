import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { ImageAsset, Project } from "@/lib/types";
import Reveal from "../ui/Reveal";
import MediaFrame from "../ui/MediaFrame";
import RevealImage from "../ui/RevealImage";
import SplitHeading from "../ui/SplitHeading";
import ReadingProgress from "./ReadingProgress";
import { Lightbox, ZoomButton } from "./Lightbox";
import { previewOf, toolsOf } from "../work/ProjectTile";

const pad = (n: number) => String(n).padStart(2, "0");

type Chapter = { id: string; label: string; heading?: string; body?: ReactNode };

function Figure({ image, n, index, visual, sizes = "(min-width: 1024px) 1100px, 100vw" }: { image: ImageAsset; n?: string; index: number; visual: Project["visual"]; sizes?: string }) {
  return (
    <figure>
      <ZoomButton index={index} label={image.caption ?? image.alt}>
        <MediaFrame image={image} visual={visual} aspect={image.aspect ?? "aspect-video"} sizes={sizes} />
      </ZoomButton>
      {image.caption && (
        <figcaption className="meta mt-3 flex gap-3 text-muted">
          {n && <span className="shrink-0 text-ink">Fig. {n}</span>}
          <span>{image.caption}</span>
        </figcaption>
      )}
    </figure>
  );
}

/* The case-study template — the same chapters for every project, so it's easy to scan:
   Problem → Context → Research → Process → Design decisions → Final design → Outcomes → Reflection.
   Everything comes from content/projects.ts; a chapter without content is skipped and the
   numbering closes up. Nothing is generated or embellished here. */
export default function CaseStudy({ project, index, prev, next }: { project: Project; index: number; prev: Project; next: Project }) {
  const { caseStudy: cs, visual } = project;
  const label = cs.labels ?? {};
  const tools = toolsOf(project);
  const links = (cs.links ?? []).filter((l) => l.href);
  // every figure on the page, in order — numbered, and openable in the lightbox
  const figures: (ImageAsset & { n: string })[] = [];
  const figure = (image: ImageAsset, sizes?: string) => {
    const n = pad(figures.length + 1);
    figures.push({ ...image, n });
    return <Figure image={image} n={n} index={figures.length - 1} visual={visual} sizes={sizes} />;
  };

  const facts = [
    { term: "Role", value: cs.role?.summary },
    { term: "Team", value: cs.team },
    { term: "Timeline", value: cs.timeline?.duration },
    { term: "Category", value: project.category },
  ].filter((f): f is { term: string; value: string } => Boolean(f.value));

  const chapters: Chapter[] = [];

  // 1 — Problem
  if (cs.problem) chapters.push({ id: "problem", label: label.problem ?? "The problem", heading: cs.problem });

  // 2 — Context
  if (cs.overview) {
    chapters.push({
      id: "context",
      label: "Context",
      body: (
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <p className="text-[clamp(1.15rem,1.6vw,1.35rem)] leading-relaxed">{cs.overview}</p>
          {!!cs.role?.responsibilities?.length && (
            <div className="border-t border-ink pt-3">
              <p className="meta text-muted">What I did</p>
              <ul className="mt-3">
                {cs.role.responsibilities.map((r, i) => (
                  <li key={r} className="flex gap-4 border-b border-line py-3">
                    <span className="meta pt-1 text-muted">{pad(i + 1)}</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ),
    });
  }

  // 3 — Research
  if (cs.research || cs.insights?.length) {
    const r = cs.research;
    chapters.push({
      id: "research",
      label: label.research ?? "Research",
      heading: r?.summary ? undefined : label.insightsHeading,
      body: (
        <>
          {r?.summary && <p className="max-w-[52rem] text-[clamp(1.15rem,1.6vw,1.35rem)] leading-relaxed">{r.summary}</p>}
          {!!r?.stats?.length && (
            <dl className="mt-14 grid border-t border-ink sm:grid-cols-3">
              {r.stats.map((st, i) => (
                <Reveal key={st.label} delay={i * 0.08} className="border-b border-line py-6 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0">
                  <dt className="sr-only">{st.label}</dt>
                  <dd>
                    <span className="display block text-[clamp(4rem,8vw,7rem)] leading-none">{st.value}</span>
                    <span className="meta mt-3 block text-muted">{st.label}</span>
                  </dd>
                </Reveal>
              ))}
            </dl>
          )}
          {!!r?.methods?.length && (
            <p className="meta mt-10 text-muted">
              Methods — <span className="text-ink">{r.methods.join(" / ")}</span>
            </p>
          )}
          {!!r?.images?.length && (
            <div className={`mt-14 grid gap-10 ${r.images.length > 1 ? "md:grid-cols-2" : ""}`}>
              {r.images.map((img) => (
                <div key={img.src}>{figure(img)}</div>
              ))}
            </div>
          )}
          {!!cs.insights?.length && (
            <>
              {r?.summary && <h3 className="display mt-24 max-w-[20ch] text-[clamp(2rem,4vw,3.4rem)]">{label.insightsHeading ?? "What we learned"}</h3>}
              <ol className={`mt-10 grid gap-x-8 border-t border-ink ${cs.insights.length % 2 === 0 && cs.insights.length < 6 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
                {cs.insights.map((ins, i) => (
                  <Reveal as="li" key={ins.title} delay={(i % 3) * 0.07} className="border-b border-line py-6">
                    <span className="meta text-oxblood">Insight {pad(i + 1)}</span>
                    <p className="display mt-3 text-[1.9rem]">{ins.title}</p>
                    <p className="mt-2 text-muted">{ins.detail}</p>
                  </Reveal>
                ))}
              </ol>
            </>
          )}
        </>
      ),
    });
  }

  // 4 — Process
  if (cs.timeline?.phases?.length || cs.process?.length || cs.wireframes?.length) {
    chapters.push({
      id: "process",
      label: label.process && !cs.decisions ? label.process : "Process",
      body: (
        <>
          {!!cs.timeline?.phases?.length && (
            <ol className="grid grid-cols-2 border-t border-ink sm:grid-cols-4">
              {cs.timeline.phases.map((ph) => (
                <li key={ph.label} className="border-b border-line py-4 pr-4">
                  <p className="meta text-muted">{ph.label}</p>
                  <p className="display mt-2 text-[1.7rem]">{ph.detail}</p>
                </li>
              ))}
            </ol>
          )}
          {!!cs.process?.length && (
            <ol className={`border-t border-ink ${cs.timeline?.phases?.length ? "mt-16" : ""}`}>
              {cs.process.map((step, i) => (
                <Reveal as="li" key={step.title} className="grid gap-2 border-b border-line py-7 sm:grid-cols-[4rem_14rem_1fr] sm:gap-8">
                  <span className="meta pt-2 text-muted">{pad(i + 1)}</span>
                  <p className="display text-[2rem]">{step.title}</p>
                  <p className="text-[1.05rem] leading-relaxed text-muted">{step.detail}</p>
                </Reveal>
              ))}
            </ol>
          )}
          {!!cs.wireframes?.length && (
            <div className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-2">
              {cs.wireframes.map((img, i) => (
                <Reveal key={img.src} delay={(i % 3) * 0.06} className={i % 2 ? "md:mt-16" : ""}>
                  {figure(img, "(min-width: 768px) 50vw, 100vw")}
                </Reveal>
              ))}
            </div>
          )}
        </>
      ),
    });
  }

  // 5 — Design decisions
  if (cs.decisions?.length) {
    chapters.push({
      id: "decisions",
      label: "Design decisions",
      heading: label.process && cs.decisions ? label.process : undefined,
      body: (
        <ol className="border-t border-ink">
          {cs.decisions.map((d, i) => (
            <Reveal as="li" key={d.title} className="grid gap-3 border-b border-line py-8 md:grid-cols-[4rem_1fr_1fr] md:gap-8">
              <span className="meta pt-3 text-oxblood">D{pad(i + 1)}</span>
              <p className="display text-[clamp(2rem,3.4vw,3rem)]">{d.title}</p>
              <p className="text-[1.05rem] leading-relaxed text-muted md:pt-3">{d.detail}</p>
            </Reveal>
          ))}
        </ol>
      ),
    });
  }

  // 6 — Final design
  if (cs.finalDesigns?.length) {
    chapters.push({
      id: "final",
      label: "Final design",
      heading: label.final && label.final !== "the screens" ? label.final : undefined,
      body: (
        <div className={cs.finalLayout === "phones" ? "grid grid-cols-2 gap-6 md:grid-cols-4" : "grid gap-16"}>
          {cs.finalDesigns.map((img, i) => (
            <Reveal key={img.src} delay={cs.finalLayout === "phones" ? (i % 4) * 0.06 : 0}>
              {figure(img, cs.finalLayout === "phones" ? "(min-width: 768px) 300px, 45vw" : undefined)}
            </Reveal>
          ))}
        </div>
      ),
    });
  }

  // 7 — Outcomes
  if (cs.outcomes?.length) {
    chapters.push({
      id: "outcomes",
      label: label.outcomes ?? "Outcomes",
      body: (
        <ul className={`grid gap-x-8 border-t border-ink ${cs.outcomes.length > 1 ? "md:grid-cols-3" : ""}`}>
          {cs.outcomes.map((o, i) => (
            <li key={o} className="border-b border-line py-6">
              <span className="meta text-muted">{pad(i + 1)}</span>
              <p className="mt-2 text-[1.1rem] leading-snug">{o}</p>
            </li>
          ))}
        </ul>
      ),
    });
  }

  // 8 — Reflection
  if (cs.reflection) {
    chapters.push({
      id: "reflection",
      label: "Reflection",
      body: (
        <div className="max-w-[60rem]">
          <blockquote className="display text-[clamp(1.8rem,3.4vw,3rem)] leading-[1.08]">
            <span className="text-oxblood">“</span>
            {cs.reflection}
            <span className="text-oxblood">”</span>
          </blockquote>
          {links.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-6">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noreferrer" className="link">
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ),
    });
  }

  return (
    <Lightbox figures={figures}>
    <article>
      <ReadingProgress />

      {/* Opening */}
      <header className="mx-auto max-w-[1600px] px-5 pt-6 sm:px-8 sm:pt-10">
        <div className="meta flex justify-between text-muted">
          <Link href="/work" className="group inline-flex items-center gap-2 text-ink">
            <span className="transition-transform duration-500 group-hover:-translate-x-1" aria-hidden="true">
              ←
            </span>
            <span className="wipe">All work</span>
          </Link>
          <span>Case study{project.year && ` — ${project.year}`}</span>
        </div>
        <SplitHeading
          as="h1"
          inView={false}
          label={project.title}
          className="display mt-10 text-[clamp(3.2rem,10vw,10.5rem)] leading-[0.84] tracking-[-0.04em]"
          lines={[project.title]}
        />
        <div className="mt-10 grid gap-10 border-t border-ink pt-5 lg:grid-cols-12">
          <p className="text-[clamp(1.15rem,1.7vw,1.45rem)] leading-snug lg:col-span-5">{project.tagline ?? project.description}</p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 lg:col-span-7">
            {facts.map((f) => (
              <div key={f.term}>
                <dt className="meta text-muted">{f.term}</dt>
                <dd className="mt-1 text-[0.95rem]">{f.value}</dd>
              </div>
            ))}
            {tools.length > 0 && (
              <div className="col-span-2 sm:col-span-4">
                <dt className="meta text-muted">Tools & methods</dt>
                <dd className="mt-1 text-[0.95rem]">{tools.join(" / ")}</dd>
              </div>
            )}
          </dl>
        </div>
        <div className="mt-12">
          <RevealImage {...previewOf(project)} aspect="aspect-[4/3] md:aspect-[16/8]" sizes="(min-width: 1600px) 1540px, 100vw" priority />
        </div>
      </header>

      {/* Chapters, with a sticky index on wide screens */}
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
        <nav aria-label="On this page" className="hidden lg:col-span-2 lg:block">
          <ol className="meta sticky top-24 mt-24 space-y-2">
            {chapters.map((c, i) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="group flex gap-3 text-muted transition-colors hover:text-ink">
                  <span>{pad(i + 1)}</span>
                  <span className="wipe">{c.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="lg:col-span-10">
          {chapters.map((c, i) => (
            <section key={c.id} id={c.id} aria-labelledby={`${c.id}-label`} className="py-20 sm:py-28">
              <div className="grid gap-4 border-t border-ink pt-4 md:grid-cols-[12rem_1fr]">
                <p id={`${c.id}-label`} className="meta flex gap-3">
                  <span className="text-muted">{pad(i + 1)}</span>
                  {c.label}
                </p>
                {c.heading && (
                  <Reveal>
                    <h2 className="display max-w-[22ch] text-[clamp(2.2rem,4.6vw,4.4rem)]">{c.heading}</h2>
                  </Reveal>
                )}
              </div>
              {c.body && <div className="mt-12 md:pl-[12rem]">{c.body}</div>}
            </section>
          ))}
        </div>
      </div>

      {/* Previous / next project */}
      <aside className="mx-auto max-w-[1600px] px-5 pt-10 sm:px-8" aria-label="More projects">
        <nav aria-label="Previous and next project" className="meta mb-10 flex items-baseline justify-between gap-6 text-muted">
          <Link href={`/work/${prev.slug}`} className="group flex min-w-0 gap-2">
            <span aria-hidden="true">←</span>
            <span className="truncate">
              Previous — <span className="wipe text-ink">{prev.title}</span>
            </span>
          </Link>
          <span className="hidden shrink-0 sm:inline">Project {String(index + 1).padStart(2, "0")}</span>
          <Link href={`/work/${next.slug}`} className="group flex min-w-0 gap-2 text-right">
            <span className="truncate">
              Next — <span className="wipe text-ink">{next.title}</span>
            </span>
            <span aria-hidden="true">→</span>
          </Link>
        </nav>
        <Link href={`/work/${next.slug}`} data-cursor="view" className="group grid gap-8 border-t border-ink pt-5 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="meta text-muted">Next project →</p>
            <p className="display mt-6 text-[clamp(2.6rem,6vw,6rem)] leading-[0.9]">
              <span className="wipe">{next.title}</span>
            </p>
            <p className="mt-4 max-w-[40ch] text-muted">{next.tagline ?? next.description}</p>
          </div>
          {(() => {
            const { image, ratio } = previewOf(next);
            return (
              <div className="relative aspect-[16/10] self-start overflow-hidden bg-stone md:col-span-7" style={ratio ? { aspectRatio: ratio } : undefined}>
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className={`transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03] ${image.fit === "contain" ? "object-contain p-[4%]" : "object-cover"}`}
                  style={{ objectPosition: image.focus ?? "50% 50%" }}
                />
              </div>
            );
          })()}
        </Link>
      </aside>
    </article>
    </Lightbox>
  );
}
