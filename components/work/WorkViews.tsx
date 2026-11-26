"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/types";
import Cover from "./Cover";

const ease = [0.16, 1, 0.3, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");
const FEATURED = 3; // the first three projects are the featured product design case studies

/* Number · title · one line · discipline and year · arrow — the same under every project */
function Info({ p, n, large = false }: { p: Project; n: number; large?: boolean }) {
  return (
    <div className="mt-5 grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4 gap-y-1">
      <span className="meta text-muted">{pad(n)}</span>
      <h3 className={`display ${large ? "text-[clamp(2.2rem,4vw,3.6rem)]" : "text-[clamp(1.7rem,2.4vw,2.3rem)]"} leading-[1]`}>
        <span className="wipe">{p.title}</span>
      </h3>
      <span className="text-[1.3rem] leading-none text-muted transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-oxblood motion-reduce:transition-none" aria-hidden="true">
        ↗
      </span>
      <p className={`col-start-2 max-w-[52ch] leading-snug text-muted ${large ? "text-[1.05rem]" : "text-[0.95rem]"}`}>{p.tagline ?? p.description}</p>
      <p className="meta col-start-2 mt-1 text-muted">
        {p.category}
        {p.year && <span> · {p.year}</span>}
      </p>
    </div>
  );
}

/* A project in the grid: the cover (whole thing is the link), a hover label, the info below */
function Tile({ p, n, aspect, large = false, priority = false, delay = 0 }: { p: Project; n: number; aspect: string; large?: boolean; priority?: boolean; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -8% 0px" }} transition={{ duration: 1, delay, ease }}>
      <Link href={`/work/${p.slug}`} data-cursor="view" className="group block focus-visible:outline-offset-4">
        <div className="relative">
          <div className="transition-transform duration-[1.1s] ease-[var(--ease-out-expo)] group-hover:scale-[1.012] motion-reduce:transition-none">
            <Cover project={p} aspect={aspect} priority={priority} />
          </div>
          <span className="meta pointer-events-none absolute bottom-4 left-4 translate-y-2 bg-paper px-3 py-2 opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none">
            View case study →
          </span>
        </div>
        <Info p={p} n={n} large={large} />
      </Link>
    </motion.div>
  );
}

function Grid({ projects }: { projects: Project[] }) {
  const featured = projects.slice(0, FEATURED);
  const rest = projects.slice(FEATURED);
  return (
    <div>
      <section aria-labelledby="featured-h">
        <div className="flex items-baseline justify-between border-t border-ink pt-4">
          <h2 id="featured-h" className="meta">
            Featured work
          </h2>
          <span className="meta text-muted">01 — {pad(FEATURED)}</span>
        </div>
        <div className="mt-8">
          <Tile p={featured[0]} n={1} aspect="aspect-[4/3] md:aspect-[21/9]" large priority />
        </div>
        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-8 lg:gap-10">
          {featured.slice(1).map((p, i) => (
            <Tile key={p.slug} p={p} n={i + 2} aspect="aspect-[5/4]" large priority delay={i * 0.08} />
          ))}
        </div>
      </section>

      <section aria-labelledby="beyond-h" className="mt-28 md:mt-40">
        <div className="grid gap-4 border-t border-ink pt-4 md:grid-cols-12">
          <h2 id="beyond-h" className="meta md:col-span-3">
            Beyond product design
          </h2>
          <p className="max-w-[46ch] text-[0.98rem] leading-relaxed text-muted md:col-span-6">Data, a career change, and a startup — the work around the work.</p>
          <span className="meta text-muted md:col-span-3 md:text-right">
            {pad(FEATURED + 1)} — {pad(projects.length)}
          </span>
        </div>
        <div className="mt-10 grid gap-14 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Tile key={p.slug} p={p} n={FEATURED + i + 1} aspect="aspect-[4/3]" delay={i * 0.08} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* The list: an editorial index. On a mouse, the art-directed cover follows the pointer. */
function List({ projects }: { projects: Project[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const [fine, setFine] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 });
  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setHover(null)}
    >
      <div className="meta hidden grid-cols-[3.5rem_1.4fr_1fr_5rem_2rem] gap-x-6 border-b border-ink pb-3 text-muted md:grid">
        <span>No.</span>
        <span>Project</span>
        <span>Discipline</span>
        <span>Year</span>
        <span />
      </div>
      <ol>
        {projects.map((p, i) => (
          <li key={p.slug} className={`border-b border-line ${i === FEATURED ? "border-t border-t-ink/40 md:mt-6" : ""}`}>
            <Link
              href={`/work/${p.slug}`}
              data-cursor="view"
              onPointerEnter={() => setHover(i)}
              className={`group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1 py-6 transition-colors duration-300 md:grid-cols-[3.5rem_1.4fr_1fr_5rem_2rem] md:gap-x-6 ${hover !== null && hover !== i ? "text-muted-soft" : ""}`}
            >
              <span className="meta text-muted">{pad(i + 1)}</span>
              <span>
                <span className="display block text-[clamp(1.8rem,3.2vw,3rem)] leading-[1] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2 motion-reduce:transition-none">{p.title}</span>
                <span className="mt-2 block max-w-[48ch] text-[0.92rem] leading-snug text-muted md:hidden">{p.tagline ?? p.description}</span>
              </span>
              <span className="meta hidden md:block">{p.category}</span>
              <span className="meta hidden md:block">{p.year || "—"}</span>
              <span className="text-right text-[1.2rem] text-muted transition-transform duration-500 group-hover:translate-x-1 group-hover:text-oxblood motion-reduce:transition-none" aria-hidden="true">
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {fine && (
        <motion.div className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block" style={{ x: sx, y: sy }} aria-hidden="true">
          <AnimatePresence>
            {hover !== null && (
              <motion.div
                key={projects[hover].slug}
                className="absolute left-6 top-[-7rem] w-[22rem] shadow-[0_30px_60px_-30px_rgba(37,37,34,0.6)]"
                initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease }}
              >
                <Cover project={projects[hover]} aspect="aspect-[4/3]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

/* Grid (default) or List, remembered per visitor */
export default function WorkViews({ projects }: { projects: Project[] }) {
  const [view, setView] = useState<"grid" | "list">("grid");
  useEffect(() => {
    try {
      if (localStorage.getItem("work-view-2") === "list") setView("list");
    } catch {}
  }, []);
  const choose = (v: "grid" | "list") => {
    setView(v);
    try {
      localStorage.setItem("work-view-2", v);
    } catch {}
  };

  return (
    <div>
      <div className="mb-10 flex items-center justify-between gap-4">
        <span className="meta text-muted">View</span>
        <div role="radiogroup" aria-label="Layout" className="meta relative inline-grid grid-cols-2 border border-ink/25 p-1">
          <motion.span
            className="absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-ink"
            animate={{ x: view === "grid" ? 0 : "100%" }}
            transition={{ duration: 0.45, ease }}
            aria-hidden="true"
          />
          {(["grid", "list"] as const).map((v) => (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={view === v}
              onClick={() => choose(v)}
              className={`relative z-10 min-h-9 px-5 py-1.5 transition-colors duration-300 ${view === v ? "text-paper" : "text-muted hover:text-ink"}`}
            >
              {v === "grid" ? "Grid" : "List"}
            </button>
          ))}
        </div>
      </div>

      {/* swap at once and fade in — opacity only: a transform here would trap the List view's fixed cover preview */}
      <motion.div key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, ease }}>
        {view === "grid" ? <Grid projects={projects} /> : <List projects={projects} />}
      </motion.div>
    </div>
  );
}
