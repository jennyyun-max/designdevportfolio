"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { archive } from "@/content/polaroids";

type Shot = { id: number; photo: (typeof archive)[number]; rotate: number };

/* An instant camera. Press the shutter: a flash, and a print slides out of the
   slot and slowly develops (in black & white) — each one a real photo with a little true story. Earlier
   shots pile up beside the camera; projects link to their case study. */
export default function PolaroidCamera() {
  const reduced = useReducedMotion();
  const [shots, setShots] = useState<Shot[]>([]);
  const [flash, setFlash] = useState(0);
  const [busy, setBusy] = useState(false);
  const order = useRef<number[]>([]);
  const count = useRef(0);

  const nextPhoto = () => {
    if (!order.current.length) order.current = archive.map((_, i) => i).sort(() => Math.random() - 0.5);
    return archive[order.current.pop()!];
  };

  const shoot = () => {
    if (busy) return;
    setBusy(true);
    setFlash((f) => f + 1);
    const shot = { id: ++count.current, photo: nextPhoto(), rotate: Math.round((Math.random() - 0.5) * 14) };
    window.setTimeout(() => setShots((s) => [shot, ...s].slice(0, 7)), reduced ? 0 : 260);
    window.setTimeout(() => setBusy(false), reduced ? 200 : 1300);
  };

  const [latest, ...pile] = shots;

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:items-start">
      <div className="relative mx-auto w-full max-w-[24rem]">
        {/* the camera */}
        <div className="relative z-10">
          <svg viewBox="0 0 320 240" className="w-full overflow-visible" aria-hidden="true">
            <rect x="22" y="30" width="276" height="196" fill="#252522" />
            <rect x="22" y="150" width="276" height="76" fill="#1c1c1a" />
            <rect x="40" y="46" width="52" height="28" fill="none" stroke="#f3f0e9" strokeWidth="1" opacity="0.6" />
            <text x="232" y="60" fill="#f3f0e9" opacity="0.55" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1">INSTANT · 01</text>
            <circle cx="160" cy="118" r="62" fill="#1c1c1a" stroke="#f3f0e9" strokeOpacity="0.35" strokeWidth="1" />
            <circle cx="160" cy="118" r="48" fill="none" stroke="#f3f0e9" strokeOpacity="0.2" strokeWidth="1" />
            <circle cx="160" cy="118" r="30" fill="#0e0e0d" />
            <circle cx="148" cy="106" r="7" fill="#f3f0e9" opacity="0.25" />
            <rect x="70" y="204" width="180" height="6" fill="#0e0e0d" />
          </svg>
          {/* the shutter */}
          <button
            type="button"
            onClick={shoot}
            disabled={busy}
            className="absolute right-[14%] top-[12.5%] -translate-y-1/2 bg-oxblood px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-paper transition-transform hover:-translate-y-[60%] active:-translate-y-[45%] disabled:opacity-70 motion-reduce:transition-none"
          >
            Shutter
          </button>
          {/* flash */}
          <AnimatePresence>
            {flash > 0 && !reduced && (
              <motion.span
                key={flash}
                className="pointer-events-none fixed inset-0 z-[90] bg-white"
                initial={{ opacity: 0.85 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                aria-hidden="true"
              />
            )}
          </AnimatePresence>
        </div>

        {/* the print that comes out */}
        <div className="relative -mt-[9%] min-h-[24rem] px-[17%]">
          <AnimatePresence mode="popLayout">
            {latest && (
              <motion.figure
                key={latest.id}
                className="polaroid"
                initial={reduced ? { opacity: 0 } : { y: "-70%", rotate: 0, opacity: 1 }}
                animate={{ y: 0, rotate: latest.rotate / 3, opacity: 1 }}
                exit={{ opacity: 0, x: 120, rotate: 12, transition: { duration: 0.3 } }}
                transition={{ duration: reduced ? 0.2 : 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="polaroid-photo aspect-[3/4]">
                  <Image
                    src={latest.photo.src}
                    alt={latest.photo.alt}
                    fill
                    sizes="320px"
                    className="object-cover grayscale [animation:develop_2.6s_ease-out_0.5s_both] motion-reduce:animate-none"
                    style={{ objectPosition: latest.photo.focus ?? "50% 50%" }}
                  />
                </span>
                <span className="polaroid-chin" aria-hidden="true" />
                {latest.photo.story && (
                  <figcaption className="pb-4 text-[0.9rem] leading-snug text-muted" aria-live="polite">
                    {latest.photo.story}
                  </figcaption>
                )}
              </motion.figure>
            )}
          </AnimatePresence>
          {!latest && <p className="meta pt-14 text-center text-muted">Press the shutter to take a photo</p>}
        </div>
      </div>

      {/* the pile */}
      <div>
        <p className="meta text-muted">Your prints {shots.length > 1 && `— ${shots.length - 1}`}</p>
        {pile.length === 0 ? (
          <p className="mt-3 max-w-[22rem] text-muted">Every photo is a personal one, with a short true story. Older prints land here.</p>
        ) : (
          <ul className="mt-5 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-3">
            <AnimatePresence initial={false}>
              {pile.map((s) => (
                <motion.li
                  key={s.id}
                  layout
                  initial={{ opacity: 0, scale: 0.6, y: -30 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: s.rotate }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="polaroid"
                >
                  <span className="polaroid-photo aspect-[3/4]">
                    <Image src={s.photo.src} alt={s.photo.alt} fill sizes="140px" className="object-cover grayscale" style={{ objectPosition: s.photo.focus ?? "50% 50%" }} />
                  </span>
                  <span className="polaroid-chin" aria-hidden="true" />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
}
