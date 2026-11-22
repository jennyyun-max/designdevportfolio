"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const LABELS: Record<string, string> = { view: "View", open: "Open", zoom: "Zoom" };

/* A small ink dot that trails the pointer on desktop. It opens into a hairline ring over links
   and a dark disc with a mono label over projects (“View”) and photos (“Open”).
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
  const size = label ? 68 : mode === "link" ? 36 : 8;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] grid place-items-center rounded-full"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
        backgroundColor: label ? "rgba(28,28,26,0.92)" : mode === "link" ? "rgba(37,37,34,0)" : "rgba(37,37,34,0.9)",
        borderColor: label ? "rgba(28,28,26,0)" : mode === "link" ? "rgba(37,37,34,0.6)" : "rgba(37,37,34,0)",
      }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      initial={false}
    >
      <span className="absolute inset-0 rounded-full border" style={{ borderColor: "inherit" }} />
      {label && <span className="meta text-paper">{label}</span>}
    </motion.div>
  );
}
