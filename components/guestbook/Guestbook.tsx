"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type FormEvent } from "react";
import DoodlePad from "../playground/DoodlePad";
import { Doodle, type DoodleName } from "../doodles/Doodles";

type Note = { id: string; name: string; message: string; stamp: DoodleName; paper: string; doodle: string | null; date: string };

const STAMPS: DoodleName[] = ["heart", "star", "flower", "bow", "strawberry", "sparkle", "note", "coffee"];
const PAPERS = [
  { name: "blush", value: "var(--blush)" },
  { name: "butter", value: "var(--butter)" },
  { name: "lavender", value: "var(--lavender)" },
  { name: "sage", value: "var(--sage)" },
  { name: "sky", value: "var(--sky)" },
];
const KEY = "chloes-world-guestbook";
const LIMITS = { name: 40, message: 280 };

/* The stationery a note is written on (used for the live preview and the gallery) */
function NoteCard({ note, tilt = 0 }: { note: Omit<Note, "id">; tilt?: number }) {
  return (
    <div className="relative rounded-[6px] p-5 pt-7 shadow-[0_18px_30px_-22px_rgba(58,38,32,0.7)]" style={{ backgroundColor: note.paper, rotate: `${tilt}deg` }}>
      <span className="tape -top-3 left-6 -rotate-6" style={{ ["--tape" as string]: "var(--paper)" }} aria-hidden="true" />
      {/* the stamp */}
      <span className="absolute -right-2 -top-3 grid h-16 w-14 rotate-6 place-items-center bg-paper p-1 shadow-[0_4px_8px_-4px_rgba(58,38,32,0.5)] [clip-path:polygon(0_6%,6%_0,12%_6%,18%_0,24%_6%,30%_0,36%_6%,42%_0,48%_6%,54%_0,60%_6%,66%_0,72%_6%,78%_0,84%_6%,90%_0,96%_6%,100%_0,100%_100%,0_100%)]">
        <Doodle name={note.stamp} className="w-10" />
      </span>
      <p className="hand pr-12 text-[1.5rem] leading-none">dear chloe,</p>
      <p className="mt-2 whitespace-pre-wrap break-words leading-relaxed">{note.message || <span className="text-espresso-soft/60">your note will appear here…</span>}</p>
      {note.doodle && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={note.doodle} alt={`A doodle by ${note.name || "a visitor"}`} className="mt-3 aspect-[4/3] w-full rounded-[4px] bg-paper/70 object-contain" />
      )}
      <p className="hand mt-3 text-right text-[1.4rem] leading-none">— {note.name || "you"}</p>
      <p className="mt-1 text-right text-[0.75rem] text-espresso-soft">{note.date}</p>
    </div>
  );
}

/* “Leave a little note in Chloe’s scrapbook ♡” — a LOCAL DEMO: there’s no backend yet, so
   notes are stored in this browser only (localStorage) and the page says so plainly. */
