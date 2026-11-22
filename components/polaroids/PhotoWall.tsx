"use client";

import { motion, useDragControls, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { photos, wall, type PersonalPhoto, type PhotoId } from "@/content/personal";
import Polaroid from "./Polaroid";
import PhotoPreview from "./PhotoPreview";

/* ==================================================================
   THE PHOTO WALL — personal photographs scattered across an editorial
   canvas (never project work). Photos come from `wall` in
   content/personal.ts; the layout is computed from their order, so it
   is the same on every visit:
   - a loose, brick-offset grid with seeded jitter, varied sizes (s/m/l)
     and small rotations, so prints overlap naturally;
   - as the wall scrolls into view the prints fall in from above or the
     sides with a spring, staggered;
   - drag to rearrange (mouse / pen — touch keeps scrolling the page),
     hover lifts a print, click opens it large.
   Phones: two columns and the first 8 prints, with “show all”.
   ================================================================== */

const MOBILE_VISIBLE = 8;
const RHYTHM: NonNullable<PersonalPhoto["size"]>[] = ["m", "s", "l", "s", "m", "m", "l", "s", "m", "s"];

/* Print width per size: on desktop as a share of one column (so few photos get bigger prints and
   many photos pack tighter); on phones in % of the canvas */
const WIDTH = { desktop: { s: 0.78, m: 0.92, l: 1.12 }, mobile: { s: 38, m: 43, l: 50 } };

function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Spot = { id: PhotoId; photo: PersonalPhoto; left: number; top: number; width: number; rotate: number; from: { x: number; y: number; rotate: number } };

/* Stable positions: x/width in % of the canvas width, top in “cqw” (also % of the width), so the
   whole composition scales with the canvas. Returns the spots and the canvas height (cqw). */
function layout(ids: PhotoId[], mobile: boolean) {
  const r = seeded(mobile ? 2027 : 1122);
  const cols = mobile ? 2 : Math.min(6, Math.max(4, Math.ceil(ids.length / 3)));
  const slot = 100 / cols;
  const rowH = mobile ? 52 : slot * 0.95;
  let bottom = 0;
  const spots: Spot[] = ids.map((id, i) => {
    const photo: PersonalPhoto = photos[id];
    const size = photo.size ?? RHYTHM[i % RHYTHM.length];
    const width = mobile ? WIDTH.mobile[size] : WIDTH.desktop[size] * slot;
    const row = Math.floor(i / cols);
    const col = i % cols;
    const brick = row % 2 ? slot * 0.35 : 0; // odd rows shift right: no straight columns
    const cx = (col + 0.5) * slot + brick + (r() - 0.5) * slot * 0.35;
    const edge = mobile ? 3 : 1; // room for rotated corners
    const left = Math.max(edge, Math.min(100 - edge - width, cx - width / 2));
    const top = row * rowH + (col % 2 ? rowH * 0.22 : 0) + (r() - 0.5) * rowH * 0.4 + 2;
    const ratio = photo.src.height / photo.src.width;
    bottom = Math.max(bottom, top + width * ratio + width * 0.25);
    const rotate = Math.round((r() - 0.5) * 12 * 10) / 10;
    // where it falls in from: above, or from the left / right edge
    const d = r();
    const from = d < 0.5 ? { x: (r() - 0.5) * 20, y: -70, rotate: rotate - 18 } : d < 0.75 ? { x: -60, y: -30, rotate: rotate - 24 } : { x: 60, y: -30, rotate: rotate + 24 };
    return { id, photo, left, top, width, rotate, from };
  });
  return { spots, height: bottom + 4 };
}

function WallPrint({
  spot,
  n,
  z,
  unit,
  play,
  delay,
  reduced,
  bounds,
  onFront,
  onOpen,
}: {
  spot: Spot;
  n: number;
  z: number;
  /** px per 1% of the canvas width */
  unit: number;
  play: boolean;
  delay: number;
  reduced: boolean;
  bounds: React.RefObject<HTMLDivElement | null>;
  onFront: () => void;
  onOpen: () => void;
}) {
  const controls = useDragControls();
  const dragged = useRef(false);
  const [lifted, setLifted] = useState(false);

  const start = (e: PointerEvent<HTMLDivElement>) => {
    onFront();
    if (e.pointerType === "touch") return; // touch scrolls the page; tap still opens
    dragged.current = false;
    controls.start(e);
  };

  return (
    <motion.div
      className="absolute cursor-grab active:cursor-grabbing"
      style={{ left: `${spot.left}%`, top: `${spot.top}cqw`, width: `${spot.width}%`, zIndex: lifted ? 999 : z }}
      // fall-in offsets in plain px (a unit string here would stop dragging from adding px later)
      initial={reduced ? { opacity: 0, rotate: spot.rotate } : { opacity: 0, x: spot.from.x * unit, y: spot.from.y * unit, rotate: spot.from.rotate }}
      animate={play ? { opacity: 1, x: 0, y: 0, rotate: spot.rotate } : undefined}
      transition={reduced ? { duration: 0.4, delay: delay * 0.3 } : { type: "spring", stiffness: 70, damping: 15, mass: 1.1, delay, opacity: { duration: 0.3, delay } }}
      drag
      dragListener={false}
      dragControls={controls}
      dragConstraints={bounds}
      dragElastic={0.06}
      dragTransition={{ power: 0.1, timeConstant: 200, bounceStiffness: 300, bounceDamping: 26 }}
      onDragStart={() => (dragged.current = true)}
      onPointerDown={start}
      onPointerEnter={() => setLifted(true)}
      onPointerLeave={() => setLifted(false)}
      whileHover={reduced ? undefined : { scale: 1.04, rotate: spot.rotate * 0.4 }}
      whileDrag={{ scale: 1.06, rotate: spot.rotate * 0.3 }}
    >
      <button
        type="button"
        data-cursor="open"
        onClick={() => {
          if (dragged.current) {
            dragged.current = false;
            return;
          }
          onOpen();
        }}
        onFocus={() => setLifted(true)}
        onBlur={() => setLifted(false)}
        aria-label={`${spot.photo.caption} — ${spot.photo.alt}. Open larger`}
        className={`group/print block w-full text-left transition-shadow duration-500 ${
          lifted ? "shadow-[0_36px_60px_-24px_rgba(37,37,34,0.5)]" : "shadow-[0_1px_1px_rgba(37,37,34,0.12),0_12px_24px_-14px_rgba(37,37,34,0.4)]"
        }`}
      >
        <Polaroid photo={spot.photo} n={n} sizes="(min-width: 768px) 260px, 45vw" />
      </button>
    </motion.div>
  );
}

export default function PhotoWall({ ids = wall }: { ids?: PhotoId[] }) {
  const canvas = useRef<HTMLDivElement>(null);
  const inView = useInView(canvas, { once: true, amount: 0.15 });
  const reduced = useReducedMotion() ?? false;
  const [mobile, setMobile] = useState<boolean | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [order, setOrder] = useState<PhotoId[]>([]);
  const [open, setOpen] = useState<PhotoId | null>(null);
  const [unit, setUnit] = useState(0);
  const [round, setRound] = useState(0); // "Scatter again" remounts the prints so they fall in afresh

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => {
      setMobile(mq.matches);
      setUnit((canvas.current?.clientWidth ?? window.innerWidth) / 100);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const shown = useMemo(() => (mobile && !showAll ? ids.slice(0, MOBILE_VISIBLE) : ids), [ids, mobile, showAll]);
  const { spots, height } = useMemo(() => layout(shown, !!mobile), [shown, mobile]);
  useEffect(() => setOrder(shown), [shown]);

  const front = (id: PhotoId) => setOrder((o) => (o[o.length - 1] === id ? o : [...o.filter((x) => x !== id), id]));

  return (
    <div>
      {/* the outer box is the size container; positions and the height are in cqw of its width */}
      {/* overflow-x: clip — prints waiting to fly in from the sides never widen the page */}
      <div className="overflow-x-clip [container-type:inline-size] [overflow-clip-margin:24px]">
        <div ref={canvas} className="relative" style={{ height: `${height}cqw` }} role="group" aria-label={`Personal photographs — ${ids.length} prints. Drag to rearrange, or open one.`}>
          {mobile !== null &&
            unit > 0 &&
            spots.map((spot, i) => (
              <WallPrint
                key={`${mobile ? "m" : "d"}-${round}-${spot.id}`}
                spot={spot}
                n={ids.indexOf(spot.id) + 1}
                z={10 + order.indexOf(spot.id)}
                unit={unit}
                play={inView}
                delay={i * 0.07}
                reduced={reduced}
                bounds={canvas}
                onFront={() => front(spot.id)}
                onOpen={() => setOpen(spot.id)}
              />
            ))}
        </div>
      </div>
      <div className="meta mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted">
        <span className="hidden md:inline">Drag the prints anywhere · click one to open it</span>
        <span className="md:hidden">Tap a print to open it</span>
        <button type="button" onClick={() => setRound((r) => r + 1)} className="wipe text-ink">
          Scatter again ↻
        </button>
      </div>
      {mobile && ids.length > MOBILE_VISIBLE && (
        <button type="button" onClick={() => setShowAll((v) => !v)} className="meta wipe mt-6" aria-expanded={showAll}>
          {showAll ? "Show fewer" : `Show all ${ids.length} photographs`}
        </button>
      )}
      <PhotoPreview photo={open ? { ...photos[open], size: undefined, rotate: 0 } : null} onClose={() => setOpen(null)} />
    </div>
  );
}
