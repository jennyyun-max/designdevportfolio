import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/lib/types";
import { costco, recordings, sketches, stills, type Still } from "@/content/costco";
import { previewOf } from "../../work/ProjectTile";
import Reveal from "../../ui/Reveal";
import SplitHeading from "../../ui/SplitHeading";
import ReadingProgress from "../ReadingProgress";
import SectionNav from "../SectionNav";
import VideoPlayer from "../VideoPlayer";
import { Lightbox, ZoomButton } from "../Lightbox";

const pad = (n: number) => String(n).padStart(2, "0");
// Costco blue and red — used inside the project visuals only
const BLUE = "#0050a0";
const RED = "#c8102e";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The problem" },
  { id: "research", label: "Research" },
  { id: "opportunities", label: "Opportunities" },
  { id: "exploration", label: "Exploration" },
  { id: "f-landing", label: "01 Landing" },
  { id: "f-shop", label: "02 Shop" },
  { id: "f-warehouse", label: "03 Warehouse" },
  { id: "f-cart", label: "04 Cart" },
  { id: "reflection", label: "Reflection" },
];

function Section({ id, n, label, heading, tone = "paper", children }: { id: string; n: number; label: string; heading?: ReactNode; tone?: "paper" | "blush" | "stone" | "blue"; children: ReactNode }) {
  const bg = tone === "blush" ? "bg-[#f4e1e3]/55" : tone === "stone" ? "bg-stone/70" : tone === "blue" ? "bg-[#e9eef6]" : "";
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`scroll-mt-16 py-24 md:py-36 ${bg}`}>
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 xl:pl-56">
        <div className="grid gap-4 border-t border-ink pt-5 md:grid-cols-12">
          <p className="meta flex gap-3 md:col-span-3">
            <span className="text-muted">{pad(n)}</span>
            {label}
          </p>
          {heading ? (
            <Reveal className="md:col-span-9">
              <h2 id={`${id}-h`} className="display max-w-[22ch] text-[clamp(2.4rem,5vw,4.8rem)]">
                {heading}
              </h2>
            </Reveal>
          ) : (
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

/* A still from the recordings, at its own size (never enlarged past 300px) */
function Shot({ s, index, className = "", priority = false }: { s: Still; index: number; className?: string; priority?: boolean }) {
  return (
    <ZoomButton index={index} label={s.label}>
      <Image src={s.src} alt={s.alt} width={s.w} height={s.h} priority={priority} sizes="300px" className={`mx-auto block h-auto w-full max-w-[300px] drop-shadow-[0_28px_34px_rgba(19,52,102,0.28)] ${className}`} />
    </ZoomButton>
  );
}

/* A still with numbered notes beside the parts that changed */
function Annotated({ s, index, notes, dark = false }: { s: Still; index: number; notes: { y: number; label: string }[]; dark?: boolean }) {
  return (
    <div className="grid items-start gap-8 sm:grid-cols-[minmax(0,300px)_1fr]">
      <div className="relative mx-auto w-full max-w-[300px]">
        <Shot s={s} index={index} />
        {notes.map((n, i) => (
          <span
            key={n.label}
            aria-hidden="true"
            className="absolute -left-3 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full font-mono text-[0.68rem] text-white ring-2 ring-white"
            style={{ top: `${n.y * 100}%`, background: RED }}
          >
            {i + 1}
          </span>
        ))}
      </div>
      <ol className={`space-y-3 self-center border-t pt-4 ${dark ? "border-white/30" : "border-ink"}`}>
        {notes.map((n, i) => (
          <li key={n.label} className="flex gap-3 leading-snug">
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full font-mono text-[0.62rem] text-white" style={{ background: RED }}>
              {i + 1}
            </span>
            {n.label}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* Insight → problem → decision → benefit, compact */
function FeatureText({ f, dark = false }: { f: (typeof costco.features)[number]; dark?: boolean }) {
  const rows: [string, string][] = [
    ["The problem", f.problem],
    ["The decision", f.decision],
    ["For the shopper", f.benefit],
  ];
  return (
    <div>
      <p className={`meta ${dark ? "text-white/70" : "text-muted"}`}>
        Research insight — <span className={dark ? "text-white" : "text-ink"}>{f.insight}</span>
      </p>
      <dl className={`mt-4 divide-y border-y ${dark ? "divide-white/20 border-white/20" : "divide-line border-line"}`}>
        {rows.map(([t, v], i) => (
          <div key={t} className="grid gap-1 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
            <dt className={`meta pt-1 ${dark ? "text-white/70" : "text-muted"}`} style={i === 2 && !dark ? { color: RED } : undefined}>
              {t}
            </dt>
            <dd className={`leading-relaxed ${i === 2 ? "display text-[1.4rem] leading-snug" : "text-[1rem]"}`}>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function FeatureHead({ f, dark = false }: { f: (typeof costco.features)[number]; dark?: boolean }) {
  return (
    <div className={`grid gap-4 border-t pt-5 md:grid-cols-12 ${dark ? "border-white/40" : "border-ink"}`}>
      <p className={`meta md:col-span-3 ${dark ? "text-white/70" : "text-muted"}`}>Feature {f.n}</p>
      <Reveal className="md:col-span-9">
        <h3 id={`f-${f.id}-h`} className="display text-[clamp(2.6rem,6vw,5.6rem)] leading-[0.92]">
          {f.title}
        </h3>
        <p className={`mt-3 text-[clamp(1.1rem,1.6vw,1.35rem)] ${dark ? "text-white/80" : "text-muted"}`}>{f.tagline}</p>
      </Reveal>
    </div>
  );
}

const MARK = {
  S: { label: "Supported", el: <span className="inline-block h-3.5 w-3.5 rounded-full" style={{ background: BLUE }} /> },
  P: { label: "Partial", el: <span className="inline-block h-3.5 w-3.5 rounded-full border-2" style={{ borderColor: BLUE, background: `linear-gradient(90deg, ${BLUE} 50%, transparent 50%)` }} /> },
  M: { label: "Missing", el: <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-dashed" style={{ borderColor: RED }} /> },
} as const;

export default function CostcoCaseStudy({ project, index, prev, next }: { project: Project; index: number; prev: Project; next: Project }) {
  const figures: { src: string; alt: string; caption: string }[] = [];
  const figures2 = figures as { src: string; alt: string; caption: string; w?: number; h?: number }[];
  const reg = (s: { src: string; alt: string; label: string; w?: number; h?: number }, ctx?: string) => {
    figures2.push({ src: s.src, alt: s.alt, caption: ctx ? `${ctx} — ${s.label}` : s.label, w: s.w, h: s.h });
    return figures.length - 1;
  };
  const sh = (s: Still, ctx?: string) => ({ s, i: reg(s, ctx) });

  const hero = [sh(stills.landingHome), sh(stills.warehouseHome), sh(stills.cartDelivery)];
  const sketchIdx = sketches.map((s) => reg(s, "Sketch"));
  const fx = Object.fromEntries(costco.features.map((f) => [f.id, f]));
  const landing = { main: sh(stills.landingHome, "Landing"), more: sh(stills.landingNew, "Landing") };
  const shop = [sh(stills.shopShipping, "Shop"), sh(stills.shopSameDay, "Shop"), sh(stills.shopAll, "Shop")];
  const wh = { main: sh(stills.warehouseHome, "Warehouse"), lists: sh(stills.warehouseLists, "Warehouse"), details: sh(stills.warehouseDetails, "Warehouse"), map: sh(stills.warehouseMap, "Warehouse") };
  const cart = [sh(stills.cartDelivery, "Cart"), sh(stills.cartRecs, "Cart"), sh(stills.cartTotal, "Cart")];
  const progression = [
    { sketch: 0, final: sh(stills.landingHome, "Sketch to final"), label: "Landing page" },
    { sketch: 1, final: sh(stills.shopShipping, "Sketch to final"), label: "Departments → Shop" },
  ];
  const surveyOriginal = reg({ src: "/images/projects/costco/survey.webp", alt: "Original survey results chart", label: "Survey — original chart", w: 1578, h: 750 });
  const competitiveOriginal = reg({ src: "/images/projects/costco/competitive.webp", alt: "Original competitive analysis table with app logos", label: "Competitive analysis — original table", w: 1158, h: 944 });
  const max = Math.max(...costco.research.survey.rows.map((r) => r.count));
  const cover = previewOf(next);

  return (
    <Lightbox figures={figures}>
      <article>
        <ReadingProgress />
        <SectionNav items={SECTIONS} />

        {/* ---------- Hero ---------- */}
        <header className="relative overflow-hidden bg-[#e9eef6]">
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
            <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <p className="meta flex items-center gap-3 text-muted">
                  <span className="h-px w-8" style={{ background: RED }} aria-hidden="true" />
                  {project.category}
                </p>
                <SplitHeading as="h1" inView={false} label={project.title} className="display mt-5 text-[clamp(3.4rem,8vw,7.6rem)] leading-[0.86] tracking-[-0.035em]" lines={["Costco App", <em key="r">Redesign</em>]} />
                <p className="mt-8 max-w-[38ch] text-[clamp(1.1rem,1.6vw,1.35rem)] leading-snug">{costco.intro}</p>
              </div>
              <div className="lg:col-span-7">
                <div className="relative mx-auto flex max-w-[44rem] items-center justify-center">
                  {hero.map(({ s, i }, k) => (
                    <Reveal key={s.src} delay={0.15 + k * 0.1} className={`max-w-[300px] ${k === 1 ? "relative z-10 -mx-[7%] w-[44%] sm:-mx-[3%] sm:w-[38%]" : "w-[38%] translate-y-[6%] opacity-95 sm:w-[34%]"}`}>
                      <Shot s={s} index={i} priority />
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
            <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-ink pt-5 lg:grid-cols-4">
              {costco.facts.map((f) => (
                <div key={f.term}>
                  <dt className="meta text-muted">{f.term}</dt>
                  <dd className="mt-1 text-[0.95rem] leading-snug">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        {/* ---------- 01 Overview ---------- */}
        <Section id="overview" n={1} label="Overview" heading="Clearer navigation, stronger structure, more intentional UI.">
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-6 md:col-start-4">
              <p className="text-[clamp(1.1rem,1.5vw,1.3rem)] leading-relaxed">{costco.overview}</p>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-3">
              <p className="meta text-muted">My part</p>
              <ul className="mt-3 border-t border-line">
                {costco.reflection.mine.map((d, i) => (
                  <li key={d} className="flex gap-3 border-b border-line py-3 text-[0.95rem]">
                    <span className="meta pt-0.5 text-muted">{pad(i + 1)}</span>
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>

        {/* ---------- 02 Problem ---------- */}
        <Section id="problem" n={2} label="The problem" heading={costco.problem.statement}>
          <Reveal className="grid gap-6 md:grid-cols-12">
            <p className="max-w-[46ch] text-[1.1rem] leading-relaxed md:col-span-6 md:col-start-4">{costco.problem.detail}</p>
          </Reveal>
          <div className="mt-20 grid gap-4 md:grid-cols-12">
            <p className="meta md:col-span-3" style={{ color: RED }}>
              How might we…
            </p>
            <ul className="md:col-span-9">
              {costco.problem.hmw.map((q, i) => (
                <Reveal as="li" key={q} delay={i * 0.06} className="display border-b border-line py-4 text-[clamp(1.6rem,3vw,2.6rem)] leading-tight first:border-t first:border-ink">
                  <span className="text-muted">…</span>
                  {q}
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>

        {/* ---------- 03 Research ---------- */}
        <Section id="research" n={3} label="Research & discovery" tone="stone">
          <dl className="grid grid-cols-3 gap-4">
            {costco.research.numbers.map((r, i) => (
              <Reveal key={r.label} delay={i * 0.08}>
                <dt className="sr-only">{r.label}</dt>
                <dd>
                  <span className="display block text-[clamp(5rem,15vw,13rem)] leading-[0.8] tracking-[-0.04em]">{r.value}</span>
                  <span className="meta mt-3 block text-muted">{r.label}</span>
                </dd>
              </Reveal>
            ))}
          </dl>
          <Reveal className="mt-16 grid gap-4 md:grid-cols-12">
            <p className="max-w-[56ch] text-[1.1rem] leading-relaxed md:col-span-8 md:col-start-4">{costco.research.summary}</p>
          </Reveal>

          {/* survey, rebuilt from the original results */}
          <figure className="mt-24 grid gap-8 md:grid-cols-12">
            <figcaption className="md:col-span-3">
              <p className="meta text-muted">Survey</p>
              <p className="mt-2 leading-snug">{costco.research.survey.question}</p>
              <p className="meta mt-2 text-muted">{costco.research.survey.responses} responses</p>
              <ZoomButton index={surveyOriginal} label="Original survey chart">
                <span className="meta wipe mt-4 inline-block text-muted">View the original ↗</span>
              </ZoomButton>
            </figcaption>
            <ol className="space-y-3 md:col-span-9">
              {costco.research.survey.rows.map((r, i) => (
                <Reveal as="li" key={r.label} delay={i * 0.03} className="grid grid-cols-[minmax(0,11rem)_1fr] items-center gap-4 sm:grid-cols-[14rem_1fr]">
                  <span className="text-right text-[0.92rem] leading-tight">{r.label}</span>
                  <span className="flex items-center gap-3">
                    <span className="block h-5 origin-left" style={{ width: `${(r.count / max) * 82}%`, background: r.label === "None" ? "#b9c3d3" : BLUE }} aria-hidden="true" />
                    <span className="meta shrink-0 whitespace-nowrap">
                      {r.count} <span className="text-muted">({r.pct})</span>
                    </span>
                  </span>
                </Reveal>
              ))}
            </ol>
          </figure>

          {/* competitive analysis, as a table */}
          <div className="mt-24 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="meta text-muted">Competitive analysis</p>
              <p className="mt-2 leading-snug">{costco.research.competitive.takeaway}</p>
              <ul className="meta mt-6 space-y-2 text-muted">
                {(["S", "P", "M"] as const).map((k) => (
                  <li key={k} className="flex items-center gap-2">
                    {MARK[k].el}
                    {MARK[k].label}
                  </li>
                ))}
              </ul>
              <ZoomButton index={competitiveOriginal} label="Original competitive analysis">
                <span className="meta wipe mt-6 inline-block text-muted">View the original ↗</span>
              </ZoomButton>
            </div>
            <div className="min-w-0 overflow-x-auto md:col-span-9">
              <table className="w-full min-w-[40rem] border-collapse text-left">
                <caption className="sr-only">Feature comparison of Costco and six grocery and retail apps</caption>
                <thead>
                  <tr className="border-b border-ink">
                    <th scope="col" className="meta py-3 pr-4 font-normal text-muted">
                      Feature
                    </th>
                    {costco.research.competitive.apps.map((a) => (
                      <th key={a} scope="col" className={`meta px-2 py-3 text-center font-normal ${a === "Costco" ? "text-white" : "text-muted"}`} style={a === "Costco" ? { background: BLUE } : undefined}>
                        {a}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {costco.research.competitive.rows.map((r) => (
                    <tr key={r.feature} className="border-b border-line">
                      <th scope="row" className="py-3 pr-4 text-[0.95rem] font-normal">
                        {r.feature}
                      </th>
                      {[...r.v].map((c, i) => {
                        const m = MARK[c as "S" | "P" | "M"];
                        const isCostco = i === r.v.length - 1;
                        return (
                          <td key={i} className={`px-2 py-3 text-center ${isCostco ? "bg-[#0050a0]/[0.07]" : ""}`}>
                            {m.el}
                            <span className="sr-only">{m.label}</span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        {/* ---------- 04 Opportunities ---------- */}
        <Section id="opportunities" n={4} label="Insights → opportunities" heading="What the research revealed — and what we did with it.">
          <ol className="border-t border-ink">
            {costco.insights.map((ins, i) => (
              <Reveal as="li" key={ins.title} className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-8">
                <span className="meta pt-2 text-muted md:col-span-1">{pad(i + 1)}</span>
                <div className="md:col-span-5">
                  <p className="display text-[clamp(1.8rem,2.8vw,2.6rem)] leading-tight">{ins.title}</p>
                  <p className="mt-2 text-[0.98rem] text-muted">{ins.detail}</p>
                </div>
                <div className="flex gap-4 md:col-span-6">
                  <span className="pt-1 text-[1.4rem]" style={{ color: RED }} aria-hidden="true">
                    →
                  </span>
                  <div>
                    <p className="text-[1.1rem] leading-snug">{ins.opportunity}</p>
                    <a href={`#f-${ins.feature}`} className="meta wipe mt-3 inline-block text-muted">
                      See: {ins.featureLabel}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Section>

        {/* ---------- 05 Exploration ---------- */}
        <Section id="exploration" n={5} label="Exploration" heading="Structure before polish." tone="blush">
          <Reveal className="grid gap-4 md:grid-cols-12">
            <p className="max-w-[54ch] text-[1.1rem] leading-relaxed md:col-span-8 md:col-start-4">{costco.exploration}</p>
          </Reveal>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {sketches.map((s, k) => (
              <Reveal key={s.src} delay={k * 0.08} className={k === 1 ? "sm:mt-16" : ""}>
                <figure>
                  <ZoomButton index={sketchIdx[k]} label={`Sketch — ${s.label}`}>
                    <Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="(min-width: 640px) 30vw, 90vw" className={`h-auto w-full bg-white shadow-[0_24px_40px_-26px_rgba(37,37,34,0.5)] ${k === 0 ? "-rotate-1" : k === 2 ? "rotate-1" : ""}`} />
                  </ZoomButton>
                  <figcaption className="mt-4">
                    <p className="meta text-muted">
                      Sketch {pad(k + 1)} — {s.label}
                    </p>
                    <p className="mt-1 text-[0.95rem] leading-snug">{s.note}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <p className="meta mt-28 text-muted">From sketch to screen</p>
          <div className="mt-6 grid gap-12 md:grid-cols-2">
            {progression.map((p) => (
              <Reveal key={p.label} className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-t border-ink/30 pt-6">
                <ZoomButton index={sketchIdx[p.sketch]} label={`Sketch — ${p.label}`}>
                  <Image src={sketches[p.sketch].src} alt={sketches[p.sketch].alt} width={654} height={930} sizes="20vw" className="h-auto w-full bg-white" />
                </ZoomButton>
                <span className="text-[1.4rem]" style={{ color: RED }} aria-hidden="true">
                  →
                </span>
                <Shot s={p.final.s} index={p.final.i} />
                <p className="meta col-span-3 text-muted">{p.label}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---------- The redesign: four features ---------- */}
        <div className="mx-auto max-w-[1600px] px-5 pt-28 sm:px-8 md:pt-40 xl:pl-56">
          <p className="meta text-muted">06 — The redesign</p>
          <SplitHeading as="h2" label="Four places where the app changed." className="display mt-4 max-w-[18ch] text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.92]" lines={["Four places where", <em key="c">the app changed.</em>]} />
        </div>

        {/* 01 Landing */}
        <section id="f-landing" aria-labelledby="f-landing-h" className="scroll-mt-16 py-24 md:py-32">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 xl:pl-56">
            <FeatureHead f={fx.landing} />
            <div className="mt-14 grid gap-14 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Annotated s={landing.main.s} index={landing.main.i} notes={fx.landing.annotations} />
              </div>
              <div className="lg:col-span-5">
                <FeatureText f={fx.landing} />
              </div>
            </div>
            <div className="mt-16 grid items-start gap-12 sm:grid-cols-2 lg:grid-cols-12">
              <div className="lg:col-span-4 lg:col-start-3">
                <VideoPlayer {...recordings.landing} w={300} h={618} />
              </div>
              <Reveal className="lg:col-span-4">
                <Shot s={landing.more.s} index={landing.more.i} />
                <p className="meta mt-4 text-center text-muted">What’s new — stock status at a glance</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 02 Shop */}
        <section id="f-shop" aria-labelledby="f-shop-h" className="scroll-mt-16 bg-stone/70 py-24 md:py-32">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 xl:pl-56">
            <FeatureHead f={fx.shop} />
            <div className="mt-14 grid gap-14 lg:grid-cols-12">
              <div className="lg:order-2 lg:col-span-7">
                <Annotated s={shop[0].s} index={shop[0].i} notes={fx.shop.annotations} />
              </div>
              <div className="lg:order-1 lg:col-span-5">
                <FeatureText f={fx.shop} />
              </div>
            </div>
            <p className="meta mt-20 text-muted">The flow</p>
            <ol className="mt-6 grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
              {shop.map((p, i) => (
                <Reveal as="li" key={p.s.src} delay={i * 0.08}>
                  <p className="meta mb-3 text-muted">
                    Step {i + 1} — {p.s.label}
                  </p>
                  <Shot s={p.s} index={p.i} />
                </Reveal>
              ))}
              <li>
                <p className="meta mb-3 text-muted">Recording</p>
                <VideoPlayer {...recordings.shop} w={300} h={618} />
              </li>
            </ol>
          </div>
        </section>

        {/* 03 Warehouse — the most prominent showcase */}
        <section id="f-warehouse" aria-labelledby="f-warehouse-h" className="scroll-mt-16 py-24 text-white md:py-36" style={{ background: BLUE }}>
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 xl:pl-56">
            <FeatureHead f={fx.warehouse} dark />
            <div className="mt-14 grid gap-14 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="rounded-none">
                  <Annotated s={wh.main.s} index={wh.main.i} notes={fx.warehouse.annotations} dark />
                </div>
              </div>
              <div className="lg:col-span-5">
                <FeatureText f={fx.warehouse} dark />
              </div>
            </div>
            <div className="mt-20 grid grid-cols-2 items-start gap-6 sm:gap-8 md:grid-cols-4">
              {[
                { p: wh.lists, label: "Lists, orders and member deals" },
                { p: wh.details, label: "Directions, store map, department hours" },
                { p: wh.map, label: "Search the store map to pin an item" },
              ].map(({ p, label }, i) => (
                <Reveal key={p.s.src} delay={i * 0.08} className={i === 1 ? "md:mt-12" : ""}>
                  <Shot s={p.s} index={p.i} />
                  <p className="meta mt-4 text-center text-white/75">{label}</p>
                </Reveal>
              ))}
              <div className="[&_.meta]:text-white [&_button]:border-white/40">
                <VideoPlayer {...recordings.warehouse} w={300} h={618} />
              </div>
            </div>
          </div>
        </section>

        {/* 04 Product details & cart */}
        <section id="f-cart" aria-labelledby="f-cart-h" className="scroll-mt-16 py-24 md:py-32">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 xl:pl-56">
            <FeatureHead f={fx.cart} />
            <div className="mt-14 grid gap-14 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <FeatureText f={fx.cart} />
              </div>
              <div className="lg:col-span-7">
                <ol className="grid grid-cols-3 items-start gap-4 sm:gap-6">
                  {cart.map((p, i) => (
                    <Reveal as="li" key={p.s.src} delay={i * 0.08} className={i === 1 ? "mt-8" : i === 2 ? "mt-16" : ""}>
                      <p className="meta mb-3 text-muted">
                        {i + 1} — {p.s.label}
                      </p>
                      <Shot s={p.s} index={p.i} />
                    </Reveal>
                  ))}
                </ol>
              </div>
            </div>
            <div className="mt-16 grid gap-6 md:grid-cols-12">
              <p className="meta text-muted md:col-span-3">Recording — the path to checkout</p>
              <div className="md:col-span-4">
                <VideoPlayer {...recordings.cart} w={300} h={618} />
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 07 Reflection ---------- */}
        <Section id="reflection" n={7} label="Outcomes & reflection" tone="blush">
          <SplitHeading as="p" label={costco.reflection.lesson} className="display max-w-[20ch] text-[clamp(2.6rem,6vw,5.6rem)] leading-[0.95]" lines={["The biggest problems were", <em key="s">structural, not just visual.</em>]} />
          <div className="mt-14 grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-6 md:col-start-4">
              <p className="text-[1.1rem] leading-relaxed">{costco.reflection.text}</p>
            </Reveal>
          </div>
          <div className="mt-20 grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4 md:col-start-4">
              <p className="meta text-muted">My contributions</p>
              <ul className="mt-3 border-t border-ink">
                {costco.reflection.mine.map((m) => (
                  <li key={m} className="display border-b border-line py-3 text-[1.6rem]">
                    {m}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.92rem] text-muted">{costco.reflection.team}</p>
            </div>
            <div className="md:col-span-4">
              <p className="meta text-muted">What I’d do next</p>
              <ol className="mt-3 border-t border-ink">
                {costco.reflection.next.map((n, i) => (
                  <li key={n} className="flex gap-3 border-b border-line py-3 leading-snug">
                    <span className="meta pt-0.5" style={{ color: RED }}>
                      {pad(i + 1)}
                    </span>
                    {n}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Section>

        {/* ---------- Previous / next ---------- */}
        <aside className="mx-auto max-w-[1600px] px-5 pt-10 sm:px-8 xl:pl-56" aria-label="More projects">
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
