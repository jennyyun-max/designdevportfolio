"use client";

import Image from "next/image";
import Link from "next/link";
import { animate, motion, useDragControls, useMotionValue, type TargetAndTransition, type Transition } from "motion/react";
import { useRef, type KeyboardEvent, type PointerEvent, type RefObject } from "react";
import type { DeskPrint, PrintLayout } from "@/lib/types";

export type PrintPhase = "hanging" | "falling" | "landed";

const SHADOW = {
  rest: "0 1px 1px rgba(0,0,0,0.55), 0 10px 18px -8px rgba(0,0,0,0.75)",
  air: "0 2px 3px rgba(0,0,0,0.4), 0 26px 40px -14px rgba(0,0,0,0.85)",
};

const pct = (n: number) => `${n}%`;

/* Print widths per size (phones / desktop). The hero reuses these for the hidden detail’s slot. */
export const PRINT_WIDTH = {
  regular: "w-[min(26vw,16svh)] md:w-[min(14vw,24svh)]",
  large: "w-[min(30vw,18svh)] md:w-[min(17vw,30svh)]",
  focal: "w-[min(34vw,20svh)] md:w-[min(22vw,40svh)]",
} as const;

/* One physical photo print, pinned by one top corner.
   - hanging → falling (released by scroll; keeps going once started) → landed.
   - The fall: one corner tips forward first, then the print lets go, tilts on the way down,
     strikes the floor corner-first, bounces once and settles.
   - After landing it can be picked up by its white border and dragged or tossed; when let go it
     coasts, then drops back to the floor (or, with gravity off — the Play table — just stays put).
   - The photo well is a separate button/link: clicking it opens the photo or case study, and it never
     starts a drag — so a drag can’t open anything by accident. */
