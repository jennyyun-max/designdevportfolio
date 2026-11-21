import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import type { Project } from "@/lib/types";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import MediaFrame from "../ui/MediaFrame";
import DetailFlight from "./DetailFlight";

const pad = (n: number) => String(n).padStart(2, "0");

/* Lead project: one large spread with a real, legible screen, the title, my role,
   and one sentence about the actual design problem. The hero's revealed detail lands
   on [data-reveal-target], the matching spot inside this screen. */
function Spotlight({ project }: { project: Project }) {
  const s = project.spotlight!;
  return (
    <article aria-labelledby={`${project.slug}-title`}>
      <Link href={`/work/${project.slug}`} data-cursor="view" className="group block" aria-label={`${project.title} — read the case study`}>
        <div className="relative bg-blush p-[3%]">
          <div className="relative bg-paper shadow-[0_1px_2px_rgba(58,38,32,0.12),0_22px_44px_-22px_rgba(58,38,32,0.4)]" style={{ aspectRatio: "1440 / 560" }}>
            <Image src={s.image.src} alt={s.image.alt} fill priority sizes="(min-width: 1216px) 1136px, 100vw" className="object-cover object-top" />
            <span
              data-reveal-target
              className="pointer-events-none absolute outline outline-1 outline-transparent transition-[outline-color] duration-300 group-hover:outline-accent"
              style={{ left: `${s.detail.x * 100}%`, top: `${s.detail.y * 100}%`, width: `${s.detail.w * 100}%`, height: `${s.detail.h * 100}%` }}
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>

      <div className="mt-10 grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <p className="eyebrow">
            01 · {project.category} · {project.year}
          </p>
          <h3 id={`${project.slug}-title`} className="display mt-4 text-[clamp(2.6rem,6vw,5.25rem)]">
            {project.title}
          </h3>
          <p className="mt-5 max-w-[34rem] text-[clamp(1.1rem,1.6vw,1.35rem)] leading-snug">{project.tagline}</p>
        </div>
        <div className="md:col-span-5 md:pt-9">
          <dl className="mono grid grid-cols-[6rem_1fr] gap-y-2 border-t border-line pt-4 text-[0.75rem] uppercase tracking-[0.06em]">
            <dt className="text-muted">role</dt>
            <dd className="text-silver">{project.caseStudy.role?.summary}</dd>
            {project.caseStudy.team && (
              <>
                <dt className="text-muted">team</dt>
                <dd className="text-silver">{project.caseStudy.team}</dd>
              </>
            )}
          </dl>
          <p className="mt-6 font-medium">{s.heading}</p>
          <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
          <Link href={`/work/${project.slug}`} className="link mono mt-7 inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.08em] text-accent">
            Read the case study <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* Every other project: an editorial row — number, title, one “Helping …” sentence, role, image.
   Images alternate sides; hairlines instead of cards. */
function ProjectRow({ project, n }: { project: Project; n: number }) {
  const flip = n % 2 === 0;
  return (
    <Reveal as="li" className="border-t border-line">
      <Link href={`/work/${project.slug}`} data-cursor="view" className="group grid gap-6 py-10 md:grid-cols-12 md:gap-10 md:py-14">
        <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
          <MediaFrame
            image={project.cover}
            tone={project.tone}
            visual={project.visual}
            aspect="aspect-[16/10]"
            sizes="(min-width: 768px) 660px, 100vw"
            imageClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>
        <div className={`flex flex-col md:col-span-5 ${flip ? "md:order-1" : ""}`}>
          <p className="eyebrow">
            {pad(n)} · {project.category}
            {project.year && ` · ${project.year}`}
          </p>
          <h3 className="display mt-4 text-[clamp(2.1rem,4vw,3.4rem)] transition-colors group-hover:text-accent">{project.title}</h3>
          <p className="mt-4 text-lg leading-snug">{project.tagline ?? project.description}</p>
          {project.caseStudy.role?.summary && (
            <p className="mono mt-6 text-[0.75rem] uppercase tracking-[0.06em]">
              <span className="text-muted">role — </span>
              <span className="text-silver">{project.caseStudy.role.summary}</span>
            </p>
          )}
          <span className="mono mt-auto inline-flex items-center gap-2 pt-8 text-[0.75rem] uppercase tracking-[0.08em] text-silver group-hover:text-accent">
            case study <ArrowUpRight size={14} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function SelectedWork() {
  const [lead, ...rest] = projects;
  return (
    <section id="work" aria-labelledby="work-heading" className="relative">
      <Container className="pb-24 sm:pb-32">
        <div className="flex items-baseline justify-between border-t border-line pt-4">
          <h2 id="work-heading" className="eyebrow">
            Selected work
          </h2>
          <span className="eyebrow">({pad(projects.length)})</span>
        </div>
        <div className="mt-6">{lead.spotlight ? <Spotlight project={lead} /> : null}</div>
        <ol className="mt-24 sm:mt-32">
          {rest.map((p, i) => (
            <ProjectRow key={p.slug} project={p} n={i + 2} />
          ))}
        </ol>
      </Container>
      <DetailFlight />
    </section>
  );
}
