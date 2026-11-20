import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import type { Project } from "@/lib/types";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import MediaFrame from "../ui/MediaFrame";
import CaseSection from "./CaseSection";
import Figure from "./Figure";
import ReadingProgress from "./ReadingProgress";

/* Reusable case-study template. All content comes from content/projects.ts.
   Sections without content are skipped and the numbering closes up. */
export default function CaseStudy({ project, index, next }: { project: Project; index: number; next: Project }) {
  const { caseStudy: cs, tone, visual } = project;
  const label = cs.labels ?? {};
  const links = (cs.links ?? []).filter((l) => l.href);

  const facts = [
    { term: "role", value: cs.role?.summary },
    { term: "timeline", value: cs.timeline?.duration },
    { term: "tools", value: cs.tools?.join(", ") },
    { term: "team", value: cs.team },
  ].filter((f): f is { term: string; value: string } => Boolean(f.value));

  // Overview is section 1; every section that renders takes the next number
  let n = 1;
  const section = (id: string, fallback: string, key: keyof typeof label, content: ReactNode, opts: { heading?: string; tone?: string } = {}) => (
    <CaseSection id={id} number={++n} label={label[key] ?? fallback} heading={opts.heading} tone={opts.tone}>
      {content}
    </CaseSection>
  );

  const renderInsights = () =>
    !!cs.insights?.length &&
        section(
          "insights",
          "user insights",
          "insights",
          <ol className={`grid gap-5 ${cs.insights.length % 2 === 0 && cs.insights.length < 6 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
            {cs.insights.map((ins, i) => (
              <Reveal as="li" key={`${ins.title}-${i}`} delay={(i % 3) * 0.08} className="border border-line bg-surface p-7">
                <span className="accent text-[0.8rem]" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <p className="display mt-4 text-2xl tracking-[-0.02em]">{ins.title}</p>
                <p className="mt-2 text-muted">{ins.detail}</p>
              </Reveal>
            ))}
          </ol>,
          { heading: label.insightsHeading ?? "what we learned" }
        );

  const renderProcess = () =>
    !!cs.process?.length &&
        section(
          "process",
          "design process",
          "process",
          <ol>
            {cs.process.map((step, i) => (
              <Reveal as="li" key={`${step.title}-${i}`} className="grid gap-2 border-t border-line py-7 last:border-b sm:grid-cols-[12rem_1fr] sm:gap-10">
                <p className="display text-3xl">
                  <span className="accent mr-3 align-middle text-[0.8rem]">{String(i + 1).padStart(2, "0")}</span>
                  {step.title}
                </p>
                <p className="text-lg leading-relaxed text-muted">{step.detail}</p>
              </Reveal>
            ))}
          </ol>
        );

  return (
    <article>
      <ReadingProgress />

      {/* 01 — Overview */}
      <header>
        <Container className="pb-12 pt-8 sm:pt-12">
          <Link href="/#work" className="group inline-flex items-center gap-2 text-sm font-semibold">
            <ArrowLeft size={16} aria-hidden="true" className="transition-transform group-hover:-translate-x-1" />
            <span className="link">all work</span>
          </Link>
          <Reveal>
            <p className="eyebrow mt-12">
              <span className="mr-2 text-silver">{String(index + 1).padStart(2, "0")}</span>
              {project.category}
              {project.year && ` · ${project.year}`}
            </p>
            <h1 className="display mt-4 max-w-[14ch] text-balance text-[clamp(3.2rem,9vw,7.5rem)] leading-[0.92]">{project.title}</h1>
            <p className="mt-8 max-w-[42rem] text-[clamp(1.15rem,2vw,1.4rem)] leading-relaxed text-muted">{cs.overview}</p>
          </Reveal>
          {facts.length > 0 && (
            <Reveal delay={0.1}>
              <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-line py-8 lg:grid-cols-4">
                {facts.map(({ term, value }) => (
                  <div key={term}>
                    <dt className="eyebrow">{term}</dt>
                    <dd className="mt-2 font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </Container>
        <Container>
          <Reveal>
            <MediaFrame image={project.cover} tone={tone} visual={visual} aspect="aspect-video" sizes="(min-width: 1216px) 1136px, 100vw" priority />
          </Reveal>
        </Container>
      </header>

      {/* Problem */}
      {cs.problem &&
        section(
          "problem",
          "problem statement",
          "problem",
          <Reveal>
            <p className="display max-w-[24ch] text-balance text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08]">
              
              {cs.problem}
              
            </p>
          </Reveal>
        )}

      {/* Role */}
      {!!cs.role?.responsibilities?.length &&
        section(
          "role",
          "my role",
          "role",
          <Reveal>
            <ul className="grid gap-3 sm:grid-cols-2">
              {cs.role.responsibilities.map((r) => (
                <li key={r} className="flex gap-3 border-t border-line py-4">
                  <span className="mt-2 h-2 w-2 shrink-0 bg-silver" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>,
          { heading: cs.role.summary }
        )}

      {/* Timeline & tools */}
      {!!cs.timeline?.phases?.length &&
        section(
          "timeline",
          "timeline & tools",
          "timeline",
          <Reveal>
            <ol className="grid gap-4 border-l border-line pl-6 sm:grid-cols-2 sm:border-l-0 sm:pl-0 lg:grid-cols-4">
              {cs.timeline.phases.map((phase) => (
                <li key={phase.label} className="relative sm:border-t sm:border-line sm:pt-5">
                  <span className="absolute -left-[1.85rem] top-1.5 h-3 w-3 border border-silver bg-bg sm:-top-1.5 sm:left-0" aria-hidden="true" />
                  <p className="eyebrow">{phase.label}</p>
                  <p className="mt-1 font-medium">{phase.detail}</p>
                </li>
              ))}
            </ol>
            {cs.tools && cs.tools.length > 0 && (
              <ul className="mt-10 flex flex-wrap gap-2.5" aria-label="Tools">
                {cs.tools.map((t) => (
                  <li key={t} className="mono border border-line px-3 py-1.5 text-[0.75rem] uppercase tracking-[0.06em] text-silver">{t}</li>
                ))}
              </ul>
            )}
          </Reveal>,
          { heading: cs.timeline.duration }
        )}

      {/* Research */}
      {cs.research &&
        section(
          "research",
          "research & discovery",
          "research",
          <>
            <Reveal>
              {cs.research.stats && (
                <dl className="mb-10 grid grid-cols-3 gap-4">
                  {cs.research.stats.map((s) => (
                    <div key={s.label} className="border border-line p-5 sm:p-7">
                      <dd className="display text-[clamp(2.5rem,6vw,4.5rem)] leading-none">{s.value}</dd>
                      <dt className="mt-2 text-sm font-medium text-muted sm:text-base">{s.label}</dt>
                    </div>
                  ))}
                </dl>
              )}
              <p className="max-w-[40rem] text-lg leading-relaxed">{cs.research.summary}</p>
              {cs.research.methods && (
                <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Methods">
                  {cs.research.methods.map((m) => (
                    <li key={m} className="mono border border-line px-3 py-1.5 text-[0.75rem] uppercase tracking-[0.06em] text-silver">{m}</li>
                  ))}
                </ul>
              )}
            </Reveal>
            {cs.research.images?.map((img, i) => (
              <Reveal key={i} className="mt-10">
                <Figure image={img} tone="ivory" visual="circles" />
              </Reveal>
            ))}
          </>,
          { tone: "bg-surface" }
        )}

      {/* Insights & process (order is configurable) */}
      {cs.processFirst ? (
        <>
          {renderProcess()}
          {renderInsights()}
        </>
      ) : (
        <>
          {renderInsights()}
          {renderProcess()}
        </>
      )}

      {/* Wireframes */}
      {!!cs.wireframes?.length &&
        section(
          "wireframes",
          "wireframes & iterations",
          "wireframes",
          <div className={`grid gap-8 sm:grid-cols-2 ${cs.wireframes.length === 3 ? "lg:grid-cols-3" : ""}`}>
            {cs.wireframes.map((img, i, all) => (
              <Reveal key={i} delay={(i % 2) * 0.1} className={all.length % 2 === 1 && all.length !== 3 && i === 0 ? "sm:col-span-2" : ""}>
                <Figure image={img} tone="lavender" visual="frames" sizes="(min-width: 640px) 50vw, 100vw" />
              </Reveal>
            ))}
          </div>,
          { tone: "bg-surface" }
        )}

      {/* Final designs */}
      {!!cs.finalDesigns?.length &&
        section(
          "final",
          "final designs",
          "final",
          cs.finalLayout === "phones" ? (
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {cs.finalDesigns.map((img, i) => (
                <Reveal key={i} delay={(i % 4) * 0.08}>
                  <Figure image={img} tone={tone} visual={visual} sizes="(min-width: 1024px) 220px, 50vw" />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="space-y-10">
              {cs.finalDesigns.map((img, i) => (
                <Reveal key={i}>
                  <Figure image={img} tone={tone} visual={visual} sizes="(min-width: 1024px) 860px, 100vw" />
                </Reveal>
              ))}
            </div>
          )
        )}

      {/* Outcomes & reflection */}
      {(cs.outcomes?.length || cs.reflection || links.length > 0) &&
        section(
          "outcomes",
          "outcomes & reflections",
          "outcomes",
          <Reveal>
            {cs.outcomes && cs.outcomes.length > 0 && (
              <ul className="mb-12 space-y-3">
                {cs.outcomes.map((o) => (
                  <li key={o} className="display flex gap-4 text-[clamp(1.4rem,2.4vw,1.9rem)] tracking-[-0.02em]">
                    <span className="accent mt-2 text-[0.8rem]" aria-hidden="true">→</span>
                    {o}
                  </li>
                ))}
              </ul>
            )}
            {cs.reflection && <blockquote className="max-w-[40rem] border-l-2 border-silver pl-6 text-lg leading-relaxed">{cs.reflection}</blockquote>}
            {links.length > 0 && (
              <ul className="mt-10 flex flex-wrap gap-4">
                {links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} target="_blank" rel="noreferrer" className="link font-semibold">
                      {l.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>,
          { tone: "bg-surface" }
        )}

      {/* Next project */}
      <nav aria-label="Next project" className="border-t border-line">
        <Container className="py-20 sm:py-28">
          <Link href={`/work/${next.slug}`} data-cursor="view" className="group block">
            <p className="eyebrow">next project</p>
            <p className="display mt-4 flex items-center gap-5 text-[clamp(2.6rem,7vw,5.5rem)] leading-none">
              <span className="bg-[linear-gradient(var(--accent),var(--accent))] bg-[length:0%_3px] bg-left-bottom bg-no-repeat pb-2 transition-[background-size] duration-500 group-hover:bg-[length:100%_3px]">
                {next.title}
              </span>
              <ArrowUpRight className="h-[0.6em] w-[0.6em] shrink-0 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
            </p>
            <p className="mt-3 text-muted">
              {next.category}
              {next.year && ` · ${next.year}`}
            </p>
          </Link>
        </Container>
      </nav>
    </article>
  );
}