export default function Print({
  print,
  layout,
  index,
  phase,
  zIndex,
  fallSeconds,
  tipSeconds,
  gravity = true,
  deal,
  boundsRef,
  onLanded,
  onFront,
  onOpenPhoto,
}: {
  print: DeskPrint;
  layout: PrintLayout;
  index: number;
  phase: PrintPhase;
  zIndex: number;
  fallSeconds: number;
  tipSeconds: number;
  /** false = a tabletop: tossed prints stay where they stop */
  gravity?: boolean;
  /** Delay (s) for a “dealt onto the table” entrance */
  deal?: number;
  boundsRef: RefObject<HTMLDivElement | null>;
  onLanded: () => void;
  onFront: () => void;
  onOpenPhoto: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const tilt = useMotionValue(0); // extra spin from a toss
  const shadow = useMotionValue(phase === "landed" ? SHADOW.rest : SHADOW.air);

  const { hang, rest } = layout;
  const side = index % 2 === 0 ? 1 : -1;
  const at = (s: { x: number; y: number; rotate: number }) => ({ left: pct(s.x), bottom: pct(s.y), rotate: s.rotate });

  // ---- The fall (keyframes in % of the hero, so it survives resizes) ----
  let target: TargetAndTransition = at(rest);
  let transition: Transition = { duration: 0 };
  if (deal !== undefined) {
    target = { ...at(rest), opacity: 1, scale: 1 };
    transition = { duration: 0.7, delay: deal, ease: [0.22, 1, 0.36, 1] };
  }
  if (phase === "hanging" && hang) target = at(hang);
  if (phase === "falling" && hang) {
    const drop = hang.y - rest.y;
    const fall = fallSeconds * (0.7 + (0.45 * drop) / 80);
    const d = tipSeconds + fall;
    const t = (f: number) => (tipSeconds + f * fall) / d; // time inside the fall → share of the whole animation
    const tip = tipSeconds / d;
    const tipped = hang.rotate + side * 12; // one corner tips forward while the other is still pinned
    const corner = rest.rotate + side * 9; // still tilted on impact → a corner strikes first
    target = {
      left: [pct(hang.x), pct(hang.x), pct(rest.x), pct(rest.x)],
      bottom: [pct(hang.y), pct(hang.y - 0.6), pct(rest.y), pct(rest.y + 1.6), pct(rest.y)],
      rotate: [hang.rotate, tipped, tipped - side * 4, corner, rest.rotate - side * 1.5, rest.rotate],
    };
    transition = {
      left: { duration: d, times: [0, tip, t(0.68), 1], ease: ["linear", "easeOut", "linear"] },
      bottom: { duration: d, times: [0, tip, t(0.68), t(0.82), 1], ease: ["easeOut", "easeIn", "easeOut", "easeIn"] },
      rotate: { duration: d, times: [0, tip, t(0.4), t(0.68), t(0.84), 1], ease: [[0.3, 1.4, 0.6, 1], "easeInOut", "easeIn", "easeOut", "easeOut"] },
    };
  }

  // ---- Picking up and dropping again ----
  const startDrag = (e: PointerEvent<HTMLDivElement>) => {
    onFront();
    if (phase !== "landed") return;
    // The photo well opens things; only the white border picks the print up
    if ((e.target as Element).closest("[data-well]")) return;
    animate(shadow, SHADOW.air, { duration: 0.15 });
    controls.start(e);
  };

  // A toss: spin with the throw, then (after Motion’s coast finishes) drop to the floor
  const toss = (_: unknown, info: { velocity: { x: number } }) => {
    const spin = Math.max(-14, Math.min(14, info.velocity.x / 120));
    if (Math.abs(spin) > 1) animate(tilt, [tilt.get() + spin, tilt.get() + spin * 0.6], { duration: 0.6, ease: "easeOut" });
  };

  const dropToGround = () => {
    const bounds = boundsRef.current?.getBoundingClientRect();
    const me = ref.current?.getBoundingClientRect();
    if (!bounds || !me) return;
    const fallPx = bounds.bottom - me.bottom - (index % 3) * 2; // land on the floor line, slightly staggered
    const settle = () => animate(shadow, SHADOW.rest, { duration: 0.2 });
    if (!gravity || fallPx < 3) return settle();
    const y0 = y.get();
    const d = Math.min(0.9, 0.28 + (fallPx / 700) * fallSeconds);
    const hop = Math.min(14, fallPx * 0.08);
    animate(y, [y0, y0 + fallPx, y0 + fallPx - hop, y0 + fallPx], {
      duration: d,
      times: [0, 0.72, 0.86, 1],
      ease: ["easeIn", "easeOut", "easeIn"],
    }).then(settle);
  };

  // Keyboard: arrow keys move a landed print (Shift = bigger steps), kept in the hero
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (phase !== "landed") return;
    const step = e.shiftKey ? 40 : 14;
    const delta = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
    if (!delta) return;
    e.preventDefault();
    onFront();
    const bounds = boundsRef.current?.getBoundingClientRect();
    const me = ref.current?.getBoundingClientRect();
    if (!bounds || !me) return;
    x.set(x.get() + Math.max(bounds.left - me.left, Math.min(delta[0], bounds.right - me.right)));
    y.set(y.get() + Math.max(bounds.top - me.top, Math.min(delta[1], bounds.bottom - me.bottom)));
  };

  const well = (
    <span className="relative block aspect-square overflow-hidden bg-[#2a2c30]">
      {print.src ? (
        <Image
          src={print.src}
          alt=""
          fill
          sizes={
            print.size === "focal"
              ? "(min-width: 768px) 440px, 170px"
              : print.size === "large"
                ? "(min-width: 768px) 360px, 140px"
                : "(min-width: 768px) 260px, 120px"
          }
          draggable={false}
          className="pointer-events-none select-none object-cover"
          style={{ objectPosition: print.focus ?? "50% 50%" }}
        />
      ) : (
        <span className="absolute inset-0 shadow-[inset_0_1px_6px_rgba(0,0,0,0.55)]" aria-hidden="true" />
      )}
    </span>
  );

  const wellClass = "block cursor-pointer outline-offset-2";
  const label = print.caption ? `${print.caption} — ` : "";

  return (
    <motion.div
      ref={ref}
      className={`group/print absolute select-none ${PRINT_WIDTH[print.size ?? "regular"]} ${phase === "landed" ? "cursor-grab active:cursor-grabbing" : ""}`}
      // pinned by one top corner: rotation (hanging, tipping, settling) pivots there
      style={{ x, y, zIndex, touchAction: "pan-y", originX: side === 1 ? 0 : 1, originY: 0 }}
      initial={
        phase === "hanging" && hang ? at(hang) : deal !== undefined ? { ...at(rest), opacity: 0, scale: 1.12, rotate: rest.rotate + side * 10 } : at(rest)
      }
      animate={target}
      transition={transition}
      onAnimationComplete={() => {
        if (phase === "falling") {
          animate(shadow, SHADOW.rest, { duration: 0.25 });
          onLanded();
        }
      }}
      drag
      dragControls={controls}
      dragListener={false}
      dragConstraints={boundsRef}
      dragElastic={0.08}
      dragTransition={{ power: 0.28, timeConstant: 260, bounceStiffness: 320, bounceDamping: 24 }}
      whileDrag={{ scale: 1.04 }}
      onDragEnd={toss}
      // after the toss coasts to a stop, gravity takes over
      onDragTransitionEnd={dropToGround}
      onPointerDown={startDrag}
      onFocus={onFront}
      onKeyDown={onKeyDown}
    >
      {/* thin silver thread it hangs from — gone once it lets go */}
      {hang && (
        <span
          className={`silver-thread pointer-events-none absolute bottom-full h-[22svh] w-px md:h-[120svh] transition-opacity duration-150 ${side === 1 ? "left-[6%]" : "right-[6%]"} ${
            phase === "hanging" ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
      )}
      <motion.div className="relative bg-paper [container-type:inline-size]" style={{ rotate: tilt, boxShadow: shadow }}>
        {/* % padding resolves against this print’s width (not the hero’s) inside this wrapper */}
        <div className="p-[5%] pb-0">
          {print.project ? (
            <Link
              href={`/work/${print.project}`}
              data-well
              data-cursor="view"
              aria-label={`${label}open the case study`}
              className={wellClass}
              draggable={false}
            >
              {well}
            </Link>
          ) : print.src ? (
            <button type="button" data-well aria-label={`${label}${print.alt}. Open the photo`} className={`${wellClass} w-full`} onClick={onOpenPhoto}>
              {well}
            </button>
          ) : (
            <span role="img" aria-label={`${label}empty photo well`} className="block">
              {well}
            </span>
          )}
          <span className="mono flex aspect-[100/21] items-center justify-between gap-2 text-[max(0.56rem,5.4cqw)] uppercase leading-none tracking-[0.04em] text-[#2a2c30]">
            <span className="truncate">{print.caption}</span>
            {print.project && <span aria-hidden="true">↗</span>}
          </span>
        </div>
        {/* selected print: pink hairline */}
        <span
          className="pointer-events-none absolute inset-0 outline outline-1 outline-transparent transition-[outline-color] group-focus-within/print:outline-accent group-active/print:outline-accent"
          aria-hidden="true"
        />
      </motion.div>
    </motion.div>
  );
}
