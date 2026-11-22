"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useId, useRef, useState, type FormEvent, type PointerEvent } from "react";

/* ==================================================================
   VISITORS — collectible admission cards.
   A LOCAL PROTOTYPE: there's no backend, so cards are saved only in
   this browser (localStorage) and the page says so plainly. Visitor
   numbers count up in this browser; the serial is unique per card.
   ================================================================== */

const COLORWAYS = [
  { key: "night", label: "Charcoal", bg: "#1c1c1a", fg: "#f3f0e9" },
  { key: "paper", label: "Paper", bg: "#fbfaf6", fg: "#252522" },
  { key: "oxblood", label: "Oxblood", bg: "#9d4036", fg: "#f3f0e9" },
  { key: "steel", label: "Steel", bg: "#7a8291", fg: "#f9f8f4" },
  { key: "stone", label: "Stone", bg: "#e8e5dd", fg: "#252522" },
] as const;
const PATTERNS = ["grid", "lines", "rings", "dots", "arcs", "plain"] as const;
const TYPES = [
  { key: "serif", label: "Serif", className: "font-display italic text-[2.6em] leading-[0.9] tracking-[-0.03em]" },
  { key: "sans", label: "Sans", className: "font-sans font-semibold text-[1.9em] leading-[0.95] tracking-[-0.05em]" },
  { key: "mono", label: "Mono", className: "font-mono uppercase text-[1.25em] leading-[1.1] tracking-[0.02em]" },
] as const;

type Colorway = (typeof COLORWAYS)[number]["key"];
type Pattern = (typeof PATTERNS)[number];
type TypeKey = (typeof TYPES)[number]["key"];
type Card = { id: string; no: number; name: string; note: string; colorway: Colorway; pattern: Pattern; type: TypeKey; signature: string | null; date: string };

const KEY = "chloes-world-visitor-cards";
const COUNT_KEY = "chloes-world-visitor-count";
const LIMITS = { name: 32, note: 120 };
const LINKISH = /(https?:\/\/|www\.|\.[a-z]{2,}\/)/i;

/* ---------- the abstract patterns (SVG) ---------- */
function PatternArt({ pattern, fg }: { pattern: Pattern; fg: string }) {
  const id = useId().replace(/:/g, "");
  if (pattern === "plain") return null;
  const tile = {
    grid: (
      <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse">
        <path d="M16 0H0V16" fill="none" stroke={fg} strokeWidth="0.6" />
      </pattern>
    ),
    lines: (
      <pattern id={id} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
        <line x1="0" y1="0" x2="0" y2="8" stroke={fg} strokeWidth="1" />
      </pattern>
    ),
    dots: (
      <pattern id={id} width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="1.4" fill={fg} />
      </pattern>
    ),
    rings: null,
    arcs: (
      <pattern id={id} width="24" height="12" patternUnits="userSpaceOnUse">
        <path d="M0 12 A12 12 0 0 1 24 12" fill="none" stroke={fg} strokeWidth="0.8" />
      </pattern>
    ),
  }[pattern];
  return (
    <svg className="absolute inset-0 h-full w-full opacity-60" aria-hidden="true">
      {pattern === "rings" ? (
        [...Array(9)].map((_, i) => <circle key={i} cx="78%" cy="30%" r={14 + i * 16} fill="none" stroke={fg} strokeWidth="0.7" />)
      ) : (
        <>
          <defs>{tile}</defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </>
      )}
    </svg>
  );
}

