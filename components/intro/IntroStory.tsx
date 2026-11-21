"use client";

import { useEffect, useRef } from "react";
import { IntroStrip } from "./Sketch";
import { introCss } from "./timeline";

/* The hand-drawn intro: California → Korea → Michigan on one strip of paper (~4s), then the
   camera pulls back into a Polaroid, which slides onto its spot beside “hi, i’m chloe”.

   Whether it plays is decided before first paint by the inline script in app/layout.tsx
   (homepage entry only, once per session, not for #work links or reduced motion). The
   story itself is pure CSS, so it starts drawing before any JavaScript has loaded. */
export default function IntroStory() {
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.intro !== "play") return;
    let cancelled = false;
    const done = () => {
      if (html.dataset.intro === "play") html.dataset.intro = "done";
    };

    const handOff = async () => {
      const c = card.current;
      if (!c) return done();
      // let the story (CSS) finish — already finished if this script loaded late
      await Promise.all(c.getAnimations().map((a) => a.finished.catch(() => {})));
      // the matching print in the hero (rendered client-side, so give it a moment)
      let target: HTMLElement | null = null;
      for (let i = 0; i < 90 && !target && !cancelled; i++) {
        target = document.querySelector<HTMLElement>("[data-intro-print]");
        if (!target) await new Promise((r) => requestAnimationFrame(r));
      }
      if (cancelled) return;
      if (!target) return done();
      const to = target.getBoundingClientRect(); // a rotated box’s bounds share its centre
      const from = c.getBoundingClientRect();
      const dx = to.left + to.width / 2 - (from.left + from.width / 2);
      const dy = to.top + to.height / 2 - (from.top + from.height / 2);
      const scale = target.offsetWidth / c.offsetWidth;
      const rotate = Number(target.dataset.rotate ?? 0);
      await c.animate([{ transform: "none" }, { transform: `translate(${dx}px, ${dy}px) rotate(${rotate}deg) scale(${scale})` }], {
        duration: 620,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      }).finished;
      done();
    };
    handOff();
    return () => {
      cancelled = true;
    };
  }, []);

  const skip = () => {
    const html = document.documentElement;
    root.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, fill: "forwards" }).finished.then(() => {
      html.dataset.intro = "done";
    });
  };

  return (
    <div ref={root} className="intro fixed inset-0 z-[95]">
      <style>{introCss}</style>
      <div className="absolute inset-0 grid place-items-center">
        <div ref={card} className="ik-card relative overflow-hidden" style={{ width: "100vw", height: "100svh", transformOrigin: "50% 50%" }}>
          <div className="ik-paper flex h-full w-full flex-col bg-paper">
            <div
              role="img"
              aria-label="A hand-drawn story: Chloe sitting under a palm tree in California, dancing on stage in Korea, and designing at a library desk in Michigan"
              className="paper-grain relative min-h-0 flex-1 overflow-hidden bg-[#ebe1cf] [container-type:size]"
            >
              <IntroStrip className="ik-cam absolute left-0 top-0 max-w-none" style={{ width: "340cqmax", height: "100cqmax" }} />
            </div>
            <div className="ik-cap shrink-0" />
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={skip}
        className="ik-skip absolute right-4 top-4 z-10 px-2 py-1 text-[0.95rem] text-fg underline decoration-1 underline-offset-4 sm:right-6 sm:top-6"
      >
        skip intro
      </button>
    </div>
  );
}
