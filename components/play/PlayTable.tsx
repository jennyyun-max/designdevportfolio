"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { playPrints } from "@/content/polaroids";
import type { PrintLayout } from "@/lib/types";
import Print from "../home/Print";
import PhotoPreview from "../polaroids/PhotoPreview";

/* Deterministic jitter so server/client and every visit agree */
const jitter = (i: number, k: number) => (((Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1) + 1) % 1;

/* The photo archive: prints dealt onto a tabletop (no gravity). Pick one up by its border,
   drag or toss it; tap/click a photo to see it larger, or a project print to open the case study. */
export default function PlayTable() {
  const boundsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [stack, setStack] = useState(() => playPrints.map((_, i) => i));
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const cols = isDesktop ? 5 : 2;
  const rows = Math.ceil(playPrints.length / cols);
  const rowSvh = isDesktop ? 34 : 23;

  // Loose grid with jitter → reads as prints scattered on a table, never stacked on top of each other
  const layouts = useMemo<PrintLayout[]>(
    () =>
      playPrints.map((_, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const colW = 100 / cols;
        return {
          rest: {
            x: c * colW + (isDesktop ? 1 + jitter(i, 1) * 4 : 3 + jitter(i, 1) * 14),
            y: 100 - ((r + 1) * 100) / rows + 1 + jitter(i, 2) * 2,
            rotate: (jitter(i, 3) - 0.5) * 14,
          },
        };
      }),
    [cols, rows, isDesktop],
  );

  const bringToFront = useCallback((i: number) => setStack((s) => (s[s.length - 1] === i ? s : [...s.filter((n) => n !== i), i])), []);
  const openPrint = open === null ? null : { ...playPrints[open], rotate: 0 };

  return (
    <>
      <div
        ref={boundsRef}
        role="group"
        aria-label="Photo archive"
        aria-describedby="play-help"
        className="relative overflow-hidden border-y border-line"
        style={{ height: `${rows * rowSvh + 4}svh` }}
      >
        {isDesktop !== null &&
          playPrints.map((print, i) => (
            <Print
              key={`${isDesktop ? "d" : "m"}-${i}`}
              print={print}
              layout={layouts[i]}
              index={i}
              phase="landed"
              zIndex={10 + stack.indexOf(i)}
              fallSeconds={1}
              tipSeconds={0}
              gravity={false}
              deal={reduced ? undefined : 0.15 + i * 0.06}
              boundsRef={boundsRef}
              onLanded={() => {}}
              onFront={() => bringToFront(i)}
              onOpenPhoto={() => setOpen(i)}
            />
          ))}
      </div>
      <PhotoPreview photo={openPrint} onClose={() => setOpen(null)} />
    </>
  );
}
