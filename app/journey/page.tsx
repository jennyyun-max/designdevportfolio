import type { Metadata } from "next";
import Storybook from "@/components/journey/Storybook";
import { Plane, Sparkle } from "@/components/doodles/Doodles";

export const metadata: Metadata = {
  title: "My journey",
  description: "California → Seoul → Ann Arbor: Chloe Yun’s path from growing up in California to five years on stage in Korea to designing at the University of Michigan.",
};

export default function JourneyPage() {
  return (
    <div className="mx-auto max-w-[1180px] px-5 pb-24 pt-8 sm:px-8 sm:pt-14">
      <header className="relative mx-auto max-w-[46rem] text-center">
        <Sparkle className="float absolute -left-2 top-0 w-10 sm:left-0" />
        <p className="eyebrow inline-flex items-center gap-2">
          <Plane className="h-6 w-6" /> room 03 · my journey
        </p>
        <h1 className="display mt-4 text-[clamp(3rem,9vw,6.6rem)]">
          the long way <em>here</em>
        </h1>
        <p className="hand mt-4 text-[clamp(1.6rem,3vw,2.2rem)] leading-none text-rose-deep">california → seoul → ann arbor</p>
        <p className="mx-auto mt-5 max-w-[36rem] text-[1.08rem] leading-relaxed text-espresso-soft">
          Three places, one person. My path into design wasn’t a straight line — and every stop taught me something I still use.
        </p>
      </header>
      <div className="mt-20">
        <Storybook />
      </div>
    </div>
  );
}
