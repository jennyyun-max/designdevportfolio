import Link from "next/link";
import { projects } from "@/content/projects";
import ProjectCard from "../work/ProjectCard";
import Reveal from "../ui/Reveal";
import { Sketchbook } from "../doodles/Doodles";

/* Homepage: the lead project (Atlas Digital / Brookfield) and two more, then the way to the work room */
export default function SelectedWork() {
  const [lead, second, third] = projects;
  return (
    <section id="work" aria-labelledby="work-heading" className="relative mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow flex items-center gap-2">
            <Sketchbook className="h-6 w-6" /> selected work
          </p>
          <h2 id="work-heading" className="display mt-3 text-[clamp(2.6rem,6vw,5rem)]">
            a few things I’ve <em>made</em>
          </h2>
        </div>
        <Link href="/work" className="link pb-2 text-[1.05rem] font-semibold">
          see all my work →
        </Link>
      </div>
      <Reveal className="mt-12">
        <ProjectCard project={lead} index={0} size="feature" />
      </Reveal>
      <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
        {[second, third].map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <ProjectCard project={p} index={i + 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
