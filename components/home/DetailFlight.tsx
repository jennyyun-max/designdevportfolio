"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { reveal } from "@/content/polaroids";

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/* Carries the detail revealed in the hero ([data-reveal-source]) into its spot in the featured
   project's screen ([data-reveal-target]). Scroll-linked and reversible: the flight starts as
   the cover print drops and ends when the target reaches 40% of the screen height (or Selected
   Work reaches the top), so the visitor sees exactly where the detail belongs. While it flies,
   the target spot shows an empty slot so there's only ever one copy. Off for reduced-motion visitors. */
export default function DetailFlight() {
  const reduced = useReducedMotion();
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    let start: number | null = null; // scroll position where the flight begins
    let skip = false; // the visitor jumped past it (e.g. “View my work”) — no flight

    const update = () => {
      frame = 0;
      const src = document.querySelector<HTMLElement>("[data-reveal-source]");
      const tgt = document.querySelector<HTMLElement>("[data-reveal-target]");
      const fly = overlay.current;
      if (!src || !tgt || !fly) return;
      const vh = window.innerHeight;
      const y = window.scrollY;
      const t = tgt.getBoundingClientRect();

      const show = (p: number | null) => {
        const flying = p !== null && p > 0 && p < 1;
        fly.style.visibility = flying ? "visible" : "hidden";
        tgt.dataset.flight = flying ? "on" : "off";
        src.style.opacity = p !== null && p > 0 ? "0" : "1";
        if (!flying) return;
        const s = src.getBoundingClientRect();
        const e = p; // linear: the detail leaves the hero right away and stays on screen
        const lerp = (a: number, b: number) => a + (b - a) * e;
        fly.style.transform = `translate(${lerp(s.left, t.left)}px, ${lerp(s.top, t.top)}px)`;
        fly.style.width = `${lerp(s.width, t.width)}px`;
        fly.style.height = `${lerp(s.height, t.height)}px`;
      };

      if (src.dataset.revealed !== "true") {
        start = null;
        skip = false;
        return show(null);
      }
      if (start === null) {
        start = y + vh * 0.015;
        skip = t.top < vh * 0.45; // already at the spread when the detail was revealed
      }
      if (skip) return show(1);
      // Once Selected Work reaches the top (e.g. after “View my work”), the detail is home
      const work = document.getElementById("work")?.getBoundingClientRect();
      if (work && work.top <= 80) return show(1);
      // Arrive when the target reaches 40% of the screen or Selected Work reaches the header — whichever
      // comes first — so the detail lands smoothly instead of snapping into place
      const arrive = Math.min(y + t.top - vh * 0.4, work ? y + work.top - 80 : Infinity);
      const end = Math.max(start + vh * 0.15, arrive);
      show(clamp((y - start) / (end - start)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // The reveal happens on scroll, but also re-check shortly after so a stopped scroll still settles
    const timer = window.setInterval(onScroll, 400);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  if (reduced) return null;
  return (
    <div
      ref={overlay}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 shadow-[0_0_0_1px_rgba(196,201,207,0.4),0_24px_50px_-14px_rgba(0,0,0,0.9)]"
      style={{ visibility: "hidden" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={reveal.src} alt="" className="h-full w-full object-cover" />
    </div>
  );
}
