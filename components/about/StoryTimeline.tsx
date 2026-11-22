"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";
import { journey } from "@/content/site";
import { Doodle, type DoodleName } from "../doodles/Doodles";

/* The interactive timeline: three stops on a dashed flight path. Pick one (click, or arrow
   keys — it's a tab list) to open that chapter's journal page. */
export default function StoryTimeline() {
  const [active, setActive] = useState(journey.length - 1); // start with “now”
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const ch = journey[active];

  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (active + d + journey.length) % journey.length;
    setActive(n);
    tabs.current[n]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="My story, from California to Michigan" className="relative grid grid-cols-3 gap-2" onKeyDown={onKey}>
        <svg className="pointer-events-none absolute left-[16%] right-[16%] top-9 h-6 w-[68%]" viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true">
          <path d="M2 14 C 80 -2, 140 26, 200 12 S 320 -2, 398 12" fill="none" stroke="var(--rose)" strokeWidth="2.5" strokeDasharray="7 8" strokeLinecap="round" />
        </svg>
        {journey.map((stop, i) => {
          const on = i === active;
          return (
            <button
              key={stop.key}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`stop-${stop.key}`}
              aria-selected={on}
              aria-controls="stop-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className="group relative flex flex-col items-center text-center"
            >
              <span
                className={`grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full border-2 border-espresso transition-[transform,box-shadow] duration-300 motion-reduce:transition-none ${
                  on ? "scale-110 shadow-[0_4px_0_var(--espresso)]" : "bg-paper group-hover:-translate-y-1"
                }`}
                style={{ backgroundColor: on ? stop.tone : undefined }}
              >
                <Doodle name={stop.doodle as DoodleName} className="wiggle-on-hover h-10 w-10" />
              </span>
              <span className="display mt-3 text-[clamp(1.1rem,2.4vw,1.6rem)] leading-tight">{stop.place.split(",")[0]}</span>
              <span className="hand text-[1.2rem] leading-none text-espresso-soft">{stop.when}</span>
            </button>
          );
        })}
      </div>

      <div id="stop-panel" role="tabpanel" aria-labelledby={`stop-${ch.key}`} className="relative mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={ch.key}
            initial={{ opacity: 0, y: 14, rotate: -1.2 }}
            animate={{ opacity: 1, y: 0, rotate: -0.5 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="ruled relative rounded-[6px] px-6 pb-7 pt-9 shadow-[0_24px_40px_-30px_rgba(58,38,32,0.7)] sm:px-10"
          >
            <span className="tape -top-3 left-8 -rotate-3" style={{ ["--tape" as string]: ch.tone }} aria-hidden="true" />
            <p className="hand text-[1.5rem] leading-none text-rose-deep">{ch.place}</p>
            <h3 className="display mt-2 text-[clamp(1.9rem,3.6vw,2.8rem)]">{ch.title}</h3>
            <div className="mt-3 max-w-[44rem] space-y-0 leading-[1.9rem]">
              {ch.text.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            {"carried" in ch && (
              <p className="mt-4 flex flex-wrap items-center gap-2">
                <span className="hand text-[1.3rem]">what I carried with me:</span>
                {ch.carried.map((c) => (
                  <span key={c} className="rounded-full bg-blush px-3 py-0.5 text-[0.9rem] font-semibold">
                    {c}
                  </span>
                ))}
              </p>
            )}
            {"link" in ch && (
              <Link href={ch.link.href} className="link mt-4 inline-block font-semibold">
                {ch.link.label} →
              </Link>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