/* ---------- one admission card ---------- */
function AdmissionCard({ card, specimen = false }: { card: Omit<Card, "id"> & { id?: string }; specimen?: boolean }) {
  const cw = COLORWAYS.find((c) => c.key === card.colorway)!;
  const type = TYPES.find((t) => t.key === card.type)!;
  const serial = (card.id ?? "000000").replace(/-/g, "").slice(0, 6).toUpperCase();
  const notch = "radial-gradient(circle at 0 68%, transparent 9px, #000 9.5px) left / 51% 100% no-repeat, radial-gradient(circle at 100% 68%, transparent 9px, #000 9.5px) right / 51% 100% no-repeat";
  return (
    <div
      className="relative flex aspect-[5/8] w-full flex-col overflow-hidden text-[clamp(14px,4.2cqw,17px)] shadow-[0_28px_50px_-30px_rgba(28,28,26,0.7)] [container-type:inline-size]"
      style={{ backgroundColor: cw.bg, color: cw.fg, mask: notch, WebkitMask: notch }}
    >
      {/* header */}
      <div className="flex items-start justify-between p-[7%] pb-0 font-mono text-[0.62em] uppercase tracking-[0.08em]">
        <span>
          Chloe’s World
          <br />
          Visitor archive
        </span>
        <span className="text-right">
          Admit one
          <br />
          {specimen ? "Specimen" : card.date}
        </span>
      </div>

      {/* pattern + number */}
      <div className="relative mx-[7%] mt-[6%] flex-1 overflow-hidden border" style={{ borderColor: `${cw.fg}40` }}>
        <PatternArt pattern={card.pattern} fg={cw.fg} />
        <span className="absolute bottom-[6%] left-[6%] font-display text-[3.6em] leading-[0.8] tracking-[-0.04em]">
          <span className="font-mono text-[0.18em] tracking-[0.08em] align-top">No.</span>
          {String(card.no).padStart(4, "0")}
        </span>
      </div>

      {/* perforation */}
      <div className="mx-[7%] my-[5%] border-t border-dashed" style={{ borderColor: `${cw.fg}66` }} aria-hidden="true" />

      {/* name + note */}
      <div className="px-[7%]">
        <p className={`${type.className} break-words`}>{card.name || "Your name"}</p>
        <p className="mt-2 min-h-[2.6em] text-[0.78em] leading-snug opacity-80">{card.note || (specimen ? "A short note goes here." : "")}</p>
      </div>

      {/* signature + serial */}
      <div className="mt-auto flex items-end justify-between gap-3 p-[7%] pt-[3%]">
        <div className="min-w-0 flex-1">
          <div className="h-[2.6em] border-b" style={{ borderColor: `${cw.fg}66` }}>
            {card.signature ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={card.signature} alt={`Signature of ${card.name || "the visitor"}`} className="h-full w-auto max-w-full object-contain object-left" style={{ filter: cw.fg === "#252522" ? "none" : "invert(1)" }} />
            ) : (
              <span className="block truncate font-display text-[1.6em] italic leading-[1.6]">{card.name}</span>
            )}
          </div>
          <span className="mt-1 block font-mono text-[0.55em] uppercase tracking-[0.08em] opacity-70">Signature</span>
        </div>
        <span className="shrink-0 text-right font-mono text-[0.55em] uppercase tracking-[0.08em] opacity-70">
          Serial
          <br />
          {serial}
        </span>
      </div>
    </div>
  );
}

/* A card in the gallery tilts toward the pointer, like an object held in the hand */
function TiltCard({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
  };
  return (
    <div className="[perspective:900px]" onPointerMove={move} onPointerLeave={() => (rx.set(0), ry.set(0))}>
      <motion.div style={{ rotateX: rx, rotateY: ry }}>{children}</motion.div>
    </div>
  );
}

