import Link from "next/link";
import type { Project } from "@/lib/types";
import RevealImage from "../ui/RevealImage";

/* Tools + methods straight from the case study (nothing added) */
export function toolsOf(project: Project) {
  return [...(project.caseStudy.tools ?? []), ...(project.caseStudy.research?.methods ?? [])];
}

const ASPECT = {
  full: "aspect-[4/3] md:aspect-[16/8]",
  wide: "aspect-[4/3]",
  tall: "aspect-[4/5]",
} as const;

const SIZES = {
  full: "(min-width: 1600px) 1540px, 100vw",
  wide: "(min-width: 768px) 60vw, 100vw",
  tall: "(min-width: 768px) 42vw, 100vw",
} as const;

/* A project as an editorial plate: a large image that uncovers itself on scroll, then a strong
   title with compact metadata. Hover: the image eases in, the title is underlined and
   “View case study” slides up from the corner. */
export default function ProjectTile({
  project,
  n,
  shape = "wide",
  priority = false,
}: {
  project: Project;
  n: number;
  shape?: keyof typeof ASPECT;
  priority?: boolean;
}) {
  const role = project.caseStudy.role?.summary;
  return (
    <Link href={`/work/${project.slug}`} data-cursor="view" className="group block">
      <div className="relative">
        <RevealImage image={project.cover} aspect={ASPECT[shape]} sizes={SIZES[shape]} priority={priority} />
        <span className="meta pointer-events-none absolute bottom-0 left-0 translate-y-2 bg-paper px-3 py-2 opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none">
          View case study →
        </span>
      </div>
      <div className="mt-4 grid gap-x-6 gap-y-2 border-t border-line pt-4 md:grid-cols-[auto_1fr_auto]">
        <span className="meta pt-[0.35em] text-muted">({String(n).padStart(2, "0")})</span>
        <div>
          <h3 className={`display ${shape === "full" ? "text-[clamp(2.4rem,5.2vw,5rem)]" : "text-[clamp(2rem,3.4vw,3.2rem)]"}`}>
            <span className="wipe">{project.title}</span>
          </h3>
          <p className="mt-2 max-w-[46ch] text-[0.95rem] leading-relaxed text-muted">{project.tagline ?? project.description}</p>
        </div>
        <dl className="meta grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-muted md:min-w-[12rem] md:text-right">
          <dt className="sr-only">Category</dt>
          <dd className="col-span-2 text-ink">{project.category}</dd>
          {role && (
            <>
              <dt>Role</dt>
              <dd className="text-ink">{role}</dd>
            </>
          )}
          {project.year && (
            <>
              <dt>Year</dt>
              <dd className="text-ink">{project.year}</dd>
            </>
          )}
        </dl>
      </div>
    </Link>
  );
}
