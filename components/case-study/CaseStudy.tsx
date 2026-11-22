import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { ImageAsset, Project } from "@/lib/types";
import Reveal from "../ui/Reveal";
import MediaFrame from "../ui/MediaFrame";
import ReadingProgress from "./ReadingProgress";
import { toolsOf } from "../work/ProjectCard";
import { Sparkle } from "../doodles/Doodles";

const pad = (n: number) => String(n).padStart(2, "0");

type Chapter = { id: string; label: string; heading?: string; body?: ReactNode };

function Figure({ image, tone, visual, sizes = "(min-width: 1024px) 900px, 100vw" }: { image: ImageAsset; tone: Project["tone"]; visual: Project["visual"]; sizes?: string }) {
  return (
    <figure>
      <MediaFrame image={image} tone={tone} visual={visual} aspect={image.aspect ?? "aspect-video"} sizes={sizes} className="shadow-[0_18px_36px_-28px_rgba(58,38,32,0.6)]" />
      {image.caption && <figcaption className="hand mt-2 text-[1.35rem] leading-tight text-espresso-soft">{image.caption}</figcaption>}
    </figure>
  );
}

/* The case-study template — the same chapters for every project, so recruiters can scan:
   Problem → Context → Research → Process → Design decisions → Final design → Outcomes → Reflection.
   Everything comes from content/projects.ts; a chapter without content is skipped and the
   numbering closes up. Nothing is generated or embellished here. */
