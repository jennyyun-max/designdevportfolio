"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { hero } from "@/content/site";
import Rich from "../ui/Rich";
import { dropSettings, prints, reveal } from "@/content/polaroids";
import PhotoPreview from "../polaroids/PhotoPreview";
import Print, { PRINT_WIDTH, type PrintPhase } from "./Print";

const ease = [0.22, 1, 0.36, 1] as const;
const FLOOR = { desktop: 6, mobile: 5 }; // % of the hero, matches the `y` values in content/polaroids.ts

/* The homepage hero, composed like an editorial spread: “hi, i’m chloe” anchored on the left,
   a few large prints suspended on threads on the right, a warm floor line at the bottom.
   The hero is slightly shorter than the screen so the featured project peeks in below.

   Normal page scrolling: each print lets go once the page has scrolled past its threshold and
   then finishes its fall on its own. The last print hides a detail from the featured project;
   Selected Work (DetailFlight) carries that detail into the project spread. */
export default function DeskHero() {
  const boundsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null); // null until mounted
  const [phases, setPhases] = useState<PrintPhase[]>([]);
  const [stack, setStack] = useState<number[]>([]);
  const [open, setOpen] = useState<number | null>(null);

  // Which layout applies (prints render client-side only, so server and client always agree)
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
  const fallingOrder = useMemo(() => visible.filter((v) => v.layout!.hang).map((v) => v.i), [visible]);
  const cover = visible.find((v) => v.print.cover && v.layout!.hang);

  // Reset when the layout changes; reduced-motion visitors start with everything on the floor
  useEffect(() => {
    setPhases(prints.map((p) => ((isDesktop ? p.desktop : p.mobile)?.hang && !reduced ? "hanging" : "landed")));
    setStack(prints.map((_, i) => i));
  }, [isDesktop, reduced]);

  // Release prints as the page scrolls. Once released, a print keeps falling even if scrolling stops.
  useEffect(() => {
    if (reduced || !fallingOrder.length) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      const vh = window.innerHeight / 100;
      const released = fallingOrder.filter((_, n) => window.scrollY >= (dropSettings.firstDropAt + n * dropSettings.dropEvery) * vh);
      if (!released.length) return;
      setPhases((ph) => {
        let changed = false;
        const next = ph.map((p, i) => {
          if (p === "hanging" && released.includes(i)) {
            changed = true;
            return "falling" as const;
          }
          return p;
        });
        return changed ? next : ph;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [fallingOrder, reduced]);

  const bringToFront = useCallback((i: number) => setStack((s) => (s[s.length - 1] === i ? s : [...s.filter((n) => n !== i), i])), []);
  const land = useCallback(
    (i: number) => {
      setPhases((ph) => ph.map((p, n) => (n === i ? "landed" : p)));
      bringToFront(i); // later prints settle on top of earlier ones
    },
    [bringToFront],
  );

  const floor = isDesktop ? FLOOR.desktop : FLOOR.mobile;
  const revealed = cover ? phases[cover.i] !== "hanging" : false;
  const openPrint = open === null ? null : { ...prints[open], rotate: 0 };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative h-[calc(100svh-4.5rem-9svh)] min-h-[30rem] overflow-hidden md:h-[calc(100svh-4.5rem-13svh)] md:min-h-[34rem]"
    >
      {/* Name, anchored left */}
      <div className="absolute inset-x-5 top-[4%] md:left-[6%] md:right-auto md:top-[12%] md:w-[33%]">
        <motion.h1
          id="hero-heading"
          className="font-serif text-[min(17vw,10svh)] font-normal leading-[0.92] tracking-[-0.01em] md:text-[min(9.5vw,15svh)]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          <Rich text={hero.headline} />
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35, ease }}>
          <p className="mt-3 max-w-[24rem] text-[clamp(1rem,1.4vw,1.2rem)] leading-snug md:mt-6">{hero.text}</p>
          <p className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2 md:mt-6">
            <a href="#work" className="link text-[1rem] text-fg">
              View my work ↓
            </a>
            <span id="prints-help" className="mono sr-only text-[0.68rem] uppercase tracking-[0.08em] text-muted md:not-sr-only">
              {reduced ? "drag a print by its border" : "scroll — the prints will fall"}
            </span>
          </p>
        </motion.div>
      </div>

      {/* The floor: a thin warm line the prints land on */}
      <div className="silver-line absolute inset-x-0 h-px" style={{ bottom: `${floor}%` }} aria-hidden="true" />

      {/* Drag area = everything above the floor */}
      <div ref={boundsRef} className="pointer-events-none absolute inset-x-0 top-0" style={{ bottom: `${floor}%` }} aria-hidden="true" />

      {/* The payoff: a detail from the featured project, hidden under the cover print.
          Its slot has the cover print's exact size and spot, so the print always hides it. */}
      {cover && (
        <div
          className={`absolute ${PRINT_WIDTH[cover.print.size ?? "regular"]} aspect-[1/1.139]`}
          style={{ left: `${cover.layout!.hang!.x}%`, bottom: `${cover.layout!.hang!.y}%`, zIndex: 5 }}
        >
          <Link
            href={`/work/${reveal.project}`}
            data-reveal-source
            data-revealed={revealed || reduced ? "true" : "false"}
            aria-label={`${reveal.alt}. Open the case study`}
            className="absolute left-[7%] top-[13%] block aspect-[438/181] w-[86%] shadow-[0_0_0_1px_rgba(58,38,32,0.12),0_12px_28px_-12px_rgba(58,38,32,0.35)]"
          >
            <Image src={reveal.src} alt="" fill sizes="(min-width: 768px) 300px, 130px" className="object-cover" />
          </Link>
        </div>
      )}

      <div role="group" aria-label="Photo prints" aria-describedby="prints-help">
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
              tipSeconds={dropSettings.tipSeconds}
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
