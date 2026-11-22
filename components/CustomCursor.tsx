"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const LABELS: Record<string, string> = { view: "view ♡", open: "open", poke: "poke!" };

/* A small rose ring that trails the pointer on desktop. It swells into a blush dot over links
   and becomes a little label sticker over projects (“view ♡”), photos (“open”) and the potato.
   The normal cursor stays visible. Off on touch screens and for reduced-motion visitors. */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<string>("default");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 520, damping: 40, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor], a, button, input, textarea, [role=radio]");
      setMode(el?.dataset.cursor && LABELS[el.dataset.cursor] ? el.dataset.cursor : el ? "link" : "default");
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;
  const label = LABELS[mode];
  const size = label ? 74 : mode === "link" ? 40 : 20;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] grid place-items-center rounded-full"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
        rotate: label ? -8 : 0,
        backgroundColor: label ? "rgba(58,38,32,0.94)" : mode === "link" ? "rgba(242,196,192,0.55)" : "rgba(242,196,192,0)",
        borderColor: label ? "rgba(58,38,32,0)" : "rgba(201,115,107,0.75)",
      }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      initial={false}
    >
      <span className="absolute inset-0 rounded-full border-[1.5px]" style={{ borderColor: "inherit" }} />
      {label && <span className="hand text-[1.15rem] leading-none text-ivory">{label}</span>}
    </motion.div>
  );
}
