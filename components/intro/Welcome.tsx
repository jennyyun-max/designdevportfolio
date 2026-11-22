"use client";

import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

/* ==================================================================
   THE WELCOME — a full-screen blush sky full of stars.
   “WELCOME TO / Chloe’s World / EXPLORE ♡ / a little bit of everything,
   all in one place.” and a little clock in the corner.

   Explore → the signature transition (~3s, one continuous motion):
   1. the button pulses, the title fades, the stars brighten and fly
      to a few points in the sky (some leave trails);
   2. each cluster glows and a Polaroid materializes inside it;
   3. the Polaroids fall with a spring onto their exact spots in the
      homepage collage while the sky fades from blush to cream;
   4. the real, draggable Polaroids take over in the same frame, and
      the homepage greeting and navigation rise in.

   Shown on entering the homepage until the visitor has explored once
   (decided before first paint by the script in app/layout.tsx).
   ================================================================== */

type Star = { x: number; y: number; size: number; o: number; dur: number; delay: number; layer: 0 | 1 | 2; kind: "dot" | "cross" | "sparkle"; color: string; phone: boolean };

/* Seeded random numbers: the same sky on the server and in every browser */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeSky(count = 92): Star[] {
  const r = seeded(20261122);
  const stars: Star[] = [];
  while (stars.length < count) {
    const x = r() * 100;
    const y = r() * 100;
    // keep the middle (where the title sits) a little emptier
    if (x > 28 && x < 72 && y > 30 && y < 70 && r() < 0.7) continue;
    const roll = r();
    const kind = roll < 0.8 ? "dot" : roll < 0.9 ? "cross" : "sparkle";
    const tint = r();
    stars.push({
      x,
      y,
      kind,
      size: kind === "dot" ? 1.8 + r() * r() * 4 : kind === "cross" ? 9 + r() * 6 : 11 + r() * 9,
      o: 0.6 + r() * 0.4,
      dur: 2.4 + r() * 4,
      delay: -r() * 6,
      layer: (r() < 0.45 ? 0 : r() < 0.65 ? 1 : 2) as 0 | 1 | 2,
      color: kind === "sparkle" ? (tint < 0.5 ? "#cfae7e" : "#b67d91") : kind === "cross" ? (tint < 0.5 ? "#b67d91" : "#8c6474") : tint < 0.35 ? "#ffffff" : tint < 0.8 ? "#b67d91" : "#8c6474",
      phone: stars.length % 2 === 0, // phones get every other star
    });
  }
  return stars;
}

const DEPTH = [6, 14, 26]; // parallax reach (px) per layer

function StarShape({ s }: { s: Star }) {
  if (s.kind === "cross")
    return (
      <svg viewBox="0 0 12 12" width={s.size} height={s.size} aria-hidden="true">
        <path d="M6 0.5 V11.5 M0.5 6 H11.5" stroke={s.color} strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    );
  if (s.kind === "sparkle")
    return (
      <svg viewBox="0 0 20 20" width={s.size} height={s.size} aria-hidden="true">
        <path d="M10 0 C10.8 6.4 13.6 9.2 20 10 C13.6 10.8 10.8 13.6 10 20 C9.2 13.6 6.4 10.8 0 10 C6.4 9.2 9.2 6.4 10 0 Z" fill={s.color} />
      </svg>
    );
  return (
    <span
      className="block rounded-full"
      style={{
        width: s.size,
        height: s.size,
        background: s.color,
        boxShadow:
          s.color === "#ffffff"
            ? `0 0 0 0.75px rgba(182,125,145,0.55), 0 0 ${s.size * 2.6}px ${s.size * 0.7}px rgba(255,255,255,0.95)`
            : `0 0 ${s.size * 1.6}px ${s.size * 0.2}px rgba(182,125,145,0.35)`,
      }}
    />
  );
}

