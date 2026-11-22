import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { about } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import ContactSection from "@/components/home/ContactSection";
import FlipPolaroid from "@/components/about/FlipPolaroid";
import StoryTimeline from "@/components/about/StoryTimeline";
import { Bow, Coffee, Flower, Heart, PolaroidIcon, Sparkle, Star, Strawberry } from "@/components/doodles/Doodles";

export const metadata: Metadata = {
  title: "About me",
  description: "Chloe Yun’s scrapbook: from California to five years on stage in Korea to designing at the University of Michigan and Atlas Digital.",
};

const wall = [
  { src: "/images/polaroids/chloe-portrait.jpg", alt: "Portrait of Chloe Yun", caption: "me, today", rotate: -4, tape: "var(--butter)", focus: "50% 25%" },
  { src: "/images/polaroids/aurora-portrait.jpg", alt: "Chloe in a pastel stage photoshoot", caption: "the stage years", rotate: 3, tape: "var(--lavender)" },
  { src: "/images/polaroids/cignature-apple.jpg", alt: "Photoshoot with an apple on a picnic blanket", caption: "photoshoot days", rotate: -2, tape: "var(--blush)", focus: "50% 40%" },
];

const offClock = [
  { label: "Pilates", Icon: Heart },
  { label: "reading", Icon: Coffee },
  { label: "board games with friends", Icon: Star },
  { label: "watching soccer", Icon: Sparkle },
];

