import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import MediaFrame from "../ui/MediaFrame";

/* Project card. The whole card is one link to the case study.
   The featured card adds a large interface preview, the role, and the problem in one sentence. */
export default function ProjectCard({ project, index, featured = false }: { project: Project; index: number; featured?: boolean }) {
  const { slug, title, category, year, description, cover, tone, visual, caseStudy } = project;
  const meta = `${String(index + 1).padStart(2, "0")} · ${category}${year ? ` · ${year}` : ""}`;

  if (featured) {
    return (
      <Link
        href={`/work/${slug}`}
        data-cursor="view"
        aria-label={`${title} — ${category}${year ? `, ${year}` : ""}. Read the case study`}
        className="group grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-end lg:gap-12"
      >
        <MediaFrame
          image={cover}
          tone={tone}
          visual={visual}
          aspect="aspect-video"
          sizes="(min-width: 1024px) 760px, 100vw"
          imageClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div>
          <p className="eyebrow">{meta}</p>
          <h3 className="display mt-4 text-[clamp(2.75rem,5.5vw,4.75rem)] transition-colors group-hover:text-accent">{title}</h3>
          <p className="mt-5 text-lg leading-relaxed">{caseStudy.problem ?? description}</p>
          {caseStudy.role?.summary && (
            <dl className="mono mt-6 border-t border-line pt-4 text-[0.75rem] uppercase tracking-[0.06em]">
              <dt className="inline text-muted">role — </dt>
              <dd className="inline text-silver">{caseStudy.role.summary}</dd>
            </dl>
          )}
          <span className="mono mt-8 inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.08em] text-accent">
            read the case study
            <ArrowUpRight size={15} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/work/${slug}`} data-cursor="view" aria-label={`${title} — ${category}${year ? `, ${year}` : ""}. View case study`} className="group block">
      <MediaFrame
        image={cover}
        tone={tone}
        visual={visual}
        aspect="aspect-[16/10]"
        sizes="(min-width: 768px) 50vw, 100vw"
        imageClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <div className="mt-5 flex items-start justify-between gap-6 border-t border-line pt-4">
        <div>
          <p className="eyebrow">{meta}</p>
          <h3 className="display mt-3 text-[clamp(1.9rem,3.2vw,2.6rem)] transition-colors group-hover:text-accent">{title}</h3>
          <p className="mt-3 max-w-[34rem] text-muted">{description}</p>
        </div>
        <ArrowUpRight size={22} aria-hidden="true" className="mt-1 shrink-0 text-silver transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>
    </Link>
  );
}
