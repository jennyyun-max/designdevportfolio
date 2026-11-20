import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import MediaFrame from "../ui/MediaFrame";

/* Large project card. The whole card is one link to the case study. */
export default function ProjectCard({ project, index, featured = false }: { project: Project; index: number; featured?: boolean }) {
  const { slug, title, category, year, description, cover, tone, visual } = project;
  return (
    <Link href={`/work/${slug}`} data-cursor="view" aria-label={`${title} — ${category}, ${year}. View case study`} className="group block">
      <MediaFrame
        image={cover}
        tone={tone}
        visual={visual}
        aspect={featured ? "aspect-video" : "aspect-[4/3]"}
        sizes={featured ? "(min-width: 1024px) 1200px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
        imageClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <p className="eyebrow">
            <span className="accent mr-2 text-base normal-case tracking-normal text-rose">{String(index + 1).padStart(2, "0")}</span>
            {category} · {year}
          </p>
          <h3 className={`display mt-2 ${featured ? "text-[clamp(2.25rem,4.5vw,3.5rem)]" : "text-[clamp(2rem,3.5vw,2.6rem)]"}`}>
            <span className="bg-[linear-gradient(var(--rose),var(--rose))] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
              {title}
            </span>
          </h3>
          <p className="mt-3 max-w-[34rem] text-espresso-soft">{description}</p>
        </div>
        <span
          className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-espresso transition-all duration-300 group-hover:rotate-45 group-hover:bg-espresso group-hover:text-ivory motion-reduce:transition-none motion-reduce:group-hover:rotate-0"
          aria-hidden="true"
        >
          <ArrowUpRight size={20} />
        </span>
      </div>
    </Link>
  );
}
