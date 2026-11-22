import Link from "next/link";
import { projects } from "@/content/projects";
import ProjectTile from "../work/ProjectTile";
import ProjectIndex from "../work/ProjectIndex";
import SplitHeading from "../ui/SplitHeading";

/* Homepage: the work, right after the introduction. Three projects as large plates in an
   asymmetrical arrangement, then the full index. */
export default function SelectedWork() {
  const [lead, second, third] = projects;
  return (
    <section id="work" aria-labelledby="work-heading" className="mx-auto max-w-[1600px] px-5 pt-24 sm:px-8 md:pt-36">
      <div className="grid gap-6 border-t border-ink pt-5 md:grid-cols-12">
        <p className="meta text-muted md:col-span-3">(01) Selected work</p>
        <SplitHeading
          id="work-heading"
          className="display text-[clamp(3rem,7.4vw,7.4rem)] md:col-span-9"
          label="Projects, from research to the final screens"
          lines={[
            "Projects, from",
            <span key="b">
              research to the <em>final screens</em>
            </span>,
          ]}
        />
      </div>

      <div className="mt-16 md:mt-24">
        <ProjectTile project={lead} n={1} shape="full" />
      </div>
      <div className="mt-20 grid gap-20 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <ProjectTile project={second} n={2} shape="wide" />
        </div>
        <div className="md:col-span-5 md:col-start-8 md:mt-[18%]">
          <ProjectTile project={third} n={3} shape="wide" />
        </div>
      </div>

      <div className="mt-28 grid gap-6 md:grid-cols-12">
        <p className="meta text-muted md:col-span-3">(02) Index — all projects</p>
        {/* not wrapped in a transform: the preview inside is position: fixed */}
        <div className="md:col-span-9">
          <ProjectIndex projects={projects} />
          <Link href="/work" className="wipe mt-6 inline-block text-[0.95rem]">
            View the work page →
          </Link>
        </div>
      </div>
    </section>
  );
}
