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

/* One physical photo print.
   - hanging → falling (released by scroll; keeps going once started) → landed.
   - The fall: slight tilt on the way down, one corner hits first, a small bounce, a quick settle.
   - After landing it can be picked up by its white border and dropped again (it falls back to the ground).
   - The photo well is a separate button/link: clicking it opens the photo or case study, and it never
     starts a drag — so a drag can’t open anything by accident. */
export default function Print({
  print,
  layout,
  index,
  phase,
  zIndex,
  fallSeconds,
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
  boundsRef: RefObject<HTMLDivElement | null>;
  onLanded: () => void;
  onFront: () => void;
  onOpenPhoto: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shadow = useMotionValue(phase === "landed" ? SHADOW.rest : SHADOW.air);

  const { hang, rest } = layout;
  const side = index % 2 === 0 ? 1 : -1;
  const at = (s: { x: number; y: number; rotate: number }) => ({ left: pct(s.x), bottom: pct(s.y), rotate: s.rotate });

  // ---- The fall (keyframes in % of the hero, so it survives resizes) ----
  let target: TargetAndTransition = at(rest);
  let transition: Transition = { duration: 0 };
  if (phase === "hanging" && hang) target = at(hang);
  if (phase === "falling" && hang) {
    const drop = hang.y - rest.y;
    const d = fallSeconds * (0.7 + (0.45 * drop) / 80);
    const corner = rest.rotate + side * 9; // tilted on impact → one corner touches first
    target = {
      left: [pct(hang.x), pct(rest.x), pct(rest.x)],
      bottom: [pct(hang.y), pct(rest.y), pct(rest.y + 1.6), pct(rest.y)],
      rotate: [hang.rotate, hang.rotate + side * 5, corner, rest.rotate - side * 1.5, rest.rotate],
    };
    transition = {
      left: { duration: d, times: [0, 0.68, 1], ease: ["easeOut", "linear"] },
      bottom: { duration: d, times: [0, 0.68, 0.82, 1], ease: ["easeIn", "easeOut", "easeIn"] },
      rotate: { duration: d, times: [0, 0.4, 0.68, 0.84, 1], ease: ["easeInOut", "easeIn", "easeOut", "easeOut"] },
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

  const dropToGround = () => {
    const bounds = boundsRef.current?.getBoundingClientRect();
    const me = ref.current?.getBoundingClientRect();
    if (!bounds || !me) return;
    const fallPx = bounds.bottom - me.bottom - (index % 3) * 2; // land on the ground line, slightly staggered
    const settle = () => animate(shadow, SHADOW.rest, { duration: 0.2 });
    if (fallPx < 3) return settle();
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
          sizes="(min-width: 768px) 160px, 110px"
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
      className={`group/print absolute w-[min(27vw,14.5svh)] select-none bg-paper [container-type:inline-size] md:w-[min(11vw,19svh,10rem)] ${
        phase === "landed" ? "cursor-grab active:cursor-grabbing" : ""
      }`}
      style={{ x, y, zIndex, boxShadow: shadow, touchAction: "pan-y" }}
      initial={phase === "hanging" && hang ? at(hang) : at(rest)}
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
      dragElastic={0.06}
      dragMomentum={false}
      whileDrag={{ scale: 1.05 }}
      // Wait a tick: Motion starts its own release animation right after onDragEnd, which would cancel the drop
      onDragEnd={() => setTimeout(dropToGround, 0)}
      onPointerDown={startDrag}
      onFocus={onFront}
      onKeyDown={onKeyDown}
    >
      {/* % padding resolves against this print’s width (not the hero’s) inside this wrapper */}
      <div className="p-[5%] pb-0">
        {print.project ? (
          <Link href={`/work/${print.project}`} data-well data-cursor="view" aria-label={`${label}open the case study`} className={wellClass} draggable={false}>
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
        <span className="mono flex aspect-[100/21] items-center justify-between gap-2 text-[max(0.56rem,6.2cqw)] uppercase leading-none tracking-[0.04em] text-[#2a2c30]">
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
  );
}
