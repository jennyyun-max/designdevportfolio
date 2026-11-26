import type { Metadata } from "next";
import { projects } from "@/content/projects";
import WorkViews from "@/components/work/WorkViews";
import SplitHeading from "@/components/ui/SplitHeading";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Case studies by Chloe Yun: LUMEN, a Costco app redesign, Atlas Digital’s Brookfield Knowledge Hub, data analysis, from K-pop to data science, and an AI food & health startup.",
};

export default function WorkPage() {
  const count = String(projects.length).padStart(2, "0");
  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-8 sm:px-8 sm:pt-12">
      <header className="grid gap-6 pb-14 md:grid-cols-12 md:pb-20">
        <div className="md:col-span-3">
          <p className="meta text-muted">Project index / 2026</p>
          <p className="meta mt-2 text-muted">{count} projects</p>
        </div>
        <div className="relative md:col-span-9">
          <SplitHeading
            as="h1"
            inView={false}
            label="Selected Work"
            className="display text-[clamp(3.8rem,11vw,10.5rem)] leading-[0.84] tracking-[-0.04em]"
            lines={["Selected", <em key="w">Work</em>]}
          />
          {/* a small, slowly turning star — the one decorative flourish */}
          <span className="absolute right-0 top-2 hidden text-[1.6rem] text-oxblood motion-safe:animate-[spin_14s_linear_infinite] md:block" aria-hidden="true">
            ✦
          </span>
          <p className="mt-8 max-w-[46ch] text-[clamp(1.05rem,1.5vw,1.25rem)] leading-relaxed">
            Product design, research, data and creative technology — {projects.length} projects, from the first interview to the final screen.
          </p>
        </div>
      </header>
      <WorkViews projects={projects} />
    </div>
  );
}
