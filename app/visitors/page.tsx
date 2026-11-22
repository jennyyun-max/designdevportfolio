import type { Metadata } from "next";
import VisitorCards from "@/components/visitors/VisitorCards";
import SplitHeading from "@/components/ui/SplitHeading";

export const metadata: Metadata = {
  title: "Visitors",
  description: "The visitor archive: design your own admission card to Chloe’s World — colour, pattern, type and signature.",
};

export default function VisitorsPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 pt-8 sm:px-8 sm:pt-12">
      <header className="grid gap-6 md:grid-cols-12">
        <p className="meta text-muted md:col-span-3">(Visitors)</p>
        <div className="md:col-span-9">
          <SplitHeading
            as="h1"
            inView={false}
            label="The visitor archive"
            className="display text-[clamp(3.6rem,11vw,11rem)] leading-[0.84] tracking-[-0.045em]"
            lines={["The visitor", <em key="a">archive</em>]}
          />
          <p className="mt-8 max-w-[46ch] text-[1.1rem] leading-relaxed text-muted">
            Thanks for coming by. Design an admission card — pick a colour, a pattern and a typeface, and sign it. Each one gets its own number.
          </p>
        </div>
      </header>
      <div className="mt-16">
        <VisitorCards />
      </div>
    </div>
  );
}
