import { useEffect, useRef, useState } from "react";
import Potato from "./Potato.jsx";

// What the potato says when poked (cycles in order)
const LINES = [
  "hi there!",
  "hehe, that tickles",
  "boop!",
  "i’m a very good potato",
  "okay, one more",
  "you found my potato :)",
];

/* A pokeable potato: bounces and talks when clicked, eyes follow the cursor.
   Motion (bounce, bob, eye-following) is skipped for reduced-motion users;
   poking still changes its face and shows the speech bubble. */
export default function InteractivePotato({ className = "", bubbleSide = "right" }) {
  const buttonRef = useRef(null);
  const hideTimer = useRef(null);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [pokes, setPokes] = useState(0);
  const [message, setMessage] = useState("");

  // Eyes follow the pointer
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = buttonRef.current?.getBoundingClientRect();
        if (!r) return;
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const dist = Math.hypot(dx, dy) || 1;
        const reach = Math.min(1, dist / 180);
        setLook({ x: (dx / dist) * 1.3 * reach, y: (dy / dist) * 1.1 * reach });
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  const poke = () => {
    setMessage(LINES[pokes % LINES.length]);
    setPokes((n) => n + 1);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setMessage(""), 2200);
  };

  return (
    <div className={className}>
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={poke}
          aria-label="Poke the potato"
          className="potato-idle block w-full cursor-pointer rounded-full"
        >
          {/* re-keyed on every poke so the bounce animation restarts */}
          <span key={pokes} className={`block ${pokes ? "potato-bounce" : ""}`}>
            <Potato className="block w-full" look={look} happy={Boolean(message)} />
          </span>
        </button>
        <p
          aria-live="polite"
          className={`pointer-events-none absolute bottom-full mb-1 ${bubbleSide === "right" ? "right-0" : "left-1/2 -translate-x-1/2"}`}
        >
          {message && (
            <span
              key={pokes}
              className="potato-bubble inline-block whitespace-nowrap rounded-full bg-plum px-3 py-1 text-xs font-semibold text-shell"
            >
              {message}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
