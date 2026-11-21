"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/* Thin silver ring that trails the pointer on desktop. It grows over links and
   shows a label over elements with data-cursor="view". The normal cursor stays
   visible. Disabled on touch devices and for reduced-motion users. */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"default" | "link" | "view">("default");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("[data-cursor], a, button");
      setMode(el?.dataset.cursor === "view" ? "view" : el ? "link" : "default");
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

  const size = mode === "view" ? 76 : mode === "link" ? 44 : 22;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] grid place-items-center rounded-full"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
        backgroundColor: mode === "view" ? "rgba(58,38,32,0.92)" : "rgba(58,38,32,0)",
        borderColor: mode === "view" ? "rgba(58,38,32,0)" : "rgba(58,38,32,0.45)",
      }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      initial={false}
    >
      <span className="absolute inset-0 rounded-full border" style={{ borderColor: "inherit" }} />
      {mode === "view" && <span className="mono text-[0.625rem] uppercase tracking-[0.1em] text-bg">view</span>}
    </motion.div>
  );
}
