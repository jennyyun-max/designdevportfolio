import type { Metadata } from "next";
import { projects } from "@/content/projects";
import ProjectCard from "@/components/work/ProjectCard";
import Reveal from "@/components/ui/Reveal";
import { Sketchbook, Sparkle } from "@/components/doodles/Doodles";

export const metadata: Metadata = {
  title: "My work",
  description: "Case studies by Chloe Yun: Atlas Digital’s Brookfield Knowledge Hub, LUMEN, a Costco app redesign, NUSEUM, data analysis and more.",
};

export default function WorkPage() {
  const [lead, ...rest] = projects;
  return (
    <div className="mx-auto max-w-[1320px] px-5 pb-24 pt-8 sm:px-8 sm:pt-14">
      <header className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="eyebrow flex items-center gap-2">
            <Sketchbook className="h-6 w-6" /> room 01 · my work
          </p>
          <h1 className="display mt-4 text-[clamp(3rem,9vw,7rem)]">
            things I’ve <em>made</em>
          </h1>
          <p className="mt-5 max-w-[40rem] text-[1.1rem] leading-relaxed text-espresso-soft">
            Real projects from research to final screens — what the problem was, what I learned, the decisions I made, and what I’d do next.
          </p>
        </div>
        <p className="hand flex items-center gap-2 text-[1.6rem] leading-none text-rose-deep" aria-hidden="true">
          <Sparkle className="h-7 w-7" /> start with Atlas Digital ↓
        </p>
      </header>

      <div className="mt-12">
        <ProjectCard project={lead} index={0} size="feature" priority />
      </div>
      <ul className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
        {rest.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={(i % 2) * 0.08}>
            <ProjectCard project={p} index={i + 1} />
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