/* ---------- a small signature pad ---------- */
function SignaturePad({ onChange }: { onChange: (url: string | null) => void }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    const c = canvas.current!;
    const r = c.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = Math.round(r.width * dpr);
    c.height = Math.round(r.height * dpr);
    const g = c.getContext("2d")!;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.lineCap = "round";
    g.lineJoin = "round";
    g.lineWidth = 2.2;
    g.strokeStyle = "#252522";
  }, []);

  const at = (e: PointerEvent<HTMLCanvasElement>) => {
    const r = canvas.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const clear = () => {
    const c = canvas.current!;
    c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
    setEmpty(true);
    onChange(null);
  };

  return (
    <div>
      <div className="relative h-28 border border-ink/25 bg-print">
        <canvas
          ref={canvas}
          role="img"
          aria-label="Signature pad — draw with a mouse, pen or finger"
          className="absolute inset-0 h-full w-full cursor-crosshair touch-none"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            last.current = at(e);
          }}
          onPointerMove={(e) => {
            if (!last.current) return;
            const p = at(e);
            const g = canvas.current!.getContext("2d")!;
            g.beginPath();
            g.moveTo(last.current.x, last.current.y);
            g.lineTo(p.x, p.y);
            g.stroke();
            last.current = p;
          }}
          onPointerUp={() => {
            if (!last.current) return;
            last.current = null;
            setEmpty(false);
            onChange(canvas.current!.toDataURL("image/png"));
          }}
        />
        <span className="pointer-events-none absolute bottom-3 left-4 right-4 border-b border-dashed border-ink/25" aria-hidden="true" />
        {empty && <span className="meta pointer-events-none absolute left-4 top-3 text-muted">Sign here (optional)</span>}
      </div>
      <button type="button" onClick={clear} className="meta wipe mt-2 text-muted">
        Clear signature
      </button>
    </div>
  );
}

