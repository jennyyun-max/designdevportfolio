"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { journey } from "@/content/site";
import { SceneSketch } from "../intro/Sketch";
import { Doodle, type DoodleName } from "../doodles/Doodles";

const scenes = { california: "california", seoul: "seoul", "ann-arbor": "michigan" } as const;
const alts = {
  california: "Pencil drawing of Chloe sitting on a curb under a palm tree, by the ocean",
  seoul: "Pencil drawing of Chloe performing on an outdoor stage in Seoul, with the city skyline, N Seoul Tower and floating music notes",
  "ann-arbor": "Pencil drawing of Chloe at a University of Michigan library desk, designing on her laptop with sketches pinned to the wall",
} as const;

/* The journey as a little storybook you page through: chapter tabs (California → Seoul →
   Ann Arbor), previous/next, or the arrow keys. Each page is a hand-drawn scene with its story. */
export default function Storybook() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const ch = journey[i];
  const go = (n: number) => {
    if (n < 0 || n >= journey.length || n === i) return;
    setDir(n > i ? 1 : -1);
    setI(n);
  };

  // arrow keys turn the page (unless typing somewhere)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest("input, textarea, [role=tab]")) return;
      if (e.key === "ArrowRight") go(i + 1);
      if (e.key === "ArrowLeft") go(i - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div>
      {/* chapter tabs on a dashed flight path */}
      <div
        role="tablist"
        aria-label="Chapters"
        className="relative mx-auto grid max-w-[44rem] grid-cols-3"
        onKeyDown={(e) => {
          const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
          if (!d) return;
          e.preventDefault();
          const n = (i + d + journey.length) % journey.length;
          go(n);
          tabs.current[n]?.focus();
        }}
      >
        <svg className="pointer-events-none absolute left-[16%] top-8 h-6 w-[68%]" viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true">
          <path d="M2 14 C 80 -2, 140 26, 200 12 S 320 -2, 398 12" fill="none" stroke="var(--rose)" strokeWidth="2.5" strokeDasharray="7 8" strokeLinecap="round" />
        </svg>
        {journey.map((c, n) => (
          <button
            key={c.key}
            ref={(el) => {
              tabs.current[n] = el;
            }}
            role="tab"
            id={`ch-${c.key}`}
            aria-selected={n === i}
            aria-controls="chapter-panel"
            tabIndex={n === i ? 0 : -1}
            onClick={() => go(n)}
            className="group relative flex flex-col items-center"
          >
            <span
              className={`grid h-16 w-16 place-items-center rounded-full border-2 border-espresso transition-[transform,box-shadow] duration-300 motion-reduce:transition-none ${
                n === i ? "scale-110 shadow-[0_4px_0_var(--espresso)]" : "bg-paper group-hover:-translate-y-1"
              }`}
              style={{ backgroundColor: n === i ? c.tone : undefined }}
            >
              <Doodle name={c.doodle as DoodleName} className="wiggle-on-hover h-9 w-9" />
            </span>
            <span className="mono mt-2 text-[0.68rem] uppercase tracking-[0.14em] text-espresso-soft">chapter {n + 1}</span>
            <span className="display text-[clamp(1.05rem,2.4vw,1.5rem)] leading-tight">{c.place.split(",")[0]}</span>
          </button>
        ))}
      </div>

      {/* the page */}
      <div id="chapter-panel" role="tabpanel" aria-labelledby={`ch-${ch.key}`} className="relative mt-12">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={ch.key}
            custom={dir}
            initial={{ opacity: 0, x: dir * 60, rotate: dir * 1.5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: dir * -60, rotate: dir * -1.5 }}
            transition={{ type: "spring", stiffness: 160, damping: 22 }}
            className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-14"
          >
            <div className="relative">
              <div className="relative rotate-[-1.2deg] rounded-[6px] bg-paper p-3 shadow-[0_30px_50px_-32px_rgba(58,38,32,0.75)]">
                <span className="tape -top-3 left-8 -rotate-6" style={{ ["--tape" as string]: ch.tone }} aria-hidden="true" />
                <span className="tape -top-3 right-8 rotate-6" aria-hidden="true" />
                <div className="paper-grain relative aspect-square overflow-hidden rounded-[3px] bg-[#efe6d6]">
                  <SceneSketch scene={scenes[ch.key]} label={alts[ch.key]} />
                </div>
              </div>
              <span className="sticker-shadow absolute -bottom-6 -right-3 grid h-20 w-20 place-items-center rounded-full" style={{ backgroundColor: ch.tone }}>
                <Doodle name={ch.doodle as DoodleName} className="float h-12 w-12" />
              </span>
            </div>
            <div>
              <p className="hand text-[1.7rem] leading-none text-rose-deep">
                chapter {i + 1} · {ch.when}
              </p>
              <h2 className="display mt-3 text-[clamp(2.6rem,5.4vw,4.4rem)]">{ch.place}</h2>
              <p className="display mt-2 text-[1.6rem] text-espresso-soft">
                <em>{ch.title}</em>
              </p>
              <div className="mt-5 max-w-[32rem] space-y-3 text-[1.08rem] leading-relaxed">
                {ch.text.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
              {"carried" in ch && (
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="What I carried with me">
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
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* page turning */}
      <div className="mt-14 flex items-center justify-between gap-4 border-t border-line pt-6">
        <button
          type="button"
          onClick={() => go(i - 1)}
          disabled={i === 0}
          className="mono rounded-full border border-espresso/20 bg-ivory px-5 py-2.5 text-[0.75rem] uppercase tracking-[0.14em] transition-transform hover:-translate-x-0.5 disabled:opacity-30 motion-reduce:transition-none"
        >
          ← previous
        </button>
        <p className="hand text-[1.3rem] text-espresso-soft" aria-live="polite">
          page {i + 1} of {journey.length}
        </p>
        {i < journey.length - 1 ? (
          <button
            type="button"
            onClick={() => go(i + 1)}
            className="mono rounded-full bg-espresso px-5 py-2.5 text-[0.75rem] uppercase tracking-[0.14em] text-ivory transition-transform hover:translate-x-0.5 motion-reduce:transition-none"
          >
            next →
          </button>
        ) : (
          <Link href="/work" className="mono rounded-full bg-espresso px-5 py-2.5 text-[0.75rem] uppercase tracking-[0.14em] text-ivory">
            see my work →
          </Link>
        )}
      </div>
    </div>
  );
}
