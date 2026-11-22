"use client";

import { useEffect, useRef, useState } from "react";

const COLORS = [
  { name: "espresso", value: "#3a2620" },
  { name: "rose", value: "#c9736b" },
  { name: "pink", value: "#ee98a1" },
  { name: "butter", value: "#e9c44f" },
  { name: "sage", value: "#7f9a6c" },
  { name: "sky", value: "#6f8fb3" },
  { name: "lavender", value: "#9d8cc9" },
];
const SIZES = [
  { name: "fine", value: 2.5 },
  { name: "medium", value: 5 },
  { name: "bold", value: 10 },
];

/* A little sketchpad: colored pencils, three sizes, an eraser, undo and clear.
   `onChange` receives a PNG data URL of the drawing (or null when empty). */
export default function DoodlePad({
  label,
  className = "",
  aspect = "aspect-[4/3]",
  onChange,
  allowSave = false,
}: {
  label: string;
  className?: string;
  aspect?: string;
  onChange?: (dataUrl: string | null) => void;
  allowSave?: boolean;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const history = useRef<ImageData[]>([]);
  const drawing = useRef<{ x: number; y: number } | null>(null);
  const dirty = useRef(false);
  const [color, setColor] = useState(COLORS[0].value);
  const [size, setSize] = useState(SIZES[1].value);
  const [eraser, setEraser] = useState(false);
  const [empty, setEmpty] = useState(true);

  // Match the canvas to its box (and the screen's pixel density)
  useEffect(() => {
    const c = canvas.current!;
    const fit = () => {
      const ctx = c.getContext("2d")!;
      const snapshot = dirty.current ? c.toDataURL() : null;
      const r = c.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(r.width * dpr);
      c.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      if (snapshot) {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0, r.width, r.height);
        img.src = snapshot;
      }
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(c);
    return () => ro.disconnect();
  }, []);

  const ctx = () => canvas.current!.getContext("2d")!;
  const point = (e: React.PointerEvent) => {
    const r = canvas.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const emit = () => {
    dirty.current = true;
    setEmpty(false);
    onChange?.(canvas.current!.toDataURL("image/png"));
  };

  const down = (e: React.PointerEvent) => {
    e.preventDefault();
    canvas.current!.setPointerCapture(e.pointerId);
    const c = canvas.current!;
    history.current = [...history.current.slice(-19), ctx().getImageData(0, 0, c.width, c.height)];
    drawing.current = point(e);
    const p = drawing.current;
    const g = ctx();
    g.globalCompositeOperation = eraser ? "destination-out" : "source-over";
    g.fillStyle = color;
    g.beginPath();
    g.arc(p.x, p.y, (eraser ? size * 2.4 : size) / 2, 0, Math.PI * 2);
    g.fill();
  };
  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const p = point(e);
    const last = drawing.current;
    const g = ctx();
    g.globalCompositeOperation = eraser ? "destination-out" : "source-over";
    g.strokeStyle = color;
    g.lineWidth = eraser ? size * 2.4 : size;
    g.beginPath();
    g.moveTo(last.x, last.y);
    const mid = { x: (last.x + p.x) / 2, y: (last.y + p.y) / 2 };
    g.quadraticCurveTo(last.x, last.y, mid.x, mid.y);
    g.lineTo(p.x, p.y);
    g.stroke();
    drawing.current = p;
  };
  const up = () => {
    if (!drawing.current) return;
    drawing.current = null;
    emit();
  };

  const undo = () => {
    const prev = history.current.pop();
    if (!prev) return;
    ctx().putImageData(prev, 0, 0);
    if (!history.current.length) {
      clear(false);
      return;
    }
    emit();
  };
  const clear = (record = true) => {
    const c = canvas.current!;
    if (record) history.current = [...history.current.slice(-19), ctx().getImageData(0, 0, c.width, c.height)];
    ctx().clearRect(0, 0, c.width, c.height);
    dirty.current = false;
    setEmpty(true);
    onChange?.(null);
  };
  const save = () => {
    const a = document.createElement("a");
    a.href = canvas.current!.toDataURL("image/png");
    a.download = "my-doodle-from-chloes-world.png";
    a.click();
  };

  return (
    <div className={className}>
      <div className={`dotgrid relative overflow-hidden rounded-[14px] border border-espresso/15 ${aspect}`}>
        <canvas
          ref={canvas}
          role="img"
          aria-label={label}
          className="absolute inset-0 h-full w-full cursor-crosshair touch-none"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
        />
        {empty && <p className="hand pointer-events-none absolute inset-0 grid place-items-center text-[1.5rem] text-espresso-soft/70">draw something here ✎</p>}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2" role="toolbar" aria-label="Drawing tools">
        <div className="flex gap-1.5" role="radiogroup" aria-label="Pencil color">
          {COLORS.map((c) => (
            <button
              key={c.name}
              type="button"
              role="radio"
              aria-checked={!eraser && color === c.value}
              aria-label={c.name}
              onClick={() => {
                setColor(c.value);
                setEraser(false);
              }}
              className={`h-7 w-7 rounded-full border-2 transition-transform ${!eraser && color === c.value ? "scale-110 border-espresso" : "border-paper"}`}
              style={{ backgroundColor: c.value, boxShadow: "0 0 0 1px rgba(58,38,32,0.2)" }}
            />
          ))}
        </div>
        <div className="flex gap-1" role="radiogroup" aria-label="Pencil size">
          {SIZES.map((s) => (
            <button
              key={s.name}
              type="button"
              role="radio"
              aria-checked={size === s.value}
              aria-label={s.name}
              onClick={() => setSize(s.value)}
              className={`grid h-8 w-8 place-items-center rounded-full ${size === s.value ? "bg-pink" : "bg-ivory"}`}
            >
              <span className="block rounded-full bg-espresso" style={{ width: s.value + 2, height: s.value + 2 }} />
            </button>
          ))}
        </div>
        <button type="button" aria-pressed={eraser} onClick={() => setEraser((v) => !v)} className={`rounded-full px-3 py-1 text-sm font-semibold ${eraser ? "bg-pink" : "bg-ivory"}`}>
          eraser
        </button>
        <button type="button" onClick={undo} className="rounded-full bg-ivory px-3 py-1 text-sm font-semibold">
          undo
        </button>
        <button type="button" onClick={() => clear()} className="rounded-full bg-ivory px-3 py-1 text-sm font-semibold">
          clear
        </button>
        {allowSave && (
          <button type="button" onClick={save} disabled={empty} className="rounded-full bg-espresso px-3 py-1 text-sm font-semibold text-ivory disabled:opacity-40">
            save ↓
          </button>
        )}
      </div>
    </div>
  );
}
