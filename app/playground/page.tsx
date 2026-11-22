import type { Metadata } from "next";
import PolaroidCamera from "@/components/playground/PolaroidCamera";
import DoodlePad from "@/components/playground/DoodlePad";
import TypeTester from "@/components/playground/TypeTester";
import SplitHeading from "@/components/ui/SplitHeading";

export const metadata: Metadata = {
  title: "Playground",
  description: "Three small experiments by Chloe Yun: an instant camera full of personal photos, a type tester and a drawing board.",
};

function Exhibit({ n, title, note, children }: { n: string; title: React.ReactNode; note: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-[1600px] px-5 pt-24 sm:px-8 md:pt-32">
      <div className="mb-12 grid gap-6 border-t border-ink pt-5 md:grid-cols-12">
        <p className="meta text-muted md:col-span-3">({n})</p>
        <h2 className="display text-[clamp(2.6rem,5.6vw,5.6rem)] md:col-span-6">{title}</h2>
        <p className="max-w-[30ch] text-muted md:col-span-3 md:self-end">{note}</p>
      </div>
      {children}
    </section>
  );
}

export default function PlaygroundPage() {
  return (
    <>
      <header className="mx-auto grid max-w-[1600px] gap-6 px-5 pt-8 sm:px-8 sm:pt-12 md:grid-cols-12">
        <p className="meta text-muted md:col-span-3">(Playground)</p>
        <div className="md:col-span-9">
          <SplitHeading as="h1" inView={false} label="Playground" className="display text-[clamp(4rem,14vw,14rem)] leading-[0.82] tracking-[-0.045em]" lines={["Play", <em key="g">ground</em>]} />
          <p className="mt-8 max-w-[46ch] text-[1.1rem] leading-relaxed text-muted">Three small experiments, kept apart from the case studies. Nothing here is graded.</p>
        </div>
      </header>

      <Exhibit n="01" title={<>The instant <em>camera</em></>} note="Every print is a personal photo, and each comes with a short true story.">
        <PolaroidCamera />
      </Exhibit>

      <Exhibit n="02" title={<>Type <em>tester</em></>} note="The three typefaces this site is set in. Type anything.">
        <TypeTester />
      </Exhibit>

      <Exhibit n="03" title={<>Drawing <em>board</em></>} note="Four inks, three line weights. Save what you make.">
        <div className="max-w-[60rem]">
          <DoodlePad label="Drawing board" allowSave />
        </div>
      </Exhibit>
    </>
  );
}
