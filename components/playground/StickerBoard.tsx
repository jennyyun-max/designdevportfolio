"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Doodle, type DoodleName } from "../doodles/Doodles";

type Sticker = { id: number; name: DoodleName; x: number; y: number; r: number; s: number };

const TRAY: DoodleName[] = ["heart", "star", "sparkle", "flower", "bow", "strawberry", "sun", "palm", "note", "mic", "laptop", "camera", "coffee", "cloud", "ticket", "plane"];
const KEY = "chloes-world-stickers";
const STARTER: Sticker[] = [
  { id: 1, name: "bow", x: 33, y: 16, r: -14, s: 1.1 },
  { id: 2, name: "sparkle", x: 68, y: 22, r: 10, s: 0.9 },
  { id: 3, name: "heart", x: 64, y: 74, r: 8, s: 1 },
];

const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));

/* A scrapbook page to decorate: drag stickers from the tray onto the page, move them around,
   drag one off the page (or press Delete) to peel it off. Clicking a tray sticker drops it
   somewhere random, and arrow keys move a selected sticker — so it all works from the keyboard.
   Saved in this browser only. */
export default function StickerBoard() {
  const board = useRef<HTMLDivElement>(null);
  const [stickers, setStickers] = useState<Sticker[]>(STARTER);
  const [drag, setDrag] = useState<{ id: number; dx: number; dy: number; fromTray: boolean; moved: boolean } | null>(null);
  const nextId = useRef(100);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
      if (Array.isArray(saved)) {
        setStickers(saved);
        nextId.current = Math.max(100, ...saved.map((s: Sticker) => s.id + 1));
      }
    } catch {}
    loaded.current = true;
  }, []);
  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(stickers));
    } catch {}
  }, [stickers]);

  const pos = (e: { clientX: number; clientY: number }) => {
    const r = board.current!.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, inside: e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom };
  };

  // Dragging (from the tray or on the page) follows the pointer anywhere on screen
  useEffect(() => {
    if (!drag) return;
    const move = (e: globalThis.PointerEvent) => {
      const p = pos(e);
      setDrag((d) => (d && !d.moved ? { ...d, moved: true } : d));
      setStickers((all) => all.map((s) => (s.id === drag.id ? { ...s, x: p.x - drag.dx, y: p.y - drag.dy } : s)));
    };
    const up = (e: globalThis.PointerEvent) => {
      const p = pos(e);
      setStickers((all) => {
        if (p.inside) return all.map((s) => (s.id === drag.id ? { ...s, x: clamp(s.x, 3, 97), y: clamp(s.y, 3, 97) } : s));
        // a plain click on the sticker sheet: drop it somewhere on the page instead of losing it
        if (drag.fromTray && !drag.moved) return all.map((s) => (s.id === drag.id ? { ...s, x: 15 + Math.random() * 70, y: 15 + Math.random() * 70 } : s));
        return all.filter((s) => s.id !== drag.id); // dragged off the page: peeled away
      });
      setDrag(null);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up, { once: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [drag]);

  const fromTray = (name: DoodleName) => (e: PointerEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const p = pos(e);
    const id = nextId.current++;
    setStickers((all) => [...all, { id, name, x: p.x, y: p.y, r: Math.round((Math.random() - 0.5) * 30), s: 0.85 + Math.random() * 0.4 }]);
    setDrag({ id, dx: 0, dy: 0, fromTray: true, moved: false });
  };
  // keyboard / plain click: drop it somewhere on the page
  const addRandom = (name: DoodleName) => {
    const id = nextId.current++;
    setStickers((all) => [...all, { id, name, x: 15 + Math.random() * 70, y: 15 + Math.random() * 70, r: Math.round((Math.random() - 0.5) * 30), s: 0.85 + Math.random() * 0.4 }]);
  };

  const pick = (s: Sticker) => (e: PointerEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const p = pos(e);
    setStickers((all) => [...all.filter((x) => x.id !== s.id), s]); // to the top
    setDrag({ id: s.id, dx: p.x - s.x, dy: p.y - s.y, fromTray: false, moved: false });
  };
  const onKey = (s: Sticker) => (e: KeyboardEvent) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      e.preventDefault();
      setStickers((all) => all.filter((x) => x.id !== s.id));
      return;
    }
    const step = e.shiftKey ? 8 : 2;
    const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
    if (!d) return;
    e.preventDefault();
    setStickers((all) => all.map((x) => (x.id === s.id ? { ...x, x: clamp(x.x + d[0], 3, 97), y: clamp(x.y + d[1], 3, 97) } : x)));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_15rem]">
      <div
        ref={board}
        className="dotgrid relative aspect-[4/3] touch-none select-none overflow-hidden rounded-[10px] border border-espresso/15 shadow-[0_24px_40px_-30px_rgba(58,38,32,0.7)]"
        aria-label="Scrapbook page"
        role="group"
      >
        {/* a photo taped in the middle to decorate around */}
        <div className="absolute left-1/2 top-1/2 w-[34%] -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] rounded-[3px] bg-paper p-[2.4%] pb-0 shadow-[0_14px_24px_-16px_rgba(58,38,32,0.6)]">
          <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-3" style={{ ["--tape" as string]: "var(--blush)" }} aria-hidden="true" />
          <span className="relative block aspect-square overflow-hidden bg-pink">
            <Image src="/images/polaroids/chloe-portrait.jpg" alt="Chloe’s portrait, taped to the page" fill sizes="300px" className="pointer-events-none object-cover" style={{ objectPosition: "50% 25%" }} />
          </span>
          <span className="hand block py-[4%] text-center text-[clamp(1rem,2.4vw,1.6rem)] leading-none">decorate me!</span>
        </div>
        {stickers.map((s) => (
          <button
            key={s.id}
            type="button"
            onPointerDown={pick(s)}
            onKeyDown={onKey(s)}
            aria-label={`${s.name} sticker. Arrow keys move it, Delete peels it off`}
            className="sticker-shadow absolute w-[12%] -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none active:cursor-grabbing"
            style={{ left: `${s.x}%`, top: `${s.y}%`, rotate: `${s.r}deg`, scale: drag?.id === s.id ? s.s * 1.12 : s.s, zIndex: drag?.id === s.id ? 50 : undefined }}
          >
            <Doodle name={s.name} className="pointer-events-none block w-full" />
          </button>
        ))}
      </div>

      <div>
        <p className="eyebrow">sticker sheet</p>
        <ul className="mt-3 grid grid-cols-4 gap-2 rounded-[16px] bg-paper p-3 shadow-[0_2px_0_rgba(58,38,32,0.1)] sm:grid-cols-8 lg:grid-cols-4">
          {TRAY.map((name) => (
            <li key={name}>
              <button
                type="button"
                onPointerDown={fromTray(name)}
                onClick={(e) => {
                  if (e.detail === 0) addRandom(name); // keyboard
                }}
                aria-label={`Add a ${name} sticker`}
                className="group grid aspect-square w-full touch-none place-items-center rounded-[12px] transition-colors hover:bg-pink"
              >
                <Doodle name={name} className="wiggle-on-hover pointer-events-none w-[80%]" />
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[0.9rem] text-espresso-soft">Drag a sticker onto the page. Drag it off to peel it away.</p>
        <button type="button" onClick={() => setStickers([])} className="link mt-3 text-[0.95rem] font-semibold">
          clear the page
        </button>
      </div>
    </div>
  );
}
