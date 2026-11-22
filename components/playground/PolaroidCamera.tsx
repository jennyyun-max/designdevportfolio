"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { archive } from "@/content/polaroids";

type Shot = { id: number; photo: (typeof archive)[number]; rotate: number };

/* An instant camera. Press the shutter: a flash, a whirr, and a print slides out of the
   slot and slowly develops — each one a real photo with a little true story. Earlier
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
          <svg viewBox="0 0 320 240" className="w-full overflow-visible drop-shadow-[0_18px_24px_rgba(58,38,32,0.22)]" aria-hidden="true">
            <path d="M24 46 Q24 26 44 26 L276 26 Q296 26 296 46 L298 214 Q298 230 280 230 L40 230 Q22 230 22 214 Z" fill="#f8dedb" stroke="#3a2620" strokeWidth="3" strokeLinejoin="round" />
            <path d="M24 150 L296 150" stroke="#3a2620" strokeWidth="2" opacity="0.25" />
            <path d="M30 156 Q160 164 290 156 L292 212 Q292 224 278 224 L42 224 Q28 224 28 212 Z" fill="#f2c4c0" opacity="0.8" />
            {/* rainbow stripe */}
            {["#f6e4a8", "#d3dfca", "#cadded", "#ddd4ef"].map((c, i) => (
              <rect key={c} x={140 + i * 9} y="26" width="9" height="124" fill={c} />
            ))}
            <rect x="44" y="40" width="58" height="34" rx="8" fill="#fffdf8" stroke="#3a2620" strokeWidth="2.6" />
            <rect x="52" y="47" width="42" height="20" rx="5" fill="#cadded" />
            <rect x="226" y="40" width="44" height="26" rx="6" fill="#fffdf8" stroke="#3a2620" strokeWidth="2.6" />
            <circle cx="160" cy="118" r="62" fill="#fffdf8" stroke="#3a2620" strokeWidth="3" />
            <circle cx="160" cy="118" r="44" fill="#3a2620" />
            <circle cx="160" cy="118" r="28" fill="#6d5850" />
            <circle cx="146" cy="104" r="9" fill="#fff" opacity="0.7" />
            <circle cx="172" cy="128" r="4" fill="#fff" opacity="0.4" />
            {/* print slot */}
            <rect x="70" y="202" width="180" height="10" rx="5" fill="#3a2620" />
            <path d="M262 92 q 8 -6 16 0" stroke="#3a2620" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          </svg>
          {/* the shutter */}
          <button
            type="button"
            onClick={shoot}
            disabled={busy}
            className="absolute right-[20%] top-[11%] grid aspect-square w-[15%] -translate-y-1/2 place-items-center rounded-full border-[3px] border-espresso bg-rose shadow-[0_4px_0_var(--espresso)] transition-transform hover:-translate-y-[55%] active:-translate-y-[45%] active:shadow-[0_1px_0_var(--espresso)] disabled:opacity-80 motion-reduce:transition-none"
            aria-label="Take a photo"
          >
            <span className="sr-only">Take a photo</span>
          </button>
          <p className="hand absolute right-[38%] top-[-4%] -rotate-6 text-[1.3rem] leading-none text-rose-deep" aria-hidden="true">
            press me! →
          </p>
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
                className="relative rounded-[3px] bg-paper p-[7%] pb-0 shadow-[0_20px_30px_-20px_rgba(58,38,32,0.6)]"
                initial={reduced ? { opacity: 0 } : { y: "-70%", rotate: 0, opacity: 1 }}
                animate={{ y: 0, rotate: latest.rotate / 3, opacity: 1 }}
                exit={{ opacity: 0, x: 120, rotate: 12, transition: { duration: 0.3 } }}
                transition={{ duration: reduced ? 0.2 : 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="relative block aspect-square overflow-hidden bg-[#2d211d]">
                  <Image
                    src={latest.photo.src}
                    alt={latest.photo.alt}
                    fill
                    sizes="320px"
                    className="object-cover [animation:develop_2.6s_ease-out_0.5s_both] motion-reduce:animate-none"
                    style={{ objectPosition: latest.photo.focus ?? "50% 50%" }}
                  />
                </span>
                <figcaption className="pb-3 pt-2 text-center" aria-live="polite">
                  <span className="hand block text-[1.6rem] leading-none">{latest.photo.caption}</span>
                  <span className="mt-1 block text-[0.88rem] leading-snug text-espresso-soft">{latest.photo.story}</span>
                  {latest.photo.href && (
                    <Link href={latest.photo.href} className="link mt-1 inline-block text-[0.88rem] font-semibold">
                      see the project →
                    </Link>
                  )}
                </figcaption>
              </motion.figure>
            )}
          </AnimatePresence>
          {!latest && <p className="hand pt-14 text-center text-[1.5rem] text-espresso-soft">press the pink button to take a photo</p>}
        </div>
      </div>

      {/* the pile */}
      <div>
        <p className="eyebrow">your prints {shots.length > 1 && `· ${shots.length - 1}`}</p>
        {pile.length === 0 ? (
          <p className="mt-3 max-w-[22rem] text-espresso-soft">Every photo comes from my camera roll and comes with a little story. Older prints land here.</p>
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
                  className="rounded-[2px] bg-paper p-[7%] pb-0 shadow-[0_10px_18px_-12px_rgba(58,38,32,0.6)]"
                >
                  <span className="relative block aspect-square overflow-hidden bg-pink">
                    <Image src={s.photo.src} alt={s.photo.alt} fill sizes="140px" className="object-cover" style={{ objectPosition: s.photo.focus ?? "50% 50%" }} />
                  </span>
                  <span className="hand block truncate py-1 text-center text-[1.1rem] leading-tight">{s.photo.caption}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
}