export default function CaseStudy({ project, next }: { project: Project; index: number; next: Project }) {
  const { caseStudy: cs, tone, visual } = project;
  const label = cs.labels ?? {};
  const tools = toolsOf(project);
  const links = (cs.links ?? []).filter((l) => l.href);

  const facts = [
    { term: "my role", value: cs.role?.summary },
    { term: "team", value: cs.team },
    { term: "timeline", value: cs.timeline?.duration },
  ].filter((f): f is { term: string; value: string } => Boolean(f.value));

  const chapters: Chapter[] = [];

  // 1 — Problem
  if (cs.problem) chapters.push({ id: "problem", label: label.problem ?? "the problem", heading: cs.problem });

  // 2 — Context
  if (cs.overview) {
    chapters.push({
      id: "context",
      label: "context",
      body: (
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <p className="text-[1.15rem] leading-relaxed">{cs.overview}</p>
          {!!cs.role?.responsibilities?.length && (
            <div className="ruled relative rounded-[6px] px-6 pb-5 pt-7 shadow-[0_18px_30px_-26px_rgba(58,38,32,0.6)]">
              <span className="tape -top-3 left-6 -rotate-3" aria-hidden="true" />
              <p className="hand text-[1.6rem] leading-none">what I did</p>
              <ul className="mt-2 space-y-0 leading-[1.9rem]">
                {cs.role.responsibilities.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span className="text-rose" aria-hidden="true">✦</span>
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
      label: label.research ?? "research",
      heading: r?.summary ? undefined : label.insightsHeading,
      body: (
        <>
          {r?.summary && <p className="max-w-[46rem] text-[1.15rem] leading-relaxed">{r.summary}</p>}
          {!!r?.stats?.length && (
            <dl className="mt-10 grid gap-4 sm:grid-cols-3">
              {r.stats.map((st, i) => (
                <Reveal key={st.label} delay={i * 0.06} className="rounded-[18px] bg-butter/70 p-6">
                  <dt className="sr-only">{st.label}</dt>
                  <dd>
                    <span className="display block text-[3.2rem] leading-none">{st.value}</span>
                    <span className="mt-2 block text-espresso-soft">{st.label}</span>
                  </dd>
                </Reveal>
              ))}
            </dl>
          )}
          {!!r?.methods?.length && (
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Research methods">
              {r.methods.map((m) => (
                <li key={m} className="rounded-full border border-espresso/15 bg-ivory px-3 py-1 text-[0.92rem]">
                  {m}
                </li>
              ))}
            </ul>
          )}
          {!!r?.images?.length && (
            <div className={`mt-10 grid gap-8 ${r.images.length > 1 ? "md:grid-cols-2" : ""}`}>
              {r.images.map((img) => (
                <Figure key={img.src} image={img} tone={tone} visual={visual} />
              ))}
            </div>
          )}
          {!!cs.insights?.length && (
            <>
              {r?.summary && <h3 className="display mt-16 text-[clamp(1.8rem,3.4vw,2.6rem)]">{label.insightsHeading ?? "what we learned"}</h3>}
              <ol className={`mt-8 grid gap-5 ${cs.insights.length % 2 === 0 && cs.insights.length < 6 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
                {cs.insights.map((ins, i) => (
                  <Reveal as="li" key={ins.title} delay={(i % 3) * 0.07} className="relative rounded-[18px] border border-espresso/10 bg-ivory p-6">
                    <span className="hand text-[1.5rem] leading-none text-rose-deep">#{i + 1}</span>
                    <p className="display mt-2 text-[1.55rem]">{ins.title}</p>
                    <p className="mt-2 text-espresso-soft">{ins.detail}</p>
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
      label: label.process && !cs.decisions ? label.process : "process",
      body: (
        <>
          {!!cs.timeline?.phases?.length && (
            <ol className="relative grid gap-4 sm:grid-cols-4">
              <span className="absolute left-0 right-0 top-6 hidden border-t-2 border-dashed border-rose/50 sm:block" aria-hidden="true" />
              {cs.timeline.phases.map((ph, i) => (
                <li key={ph.label} className="relative">
                  <span className="relative grid h-12 w-12 place-items-center rounded-full border-2 border-espresso bg-paper font-semibold">{i + 1}</span>
                  <p className="mt-3 font-semibold">{ph.label}</p>
                  <p className="text-[0.95rem] text-espresso-soft">{ph.detail}</p>
                </li>
              ))}
            </ol>
          )}
          {!!cs.process?.length && (
            <ol className={cs.timeline?.phases?.length ? "mt-14" : ""}>
              {cs.process.map((step, i) => (
                <Reveal as="li" key={step.title} className="grid gap-2 border-t border-line py-7 last:border-b sm:grid-cols-[14rem_1fr] sm:gap-10">
                  <p className="display text-[1.9rem]">
                    <span className="hand mr-2 text-[1.4rem] text-rose-deep">{pad(i + 1)}</span>
                    {step.title}
                  </p>
                  <p className="text-[1.08rem] leading-relaxed text-espresso-soft">{step.detail}</p>
                </Reveal>
              ))}
            </ol>
          )}
          {!!cs.wireframes?.length && (
            <div className={`mt-14 grid gap-x-8 gap-y-12 ${cs.wireframes.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
              {cs.wireframes.map((img, i) => (
                <Reveal key={img.src} delay={(i % 3) * 0.06} className={i % 2 ? "md:rotate-[0.8deg]" : "md:-rotate-[0.8deg]"}>
                  <Figure image={img} tone={tone} visual={visual} sizes="(min-width: 768px) 420px, 100vw" />
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
    const notes = ["var(--butter)", "var(--blush)", "var(--lavender)", "var(--sage)"];
    chapters.push({
      id: "decisions",
      label: "design decisions",
      heading: label.process && cs.decisions ? label.process : undefined,
      body: (
        <ol className="grid gap-6 sm:grid-cols-2">
          {cs.decisions.map((d, i) => (
            <Reveal
              as="li"
              key={d.title}
              delay={(i % 2) * 0.07}
              className={`relative rounded-[6px] p-6 pt-8 shadow-[0_16px_28px_-22px_rgba(58,38,32,0.7)] ${i % 2 ? "rotate-[0.8deg]" : "-rotate-[0.8deg]"}`}
            >
              <div className="absolute inset-0 -z-10 rounded-[6px]" style={{ backgroundColor: notes[i % notes.length] }} aria-hidden="true" />
              <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" style={{ ["--tape" as string]: "var(--paper)" }} aria-hidden="true" />
              <p className="hand text-[1.4rem] leading-none text-rose-deep">decision {i + 1}</p>
              <p className="display mt-2 text-[1.7rem]">{d.title}</p>
              <p className="mt-2 leading-relaxed">{d.detail}</p>
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
      label: "final design",
      heading: label.final && label.final !== "the screens" ? label.final : undefined,
      body: (
        <>
          {(
            <div className={cs.finalLayout === "phones" ? "grid grid-cols-2 gap-6 md:grid-cols-4" : "grid gap-12"}>
              {cs.finalDesigns.map((img, i) => (
                <Reveal key={img.src} delay={cs.finalLayout === "phones" ? (i % 4) * 0.06 : 0}>
                  <Figure image={img} tone={tone} visual={visual} sizes={cs.finalLayout === "phones" ? "(min-width: 768px) 260px, 45vw" : undefined} />
                </Reveal>
              ))}
            </div>
          )}
        </>
      ),
    });
  }

  // 7 — Outcomes
  if (cs.outcomes?.length) {
    chapters.push({
      id: "outcomes",
      label: label.outcomes ?? "outcomes",
      body: (
        <>
          {(
            <ul className={`grid gap-3 ${cs.outcomes.length > 1 ? "md:grid-cols-3" : ""}`}>
              {cs.outcomes.map((o) => (
                <li key={o} className="flex gap-3 rounded-[16px] bg-pink/70 p-5 font-semibold">
                  <Sparkle className="h-6 w-6 shrink-0" />
                  {o}
                </li>
              ))}
            </ul>
          )}
        </>
      ),
    });
  }

  // 8 — Reflection
  if (cs.reflection) {
    chapters.push({
      id: "reflection",
      label: "reflection",
      body: (
        <div className="relative max-w-[50rem]">
          <p className="display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.3]">
            <span className="accent text-rose" aria-hidden="true">“</span>
            {cs.reflection}
          </p>
          {links.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noreferrer" className="link font-semibold">
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
    <article>
      <ReadingProgress />

      {/* Opening */}
      <header className="mx-auto max-w-[1320px] px-5 pt-6 sm:px-8 sm:pt-10">
        <Link href="/work" className="group inline-flex items-center gap-2 text-[0.95rem] font-semibold">
          <span className="transition-transform group-hover:-translate-x-1" aria-hidden="true">←</span>
          <span className="link">all my work</span>
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="eyebrow">
              {project.category}
              {project.year && ` · ${project.year}`}
            </p>
            <h1 className="display mt-4 text-[clamp(3rem,8vw,6.6rem)]">{project.title}</h1>
            <p className="mt-6 max-w-[38rem] text-[clamp(1.1rem,1.6vw,1.3rem)] leading-relaxed text-espresso-soft">{project.tagline ?? project.description}</p>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 rounded-[20px] bg-ivory p-6 shadow-[0_1px_0_var(--line)]">
            {facts.map((f) => (
              <div key={f.term}>
                <dt className="eyebrow">{f.term}</dt>
                <dd className="mt-1 font-semibold">{f.value}</dd>
              </div>
            ))}
            {tools.length > 0 && (
              <div className="col-span-2">
                <dt className="eyebrow">tools & methods</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {tools.map((t) => (
                    <span key={t} className="rounded-full border border-espresso/15 bg-cream px-2.5 py-0.5 text-[0.85rem]">
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </div>
        <div className="relative mt-12 rounded-[28px] p-[3%]" style={{ backgroundColor: `var(--${tone === "ivory" ? "peach" : tone})` }}>
          <span className="tape -top-3 left-[10%] -rotate-6" aria-hidden="true" />
          <span className="tape -top-3 right-[10%] rotate-[5deg]" style={{ ["--tape" as string]: "var(--blush)" }} aria-hidden="true" />
          <div className="relative aspect-[16/9] overflow-hidden rounded-[14px] bg-paper shadow-[0_24px_44px_-30px_rgba(58,38,32,0.7)]">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              priority
              sizes="(min-width: 1320px) 1240px, 100vw"
              className={project.cover.fit === "contain" ? "object-contain p-4" : "object-cover"}
              style={{ objectPosition: project.cover.focus ?? "50% 50%" }}
            />
          </div>
        </div>
      </header>

      {/* Chapters, with a sticky index on wide screens */}
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:grid lg:grid-cols-[13rem_1fr] lg:gap-14">
        <nav aria-label="On this page" className="hidden lg:block">
          <ol className="sticky top-28 mt-24 space-y-2 border-l-2 border-dashed border-rose/40 pl-4 text-[0.95rem]">
            {chapters.map((c, i) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="nav-link">
                  <span className="hand mr-1.5 text-[1.15rem] text-rose-deep">{pad(i + 1)}</span>
                  {c.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div>
          {chapters.map((c, i) => (
            <section key={c.id} id={c.id} aria-labelledby={`${c.id}-label`} className="border-b border-line py-16 last:border-b-0 sm:py-24">
              <Reveal>
                <p id={`${c.id}-label`} className="flex items-baseline gap-3">
                  <span className="hand text-[2.2rem] leading-none text-rose-deep">{pad(i + 1)}</span>
                  <span className="eyebrow">{c.label}</span>
                </p>
                {c.heading && <h2 className="display mt-4 max-w-[24ch] text-balance text-[clamp(2rem,4.2vw,3.4rem)]">{c.heading}</h2>}
              </Reveal>
              {c.body && <div className="mt-10">{c.body}</div>}
            </section>
          ))}
        </div>
      </div>

      {/* Next project */}
      <aside className="mx-auto max-w-[1320px] px-5 pb-10 pt-6 sm:px-8">
        <Link href={`/work/${next.slug}`} className="group relative grid items-center gap-6 overflow-hidden rounded-[28px] bg-lavender p-6 sm:grid-cols-[1fr_16rem] sm:p-10">
          <div>
            <p className="hand text-[1.7rem] leading-none">next up →</p>
            <p className="display mt-3 text-[clamp(2.2rem,5vw,4rem)] transition-transform duration-500 group-hover:translate-x-2">{next.title}</p>
            <p className="mt-2 max-w-[34rem] text-espresso-soft">{next.tagline ?? next.description}</p>
          </div>
          <div className="relative aspect-[4/3] rotate-3 overflow-hidden rounded-[8px] bg-paper p-2 shadow-[0_18px_30px_-20px_rgba(58,38,32,0.7)] transition-transform duration-500 group-hover:rotate-0">
            <div className="relative h-full w-full overflow-hidden rounded-[4px]">
              <Image src={next.cover.src} alt="" fill sizes="256px" className={next.cover.fit === "contain" ? "object-contain" : "object-cover"} style={{ objectPosition: next.cover.focus ?? "50% 50%" }} />
            </div>
          </div>
        </Link>
      </aside>
    </article>
  );
}
