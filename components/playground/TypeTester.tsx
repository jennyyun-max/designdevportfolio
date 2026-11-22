"use client";

import { useState } from "react";

const FACES = [
  { key: "serif", label: "Instrument Serif", className: "font-display" },
  { key: "sans", label: "DM Sans", className: "font-sans" },
  { key: "mono", label: "IBM Plex Mono", className: "font-mono" },
] as const;

/* A type tester for the three faces this site is set in: type anything, then change the face,
   size, tracking and slant. */
export default function TypeTester() {
  const [text, setText] = useState("Data, technology & people");
  const [face, setFace] = useState<(typeof FACES)[number]["key"]>("serif");
  const [size, setSize] = useState(120);
  const [tracking, setTracking] = useState(-3);
  const [italic, setItalic] = useState(false);
  const current = FACES.find((f) => f.key === face)!;

  return (
    <div>
      <div className="meta flex flex-wrap items-end gap-x-8 gap-y-5 border-y border-ink py-4">
        <div role="radiogroup" aria-label="Typeface" className="flex flex-wrap gap-2">
          {FACES.map((f) => (
            <button
              key={f.key}
              type="button"
              role="radio"
              aria-checked={face === f.key}
              onClick={() => setFace(f.key)}
              className={`border px-3 py-1.5 transition-colors ${face === f.key ? "border-ink bg-ink text-paper" : "border-ink/25 hover:border-ink"}`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3">
          Size <span className="w-10 tabular-nums text-muted">{size}</span>
          <input type="range" min={32} max={220} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-32 accent-[var(--oxblood)]" />
        </label>
        <label className="flex items-center gap-3">
          Tracking <span className="w-10 tabular-nums text-muted">{tracking}</span>
          <input type="range" min={-8} max={20} value={tracking} onChange={(e) => setTracking(Number(e.target.value))} className="w-32 accent-[var(--oxblood)]" />
        </label>
        <button type="button" aria-pressed={italic} onClick={() => setItalic((v) => !v)} className={`border px-3 py-1.5 ${italic ? "border-ink bg-ink text-paper" : "border-ink/25 hover:border-ink"}`}>
          Italic
        </button>
      </div>
      <label htmlFor="type-tester" className="sr-only">
        Text to preview
      </label>
      <textarea
        id="type-tester"
        value={text}
        onChange={(e) => setText(e.target.value.slice(0, 120))}
        rows={2}
        spellCheck={false}
        className={`mt-6 w-full resize-none overflow-hidden bg-transparent leading-[0.95] outline-none ${current.className} ${italic ? "italic" : ""}`}
        style={{ fontSize: `clamp(2rem, ${size / 14}vw, ${size}px)`, letterSpacing: `${tracking / 100}em` }}
      />
    </div>
  );
}
