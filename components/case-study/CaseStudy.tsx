import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import MediaFrame from "../ui/MediaFrame";
import CaseSection from "./CaseSection";
import Figure from "./Figure";
import ReadingProgress from "./ReadingProgress";

/* Reusable case-study template. All content comes from content/projects.ts. */
export default function CaseStudy({ project, index, next }: { project: Project; index: number; next: Project }) {
  const { caseStudy: cs, tone, visual } = project;
  const links = (cs.links ?? []).filter((l) => l.href);

  const facts = [
    { term: "role", value: cs.role.summary },
    { term: "timeline", value: cs.timeline.duration },
    { term: "tools", value: cs.tools.join(", ") },
    { term: "team", value: cs.team },
  ];

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
              <span className="accent mr-2 text-lg normal-case tracking-normal text-rose">{String(index + 1).padStart(2, "0")}</span>
              {project.category} · {project.year}
            </p>
            <h1 className="display mt-4 max-w-[14ch] text-balance text-[clamp(3.2rem,9vw,7.5rem)] leading-[0.92]">{project.title}</h1>
            <p className="mt-8 max-w-[42rem] text-[clamp(1.15rem,2vw,1.4rem)] leading-relaxed text-espresso-soft">{cs.overview}</p>
          </Reveal>
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
        </Container>
        <Container>
          <Reveal>
            <MediaFrame image={project.cover} tone={tone} visual={visual} aspect="aspect-[4/3] md:aspect-[16/8]" sizes="(min-width: 1216px) 1136px, 100vw" priority />
          </Reveal>
        </Container>
      </header>

      {/* 02 — Problem */}
      <CaseSection id="problem" number={2} label="problem statement">
        <Reveal>
          <p className="display max-w-[24ch] text-balance text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08]">
            <span className="accent text-rose" aria-hidden="true">“</span>
            {cs.problem}
            <span className="accent text-rose" aria-hidden="true">”</span>
          </p>
        </Reveal>
      </CaseSection>

      {/* 03 — Role */}
      <CaseSection id="role" number={3} label="my role" heading={cs.role.summary}>
        <Reveal>
          <ul className="grid gap-3 sm:grid-cols-2">
            {cs.role.responsibilities.map((r) => (
              <li key={r} className="flex gap-3 rounded-[14px] bg-ivory p-5">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-rose" aria-hidden="true" />
                {r}
              </li>
            ))}
          </ul>
        </Reveal>
      </CaseSection>

      {/* 04 — Timeline & tools */}
      <CaseSection id="timeline" number={4} label="timeline & tools" heading={cs.timeline.duration}>
        <Reveal>
          <ol className="grid gap-4 border-l border-line pl-6 sm:grid-cols-2 sm:border-l-0 sm:pl-0 lg:grid-cols-4">
            {cs.timeline.phases.map((phase) => (
              <li key={phase.label} className="relative sm:border-t sm:border-line sm:pt-5">
                <span className="absolute -left-[1.85rem] top-1.5 h-3 w-3 rounded-full border-2 border-rose bg-cream sm:-top-1.5 sm:left-0" aria-hidden="true" />
                <p className="eyebrow">{phase.label}</p>
                <p className="mt-1 font-medium">{phase.detail}</p>
              </li>
            ))}
          </ol>
          <ul className="mt-10 flex flex-wrap gap-2.5" aria-label="Tools">
            {cs.tools.map((t) => (
              <li key={t} className="rounded-[8px] bg-lavender px-3.5 py-1.5 font-medium">{t}</li>
            ))}
          </ul>
        </Reveal>
      </CaseSection>

      {/* 05 — Research */}
      <CaseSection id="research" number={5} label="research & discovery" tone="bg-pink">
        <Reveal>
          <p className="max-w-[40rem] text-lg leading-relaxed">{cs.research.summary}</p>
          <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Methods">
            {cs.research.methods.map((m) => (
              <li key={m} className="rounded-[8px] bg-ivory px-3.5 py-1.5 font-medium">{m}</li>
            ))}
          </ul>
        </Reveal>
        {cs.research.image && (
          <Reveal className="mt-10">
            <Figure image={cs.research.image} tone="butter" visual="circles" />
          </Reveal>
        )}
      </CaseSection>

      {/* 06 — Insights */}
      <CaseSection id="insights" number={6} label="user insights" heading="what we learned">
        <ol className="grid gap-5 md:grid-cols-3">
          {cs.insights.map((ins, i) => (
            <Reveal as="li" key={`${ins.title}-${i}`} delay={i * 0.08} className="rounded-[var(--radius-card)] bg-blush/60 p-7">
              <span className="accent text-4xl text-rose" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <p className="display mt-4 text-2xl tracking-[-0.02em]">{ins.title}</p>
              <p className="mt-2 text-espresso-soft">{ins.detail}</p>
            </Reveal>
          ))}
        </ol>
      </CaseSection>

      {/* 07 — Process */}
      <CaseSection id="process" number={7} label="design process">
        <ol className="space-y-0">
          {cs.process.map((step, i) => (
            <Reveal as="li" key={`${step.title}-${i}`} className="grid gap-2 border-t border-line py-7 last:border-b sm:grid-cols-[10rem_1fr] sm:gap-10">
              <p className="display text-3xl">
                <span className="accent mr-2 text-rose">{i + 1}.</span>
                {step.title}
              </p>
              <p className="text-lg leading-relaxed text-espresso-soft">{step.detail}</p>
            </Reveal>
          ))}
        </ol>
      </CaseSection>

      {/* 08 — Wireframes */}
      <CaseSection id="wireframes" number={8} label="wireframes & iterations" tone="bg-ivory">
        <div className="grid gap-8 sm:grid-cols-2">
          {cs.wireframes.map((img, i) => (
            <Reveal key={i} delay={(i % 2) * 0.1} className={cs.wireframes.length % 2 === 1 && i === 0 ? "sm:col-span-2" : ""}>
              <Figure image={img} tone="lavender" visual="frames" sizes="(min-width: 640px) 50vw, 100vw" />
            </Reveal>
          ))}
        </div>
      </CaseSection>

      {/* 09 — Final designs */}
      <CaseSection id="final" number={9} label="final designs">
        <div className="space-y-10">
          {cs.finalDesigns.map((img, i) => (
            <Reveal key={i}>
              <Figure image={img} tone={tone} visual={visual} aspect="aspect-[16/10]" sizes="(min-width: 1024px) 860px, 100vw" />
            </Reveal>
          ))}
        </div>
      </CaseSection>

      {/* 10 — Outcomes & reflection */}
      <CaseSection id="outcomes" number={10} label="outcomes & reflections" tone="bg-pink">
        <Reveal>
          <ul className="space-y-3">
            {cs.outcomes.map((o) => (
              <li key={o} className="display flex gap-4 text-[clamp(1.4rem,2.4vw,1.9rem)] tracking-[-0.02em]">
                <span className="accent text-rose" aria-hidden="true">✦</span>
                {o}
              </li>
            ))}
          </ul>
          <blockquote className="mt-12 max-w-[40rem] border-l-2 border-rose pl-6 text-lg leading-relaxed">{cs.reflection}</blockquote>
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
        </Reveal>
      </CaseSection>

      {/* Next project */}
      <nav aria-label="Next project" className="border-t border-line">
        <Container className="py-20 sm:py-28">
          <Link href={`/work/${next.slug}`} data-cursor="view" className="group block">
            <p className="eyebrow">next project</p>
            <p className="display mt-4 flex items-center gap-5 text-[clamp(2.6rem,7vw,5.5rem)] leading-none">
              <span className="bg-[linear-gradient(var(--rose),var(--rose))] bg-[length:0%_3px] bg-left-bottom bg-no-repeat pb-2 transition-[background-size] duration-500 group-hover:bg-[length:100%_3px]">
                {next.title}
              </span>
              <ArrowUpRight className="h-[0.6em] w-[0.6em] shrink-0 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
            </p>
            <p className="mt-3 text-espresso-soft">{next.category} · {next.year}</p>
          </Link>
        </Container>
      </nav>
    </article>
  );
}
