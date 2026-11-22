import type { Metadata } from "next";
import { art } from "@/content/art";
import ArtGallery from "@/components/art/ArtGallery";
import SplitHeading from "@/components/ui/SplitHeading";

export const metadata: Metadata = {
  title: "Art",
  description: "Chloe Yun’s art portfolio: My Father’s Recovery, Observational Studies, and Body Image & Identity.",
};

export default function ArtPage() {
  return (
    <div className="art-theme mx-auto max-w-[1600px] px-5 pt-8 sm:px-8 sm:pt-12">
      <header className="grid gap-6 md:grid-cols-12">
        <p className="meta text-muted md:col-span-3">(Art)</p>
        <div className="md:col-span-9">
          <SplitHeading as="h1" inView={false} label="Art portfolio" className="display text-[clamp(4rem,13vw,13rem)] leading-[0.82] tracking-[-0.045em]" lines={["Art", <em key="p">portfolio</em>]} />
          <nav aria-label="Sections" className="mt-10">
            <ol className="meta flex flex-wrap gap-x-8 gap-y-2">
              {art.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="wipe">
                    <span className="text-muted">{String(i + 1).padStart(2, "0")}</span> {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </header>
      <ArtGallery sections={art} />
    </div>
  );
}