export default function Guestbook() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [stamp, setStamp] = useState<DoodleName>("heart");
  const [paper, setPaper] = useState(PAPERS[0].value);
  const [doodle, setDoodle] = useState<string | null>(null);
  const [padKey, setPadKey] = useState(0);
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      if (Array.isArray(saved)) setNotes(saved);
    } catch {}
  }, []);
  const persist = (next: Note[]) => {
    setNotes(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      setError("Your browser couldn’t save this note (storage is full or blocked).");
    }
  };

  const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const m = message.trim();
    if (!n) return setError("Please add your name or a nickname.");
    if (!m && !doodle) return setError("Write a little message or draw something first.");
    setError("");
    persist([{ id: crypto.randomUUID(), name: n.slice(0, LIMITS.name), message: m.slice(0, LIMITS.message), stamp, paper, doodle, date: today }, ...notes].slice(0, 30));
    setMessage("");
    setDoodle(null);
    setPadKey((k) => k + 1);
    setSent(true);
    window.setTimeout(() => setSent(false), 2600);
  };

  return (
    <div>
      {/* honest about where notes go */}
      <div className="flex items-start gap-3 rounded-[16px] border-2 border-dashed border-rose/60 bg-paper p-4 text-[0.95rem]" role="note">
        <Doodle name="envelope" className="h-8 w-8 shrink-0" />
        <p>
          <strong>This guestbook is a local demo.</strong> Notes are saved only in <em>your</em> browser on this device — nobody else can see them yet, not even me. A shared visitor gallery is on my to-do list.
        </p>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={submit} noValidate className="space-y-7">
          <div>
            <label htmlFor="gb-name" className="eyebrow block">
              your name or nickname
            </label>
            <input
              id="gb-name"
              value={name}
              maxLength={LIMITS.name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="nickname"
              className="mt-2 w-full border-b-2 border-espresso/30 bg-transparent px-1 py-2 text-[1.15rem] outline-none transition-colors focus:border-rose"
              placeholder="e.g. a fellow pilates fan"
            />
          </div>
          <div>
            <label htmlFor="gb-message" className="eyebrow flex justify-between">
              <span>a little message</span>
              <span className={message.length > LIMITS.message - 20 ? "text-rose-deep" : ""}>
                {message.length}/{LIMITS.message}
              </span>
            </label>
            <textarea
              id="gb-message"
              value={message}
              maxLength={LIMITS.message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="ruled mt-2 w-full resize-none rounded-[8px] px-4 py-[0.35rem] text-[1.05rem] leading-[1.9rem] outline-none ring-1 ring-espresso/15 focus:ring-2 focus:ring-rose"
              placeholder="say hi, share a thought, leave a song rec…"
            />
          </div>

          <fieldset>
            <legend className="eyebrow">pick a stamp</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {STAMPS.map((s) => (
                <label key={s} className="cursor-pointer">
                  <input type="radio" name="stamp" value={s} checked={stamp === s} onChange={() => setStamp(s)} className="peer sr-only" />
                  <span className="grid h-14 w-14 place-items-center rounded-[12px] bg-paper ring-1 ring-espresso/15 transition-transform peer-checked:-translate-y-1 peer-checked:bg-pink peer-checked:ring-2 peer-checked:ring-espresso peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-espresso">
                    <Doodle name={s} className="w-9" />
                    <span className="sr-only">{s}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="eyebrow">paper</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {PAPERS.map((p) => (
                <label key={p.name} className="cursor-pointer">
                  <input type="radio" name="paper" value={p.name} checked={paper === p.value} onChange={() => setPaper(p.value)} className="peer sr-only" />
                  <span
                    className="block h-10 w-10 rounded-full ring-1 ring-espresso/20 transition-transform peer-checked:scale-110 peer-checked:ring-2 peer-checked:ring-espresso peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-espresso"
                    style={{ backgroundColor: p.value }}
                  />
                  <span className="sr-only">{p.name}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <p className="eyebrow">a tiny doodle (optional)</p>
            <DoodlePad key={padKey} label="Your doodle for the note" aspect="aspect-[4/3]" className="mt-3 max-w-[30rem]" onChange={setDoodle} />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="rounded-[var(--radius-button)] bg-espresso px-6 py-3.5 font-semibold text-ivory shadow-[0_3px_0_#1f130f] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 motion-reduce:transition-none"
            >
              tuck it into the scrapbook ♡
            </button>
            <p role="status" aria-live="polite" className="hand text-[1.4rem] leading-none text-rose-deep">
              {error ? <span className="font-sans text-[0.95rem] font-semibold">{error}</span> : sent ? "saved in your browser — thank you! ♡" : ""}
            </p>
          </div>
        </form>

        {/* live preview */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">preview</p>
          <div className="mt-4">
            <NoteCard note={{ name, message, stamp, paper, doodle, date: today }} tilt={-1.5} />
          </div>
        </div>
      </div>

      {/* the gallery (local) */}
      <section aria-labelledby="gallery-heading" className="mt-24">
        <h2 id="gallery-heading" className="display text-[clamp(2.2rem,4.6vw,3.6rem)]">
          notes in <em>your</em> scrapbook
        </h2>
        {notes.length === 0 ? (
          <div className="mt-8 flex flex-col items-center rounded-[20px] border-2 border-dashed border-espresso/15 py-14 text-center">
            <Doodle name="envelope" className="float w-16" />
            <p className="hand mt-3 text-[1.7rem]">no notes yet — be the first!</p>
          </div>
        ) : (
          <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false}>
              {notes.map((note, i) => (
                <motion.li
                  key={note.id}
                  layout
                  initial={{ opacity: 0, y: -24, rotate: -6 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                  className="relative"
                >
                  <NoteCard note={note} tilt={i % 2 ? 1.5 : -1.2} />
                  <button
                    type="button"
                    onClick={() => persist(notes.filter((x) => x.id !== note.id))}
                    className="link mt-3 text-[0.85rem] font-semibold text-espresso-soft"
                  >
                    remove this note
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
