"use client";

import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

/* ==================================================================
   THE WELCOME — a dark, grainy night sky with very small stars.
   “WELCOME TO / CHLOE’S WORLD / Explore”, a clock in the corner.

   Explore → the signature transition (~3s, one continuous motion):
   1. a faint pulse of light, the title dissolves, the stars drift
      to a few points in the sky (a few leave hairline trails);
   2. each cluster glows briefly and a print materializes inside it;
   3. the prints fall with a spring onto their exact spots on the
      homepage while the night fades to paper;
   4. the real, draggable prints take over in the same frame, and
      the name, introduction and navigation rise in.

   Shown every time someone enters the site on the homepage (decided
   before first paint by the script in app/layout.tsx).
   ================================================================== */

type Star = { x: number; y: number; size: number; o: number; dur: number; delay: number; layer: 0 | 1 | 2; kind: "dot" | "cross"; color: string; phone: boolean };

/* Seeded random numbers: the same sky on the server and in every browser */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeSky(count = 88): Star[] {
  const r = seeded(20261122);
  const stars: Star[] = [];
  while (stars.length < count) {
    const x = r() * 100;
    const y = r() * 100;
    // keep the middle (where the title sits) a little emptier
    if (x > 22 && x < 78 && y > 32 && y < 68 && r() < 0.75) continue;
    const kind = r() < 0.9 ? "dot" : "cross";
    const tint = r();
    stars.push({
      x,
      y,
      kind,
      size: kind === "dot" ? 1 + r() * r() * 2.2 : 6 + r() * 4,
      o: 0.35 + r() * 0.6,
      dur: 3 + r() * 5,
      delay: -r() * 8,
      layer: (r() < 0.45 ? 0 : r() < 0.65 ? 1 : 2) as 0 | 1 | 2,
      color: tint < 0.82 ? "#f3f0e9" : tint < 0.95 ? "#aab1bf" : "#c98f84",
      phone: stars.length % 2 === 0, // phones get every other star
    });
  }
  return stars;
}

const DEPTH = [5, 11, 20]; // parallax reach (px) per layer

function StarShape({ s }: { s: Star }) {
  if (s.kind === "cross")
    return (
      <svg viewBox="0 0 12 12" width={s.size} height={s.size} aria-hidden="true">
        <path d="M6 0.5 V11.5 M0.5 6 H11.5" stroke={s.color} strokeWidth="0.8" />
      </svg>
    );
  return <span className="block rounded-full" style={{ width: s.size, height: s.size, background: s.color, boxShadow: s.size > 2 ? `0 0 ${s.size * 3}px rgba(243,240,233,0.35)` : undefined }} />;
}

