"use client";

import { motion, useMotionValue } from "motion/react";
import { useRef, useState, type CSSProperties, type KeyboardEvent, type RefObject } from "react";
import type { PolaroidPhoto } from "@/lib/types";
import PolaroidFrame from "./PolaroidFrame";

const SHADOW = {
  rest: "0 1px 2px rgba(58,38,32,0.14), 0 10px 18px -10px rgba(58,38,32,0.45)",
  hover: "0 2px 4px rgba(58,38,32,0.14), 0 18px 26px -12px rgba(58,38,32,0.45)",
  drag: "0 4px 8px rgba(58,38,32,0.12), 0 30px 40px -14px rgba(58,38,32,0.5)",
};

/* One falling, draggable polaroid.
   - Falls from above the viewport with a per-photo delay, speed, drift and spin,
     then lands with a small spring bounce.
   - Drag with mouse/touch (kept inside the photo area); arrow keys nudge it.
   - A click/tap/Enter that isn't a drag opens the preview. */
export default function Polaroid({
  photo,
  index,
  zIndex,
  areaRef,
  onFront,
  onOpen,
}: {
  photo: PolaroidPhoto;
  index: number;
  zIndex: number;
  areaRef: RefObject<HTMLDivElement | null>;
  onFront: () => void;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const dragged = useRef(false);
  const [landed, setLanded] = useState(false);

  // Deterministic “randomness” per photo (same on server and client)
  const side = index % 2 === 0 ? 1 : -1;
  const delay = 0.45 + index * 0.24;
  const fallFrom = 820 + (index % 3) * 90;
  const drift = side * (40 + (index * 23) % 50);
  const spin = photo.rotate + side * (28 + (index * 17) % 26);

  const fall = {
    y: { type: "spring" as const, stiffness: 115 + (index * 13) % 40, damping: 11, mass: 1, delay },
    x: { type: "spring" as const, stiffness: 55, damping: 14, delay },
    rotate: { type: "spring" as const, stiffness: 45, damping: 8, delay },
    boxShadow: { duration: 0.4, delay: delay + 0.5 },
  };
  const settled = { type: "spring" as const, stiffness: 320, damping: 20 };

  // Keyboard: arrow keys nudge the photo (Shift = bigger steps), kept inside the area
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const step = e.shiftKey ? 40 : 14;
    const delta = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
    if (!delta) return;
    e.preventDefault();
    onFront();
    const area = areaRef.current?.getBoundingClientRect();
    const me = ref.current?.getBoundingClientRect();
    if (!area || !me) return;
    const dx = Math.max(area.left - me.left, Math.min(delta[0], area.right - me.right));
    const dy = Math.max(area.top - me.top, Math.min(delta[1], area.bottom - me.bottom));
    x.set(x.get() + dx);
    y.set(y.get() + dy);
  };

  const position = {
    "--xm": `${photo.mobile?.x ?? 0}%`,
    "--ym": `${photo.mobile?.y ?? 0}%`,
    "--xd": `${photo.desktop.x}%`,
    "--yd": `${photo.desktop.y}%`,
  } as CSSProperties;

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={`${photo.caption ? `${photo.caption.replace(/[[\]]/g, "")} — ` : ""}${photo.alt}. Open larger photo`}
      className={`absolute left-[var(--xm)] top-[var(--ym)] w-[7.5rem] cursor-grab touch-none text-[0.95rem] active:cursor-grabbing sm:w-[8.75rem] lg:left-[var(--xd)] lg:top-[var(--yd)] lg:w-[10rem] lg:text-[1.1rem] ${
        photo.mobile ? "" : "hidden lg:block"
      }`}
      style={{ ...position, x, y, zIndex, borderRadius: 3 }}
      initial={{ y: -fallFrom, x: drift, rotate: spin, boxShadow: SHADOW.drag }}
      animate={{ y: 0, x: 0, rotate: photo.rotate, boxShadow: SHADOW.rest }}
      transition={landed ? settled : fall}
      onAnimationComplete={() => setLanded(true)}
      whileHover={{ scale: 1.035, rotate: photo.rotate - side * 2.5, boxShadow: SHADOW.hover, transition: settled }}
      whileDrag={{ scale: 1.08, rotate: photo.rotate * 0.4, boxShadow: SHADOW.drag, transition: settled }}
      drag
      // Constraints only after landing: applying them mid-fall (e.g. on a resize
      // during load) would clamp the photo to the top edge and cut the fall short.
      dragConstraints={landed ? areaRef : undefined}
      dragElastic={0.12}
      dragTransition={{ power: 0.22, timeConstant: 220, bounceStiffness: 320, bounceDamping: 18 }}
      onPointerDown={() => {
        dragged.current = false;
        onFront();
      }}
      onDragStart={() => {
        dragged.current = true;
      }}
      onDragEnd={() => setLanded(true)}
      onClick={() => {
        if (!dragged.current) onOpen();
      }}
      onKeyDown={onKeyDown}
      onFocus={onFront}
    >
      <PolaroidFrame photo={photo} sizes="(min-width: 1024px) 160px, 140px" />
    </motion.button>
  );
}