function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);
  return (
    <p className="mono absolute bottom-5 left-5 text-[0.7rem] uppercase tracking-[0.16em] text-espresso-soft/80 sm:bottom-7 sm:left-8" aria-hidden="true">
      <span className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-rose" />
      {now ? now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).toLowerCase() : " "}
    </p>
  );
}

export default function Welcome() {
  const reduced = useReducedMotion();
  const sky = useMemo(() => makeSky(), []);
  const root = useRef<HTMLDivElement>(null);
  const skyLayer = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const pulse = useRef<HTMLSpanElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const stars = useRef<(HTMLSpanElement | null)[]>([]);
  const [leaving, setLeaving] = useState(false);

  // gentle parallax following the cursor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 20 });
  const py = useSpring(my, { stiffness: 60, damping: 20 });
  const layers = [
    { x: useTransform(px, (v) => -v * DEPTH[0]), y: useTransform(py, (v) => -v * DEPTH[0]) },
    { x: useTransform(px, (v) => -v * DEPTH[1]), y: useTransform(py, (v) => -v * DEPTH[1]) },
    { x: useTransform(px, (v) => -v * DEPTH[2]), y: useTransform(py, (v) => -v * DEPTH[2]) },
  ];
  useEffect(() => {
    if (reduced || leaving) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, leaving, mx, my]);

  const finish = () => {
    try {
      localStorage.setItem("intro-seen", "1");
    } catch {}
    const html = document.documentElement;
    if (html.dataset.intro === "play") html.dataset.intro = "done";
  };

  const skip = () => {
    if (leaving) return;
    setLeaving(true);
    root.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 320, fill: "forwards" }).finished.then(finish);
  };
  useEffect(() => {
    if (document.documentElement.dataset.intro !== "play") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && skip();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const explore = async () => {
    if (leaving) return;
    setLeaving(true);
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const targets = [...document.querySelectorAll<HTMLElement>(".hero-prints [data-print]")].map((el) => {
      const r = el.getBoundingClientRect(); // a rotated box's bounds share its centre
      return { el, cx: r.left + r.width / 2, cy: r.top + r.height / 2, w: el.offsetWidth, h: el.offsetHeight, rot: Number(el.dataset.rotate ?? 0) };
    });
    if (reduced || !targets.length || !stage.current) {
      root.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: "forwards" }).finished.then(finish);
      return;
    }
    const phone = vw < 768;

    // 1 — a pulse of light, the title fades, stars gather
    if (pulse.current) animate(pulse.current, { scale: [0.6, 3.4], opacity: [0.75, 0] }, { duration: 0.9, ease: "easeOut" });
    if (content.current) animate(content.current, { opacity: 0, y: -12, filter: "blur(6px)" }, { duration: 0.55, ease: [0.4, 0, 0.2, 1] });

    // gathering points spread across the sky, each leaning toward where its Polaroid will land
    const order = targets.map((_, i) => i).sort((a, b) => targets[a].cx - targets[b].cx);
    const clusters = targets.map(() => ({ x: 0, y: 0 }));
    order.forEach((i, n) => {
      const spread = vw * (0.12 + (0.76 * n) / Math.max(1, targets.length - 1));
      clusters[i] = { x: spread * 0.6 + targets[i].cx * 0.4, y: vh * (0.12 + ((n * 37) % 5) * 0.05) };
    });
    stars.current.forEach((el, k) => {
      if (!el || el.offsetParent === null) return;
      const r = el.getBoundingClientRect();
      const sx = r.left + r.width / 2;
      const sy = r.top + r.height / 2;
      let best = 0;
      let bestD = Infinity;
      clusters.forEach((c, i) => {
        const d = Math.hypot(c.x - sx, c.y - sy);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      const c = clusters[best];
      const delay = 0.05 + (bestD / Math.max(vw, vh)) * 0.25 + (k % 7) * 0.012;
      animate(el, { x: c.x - sx, y: c.y - sy, scale: [1, 1.9, 0.3], opacity: [1, 1, 0] }, { duration: 0.95, delay, ease: [0.6, 0, 0.25, 1] });
      // a few leave delicate trails
      if (!phone && k % 6 === 0 && stage.current) {
        const trail = document.createElement("span");
        Object.assign(trail.style, {
          position: "absolute",
          left: `${sx}px`,
          top: `${sy}px`,
          width: `${bestD}px`,
          height: "1.5px",
          transformOrigin: "0 50%",
          transform: `rotate(${Math.atan2(c.y - sy, c.x - sx)}rad) scaleX(0)`,
          background: "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.95))",
          borderRadius: "2px",
          pointerEvents: "none",
        });
        stage.current.appendChild(trail);
        trail.animate(
          [
            { transform: `rotate(${Math.atan2(c.y - sy, c.x - sx)}rad) scaleX(0)`, opacity: 0 },
            { opacity: 0.9, offset: 0.4 },
            { transform: `rotate(${Math.atan2(c.y - sy, c.x - sx)}rad) scaleX(1)`, opacity: 0 },
          ],
          { duration: 950, delay: delay * 1000, easing: "cubic-bezier(0.6,0,0.25,1)", fill: "forwards" },
        );
      }
    });

    // 2 — clusters glow, Polaroids are born inside them
    const flights = targets.map(async (t, i) => {
      const c = clusters[i];
      const glow = document.createElement("span");
      Object.assign(glow.style, {
        position: "absolute",
        left: `${c.x - 70}px`,
        top: `${c.y - 70}px`,
        width: "140px",
        height: "140px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(246,232,177,0.6) 35%, rgba(244,225,227,0) 70%)",
        pointerEvents: "none",
        opacity: "0",
      });
      stage.current!.appendChild(glow);
      animate(glow, { scale: [0.2, 1.4, 0.6], opacity: [0, 1, 0] }, { duration: 0.9, delay: 0.75 + i * 0.05, ease: "easeOut" });

      const ghost = document.createElement("div");
      Object.assign(ghost.style, {
        position: "absolute",
        left: `${t.cx - t.w / 2}px`,
        top: `${t.cy - t.h / 2}px`,
        width: `${t.w}px`,
        height: `${t.h}px`,
        opacity: "0",
        pointerEvents: "none",
        willChange: "transform, opacity",
      });
      const paper = t.el.querySelector("[data-paper]")?.cloneNode(true) as HTMLElement | null;
      if (paper) {
        paper.removeAttribute("data-paper");
        paper.style.width = "100%";
        paper.style.rotate = "0deg";
        ghost.appendChild(paper);
      }
      stage.current!.appendChild(ghost);
      const spin = (i % 2 ? 1 : -1) * (14 + (i % 3) * 8);
      await animate(ghost, { x: c.x - t.cx, y: c.y - t.cy, rotate: spin, scale: 0.06 }, { duration: 0 });
      await animate(ghost, { opacity: [0, 1], scale: [0.06, 0.3] }, { duration: 0.4, delay: 0.95 + i * 0.06, ease: [0.22, 1, 0.36, 1] });
      // 3 — they fall into the scrapbook
      await animate(ghost, { x: 0, y: 0, scale: 1, rotate: t.rot }, { type: "spring", duration: 1.25, bounce: 0.22 });
    });

    // the sky fades from blush to cream
    if (skyLayer.current) animate(skyLayer.current, { opacity: 0 }, { duration: 1.1, delay: 1.05, ease: "easeInOut" });

    await Promise.all(flights);
    // 4 — the real Polaroids take over in this frame; greeting + navigation rise in
    finish();
  };

  return (
    <div ref={root} className="intro fixed inset-0 z-[95] overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
      <div ref={skyLayer} className="absolute inset-0 bg-sky-blush">
        {/* soft light in the sky */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 28% 18%, rgba(255,248,240,0.85), transparent 46%), radial-gradient(ellipse at 76% 82%, rgba(232,214,189,0.55), transparent 50%), radial-gradient(ellipse at 50% 55%, rgba(255,253,249,0.5), transparent 42%)",
          }}
          aria-hidden="true"
        />
        {/* the stars, on three parallax layers */}
        {[0, 1, 2].map((layer) => (
          <motion.div key={layer} className="absolute -inset-8" style={layers[layer]} aria-hidden="true">
            {sky.map((s, k) =>
              s.layer !== layer ? null : (
                <span
                  key={k}
                  ref={(el) => {
                    stars.current[k] = el;
                  }}
                  className={`absolute ${s.phone ? "" : "max-md:hidden"}`}
                  style={{ left: `${s.x}%`, top: `${s.y}%`, opacity: s.o }}
                >
                  <span className="star-twinkle block" style={{ ["--dur" as string]: `${s.dur}s`, ["--delay" as string]: `${s.delay}s` }}>
                    <StarShape s={s} />
                  </span>
                </span>
              ),
            )}
          </motion.div>
        ))}
        {/* shooting stars */}
        <span className="shooting-star left-[8%] top-[14%]" style={{ ["--dur" as string]: "9s", ["--delay" as string]: "2.2s" }} aria-hidden="true" />
        <span className="shooting-star left-[48%] top-[6%] max-md:hidden" style={{ ["--dur" as string]: "13s", ["--delay" as string]: "6.5s" }} aria-hidden="true" />

        {/* the words */}
        <div ref={content} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="mono text-[0.72rem] uppercase tracking-[0.42em] text-espresso-soft sm:text-[0.8rem]">Welcome to</p>
          <h2 id="welcome-title" className="display mt-4 text-[clamp(3.2rem,11vw,7.6rem)] text-espresso">
            Chloe’s <em>World</em>
          </h2>
          <button
            type="button"
            onClick={explore}
            className="welcome-explore group relative mt-9 inline-flex items-center gap-2 rounded-full bg-cream px-8 py-3.5 font-mono text-[0.82rem] uppercase tracking-[0.28em] text-espresso transition-transform duration-300 hover:scale-[1.06] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-espresso active:scale-[0.98] motion-reduce:transition-none"
          >
            <span ref={pulse} className="pointer-events-none absolute inset-0 rounded-full bg-white opacity-0" aria-hidden="true" />
            {/* sparkles that appear on hover */}
            {[
              ["-left-3 -top-2", "#d9bf98", 0],
              ["-right-2 -top-3", "#b67d91", 60],
              ["-bottom-3 right-6", "#d9bf98", 120],
            ].map(([pos, color, d]) => (
              <svg
                key={pos as string}
                viewBox="0 0 20 20"
                className={`pointer-events-none absolute h-3.5 w-3.5 scale-0 opacity-0 transition-[transform,opacity] duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 ${pos}`}
                style={{ transitionDelay: `${d}ms` }}
                aria-hidden="true"
              >
                <path d="M10 0 C10.8 6.4 13.6 9.2 20 10 C13.6 10.8 10.8 13.6 10 20 C9.2 13.6 6.4 10.8 0 10 C6.4 9.2 9.2 6.4 10 0 Z" fill={color as string} />
              </svg>
            ))}
            Explore <span className="text-rose" aria-hidden="true">♡</span>
          </button>
          <p className="mono mt-10 text-[0.68rem] lowercase leading-[2] tracking-[0.3em] text-espresso-soft/90 sm:text-[0.72rem]">
            a little bit of everything,
            <br />
            all in one place.
          </p>
        </div>
        <Clock />
        <button
          type="button"
          onClick={skip}
          className="mono absolute bottom-4 right-4 rounded-full px-3 py-2 text-[0.68rem] uppercase tracking-[0.2em] text-espresso-soft/80 transition-colors hover:text-espresso sm:bottom-6 sm:right-7"
        >
          skip intro →
        </button>
      </div>
      {/* where stars turn into Polaroids */}
      <div ref={stage} className="pointer-events-none absolute inset-0" aria-hidden="true" />
    </div>
  );
}
