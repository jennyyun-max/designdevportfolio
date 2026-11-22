import Image from "next/image";
import Link from "next/link";
import type { Project, Tone } from "@/lib/types";
import PlaceholderArt from "../ui/PlaceholderArt";

const mat: Record<Tone, string> = {
  blush: "var(--blush)",
  pink: "var(--pink)",
  lavender: "var(--lavender)",
  butter: "var(--butter)",
  sage: "var(--sage)",
  ivory: "var(--peach)",
};

/* Tools + methods straight from the case study (nothing added) */
export function toolsOf(project: Project) {
  return [...(project.caseStudy.tools ?? []), ...(project.caseStudy.research?.methods ?? [])];
}

/* A project in the work room: big image on a colored mat (taped down), then category,
   name, one line, Chloe’s actual role, tools & methods. Hover: the card lifts and tilts,
   the image zooms, and a round “read the story” sticker spins in. */
export default function ProjectCard({
  project,
  index,
  size = "regular",
  priority = false,
}: {
  project: Project;
  index: number;
  size?: "feature" | "regular";
  priority?: boolean;
}) {
  const tools = toolsOf(project);
  const tilt = index % 2 ? "hover:rotate-[0.7deg]" : "hover:-rotate-[0.7deg]";
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="view"
      className={`group relative block rounded-[24px] bg-ivory p-3 shadow-[0_1px_0_var(--line),0_18px_40px_-30px_rgba(58,38,32,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 ${tilt} motion-reduce:transition-none motion-reduce:hover:transform-none sm:p-4`}
    >
      {/* the mat + image */}
      <div className="relative rounded-[18px] p-[5%]" style={{ backgroundColor: mat[project.tone] }}>
        <span className="tape -top-2.5 left-[12%] -rotate-6" style={{ ["--tape" as string]: index % 2 ? "var(--butter)" : "var(--paper)" }} aria-hidden="true" />
        <div
          className={`relative overflow-hidden rounded-[10px] bg-paper shadow-[0_10px_24px_-16px_rgba(58,38,32,0.55)] ${size === "feature" ? "aspect-[16/10]" : "aspect-[4/3]"}`}
        >
          {project.cover.src ? (
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              priority={priority}
              sizes={size === "feature" ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 1024px) 560px, 100vw"}
              className={`transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
                project.cover.fit === "contain" ? "object-contain p-3" : "object-cover"
              }`}
              style={{ objectPosition: project.cover.focus ?? "50% 50%" }}
            />
          ) : (
            <PlaceholderArt variant={project.visual} label={project.title} />
          )}
        </div>
        {/* the sticker that spins in on hover */}
        <span
          className="sticker-shadow absolute -bottom-5 -right-2 grid h-[5.2rem] w-[5.2rem] scale-50 place-items-center rounded-full bg-espresso p-2 text-center text-[0.8rem] font-semibold leading-tight text-ivory opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.3,1.6,0.6,1)] group-hover:rotate-[-10deg] group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 motion-reduce:transition-none sm:h-24 sm:w-24"
          aria-hidden="true"
        >
          read the story ↗
        </span>
      </div>

      <div className="px-2 pb-2 pt-5 sm:px-3">
        <p className="eyebrow">
          {project.category}
          {project.year && ` · ${project.year}`}
        </p>
        <h3 className={`display mt-2 ${size === "feature" ? "text-[clamp(2.1rem,4vw,3.4rem)]" : "text-[clamp(1.8rem,3vw,2.5rem)]"}`}>
          <span className="bg-[linear-gradient(var(--blush),var(--blush))] bg-[length:0%_0.32em] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_0.32em]">
            {project.title}
          </span>
        </h3>
        <p className="mt-3 max-w-[38rem] leading-relaxed text-espresso-soft">{project.tagline ?? project.description}</p>
        <dl className="mt-5 grid gap-x-6 gap-y-3 text-[0.92rem] sm:grid-cols-[auto_1fr]">
          {project.caseStudy.role?.summary && (
            <>
              <dt className="eyebrow pt-0.5">my role</dt>
              <dd className="font-semibold">{project.caseStudy.role.summary}</dd>
            </>
          )}
          {project.caseStudy.team && (
            <>
              <dt className="eyebrow pt-0.5">team</dt>
              <dd>{project.caseStudy.team}</dd>
            </>
          )}
          {tools.length > 0 && (
            <>
              <dt className="eyebrow pt-1">tools & methods</dt>
              <dd>
                <ul className="flex flex-wrap gap-1.5">
                  {tools.map((t) => (
                    <li key={t} className="rounded-full border border-espresso/15 bg-cream px-2.5 py-0.5 text-[0.82rem]">
                      {t}
                    </li>
                  ))}
                </ul>
              </dd>
            </>
          )}
        </dl>
      </div>
    </Link>
  );
}
