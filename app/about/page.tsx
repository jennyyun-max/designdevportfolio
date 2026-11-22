import type { Metadata } from "next";
import Link from "next/link";
import { about, marquee, story } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";
import FlipPolaroid from "@/components/about/FlipPolaroid";
import JourneyTimeline from "@/components/about/JourneyTimeline";

export const metadata: Metadata = {
  title: "About",
  description: "Chloe Yun — from California to five years on stage in Korea to studying information at the University of Michigan and designing with Atlas Digital.",
};

const carried = story.chapters.find((c) => "points" in c && c.points)?.points ?? [];

export default function AboutPage() {
  return (
    <>
      {/* Opening */}
      <header className="mx-auto max-w-[1600px] px-5 pt-8 sm:px-8 sm:pt-12">
        <div className="grid gap-6 md:grid-cols-12">
          <p className="meta text-muted md:col-span-3">(Profile)</p>
          <SplitHeading
            as="h1"
            inView={false}
            label="From stage to screen."
            className="display text-[clamp(4rem,12.5vw,13rem)] leading-[0.82] tracking-[-0.045em] md:col-span-9"
            lines={["From stage", <span key="b">to <em>screen.</em></span>]}
          />
        </div>
        <div className="mt-12 grid gap-6 border-t border-ink pt-5 md:grid-cols-12">
          <p className="meta text-muted md:col-span-3">Chloe Yun — Designer, student</p>
          <Reveal as="p" className="max-w-[40ch] text-[clamp(1.2rem,1.9vw,1.6rem)] leading-snug md:col-span-6">
            {story.lead}
          </Reveal>
        </div>
      </header>

      {/* Portrait spread */}
      <section aria-label="Portrait" className="mx-auto mt-20 grid max-w-[1600px] gap-12 px-5 sm:px-8 md:mt-28 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6 lg:col-span-5 lg:col-start-2">
          <FlipPolaroid
            src={about.photo.src}
            alt={about.photo.alt}
            caption="Fig. 01 — Portrait"
            priority
            rotate={-1.5}
            back={
              <>
                <span className="meta text-muted">Index card — Chloe Yun</span>
                <span className="block space-y-0 text-[1.05rem] leading-[2.4rem]">
                  <span className="block">Grew up in California</span>
                  <span className="block">Five years on stage in Korea</span>
                  <span className="block">Studying information at Michigan</span>
                  <span className="block">Designing with Atlas Digital</span>
                </span>
                <span className="meta text-oxblood">Turn back ↻</span>
              </>
            }
          />
        </div>
        <div className="md:col-span-6 md:self-end lg:col-span-4 lg:col-start-8">
          <Reveal>
            <p className="meta text-muted">The short version</p>
            <div className="mt-4 space-y-4 text-[1.05rem] leading-relaxed">
              {about.paragraphs.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pull quote */}
      <section aria-label="Quote" className="mx-auto max-w-[1600px] px-5 py-28 sm:px-8 md:py-40">
        <SplitHeading
          as="p"
          label="Working in entertainment taught me how much success depends on understanding people."
          className="display text-center text-[clamp(2.4rem,6.4vw,6.4rem)] leading-[0.95]"
          lines={[
            <span key="a">
              <span className="text-oxblood">“</span>Working in entertainment
            </span>,
            "taught me how much success",
            <span key="c">
              depends on <em>understanding people.</em>
              <span className="text-oxblood">”</span>
            </span>,
          ]}
        />
      </section>

      {/* The journey */}
      <section id="journey" aria-labelledby="journey-heading" className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="grid gap-6 border-t border-ink pt-5 md:grid-cols-12">
          <p className="meta text-muted md:col-span-3">(01) The journey</p>
          <h2 id="journey-heading" className="display text-[clamp(2.6rem,5.6vw,5.6rem)] md:col-span-9">
            California → Seoul → Ann Arbor → <em>design & technology</em>
          </h2>
        </div>
        <div className="mt-8">
          <JourneyTimeline />
        </div>
      </section>

      {/* What carried over */}
      <section aria-labelledby="carried-heading" className="bg-stone py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <div className="grid gap-6 border-t border-ink pt-5 md:grid-cols-12">
            <p className="meta text-muted md:col-span-3">(02) What carried over</p>
            <h2 id="carried-heading" className="display text-[clamp(2.6rem,5.6vw,5.6rem)] md:col-span-9">
              Different field. <em>Same core skills.</em>
            </h2>
          </div>
          <ol className="mt-16 grid gap-x-8 md:grid-cols-4">
            {carried.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08} className="border-t border-ink/30 py-6">
                <span className="meta text-muted">{String(i + 1).padStart(2, "0")}</span>
                <p className="display mt-6 text-[2.4rem]">{p.title}</p>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* How I work */}
      <section aria-labelledby="how-heading" className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 md:py-32">
        <div className="grid gap-6 border-t border-ink pt-5 md:grid-cols-12">
          <p className="meta text-muted md:col-span-3">(03) How I work</p>
          <h2 id="how-heading" className="display text-[clamp(2.6rem,5.6vw,5.6rem)] md:col-span-9">
            {about.heading.split("*")[0]}
            <em>{about.heading.split("*")[1]}</em>
            {about.heading.split("*")[2]}
          </h2>
        </div>
        <ol className="mt-16 grid gap-x-8 md:grid-cols-3">
          {about.philosophy.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.08} className="border-t border-line py-6">
              <span className="meta text-oxblood">{String(i + 1).padStart(2, "0")}</span>
              <p className="display mt-4 text-[2rem]">{p.title}</p>
              <p className="mt-2 text-muted">{p.text}</p>
            </Reveal>
          ))}
        </ol>
        <p className="mt-16 max-w-[52ch] text-[1.1rem] leading-relaxed">{about.offTheClock}</p>
      </section>

      {/* a slow band of interests */}
      <div className="overflow-hidden border-y border-line py-5" aria-label="Interests">
        <div className="marquee flex w-max" style={{ ["--dur" as string]: "60s" }}>
          {[0, 1].map((k) => (
            <ul key={k} className="flex shrink-0" aria-hidden={k === 1}>
              {marquee.map((m) => (
                <li key={m} className="display whitespace-nowrap px-6 text-[clamp(2rem,4vw,3.6rem)]">
                  {m} <span className="ml-6 text-oxblood">✦</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-[1600px] px-5 pt-24 sm:px-8">
        <Link href="/work" className="group flex items-baseline justify-between gap-6 border-t border-ink pt-5" data-cursor="view">
          <span className="meta text-muted">Next</span>
          <span className="display text-[clamp(3rem,9vw,9rem)] leading-none">
            <span className="wipe">See the work</span> →
          </span>
        </Link>
      </section>
    </>
  );
}
