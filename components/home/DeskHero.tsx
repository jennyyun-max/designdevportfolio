"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { hero, site } from "@/content/site";
import { dropSettings, prints } from "@/content/polaroids";
import ButtonLink from "../ui/ButtonLink";
import PhotoPreview from "../polaroids/PhotoPreview";
import Print, { type PrintPhase } from "./Print";

const ease = [0.22, 1, 0.36, 1] as const;
const HEADER_PX = 72; // sticky header height (4.5rem)
const GROUND = { desktop: 6, mobile: 5 }; // % of the hero, matches the `y` values in content/polaroids.ts

/* Scroll length of the hero for a given number of falling prints (in svh beyond one screen) */
const extraScroll = (falling: number) => (falling ? dropSettings.firstDropAt + (falling - 1) * dropSettings.dropEvery + dropSettings.holdAfter : 0);

/* The homepage hero: name, one-line intro, “View my work”, and photo prints around the edges.
   The hero is taller than the screen; its stage sticks while you scroll through it, and each
   print drops once the visitor has scrolled past its threshold. Normal page scrolling throughout. */
export default function DeskHero() {
  const sectionRef = useRef<HTMLElement>(null);
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

  // Reset when the layout changes; reduced-motion visitors start with everything on the ground
  useEffect(() => {
    setPhases(prints.map((p) => ((isDesktop ? p.desktop : p.mobile)?.hang && !reduced ? "hanging" : "landed")));
    setStack(prints.map((_, i) => i));
  }, [isDesktop, reduced]);

  // Release prints as the visitor scrolls through the hero. Once released, a print keeps falling.
  useEffect(() => {
    if (reduced || !fallingOrder.length) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const scrolled = HEADER_PX - section.getBoundingClientRect().top; // 0 at the top of the page
      const vh = window.innerHeight / 100;
      const released = fallingOrder.filter((_, n) => scrolled >= (dropSettings.firstDropAt + n * dropSettings.dropEvery) * vh);
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

  const counts = {
    "--extra-m": `${extraScroll(prints.filter((p) => p.mobile?.hang).length)}svh`,
    "--extra-d": `${extraScroll(prints.filter((p) => p.desktop?.hang).length)}svh`,
  } as CSSProperties;
  const ground = isDesktop ? GROUND.desktop : GROUND.mobile;
  const openPrint = open === null ? null : { ...prints[open], rotate: 0 };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      style={counts}
      className="relative h-[calc(100svh-4.5rem+var(--extra-m))] md:h-[calc(100svh-4.5rem+var(--extra-d))] motion-reduce:h-[calc(100svh-4.5rem)] motion-reduce:md:h-[calc(100svh-4.5rem)]"
    >
      <div className="sticky top-[4.5rem] h-[calc(100svh-4.5rem)] overflow-hidden">
        {/* Intro — prints are placed so they never cover it */}
        <div className="absolute inset-x-5 top-[24%] text-left md:inset-x-[24%] md:top-[15%] md:text-center">
          <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            id="hero-heading"
            className="display mt-4 whitespace-nowrap text-[clamp(3.4rem,19vw,6rem)] leading-[0.84] tracking-[-0.06em] md:text-[min(12.5vw,19svh)]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
          >
            {site.name}
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35, ease }}>
            <p className="mt-4 max-w-[34rem] text-[clamp(0.95rem,1.6vw,1.2rem)] leading-snug text-muted md:mx-auto md:mt-5">{hero.text}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 md:mt-6 md:justify-center">
              <ButtonLink href="#work" variant="primary" icon={<ArrowDown size={14} aria-hidden="true" />}>
                View my work
              </ButtonLink>
              <p id="prints-help" className="mono sr-only text-[0.68rem] uppercase tracking-[0.08em] text-muted md:not-sr-only">
                {reduced ? "drag a print by its border" : "scroll to drop the prints"}
              </p>
            </div>
          </motion.div>
        </div>

        {/* The ground: prints land on this line */}
        <div className="silver-line absolute inset-x-0 h-px" style={{ bottom: `${ground}%` }} aria-hidden="true" />

        {/* Drag area = everything above the ground line */}
        <div ref={boundsRef} className="pointer-events-none absolute inset-x-0 top-0" style={{ bottom: `${ground}%` }} aria-hidden="true" />

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