export default function AboutPage() {
  return (
    <>
      {/* Opening spread */}
      <section className="dotgrid relative overflow-hidden">
        <Flower className="float pointer-events-none absolute right-[6%] top-10 w-12 opacity-90" />
        <Strawberry className="float-slow pointer-events-none absolute bottom-10 left-[46%] hidden w-10 md:block" />
        <div className="mx-auto grid max-w-[1320px] gap-14 px-5 pb-20 pt-10 sm:px-8 sm:pt-16 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div className="relative mx-auto w-full max-w-[22rem]">
            <FlipPolaroid
              src={about.photo.src}
              alt={about.photo.alt}
              caption="hi, it’s me!"
              priority
              rotate={-4}
              back={
                <>
                  <span className="hand text-[1.8rem] leading-none text-rose-deep">a few things about me</span>
                  <span className="mt-3 block space-y-0 leading-[1.9rem]">
                    <span className="block">✦ grew up in California</span>
                    <span className="block">✦ five years on stage in Korea</span>
                    <span className="block">✦ studying information at Michigan</span>
                    <span className="block">✦ designing with Atlas Digital</span>
                  </span>
                </>
              }
            />
            <p className="hand absolute -right-4 -top-2 rotate-6 text-[1.4rem] leading-none text-rose-deep sm:-right-14" aria-hidden="true">
              turn me over!
              <svg viewBox="0 0 60 40" className="ml-6 mt-1 block w-12" fill="none">
                <path className="draw-on" pathLength={1} style={{ ["--delay" as string]: "0.6s" }} d="M50 4 C 44 22, 30 30, 8 30 M18 22 L7 30 L17 37" stroke="var(--rose)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </p>
            <Bow className="sticker-shadow absolute -bottom-6 -left-4 w-16 -rotate-12" />
          </div>
          <div>
            <p className="eyebrow flex items-center gap-2">
              <PolaroidIcon className="h-6 w-6" /> room 02 · about me
            </p>
            <h1 className="display mt-4 text-[clamp(3rem,8vw,6.4rem)]">
              a little scrapbook of <em>me</em>
            </h1>
            <p className="mt-6 max-w-[38rem] text-[clamp(1.1rem,1.6vw,1.3rem)] leading-relaxed">
              I’m Chloe — a student at the University of Michigan School of Information and a designer with Atlas Digital. I love the place where creativity, design, and technology meet.
            </p>
            <div className="mt-4 max-w-[38rem] space-y-4 leading-relaxed text-espresso-soft">
              <p>{about.paragraphs[3]}</p>
              <p>{about.paragraphs[2]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How I work — sticky notes */}
      <section aria-labelledby="how-heading" className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">journal · page 1</p>
            <h2 id="how-heading" className="display mt-3 text-[clamp(2.4rem,5vw,4rem)]">
              how I <em>work</em>
            </h2>
            <p className="mt-4 max-w-[28rem] text-espresso-soft">Two worlds shaped how I design: analytical problem-solving, and years of learning how people react.</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="What I’m interested in">
              {about.interests.map((x) => (
                <li key={x} className="rounded-full border border-espresso/15 bg-ivory px-3 py-1 text-[0.92rem]">
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <ol className="grid gap-6 sm:grid-cols-3">
            {about.philosophy.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                delay={i * 0.08}
                className={`group relative rounded-[4px] p-6 pt-8 shadow-[0_16px_26px_-20px_rgba(58,38,32,0.7)] transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none ${
                  ["rotate-[-2deg] bg-butter", "rotate-[1.5deg] bg-blush", "rotate-[-1deg] bg-sage"][i]
                }`}
              >
                <span className="tape -top-3 left-1/2 -translate-x-1/2" style={{ ["--tape" as string]: "var(--paper)" }} aria-hidden="true" />
                <p className="display text-[1.5rem] leading-tight">{p.title}</p>
                <p className="mt-2 text-[0.98rem] leading-relaxed">{p.text}</p>
                <Heart className="absolute -bottom-3 -right-3 w-9 scale-0 transition-transform duration-300 group-hover:scale-100 motion-reduce:transition-none" />
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* The timeline */}
      <section aria-labelledby="timeline-heading" className="bg-pink/50 py-20 sm:py-24">
        <div className="mx-auto max-w-[64rem] px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">journal · page 2</p>
              <h2 id="timeline-heading" className="display mt-3 text-[clamp(2.4rem,5vw,4rem)]">
                the long way <em>here</em>
              </h2>
            </div>
            <Link href="/journey" className="link pb-2 font-semibold">
              see it illustrated →
            </Link>
          </div>
          <div className="mt-12">
            <StoryTimeline />
          </div>
        </div>
      </section>

      {/* Photo wall */}
      <section aria-labelledby="wall-heading" className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-24">
        <p className="eyebrow">journal · page 3</p>
        <h2 id="wall-heading" className="display mt-3 text-[clamp(2.4rem,5vw,4rem)]">
          from the <em>photo box</em>
        </h2>
        <ul className="mt-12 grid grid-cols-2 gap-6 sm:gap-10 md:grid-cols-3">
          {wall.map((p, i) => (
            <Reveal as="li" key={p.src} delay={i * 0.08} className={i === 2 ? "col-span-2 mx-auto w-1/2 md:col-span-1 md:w-auto" : ""}>
              <figure
                className="group relative rounded-[3px] bg-paper p-[7%] pb-0 shadow-[0_20px_34px_-24px_rgba(58,38,32,0.65)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:rotate-0 motion-reduce:transition-none"
                style={{ rotate: `${p.rotate}deg` }}
              >
                <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" style={{ ["--tape" as string]: p.tape }} aria-hidden="true" />
                <span className="relative block aspect-square overflow-hidden bg-pink">
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 360px, 45vw" className="object-cover" style={{ objectPosition: p.focus ?? "50% 50%" }} />
                </span>
                <figcaption className="hand flex h-12 items-center justify-center text-[1.5rem] sm:h-14">{p.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        {/* Off the clock */}
        <div className="mx-auto mt-20 max-w-[44rem] text-center">
          <p className="hand text-[2rem] leading-none">and off the clock…</p>
          <ul className="mt-6 flex flex-wrap justify-center gap-3">
            {offClock.map(({ label, Icon }) => (
              <li key={label} className="group flex items-center gap-2 rounded-full bg-ivory py-1.5 pl-2 pr-4 shadow-[0_2px_0_rgba(58,38,32,0.12)]">
                <Icon className="wiggle-on-hover h-7 w-7" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
