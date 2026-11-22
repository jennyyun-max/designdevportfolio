"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { IntroStrip } from "./Sketch";
import { introCss } from "./timeline";
import { Heart, Sparkle, Star } from "../doodles/Doodles";

/* The welcome: three hand-drawn chapters — California → Seoul → Ann Arbor — on one long strip
   of paper (~4s). The camera pulls back into a Polaroid, then “Welcome to Chloe’s World ♡” and
   “Come explore!”. Exploring slides that Polaroid onto its spot in the homepage collage, and
   the other Polaroids rain in.

   Whether it plays is decided before first paint by the inline script in app/layout.tsx
   (homepage entry, first visit only, never for direct links or reduced motion). The story is
   pure CSS, so it starts drawing before any JavaScript has loaded. */
export default function IntroStory() {
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [ended, setEnded] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const done = () => {
    const html = document.documentElement;
    if (html.dataset.intro === "play") html.dataset.intro = "done";
  };

  // When the story (CSS) has finished, show the welcome
  useEffect(() => {
    if (document.documentElement.dataset.intro !== "play") return;
    let cancelled = false;
    const c = card.current;
    if (!c) return;
    Promise.all(c.getAnimations().map((a) => a.finished.catch(() => {}))).then(() => {
      if (!cancelled) setEnded(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (ended) button.current?.focus({ preventScroll: true });
  }, [ended]);

  // “Come explore!”: slide the Polaroid onto the matching print in the homepage collage
  const explore = async () => {
    if (leaving) return;
    setLeaving(true);
    const c = card.current;
    const target = document.querySelector<HTMLElement>("[data-intro-print]");
    if (c && target) {
      const to = target.getBoundingClientRect(); // a rotated box's bounds share its centre
      const from = c.getBoundingClientRect();
      const dx = to.left + to.width / 2 - (from.left + from.width / 2);
      const dy = to.top + to.height / 2 - (from.top + from.height / 2);
      const scale = target.offsetWidth / c.offsetWidth;
      const rotate = Number(target.dataset.rotate ?? 0);
      await c.animate([{ transform: "none" }, { transform: `translate(${dx}px, ${dy}px) rotate(${rotate}deg) scale(${scale})` }], {
        duration: 700,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      }).finished;
    }
    done();
  };

  const skip = () => {
    root.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 240, fill: "forwards" }).finished.then(done);
  };

  return (
    <div ref={root} className="intro fixed inset-0 z-[95]">
      <style>{introCss}</style>
      {/* the desk the Polaroid lands on (hidden behind the story until it pulls back) */}
      <motion.div className="dotgrid absolute inset-0" animate={{ opacity: leaving ? 0 : 1 }} transition={{ duration: 0.6, delay: leaving ? 0.15 : 0 }} aria-hidden="true">
        <Sparkle className="float absolute left-[12%] top-[14%] w-10" />
        <Heart className="float-slow absolute right-[14%] top-[20%] w-9" style={{ animationDelay: "-2s" }} />
        <Star className="float absolute bottom-[26%] left-[18%] w-9" style={{ animationDelay: "-1s" }} />
        <Sparkle className="float-slow absolute bottom-[30%] right-[16%] w-8" style={{ animationDelay: "-3s" }} />
      </motion.div>

      <div className="absolute inset-0 grid place-items-center">
        <div
          ref={card}
          className="ik-card relative overflow-hidden rounded-[3px]"
          style={{ width: "100vw", height: "100svh", transformOrigin: "50% 50%" }}
        >
          <div className="ik-paper flex h-full w-full flex-col bg-paper">
            <div
              role="img"
              aria-label="A hand-drawn story: Chloe under a palm tree by the ocean in California, performing on a stage in Seoul, and designing at a library desk in Ann Arbor"
              className="paper-grain relative min-h-0 flex-1 overflow-hidden bg-[#efe6d6] [container-type:size]"
            >
              <IntroStrip className="ik-cam absolute left-0 top-0 max-w-none" style={{ width: "340cqmax", height: "100cqmax" }} />
            </div>
            <div className="ik-cap hand flex shrink-0 items-center justify-center overflow-hidden text-[calc(var(--pw)*0.1)] leading-none">ann arbor ♡</div>
          </div>
        </div>
      </div>

      {/* The welcome */}
      <AnimatePresence>
        {ended && !leaving && (
          <motion.div
            className="absolute inset-x-0 bottom-[max(4svh,1.25rem)] flex flex-col items-center px-5 text-center"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="display text-[clamp(2.2rem,6.4vw,4.4rem)]">
              Welcome to <em>Chloe’s World</em> <span className="text-rose">♡</span>
            </h2>
            <button
              ref={button}
              type="button"
              onClick={explore}
              className="mt-4 inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-espresso px-6 py-3.5 text-[1.05rem] font-semibold text-ivory shadow-[0_3px_0_#1f130f] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 motion-reduce:transition-none"
            >
              Come explore! <Heart className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={skip}
        className="ik-skip absolute right-4 top-4 z-10 rounded-full bg-ivory/90 px-4 py-2 text-[0.95rem] font-semibold text-espresso shadow-[0_2px_0_var(--espresso)] ring-1 ring-espresso/20 sm:right-6 sm:top-6"
      >
        Skip intro →
      </button>
    </div>
  );
}
