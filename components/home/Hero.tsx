"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { hero } from "@/content/site";
import { dropSettings, prints } from "@/content/polaroids";
import PhotoPreview from "../polaroids/PhotoPreview";
import Print, { type PrintPhase } from "./Print";

const ease = [0.16, 1, 0.3, 1] as const;

/* The name, set very large, each line rising out of a mask */
function Name({ replay }: { replay: number }) {
  const [first, last] = hero.name.split(" ");
  return (
    <h1 id="hero-heading" key={replay} className="display relative uppercase leading-[0.8] tracking-[-0.045em]">
      <span className="sr-only">{hero.name}</span>
      <span aria-hidden="true" className="block">
        {[first, last].map((word, i) => (
          <span key={word} className={`block overflow-hidden pb-[0.04em] ${i === 1 ? "pl-[14%] md:pl-[17%]" : ""}`}>
            <motion.span className="block" initial={{ y: "102%" }} animate={{ y: 0 }} transition={{ duration: 1.3, delay: 0.1 + i * 0.12, ease }}>
              {i === 1 ? <em className="normal-case">{word}</em> : word}
            </motion.span>
          </span>
        ))}
      </span>
    </h1>
  );
}

/* The homepage hero: the name as the image, a loose stack of prints laid over it (draggable,
   black & white until hovered), the disciplines and a one-line introduction. Then the work.
   The welcome's stars turn into these exact prints; without the welcome they fall in on load. */
export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const boundsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [phases, setPhases] = useState<PrintPhase[]>([]);
  const [stack, setStack] = useState<number[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [revealKey, setRevealKey] = useState(0); // bumps when the welcome hands over, replaying the type

  // the name drifts up a touch slower than the page
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const visible = useMemo(
    () => (isDesktop === null ? [] : prints.map((p, i) => ({ print: p, i, layout: isDesktop ? p.desktop : p.mobile })).filter((v) => v.layout)),
    [isDesktop],
  );

  // During the welcome every print waits, hidden, at its resting spot (the welcome's stars fly
  // exactly onto them). Otherwise they wait above the screen and fall in on page load.
  useEffect(() => {
    if (isDesktop === null) return;
    const intro = document.documentElement.dataset.intro === "play";
    setPhases(prints.map(() => (reduced || intro ? "landed" : "hanging")));
    setStack(prints.map((_, i) => i));
  }, [isDesktop, reduced]);

  useEffect(() => {
    if (isDesktop === null || reduced) return;
    const html = document.documentElement;
    const timers: number[] = [];
    const start = () => {
      visible.forEach(({ i }, n) =>
        timers.push(
          window.setTimeout(
            () => setPhases((ph) => (ph[i] === "hanging" ? ph.map((p, k) => (k === i ? "falling" : p)) : ph)),
            (dropSettings.startDelay + n * dropSettings.every) * 1000,
          ),
        ),
      );
    };
    if (html.dataset.intro !== "play") {
      start();
      return () => timers.forEach(clearTimeout);
    }
    const watch = new MutationObserver(() => {
      if (html.dataset.intro === "play") return;
      watch.disconnect();
      setRevealKey((k) => k + 1);
      start();
    });
    watch.observe(html, { attributes: true, attributeFilter: ["data-intro"] });
    return () => {
      watch.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [isDesktop, reduced, visible]);

  const bringToFront = useCallback((i: number) => setStack((s) => (s[s.length - 1] === i ? s : [...s.filter((n) => n !== i), i])), []);
  const land = useCallback(
    (i: number) => {
      setPhases((ph) => ph.map((p, n) => (n === i ? "landed" : p)));
      bringToFront(i);
    },
    [bringToFront],
  );
  const openPrint = open === null ? null : { ...prints[open], rotate: 0 };

  return (
    <section ref={section} aria-labelledby="hero-heading" className="relative overflow-hidden md:h-[max(44rem,calc(100svh-4rem))]">
      <div className="relative z-20 mx-auto flex h-full max-w-[1600px] flex-col px-5 pt-6 sm:px-8 md:pointer-events-none md:pb-8">
        {/* metadata row */}
        <div key={`m${revealKey}`} className="intro-reveal meta grid grid-cols-2 gap-4 text-muted md:grid-cols-12" style={{ ["--d" as string]: "0.1s" }}>
          <p className="md:col-span-3">(Portfolio)</p>
          <p className="text-ink md:col-span-5">{hero.disciplines.join(" / ")}</p>
          <p className="col-span-2 max-w-[28rem] md:col-span-4 md:text-right">{hero.detail}</p>
        </div>

        {/* the name */}
        <div className="intro-reveal mt-[8svh] text-[clamp(5.4rem,25vw,9rem)] md:mt-auto md:text-[min(19.5vw,36svh)]">
          <motion.div style={{ y: reduced ? 0 : nameY }}>
            <Name replay={revealKey} />
          </motion.div>
        </div>

        {/* introduction */}
        <div key={`i${revealKey}`} className="intro-reveal mt-8 md:mt-auto md:max-w-[46%]" style={{ ["--d" as string]: "0.35s" }}>
          <p className="display max-w-[20ch] text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.02]">{hero.intro}</p>
          {hero.status && <p className="meta mt-4 text-oxblood">{hero.status}</p>}
          <div className="mt-6 flex flex-wrap gap-x-7 gap-y-2 text-[0.95rem] md:pointer-events-auto">
            <a href="#work" className="wipe">
              Selected work ↓
            </a>
            <Link href="/about" className="wipe">
              About Chloe →
            </Link>
            <span className="meta hidden self-center text-muted lg:inline">· Drag the prints</span>
          </div>
        </div>
      </div>

      {/* The prints — a strip under the text on phones, over the whole hero on wider screens */}
      <div className="relative mt-10 h-[21rem] md:absolute md:inset-0 md:mt-0 md:h-auto">
        <div ref={boundsRef} className="absolute inset-0" aria-hidden="true" />
        <div role="group" aria-label="Photo prints — drag them by the white border, or open one" className="hero-prints pointer-events-none absolute inset-0 z-30">
          {phases.length > 0 &&
            visible.map(({ print, i, layout }) => (
              <Print
                key={`${isDesktop ? "d" : "m"}-${i}`}
                print={print}
                layout={layout!}
                index={i}
                phase={phases[i]}
                zIndex={10 + stack.indexOf(i)}
                fallSeconds={dropSettings.fallSeconds}
                tipSeconds={0}
                gravity={false}
                boundsRef={boundsRef}
                onLanded={() => land(i)}
                onFront={() => bringToFront(i)}
                onOpenPhoto={() => setOpen(i)}
              />
            ))}
        </div>
      </div>
      <PhotoPreview photo={openPrint} onClose={() => setOpen(null)} />
    </section>
  );
}
