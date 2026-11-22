import Link from "next/link";
import { rooms } from "@/content/site";
import Reveal from "../ui/Reveal";
import { Doodle, type DoodleName, Pencil } from "../doodles/Doodles";

/* What Chloe is up to right now — all from her own content */
const currently = [
  { label: "designing", text: "a Financial Model Knowledge Hub for Brookfield Renewable, with Atlas Digital" },
  { label: "studying", text: "Information Analysis + a Data Science minor at the University of Michigan School of Information" },
  { label: "curious about", text: "user research, product thinking, data & AI, and human behavior" },
  { label: "off the clock", text: "Pilates, reading, board games with friends, and soccer" },
];

/* “Come on in”: a journal card and the doors to the other rooms */
export default function Doors() {
  const doors = rooms.filter((r) => r.key !== "work");
  return (
    <section aria-labelledby="doors-heading" className="relative overflow-hidden bg-pink/60 py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* the journal entry */}
        <Reveal>
          <div className="ruled relative rotate-[-1deg] rounded-[6px] px-6 pb-7 pt-10 shadow-[0_24px_40px_-28px_rgba(58,38,32,0.6)] sm:px-9">
            <span className="tape -top-3 left-8 -rotate-6" style={{ ["--tape" as string]: "var(--lavender)" }} aria-hidden="true" />
            <span className="tape -top-3 right-8 rotate-[5deg]" aria-hidden="true" />
            <p className="hand flex items-center gap-2 text-[2.2rem] leading-none">
              <Pencil className="h-8 w-8" /> currently…
            </p>
            <ul className="mt-4 space-y-4">
              {currently.map((c) => (
                <li key={c.label} className="leading-[1.9rem]">
                  <span className="eyebrow mr-2 !text-rose-deep">{c.label}</span>
                  <span>{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div>
          <p className="eyebrow">explore</p>
          <h2 id="doors-heading" className="display mt-3 text-[clamp(2.6rem,6vw,4.6rem)]">
            come on <em>in</em>
          </h2>
          <p className="mt-4 max-w-[34rem] text-espresso-soft">Every room in my little world has something to find. Pick a door.</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {doors.map((room, i) => (
              <Reveal as="li" key={room.key} delay={i * 0.06}>
                <Link
                  href={room.href}
                  className="group relative flex h-full flex-col rounded-[22px] border border-espresso/10 p-5 shadow-[0_3px_0_rgba(58,38,32,0.18)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-[-0.8deg] motion-reduce:transition-none motion-reduce:hover:transform-none"
                  style={{ backgroundColor: room.tone }}
                >
                  <span className="grid h-16 w-16 place-items-center rounded-[16px] bg-paper shadow-[0_2px_0_rgba(58,38,32,0.12)]">
                    <Doodle name={room.doodle as DoodleName} className="wiggle-on-hover h-11 w-11" />
                  </span>
                  <span className="display mt-4 text-[1.8rem] leading-none">{room.label}</span>
                  <span className="mt-2 text-[0.95rem] text-espresso-soft">{room.blurb}</span>
                  <span className="mt-auto pt-4 text-[0.95rem] font-semibold transition-transform duration-300 group-hover:translate-x-1">open the door →</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
