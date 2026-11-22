"use client";

import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { hero } from "@/content/site";
import { dropSettings, prints } from "@/content/polaroids";
import PhotoPreview from "../polaroids/PhotoPreview";
import ButtonLink from "../ui/ButtonLink";
import { Heart, Sparkle, Star } from "../doodles/Doodles";
import Print, { type PrintPhase } from "./Print";

const ease = [0.22, 1, 0.36, 1] as const;

/* “hi, i’m *chloe*!” — the original headline: Fraunces, words rise in one by one,
   *chloe* in Instrument Serif italic with a rose squiggle drawn under it. */
function AnimatedHeadline({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h1 id="hero-heading" className="display text-[clamp(3.5rem,15.5vw,5.4rem)] leading-[0.9] md:text-[clamp(4rem,7.6vw,8.4rem)]">
      <span className="sr-only">{text.replace(/\*/g, "")}</span>
      <span aria-hidden="true">
        {words.map((word, i) => {
          const accent = /\*(.+)\*/.exec(word);
          return (
            <span key={i} className={`inline-block overflow-hidden pb-[0.14em] align-bottom ${i < words.length - 1 ? "mr-[0.24em]" : ""}`}>
              <motion.span className="relative inline-block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}>
                {accent ? (
                  <>
                    {word.slice(0, accent.index)}
                    <em className="relative">
                      {accent[1]}
                      <svg viewBox="0 0 300 24" className="absolute -bottom-[0.02em] left-0 w-full overflow-visible" aria-hidden="true" focusable="false">
                        <motion.path
                          d="M4 16 C 60 6, 120 22, 180 12 S 270 6, 296 14"
                          fill="none"
                          stroke="var(--rose)"
                          strokeWidth="6"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 0.9, ease }}
                        />
                      </svg>
                    </em>
                    {word.slice(accent.index + accent[0].length)}
                  </>
                ) : (
                  word
                )}
              </motion.span>
            </span>
          );
        })}
      </span>
    </h1>
  );
}

/* The homepage hero: the greeting on the left, a collage of Polaroids on the right.
   On page load (after the welcome, if it’s playing) the Polaroids fall in from above the
   screen one by one, tilt, land at different angles and overlap. Then they can be picked up
   by their white border and rearranged; a click on the photo opens its story or project. */
export default function Hero() {
  const boundsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [phases, setPhases] = useState<PrintPhase[]>([]);
  const [stack, setStack] = useState<number[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [settled, setSettled] = useState(false);

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

  // Start positions. During the welcome, the Michigan print waits at its resting spot (hidden)
  // so the welcome's last Polaroid can slide onto it; everything else waits above the screen.
  useEffect(() => {
    if (isDesktop === null) return;
    const intro = document.documentElement.dataset.intro === "play";
    setPhases(prints.map((p) => (reduced || (intro && p.art) ? "landed" : "hanging")));
    setStack(prints.map((_, i) => i));
  }, [isDesktop, reduced]);

  // Rain: once the welcome is out of the way, drop the prints one after another
  useEffect(() => {
    if (isDesktop === null || reduced) {
      if (reduced) setSettled(true);
      return;
    }
    const html = document.documentElement;
    const timers: number[] = [];
    const start = () => {
      const order = visible.map((v) => v.i);
      order.forEach((i, n) =>
        timers.push(window.setTimeout(() => setPhases((ph) => (ph[i] === "hanging" ? ph.map((p, k) => (k === i ? "falling" : p)) : ph)), (dropSettings.startDelay + n * dropSettings.every) * 1000)),
      );
      timers.push(window.setTimeout(() => setSettled(true), (dropSettings.startDelay + order.length * dropSettings.every + dropSettings.fallSeconds) * 1000 + 300));
    };
    if (html.dataset.intro !== "play") {
      start();
      return () => timers.forEach(clearTimeout);
    }
    const watch = new MutationObserver(() => {
      if (html.dataset.intro === "play") return;
      watch.disconnect();
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
    <section
      aria-labelledby="hero-heading"
      className="relative h-[max(46rem,calc(100svh-4.5rem))] overflow-hidden md:h-[max(38rem,calc(100svh-4.5rem))]"
    >
      {/* gentle floating doodles */}
      <Sparkle className="float pointer-events-none absolute right-[6%] top-[12%] w-8 md:left-[42%] md:right-auto md:top-[9%] md:w-11" />
      <Heart className="float-slow pointer-events-none absolute right-[5%] top-[2%] hidden w-9 md:block" style={{ animationDelay: "-2s" }} />
      <Star className="float pointer-events-none absolute bottom-[7%] left-[38%] hidden w-9 md:block" style={{ animationDelay: "-1s" }} />

      {/* The greeting */}
      <div className="relative z-20 px-5 pt-6 sm:px-8 md:absolute md:left-[6%] md:top-[15%] md:w-[38%] md:p-0">
        <motion.p className="eyebrow flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <Sparkle className="twinkle h-4 w-4" />
          {hero.eyebrow}
        </motion.p>
        <div className="mt-4 md:mt-6">
          <AnimatedHeadline text={hero.headline} />
        </div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease }}>
          <p className="mt-4 max-w-[30rem] text-[clamp(1.05rem,1.5vw,1.3rem)] leading-relaxed text-espresso-soft md:mt-7">{hero.text}</p>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-8">
            <ButtonLink href="/work" variant="primary">
              see my work ↓
            </ButtonLink>
            <ButtonLink href="/about">get to know me</ButtonLink>
          </div>
          <p className="hand mt-3 text-[1.3rem] leading-none text-rose-deep md:hidden" aria-hidden="true">
            tap a photo to open it ♡
          </p>
        </motion.div>
        {/* handwritten note pointing at the Polaroids */}
        <motion.p
          className="hand mt-7 hidden items-center gap-2 text-[1.6rem] leading-none text-rose-deep md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: settled ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          aria-hidden="true"
        >
          psst — pick them up & move them around!
          <svg viewBox="0 0 80 40" className="w-16 overflow-visible" fill="none">
            {settled && (
              <path className="draw-on" pathLength={1} d="M4 30 C 26 34, 50 26, 70 10 M58 10 L71 9 L68 22" stroke="var(--rose)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </motion.p>
      </div>

      {/* The collage */}
      <div ref={boundsRef} className="absolute inset-0" aria-hidden="true" />
      <div role="group" aria-label="Polaroids — drag them by the white border, or open one" className="pointer-events-none absolute inset-0">
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
      <PhotoPreview photo={openPrint} onClose={() => setOpen(null)} />
    </section>
  );
}
