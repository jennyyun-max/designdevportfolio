"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { journey } from "@/content/site";
import { SceneSketch } from "../intro/Sketch";
import { Doodle, type DoodleName, Plane } from "../doodles/Doodles";

const scenes = { california: "california", seoul: "seoul", "ann-arbor": "michigan" } as const;
const alts = {
  california: "Pencil drawing of Chloe sitting on a curb under a palm tree, by the ocean",
  seoul: "Pencil drawing of Chloe performing on an outdoor stage in Seoul, with the city skyline, N Seoul Tower and floating music notes",
  "ann-arbor": "Pencil drawing of Chloe at a University of Michigan library desk, designing on her laptop with sketches pinned to the wall",
} as const;

/* The journey as a storybook: one illustrated page per chapter, a paper plane following a
   dashed flight path that draws itself as you scroll. */
export default function Storybook() {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div ref={track} className="relative">
      {/* the flight path */}
      <svg className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-40 -translate-x-1/2 md:block" viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true">
        <path d="M50 0 C 90 120, 10 220, 50 340 S 90 560, 50 680 S 10 880, 50 1000" fill="none" stroke="var(--line)" strokeWidth="2.5" strokeDasharray="8 10" vectorEffect="non-scaling-stroke" />
        <motion.path d="M50 0 C 90 120, 10 220, 50 340 S 90 560, 50 680 S 10 880, 50 1000" fill="none" stroke="var(--rose)" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ pathLength: progress }} />
      </svg>

      <ol className="relative space-y-24 md:space-y-36">
        {journey.map((ch, i) => {
          const flip = i % 2 === 1;
          return (
            <li key={ch.key} className="grid items-center gap-8 md:grid-cols-2 md:gap-24">
              <motion.div
                className={`relative ${flip ? "md:order-2" : ""}`}
                initial={{ opacity: 0, y: 40, rotate: flip ? 4 : -4 }}
                whileInView={{ opacity: 1, y: 0, rotate: flip ? 1.5 : -1.5 }}
                viewport={{ once: true, margin: "0px 0px -120px 0px" }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
              >
                <div className="relative rounded-[6px] bg-paper p-3 shadow-[0_30px_50px_-32px_rgba(58,38,32,0.75)]">
                  <span className="tape -top-3 left-8 -rotate-6" style={{ ["--tape" as string]: ch.tone }} aria-hidden="true" />
                  <span className="tape -top-3 right-8 rotate-6" aria-hidden="true" />
                  <div className="paper-grain relative aspect-square overflow-hidden rounded-[3px] bg-[#efe6d6]">
                    <SceneSketch scene={scenes[ch.key]} label={alts[ch.key]} />
                  </div>
                </div>
                <span className="sticker-shadow absolute -bottom-6 grid h-20 w-20 place-items-center rounded-full bg-paper" style={{ [flip ? "left" : "right"]: "-1rem", backgroundColor: ch.tone }}>
                  <Doodle name={ch.doodle as DoodleName} className="float h-12 w-12" />
                </span>
              </motion.div>
              <motion.div
                className={flip ? "md:order-1 md:text-right" : ""}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -120px 0px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="hand text-[1.7rem] leading-none text-rose-deep">chapter {i + 1} · {ch.when}</p>
                <h2 className="display mt-3 text-[clamp(2.6rem,5.4vw,4.4rem)]">{ch.place}</h2>
                <p className="display mt-2 text-[1.6rem] text-espresso-soft">
                  <em>{ch.title}</em>
                </p>
                <div className={`mt-5 max-w-[32rem] space-y-3 text-[1.08rem] leading-relaxed ${flip ? "md:ml-auto" : ""}`}>
                  {ch.text.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </div>
                {"carried" in ch && (
                  <ul className={`mt-5 flex flex-wrap gap-2 ${flip ? "md:justify-end" : ""}`} aria-label="What I carried with me">
                    {ch.carried.map((c) => (
                      <li key={c} className="rounded-full bg-blush px-3 py-0.5 text-[0.92rem] font-semibold">
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
                {"link" in ch && (
                  <Link href={ch.link.href} className="link mt-5 inline-block font-semibold">
                    {ch.link.label} →
                  </Link>
                )}
              </motion.div>
            </li>
          );
        })}
      </ol>

      <div className="relative mt-28 text-center">
        <Plane className="float mx-auto w-16" />
        <p className="hand mt-3 text-[2rem] leading-none">…and the story keeps going.</p>
        <p className="mt-3 text-espresso-soft">Here’s what I’m making now.</p>
        <Link
          href="/work"
          className="mt-6 inline-flex rounded-[var(--radius-button)] bg-espresso px-6 py-3.5 font-semibold text-ivory shadow-[0_3px_0_#1f130f] transition-transform hover:-translate-y-0.5 motion-reduce:transition-none"
        >
          see my work →
        </Link>
      </div>
    </div>
  );
}