function Options<T extends string>({ legend, value, options, onChange, render }: { legend: string; value: T; options: readonly T[]; onChange: (v: T) => void; render: (v: T, on: boolean) => React.ReactNode }) {
  return (
    <fieldset>
      <legend className="meta text-muted">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" name={legend} value={o} checked={value === o} onChange={() => onChange(o)} className="peer sr-only" />
            <span className="block outline-offset-2 peer-focus-visible:outline peer-focus-visible:outline-[1.5px] peer-focus-visible:outline-oxblood">{render(o, value === o)}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const chip = (on: boolean) => `meta block border px-3 py-2 transition-colors ${on ? "border-ink bg-ink text-paper" : "border-ink/25 hover:border-ink"}`;

export default function VisitorCards() {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [colorway, setColorway] = useState<Colorway>("night");
  const [pattern, setPattern] = useState<Pattern>("rings");
  const [type, setType] = useState<TypeKey>("serif");
  const [signature, setSignature] = useState<string | null>(null);
  const [padKey, setPadKey] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      if (Array.isArray(saved)) setCards(saved);
      setCount(Number(localStorage.getItem(COUNT_KEY) ?? 0) || 0);
    } catch {}
  }, []);

  const persist = (next: Card[], nextCount = count) => {
    setCards(next);
    setCount(nextCount);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
      localStorage.setItem(COUNT_KEY, String(nextCount));
    } catch {
      setError("Your browser couldn’t save this card (storage is full or blocked).");
    }
  };

  const today = new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "2-digit" });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const m = note.trim();
    if (!n) return setError("Add your name or a nickname.");
    if (LINKISH.test(n) || LINKISH.test(m)) return setError("Links aren’t allowed on cards.");
    setError("");
    const no = count + 1;
    persist([{ id: crypto.randomUUID(), no, name: n.slice(0, LIMITS.name), note: m.slice(0, LIMITS.note), colorway, pattern, type, signature, date: today }, ...cards].slice(0, 24), no);
    setNote("");
    setSignature(null);
    setPadKey((k) => k + 1);
    setStatus(`Card No. ${String(no).padStart(4, "0")} added — saved in this browser only.`);
  };

  const draft = { no: count + 1, name, note, colorway, pattern, type, signature, date: today };

  return (
    <div>
      {/* honest about where cards go */}
      <p role="note" className="meta border-y border-ink py-3">
        <span className="text-oxblood">Local prototype —</span> cards are saved only in your browser on this device. Nobody else can see them, and nothing is sent to a server.
      </p>

      <div className="mt-12 grid gap-14 lg:grid-cols-12">
        <form onSubmit={submit} noValidate className="space-y-9 lg:col-span-6">
          <div>
            <label htmlFor="v-name" className="meta text-muted">
              Name or nickname
            </label>
            <input
              id="v-name"
              value={name}
              maxLength={LIMITS.name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="nickname"
              className="display mt-2 w-full border-b border-ink/30 bg-transparent py-2 text-[2.4rem] outline-none transition-colors focus:border-ink"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="v-note" className="meta flex justify-between text-muted">
              <span>A short note (optional)</span>
              <span className={note.length > LIMITS.note - 15 ? "text-oxblood" : ""}>
                {note.length}/{LIMITS.note}
              </span>
            </label>
            <textarea
              id="v-note"
              value={note}
              maxLength={LIMITS.note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              className="mt-2 w-full resize-none border-b border-ink/30 bg-transparent py-2 text-[1.05rem] outline-none transition-colors focus:border-ink"
              placeholder="Say hi, leave a thought…"
            />
          </div>

          <Options
            legend="Colour"
            value={colorway}
            options={COLORWAYS.map((c) => c.key)}
            onChange={setColorway}
            render={(k, on) => {
              const c = COLORWAYS.find((x) => x.key === k)!;
              return (
                <span className={`flex items-center gap-2 border px-2 py-1.5 ${on ? "border-ink" : "border-transparent"}`}>
                  <span className="block h-6 w-6 border border-ink/20" style={{ backgroundColor: c.bg }} />
                  <span className="meta">{c.label}</span>
                </span>
              );
            }}
          />
          <Options legend="Pattern" value={pattern} options={PATTERNS} onChange={setPattern} render={(p, on) => <span className={chip(on)}>{p}</span>} />
          <Options legend="Type" value={type} options={TYPES.map((t) => t.key)} onChange={setType} render={(t, on) => <span className={chip(on)}>{TYPES.find((x) => x.key === t)!.label}</span>} />

          <div>
            <p className="meta text-muted">Signature</p>
            <div className="mt-3 max-w-[26rem]">
              <SignaturePad key={padKey} onChange={setSignature} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <button type="submit" className="meta group inline-flex items-center gap-3 bg-ink px-6 py-4 text-paper transition-colors hover:bg-oxblood">
              Issue my card
              <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </button>
            <p role="status" aria-live="polite" className="text-[0.92rem]">
              {error ? <span className="text-oxblood">{error}</span> : status}
            </p>
          </div>
        </form>

        {/* live preview */}
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="lg:sticky lg:top-24">
            <p className="meta text-muted">Preview</p>
            <div className="mx-auto mt-4 max-w-[22rem]">
              <TiltCard>
                <AdmissionCard card={draft} />
              </TiltCard>
            </div>
          </div>
        </div>
      </div>

      {/* the collection (local) */}
      <section aria-labelledby="collection-heading" className="mt-32">
        <div className="grid gap-6 border-t border-ink pt-5 md:grid-cols-12">
          <p className="meta text-muted md:col-span-3">(02) The collection</p>
          <h2 id="collection-heading" className="display text-[clamp(2.6rem,5.6vw,5.6rem)] md:col-span-9">
            Cards in <em>this browser</em>
          </h2>
        </div>
        {cards.length === 0 ? (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <AdmissionCard specimen card={{ no: 0, name: "", note: "", colorway: "paper", pattern: "grid", type: "serif", signature: null, date: "" }} />
              <p className="meta mt-3 text-muted">Specimen — your card will be the first here.</p>
            </div>
          </div>
        ) : (
          <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence initial={false}>
              {cards.map((c) => (
                <motion.li
                  key={c.id}
                  layout
                  initial={{ opacity: 0, y: -30, rotate: -4 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <TiltCard>
                    <AdmissionCard card={c} />
                  </TiltCard>
                  <button type="button" onClick={() => persist(cards.filter((x) => x.id !== c.id))} className="meta wipe mt-3 text-muted">
                    Remove card
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </section>
    </div>
  );
}
