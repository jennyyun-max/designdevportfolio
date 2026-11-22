import Link from "next/link";
import { about } from "@/content/site";
import RevealImage from "../ui/RevealImage";
import Reveal from "../ui/Reveal";
import SplitHeading from "../ui/SplitHeading";

/* Homepage: who Chloe is, in one spread — a portrait, the short version, what she works on. */
export default function ProfileTeaser() {
  return (
    <section aria-labelledby="profile-heading" className="mx-auto max-w-[1600px] px-5 pt-28 sm:px-8 md:pt-40">
      <div className="grid gap-6 border-t border-ink pt-5 md:grid-cols-12">
        <p className="meta text-muted md:col-span-3">(03) Profile</p>
        <div className="md:col-span-9">
          <SplitHeading
            id="profile-heading"
            className="display text-[clamp(2.6rem,6vw,6rem)]"
            label="From the stage to designing for people."
            lines={["From the stage", <span key="b">to designing for <em>people.</em></span>]}
          />
        </div>
      </div>
      <div className="mt-14 grid gap-10 md:grid-cols-12">
        <Link href="/about" className="group md:col-span-4 md:col-start-4" data-cursor="view" aria-label="About Chloe — read the profile">
          <RevealImage image={{ src: about.photo.src, alt: about.photo.alt }} aspect="aspect-[4/5]" sizes="(min-width: 768px) 30vw, 100vw" mono />
          <p className="meta mt-3 flex justify-between text-muted">
            <span>Chloe Yun</span>
            <span>Fig. 01</span>
          </p>
        </Link>
        <Reveal className="md:col-span-4 md:col-start-9 md:self-end">
          <p className="text-[1.05rem] leading-relaxed">{about.paragraphs[0]}</p>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">{about.paragraphs[3]}</p>
          <ul className="meta mt-8 border-t border-line" aria-label="What I work on">
            {about.interests.map((x, i) => (
              <li key={x} className="flex justify-between border-b border-line py-2">
                <span>{x}</span>
                <span className="text-muted">{String(i + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ul>
          <Link href="/about" className="wipe mt-8 inline-block text-[0.95rem]">
            Read the profile →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
