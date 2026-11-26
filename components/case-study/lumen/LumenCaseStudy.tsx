import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/lib/types";
import { lumen, screens, sketches, type Screen, type ScreenKey } from "@/content/lumen";
import { previewOf } from "../../work/ProjectTile";
import Reveal from "../../ui/Reveal";
import SplitHeading from "../../ui/SplitHeading";
import ReadingProgress from "../ReadingProgress";
import { Lightbox, ZoomButton } from "../Lightbox";
import Phone from "./Phone";
import FlowExplorer from "./FlowExplorer";
import SectionNav from "../SectionNav";

const pad = (n: number) => String(n).padStart(2, "0");

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "The challenge" },
  { id: "research", label: "Research" },
  { id: "goals", label: "Design goals" },
  { id: "structure", label: "Structure" },
  { id: "exploration", label: "Exploration" },
  { id: "testing", label: "Testing" },
  { id: "decisions", label: "Key decisions" },
  { id: "product", label: "Final product" },
  { id: "reflection", label: "Reflection" },
];

/* Section shell: a full-bleed background band, an index label and a heading, then content.
   The left padding on xl leaves room for the sticky section index. */
function Section({ id, n, label, heading, tone = "paper", children }: { id: string; n: number; label: string; heading?: ReactNode; tone?: "paper" | "blush" | "stone"; children: ReactNode }) {
  const bg = tone === "blush" ? "bg-[#f4e1e3]/55" : tone === "stone" ? "bg-stone/70" : "";
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`scroll-mt-16 py-24 md:py-36 ${bg}`}>
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 xl:pl-56">
        <div className="grid gap-4 border-t border-ink pt-5 md:grid-cols-12">
          <p className="meta flex gap-3 md:col-span-3">
            <span className="text-muted">{pad(n)}</span>
            {label}
          </p>
          {heading && (
            <Reveal className="md:col-span-9">
              <h2 id={`${id}-h`} className="display max-w-[22ch] text-[clamp(2.4rem,5vw,4.8rem)]">
                {heading}
              </h2>
            </Reveal>
          )}
          {!heading && (
            <h2 id={`${id}-h`} className="sr-only">
              {label}
            </h2>
          )}
        </div>
        <div className="mt-14 md:mt-20">{children}</div>
      </div>
    </section>
  );
}