function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);
  return (
    <p className="meta absolute bottom-5 left-5 tabular-nums text-paper/55 sm:bottom-7 sm:left-8" aria-hidden="true">
      <span className="mr-2 inline-block h-1 w-1 translate-y-[-2px] rounded-full bg-oxblood" />
      {now ? now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : " "}
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
      animate(el, { x: c.x - sx, y: c.y - sy, scale: [1, 1.6, 0.4], opacity: [1, 1, 0] }, { duration: 1, delay, ease: [0.6, 0, 0.25, 1] });
      // a few leave delicate trails
      if (!phone && k % 6 === 0 && stage.current) {
        const trail = document.createElement("span");
        Object.assign(trail.style, {
          position: "absolute",
          left: `${sx}px`,
          top: `${sy}px`,
          width: `${bestD}px`,
          height: "1px",
          transformOrigin: "0 50%",
          transform: `rotate(${Math.atan2(c.y - sy, c.x - sx)}rad) scaleX(0)`,
          background: "linear-gradient(90deg, rgba(243,240,233,0), rgba(243,240,233,0.7))",
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

    // 2 — clusters glow, prints are born inside them
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
        background: "radial-gradient(circle, rgba(243,240,233,0.55) 0%, rgba(243,240,233,0.12) 35%, rgba(243,240,233,0) 68%)",
        pointerEvents: "none",
        opacity: "0",
      });
      stage.current!.appendChild(glow);
      animate(glow, { scale: [0.2, 1.2, 0.6], opacity: [0, 1, 0] }, { duration: 0.9, delay: 0.75 + i * 0.05, ease: "easeOut" });

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
      const spin = (i % 2 ? 1 : -1) * (8 + (i % 3) * 5);
      await animate(ghost, { x: c.x - t.cx, y: c.y - t.cy, rotate: spin, scale: 0.06 }, { duration: 0 });
      await animate(ghost, { opacity: [0, 1], scale: [0.06, 0.3] }, { duration: 0.4, delay: 0.95 + i * 0.06, ease: [0.22, 1, 0.36, 1] });
      // 3 — they fall onto the page
      await animate(ghost, { x: 0, y: 0, scale: 1, rotate: t.rot }, { type: "spring", duration: 1.3, bounce: 0.12 });
    });

    // the night fades to paper
    if (skyLayer.current) animate(skyLayer.current, { opacity: 0 }, { duration: 1.1, delay: 1.05, ease: "easeInOut" });

    await Promise.all(flights);
    // 4 — the real prints take over in this frame; name + navigation rise in
    finish();
  };

  return (
    <div ref={root} className="intro fixed inset-0 z-[95] overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
      <div ref={skyLayer} className="grain absolute inset-0 bg-night text-paper">
        {/* a faint vignette of light */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(243,240,233,0.07), transparent 60%)" }} aria-hidden="true" />
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
        <span className="shooting-star left-[10%] top-[16%]" style={{ ["--dur" as string]: "11s", ["--delay" as string]: "2.5s" }} aria-hidden="true" />
        <span className="shooting-star left-[52%] top-[8%] max-md:hidden" style={{ ["--dur" as string]: "17s", ["--delay" as string]: "9s" }} aria-hidden="true" />

        {/* corner metadata, like the cover of a magazine */}
        <p className="meta absolute left-5 top-5 text-paper/55 sm:left-8 sm:top-7" aria-hidden="true">
          Chloe Yun — Portfolio
        </p>
        <p className="meta absolute right-5 top-5 text-right text-paper/55 sm:right-8 sm:top-7" aria-hidden="true">
          Design / Technology
          <br className="sm:hidden" /> <span className="max-sm:hidden">/ </span>Creative Exploration
        </p>

        {/* the words */}
        <div ref={content} className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
          <p className="meta tracking-[0.32em] text-paper/60">Welcome to</p>
          <h2 id="welcome-title" className="display mt-5 text-[clamp(3.3rem,14vw,13rem)] uppercase leading-[0.82] tracking-[-0.04em]">
            Chloe’s <em>World</em>
          </h2>
          <button
            type="button"
            onClick={explore}
            className="welcome-explore group meta relative mt-12 inline-flex items-center gap-3 border border-paper/35 px-6 py-3 tracking-[0.24em] text-paper transition-[border-color,background-color,color] duration-500 hover:border-paper hover:bg-paper hover:text-night focus-visible:outline-paper"
          >
            <span ref={pulse} className="pointer-events-none absolute inset-0 bg-paper opacity-0" aria-hidden="true" />
            <span className="h-1 w-1 rounded-full bg-oxblood transition-transform duration-500 group-hover:scale-150" aria-hidden="true" />
            Explore
          </button>
          <p className="meta mt-12 max-w-[24rem] text-balance normal-case tracking-[0.14em] text-paper/45">a little bit of everything, all in one place.</p>
        </div>
        <Clock />
        <button
          type="button"
          onClick={skip}
          className="meta absolute bottom-3 right-3 px-2 py-2 text-paper/55 transition-colors hover:text-paper sm:bottom-5 sm:right-6"
        >
          Skip intro →
        </button>
      </div>
      {/* where stars turn into Polaroids */}
      <div ref={stage} className="pointer-events-none absolute inset-0" aria-hidden="true" />
    </div>
  );
}
