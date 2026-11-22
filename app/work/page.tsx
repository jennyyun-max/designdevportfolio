import type { Metadata } from "next";
import { projects } from "@/content/projects";
import WorkViews from "@/components/work/WorkViews";
import SplitHeading from "@/components/ui/SplitHeading";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies by Chloe Yun: LUMEN, a Costco app redesign, Atlas Digital’s Brookfield Knowledge Hub, data analysis, and from K-pop to data science.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-8 sm:px-8 sm:pt-12">
      <header className="grid gap-6 md:grid-cols-12">
        <p className="meta text-muted md:col-span-3">(Work)</p>
        <div className="md:col-span-9">
          <SplitHeading as="h1" inView={false} className="display text-[clamp(4.6rem,17vw,17rem)] leading-[0.8] tracking-[-0.045em]" label="Work" lines={["Work"]} />
          <p className="mt-8 max-w-[44ch] text-[1.1rem] leading-relaxed text-muted">
            Real projects, from research to the final screens: what the problem was, what I learned, the decisions I made — and what I’d do next.
          </p>
        </div>
      </header>
      <div className="mt-16 md:mt-24">
        <WorkViews projects={projects} />
      </div>
    </div>
  );
}