/* Problem / why / how / result — the four questions every decision answers */
function DecisionText({ d }: { d: (typeof lumen.decisions)[number] }) {
  const rows = [
    ["The problem", d.problem],
    ["Why", d.why],
    ["How it works", d.how],
    ["What it changes", d.better],
  ];
  return (
    <dl className="divide-y divide-line border-y border-line">
      {rows.map(([t, v], i) => (
        <div key={t} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
          <dt className={`meta pt-1 ${i === 3 ? "text-oxblood" : "text-muted"}`}>{t}</dt>
          <dd className={`leading-relaxed ${i === 3 ? "display text-[1.45rem] leading-snug" : "text-[1rem]"}`}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function LumenCaseStudy({ project, index, prev, next }: { project: Project; index: number; prev: Project; next: Project }) {
  // every image on the page, in order, for the click-to-enlarge viewer
  const figures: { src: string; alt: string; caption: string }[] = [];
  const reg = (s: { src: string; alt: string; label: string }, ctx?: string) => {
    figures.push({ src: s.src, alt: s.alt, caption: ctx ? `${ctx} — ${s.label}` : s.label });
    return figures.length - 1;
  };
  const ph = (key: ScreenKey, ctx?: string) => ({ screen: screens[key] as Screen, index: reg(screens[key], ctx) });

  const hero = [ph("mapFilters"), ph("home"), ph("wallet")];
  const sketchIdx = sketches.map((s) => reg(s, "Early sketches"));
  const lofi = (["lofiHome", "lofiMap", "lofiLineup", "lofiWallet"] as const).map((k) => ph(k, "Lo-fi"));
  const explore = (["exploreHome", "exploreMap", "exploreLineup", "exploreArtist", "exploreWallet"] as const).map((k) => ph(k, "Visual exploration"));
  const before = ph("mapBefore", "Testing — map before");
  const after = ph("mapFilters", "Testing — map after");
  const homeCrop = reg({ ...screens.home, label: "What’s next, up close" }, "Home");
  const decisions = lumen.decisions.map((d) => ({ d, phones: d.screens.map((k) => ph(k as ScreenKey, d.title)) }));
  const flows = lumen.flows.map((f) => ({ ...f, screens: f.screens.map((k) => ph(k as ScreenKey, f.label)) }));
  const cover = previewOf(next);

  // The What's next card, cropped out of the home screen (y 15.5%–42.5% of the screen)
  const crop = { y0: 0.155, y1: 0.425 };
  const cropH = (crop.y1 - crop.y0) * screens.home.h;
  // markers sit at the end of the element they point to (x / y as fractions of the crop)
  const markers = [
    { n: 1, x: 0.915, y: 0.22, label: "The next saved artist — and how soon it starts" },
    { n: 2, x: 0.69, y: 0.337, label: "Time and stage" },
    { n: 3, x: 0.765, y: 0.474, label: "Walking time from where you are" },
    { n: 4, x: 0.915, y: 0.74, label: "One tap to navigate" },
  ];

  return (
    <Lightbox figures={figures}>
      <article>
        <ReadingProgress />
        <SectionNav items={SECTIONS} />

        {/* ---------- Hero ---------- */}
        <header className="bg-[#f4e1e3]/55">
          <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-6 sm:px-8 sm:pt-10 xl:pl-56">
            <div className="meta flex justify-between text-muted">
              <Link href="/work" className="group inline-flex items-center gap-2 text-ink">
                <span className="transition-transform duration-500 group-hover:-translate-x-1" aria-hidden="true">
                  ←
                </span>
                <span className="wipe">All work</span>
              </Link>
              <span>Case study — {project.year}</span>
            </div>
            <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-6">
                <p className="meta text-muted">{project.category}</p>
                <SplitHeading as="h1" inView={false} label={project.title} className="display mt-4 text-[clamp(4.4rem,13vw,11rem)] leading-[0.82] tracking-[-0.04em]" lines={[project.title]} />
                <p className="mt-8 max-w-[40ch] text-[clamp(1.15rem,1.7vw,1.4rem)] leading-snug">{lumen.intro}</p>
              </div>
              <div className="relative lg:col-span-6">
                <div className="mx-auto grid max-w-[48rem] grid-cols-3 items-center">
                  {hero.map(({ screen, index: i }, k) => (
                    <Reveal key={screen.src} delay={0.15 + k * 0.1} className={k === 1 ? "relative z-10 scale-[1.14]" : k === 0 ? "translate-x-[6%] translate-y-[4%]" : "-translate-x-[6%] translate-y-[4%]"}>
                      <ZoomButton index={i} label={screen.label}>
                        <Image src={screen.src} alt={screen.alt} width={screen.w} height={screen.h} priority sizes="(min-width: 1024px) 18vw, 36vw" className="h-auto w-full drop-shadow-[0_34px_44px_rgba(37,37,34,0.28)]" />
                      </ZoomButton>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
            <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-ink pt-5 sm:grid-cols-3 lg:grid-cols-6">
              {lumen.facts.map((f) => (
                <div key={f.term}>
                  <dt className="meta text-muted">{f.term}</dt>
                  <dd className="mt-1 text-[0.95rem] leading-snug">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        {/* ---------- 01 Overview ---------- */}
        <Section id="overview" n={1} label="Overview" heading="One app for what to see, where to go, and how to get in.">
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-6 md:col-start-4">
              <p className="text-[clamp(1.1rem,1.5vw,1.3rem)] leading-relaxed">{lumen.overview.text}</p>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-3">
              <p className="meta text-muted">What I did</p>
              <ul className="mt-3 border-t border-line">
                {lumen.overview.did.map((d, i) => (
                  <li key={d} className="flex gap-3 border-b border-line py-3 text-[0.95rem]">
                    <span className="meta pt-0.5 text-muted">{pad(i + 1)}</span>
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>

        {/* ---------- 02 Challenge ---------- */}
        <Section id="challenge" n={2} label="The challenge" heading={lumen.challenge.heading}>
          <ol className="grid border-t border-ink md:grid-cols-3 md:border-t-0">
            {lumen.challenge.jobs.map((j, i) => (
              <Reveal as="li" key={j.n} delay={i * 0.08} className="border-b border-line py-8 md:border-b-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0">
                <span className="meta text-muted">{j.n}</span>
                <p className="display mt-6 text-[clamp(2.4rem,4vw,3.6rem)]">{j.title}</p>
                <p className="mt-3 max-w-[30ch] text-muted">{j.text}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-20 grid gap-4 md:grid-cols-12">
            <p className="meta text-oxblood md:col-span-3">Working hypothesis</p>
            <p className="display text-[clamp(1.9rem,3.6vw,3.2rem)] leading-[1.05] md:col-span-9">“{lumen.challenge.hypothesis}”</p>
          </Reveal>
        </Section>

        {/* ---------- 03 Research ---------- */}
        <Section id="research" n={3} label="Research" heading="Where festivals break down." tone="stone">
          <Reveal className="grid gap-4 md:grid-cols-12">
            <p className="meta text-muted md:col-span-3">Method</p>
            <p className="max-w-[52ch] text-[1.1rem] leading-relaxed md:col-span-9">{lumen.research.method}</p>
          </Reveal>
          <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {lumen.research.areas.map((a, i) => (
              <Reveal key={a.title} delay={(i % 2) * 0.08} className="border-t border-ink/30 pt-5">
                <p className="meta flex justify-between text-muted">
                  <span>{a.title}</span>
                  <span>{pad(i + 1)}</span>
                </p>
                <p className="display mt-5 text-[clamp(1.6rem,2.4vw,2.2rem)] leading-tight">{a.question}</p>
                <p className="meta mt-6 text-oxblood">What I heard</p>
                <ul className="mt-2 space-y-2">
                  {a.heard.map((h) => (
                    <li key={h} className="flex gap-3 leading-relaxed">
                      <span className="mt-[0.7em] h-px w-3 shrink-0 bg-ink" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <div className="mt-24 grid gap-6 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="meta text-muted">Working hypotheses</p>
              <p className="mt-2 text-[0.9rem] text-muted">Assumptions to test — not research findings.</p>
            </div>
            <ol className="border-t border-ink md:col-span-9">
              {lumen.research.hypotheses.map((h, i) => (
                <Reveal as="li" key={h} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[4rem_1fr]">
                  <span className="display text-[2rem] leading-none text-oxblood">{pad(i + 1)}</span>
                  <span className="text-[1.1rem] leading-relaxed">{h}</span>
                </Reveal>
              ))}
            </ol>
          </div>
        </Section>

        {/* ---------- 04 Goals ---------- */}
        <Section id="goals" n={4} label="Design goals" heading="From what I heard to what the app has to do.">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] border-t border-ink text-left">
              <thead>
                <tr className="meta text-muted">
                  <th scope="col" className="py-3 pr-6 font-normal">From</th>
                  <th scope="col" className="py-3 pr-6 font-normal">Goal</th>
                  <th scope="col" className="py-3 font-normal">Where it lives</th>
                </tr>
              </thead>
              <tbody>
                {lumen.goals.map((g) => (
                  <tr key={g.goal} className="border-t border-line align-top">
                    <td className="meta py-5 pr-6 text-muted">{g.from}</td>
                    <td className="display py-5 pr-6 text-[clamp(1.35rem,2vw,1.8rem)] leading-tight">{g.goal}</td>
                    <td className="py-5 text-[0.95rem]">{g.where}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ---------- 05 Structure ---------- */}
        <Section id="structure" n={5} label="Structure" heading="Four tabs, one journey." tone="stone">
          <p className="meta text-muted">Information architecture</p>
          <ul className="mt-4 grid grid-cols-2 border-t border-ink md:grid-cols-4">
            {lumen.ia.map((c, i) => (
              <Reveal as="li" key={c.tab} delay={i * 0.06} className="border-b border-line py-6 pr-4 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
                <span className="meta text-muted">{pad(i + 1)}</span>
                <p className="display mt-3 text-[2.2rem]">{c.tab}</p>
                <ul className="mt-3 space-y-1 text-muted">
                  {c.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
          <p className="meta mt-20 text-muted">User journey — where LUMEN can reduce friction before, during and after</p>
          <ol className="relative mt-6 grid gap-8 md:grid-cols-5 md:gap-6">
            <span className="absolute left-0 right-0 top-[0.6rem] hidden h-px bg-ink/25 md:block" aria-hidden="true" />
            {lumen.journey.map((j, i) => (
              <Reveal as="li" key={j.step} delay={i * 0.06} className="relative">
                <span className="relative block h-[1.2rem] w-[1.2rem] rounded-full border border-ink bg-paper" aria-hidden="true" />
                <p className="meta mt-4 text-muted">{pad(i + 1)}</p>
                <p className="display mt-1 text-[1.8rem]">{j.step}</p>
                <p className="mt-2 text-[0.95rem] text-muted">{j.text}</p>
              </Reveal>
            ))}
          </ol>
        </Section>

        {/* ---------- 06 Exploration ---------- */}
        <Section id="exploration" n={6} label="Exploration" heading="Structure first, then style.">
          <div className="grid gap-6 md:grid-cols-12">
            <p className="meta text-muted md:col-span-3">Sketches</p>
            <p className="max-w-[48ch] text-[1.05rem] leading-relaxed md:col-span-9">{lumen.process.sketches}</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {sketches.map((s, i) => (
              <Reveal key={s.src} delay={i * 0.08}>
                <figure>
                  <ZoomButton index={sketchIdx[i]} label={s.label}>
                    <Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="(min-width: 768px) 45vw, 100vw" className="h-auto w-full bg-white shadow-[0_18px_40px_-28px_rgba(37,37,34,0.55)]" />
                  </ZoomButton>
                  <figcaption className="meta mt-3 text-muted">{s.label}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <div className="mt-28 grid gap-6 md:grid-cols-12">
            <p className="meta text-muted md:col-span-3">Lo-fi wireframes</p>
            <div className="md:col-span-9">
              <p className="max-w-[52ch] text-[1.05rem] leading-relaxed">{lumen.process.lofi}</p>
              <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
                {lumen.process.lofiQuestions.map((q) => (
                  <li key={q} className="display text-[1.6rem] italic">
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {lofi.map((p, i) => (
              <Reveal key={p.screen.src} delay={i * 0.06}>
                <Phone screen={p.screen} index={p.index} />
              </Reveal>
            ))}
          </div>

          <div className="mt-28 grid gap-6 md:grid-cols-12">
            <p className="meta text-muted md:col-span-3">Visual exploration</p>
            <p className="max-w-[52ch] text-[1.05rem] leading-relaxed md:col-span-9">{lumen.process.explore}</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-5">
            {explore.map((p, i) => (
              <Reveal key={p.screen.src} delay={i * 0.06} className={i === 4 ? "col-span-2 mx-auto w-1/2 md:col-span-1 md:w-auto" : ""}>
                <Phone screen={p.screen} index={p.index} sizes="(min-width: 768px) 17vw, 45vw" />
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---------- 07 Testing ---------- */}
        <Section id="testing" n={7} label="Testing & iteration" heading={lumen.testing.change} tone="blush">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-[1.05rem] leading-relaxed">{lumen.testing.intro}</p>
              <p className="meta mt-10 text-muted">Usability tasks</p>
              <ol className="mt-3 border-t border-ink">
                {lumen.testing.tasks.map((t, i) => (
                  <li key={t} className="grid grid-cols-[3rem_1fr] border-b border-line py-4">
                    <span className="display text-[1.6rem] leading-none text-oxblood">{pad(i + 1)}</span>
                    <span className="leading-relaxed">{t}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 items-start gap-6 sm:gap-10">
                <Reveal>
                  <p className="meta mb-4 text-muted">Before</p>
                  <ZoomButton index={before.index} label="Map before testing">
                    <Image src={before.screen.src} alt={before.screen.alt} width={before.screen.w} height={before.screen.h} sizes="(min-width: 1024px) 22vw, 45vw" className="h-auto w-full opacity-90 drop-shadow-[0_24px_30px_rgba(37,37,34,0.18)]" />
                  </ZoomButton>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="meta mb-4 text-oxblood">After</p>
                  <ZoomButton index={after.index} label="Map after testing">
                    <Image src={after.screen.src} alt={after.screen.alt} width={after.screen.w} height={after.screen.h} sizes="(min-width: 1024px) 22vw, 45vw" className="h-auto w-full drop-shadow-[0_28px_36px_rgba(37,37,34,0.25)]" />
                  </ZoomButton>
                </Reveal>
              </div>
              <ul className="mt-10 border-t border-ink">
                {lumen.testing.after.map((a, i) => (
                  <li key={a} className="flex gap-4 border-b border-line py-3">
                    <span className="meta pt-0.5 text-oxblood">+{pad(i + 1)}</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ---------- 08 Decisions ---------- */}
        <Section id="decisions" n={8} label="Key decisions" heading="Why it works the way it does.">
          <div className="space-y-32 md:space-y-44">
            {decisions.map(({ d, phones }, k) => {
              const flip = k % 2 === 1;
              return (
                <article key={d.id} aria-labelledby={`d-${d.id}`} className="grid gap-12 lg:grid-cols-12 lg:items-center">
                  <div className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
                    <p className="meta text-oxblood">Decision {pad(k + 1)}</p>
                    <h3 id={`d-${d.id}`} className="display mt-3 text-[clamp(2.2rem,3.6vw,3.4rem)] leading-[1]">
                      {d.title}
                    </h3>
                    <div className="mt-8">
                      <DecisionText d={d} />
                    </div>
                  </div>
                  <div className={`lg:col-span-6 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
                    {d.id === "whats-next" ? (
                      // the home screen next to an enlarged, annotated crop of the What's next card
                      <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] items-center gap-6 sm:gap-10">
                        <Phone screen={phones[0].screen} index={phones[0].index} sizes="(min-width: 1024px) 16vw, 35vw" />
                        <figure>
                          <ZoomButton index={homeCrop} label="What’s next, up close">
                            <span className="relative block overflow-hidden rounded-[18px] shadow-[0_30px_50px_-30px_rgba(37,37,34,0.6)]" style={{ aspectRatio: `${screens.home.w} / ${cropH}` }}>
                              <Image src={screens.home.src} alt="Close-up of the What’s next card on the home screen" width={screens.home.w} height={screens.home.h} sizes="(min-width: 1024px) 30vw, 60vw" className="absolute left-0 w-full max-w-none" style={{ top: `${(-(crop.y0 * screens.home.h) / cropH) * 100}%` }} />
                              {markers.map((m) => (
                                <span key={m.n} className="absolute grid h-5 w-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-oxblood font-mono text-[0.62rem] text-paper ring-2 ring-paper" style={{ left: `${m.x * 100}%`, top: `${m.y * 100}%` }} aria-hidden="true">
                                  {m.n}
                                </span>
                              ))}
                            </span>
                          </ZoomButton>
                          <figcaption>
                            <ol className="mt-5 space-y-1.5">
                              {markers.map((m) => (
                                <li key={m.n} className="flex gap-3 text-[0.92rem]">
                                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-oxblood font-mono text-[0.62rem] text-paper">{m.n}</span>
                                  {m.label}
                                </li>
                              ))}
                            </ol>
                          </figcaption>
                        </figure>
                      </div>
                    ) : (
                      <div className={`grid items-start gap-5 sm:gap-8 ${phones.length === 1 ? "mx-auto max-w-[18rem] grid-cols-1" : phones.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                        {phones.map((p, i) => (
                          <Reveal key={p.screen.src} delay={i * 0.08} className={phones.length === 3 && i === 1 ? "sm:mt-12" : ""}>
                            <Phone screen={p.screen} index={p.index} sizes="(min-width: 1024px) 15vw, 30vw" />
                          </Reveal>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        {/* ---------- 09 Final product ---------- */}
        <Section id="product" n={9} label="Final product" heading="Planning, navigation, access and live information in one flow." tone="blush">
          <FlowExplorer flows={flows} />
        </Section>

        {/* ---------- 10 Reflection ---------- */}
        <Section id="reflection" n={10} label="Reflection">
          <SplitHeading
            as="p"
            label={lumen.reflection.quote.join(" ")}
            className="display text-[clamp(3rem,8vw,7.4rem)] leading-[0.9]"
            lines={[lumen.reflection.quote[0], <em key="q" className="text-oxblood">{lumen.reflection.quote[1]}</em>]}
          />
          <div className="mt-14 grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-6 md:col-start-4">
              <p className="text-[1.1rem] leading-relaxed">{lumen.reflection.text}</p>
              <p className="mt-6 leading-relaxed text-muted">{lumen.reflection.nextText}</p>
            </Reveal>
          </div>
          <ol className="mt-16 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-ink pt-5" aria-label="Next steps">
            <li className="meta mr-4 text-muted">Next</li>
            {lumen.reflection.next.map((n, i) => (
              <li key={n} className="display flex items-baseline gap-4 text-[clamp(1.6rem,2.6vw,2.4rem)]">
                {i === lumen.reflection.next.length - 1 ? <em className="text-oxblood">{n}</em> : n}
                {i < lumen.reflection.next.length - 1 && <span className="text-[1.2rem] text-muted" aria-hidden="true">→</span>}
              </li>
            ))}
          </ol>
        </Section>

        {/* ---------- Previous / next ---------- */}
        <aside className="mx-auto max-w-[1600px] px-5 sm:px-8 xl:pl-56" aria-label="More projects">
          <nav aria-label="Previous and next project" className="meta mb-10 flex items-baseline justify-between gap-6 text-muted">
            <Link href={`/work/${prev.slug}`} className="group flex min-w-0 gap-2">
              <span aria-hidden="true">←</span>
              <span className="truncate">
                Previous — <span className="wipe text-ink">{prev.title}</span>
              </span>
            </Link>
            <span className="hidden shrink-0 sm:inline">Project {pad(index + 1)}</span>
            <Link href={`/work/${next.slug}`} className="group flex min-w-0 gap-2 text-right">
              <span className="truncate">
                Next — <span className="wipe text-ink">{next.title}</span>
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          </nav>
          <Link href={`/work/${next.slug}`} data-cursor="view" className="group grid gap-8 border-t border-ink pt-5 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="meta text-muted">Next project →</p>
              <p className="display mt-6 text-[clamp(2.6rem,6vw,6rem)] leading-[0.9]">
                <span className="wipe">{next.title}</span>
              </p>
              <p className="mt-4 max-w-[40ch] text-muted">{next.tagline ?? next.description}</p>
            </div>
            <div className="relative aspect-[16/10] self-start overflow-hidden bg-stone md:col-span-7" style={cover.ratio ? { aspectRatio: cover.ratio } : undefined}>
              <Image src={cover.image.src} alt="" fill sizes="(min-width: 768px) 58vw, 100vw" className={`transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03] ${cover.image.fit === "contain" ? "object-contain p-[4%]" : "object-cover"}`} style={{ objectPosition: cover.image.focus ?? "50% 50%" }} />
            </div>
          </Link>
        </aside>
      </article>
    </Lightbox>
  );
}
