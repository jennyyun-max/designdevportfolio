import Image from "next/image";
import type { Project } from "@/lib/types";

/* ==================================================================
   PROJECT COVERS — art-directed together for the Work page.
   Each cover is composed from the project's own, authentic assets
   (app screens, dashboards, charts, photos) on a palette background —
   no title slides, nothing generated. Square corners, one shared frame
   per tier. On hover the layers drift a little (not with reduced motion).
   ================================================================== */

const L = "/images/projects/lumen/screens";
const C = "/images/projects/costco/media";
const drift = "transition-transform duration-[900ms] ease-[var(--ease-out-expo)] motion-reduce:transition-none";

/* One layer: an image placed in % of the cover */
function Layer({
  src,
  w,
  h,
  alt = "",
  className,
  style,
  sizes,
  priority,
  shadow = "drop-shadow-[0_22px_28px_rgba(37,37,34,0.22)]",
}: {
  src: string;
  w: number;
  h: number;
  alt?: string;
  className: string;
  style?: React.CSSProperties;
  sizes: string;
  priority?: boolean;
  shadow?: string;
}) {
  return (
    <div className={`absolute ${drift} ${className}`} style={style}>
      <Image src={src} alt={alt} width={w} height={h} sizes={sizes} priority={priority} className={`block h-auto w-full ${shadow}`} />
    </div>
  );
}

function Lumen({ priority }: { priority?: boolean }) {
  // five real screens, fanned; the home screen leads
  const screens = [
    { n: "map-filters", x: 6, y: 18, w: 17, lift: "group-hover:-translate-y-[3%]" },
    { n: "lineup", x: 21, y: 11, w: 18.5, lift: "group-hover:-translate-y-[5%]" },
    { n: "home", x: 39, y: 5, w: 21.5, lift: "group-hover:-translate-y-[6%]", front: true },
    { n: "artist-detail", x: 60, y: 11, w: 18.5, lift: "group-hover:-translate-y-[5%]" },
    { n: "wallet", x: 77, y: 18, w: 17, lift: "group-hover:-translate-y-[3%]" },
  ];
  return (
    <div className="absolute inset-0 bg-[#f4e1e3]">
      <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[#ecd0d4]" aria-hidden="true" />
      {screens.map((s) => (
        <Layer
          key={s.n}
          src={`${L}/${s.n}.webp`}
          w={972}
          h={2113}
          sizes="(min-width: 1024px) 22vw, 30vw"
          priority={priority}
          className={`${s.lift} ${s.front ? "z-10" : ""}`}
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.w}%` }}
          shadow="drop-shadow-[0_26px_30px_rgba(105,73,88,0.28)]"
        />
      ))}
    </div>
  );
}

function Costco({ priority }: { priority?: boolean }) {
  return (
    <div className="absolute inset-0 bg-[#e4eaf4]">
      <span className="absolute left-[8%] top-[9%] h-px w-[14%] bg-[#c8102e]" aria-hidden="true" />
      <Layer src={`${C}/landing-home.webp`} w={300} h={618} sizes="(min-width: 768px) 14vw, 30vw" priority={priority} className="group-hover:-translate-y-[2%]" style={{ left: "12%", top: "20%", width: "26%" }} shadow="drop-shadow-[0_24px_28px_rgba(19,52,102,0.3)]" />
      <Layer src={`${C}/warehouse-home.webp`} w={300} h={618} sizes="(min-width: 768px) 16vw, 34vw" priority={priority} className="z-10 group-hover:-translate-y-[4%]" style={{ left: "36%", top: "10%", width: "29%" }} shadow="drop-shadow-[0_28px_32px_rgba(19,52,102,0.34)]" />
      <Layer src={`${C}/cart-delivery.webp`} w={300} h={618} sizes="(min-width: 768px) 14vw, 30vw" priority={priority} className="group-hover:-translate-y-[2%]" style={{ left: "62%", top: "20%", width: "26%" }} shadow="drop-shadow-[0_24px_28px_rgba(19,52,102,0.3)]" />
    </div>
  );
}

function Brookfield({ priority }: { priority?: boolean }) {
  return (
    <div className="absolute inset-0 bg-[#efe8de]">
      {/* the dashboard, large, bleeding off the right edge */}
      <Layer src="/images/projects/brookfield/dashboard.webp" w={1440} h={1229} sizes="(min-width: 768px) 40vw, 90vw" priority={priority} className="group-hover:-translate-x-[1.5%]" style={{ left: "14%", top: "12%", width: "100%" }} shadow="shadow-[0_24px_50px_-24px_rgba(58,38,32,0.45)]" />
      {/* the conflicting-IRR card, the product's key idea, floating in front */}
      <Layer src="/images/projects/brookfield/irr-detail.webp" w={438} h={181} sizes="(min-width: 768px) 18vw, 50vw" priority={priority} className="z-10 group-hover:-translate-y-[6%]" style={{ left: "6%", top: "58%", width: "44%" }} shadow="shadow-[0_26px_40px_-18px_rgba(58,38,32,0.5)]" />
    </div>
  );
}

function Data() {
  return (
    <div className="absolute inset-0 bg-[#f3ece2]">
      <Layer src="/images/projects/data-analysis/unesco-map.webp" w={2000} h={1152} sizes="(min-width: 1024px) 26vw, 80vw" className="group-hover:-translate-y-[2%]" style={{ left: "7%", top: "10%", width: "72%" }} shadow="shadow-[0_18px_36px_-22px_rgba(58,38,32,0.45)]" />
      <Layer src="/images/projects/data-analysis/web-traffic.webp" w={1866} h={790} sizes="(min-width: 1024px) 22vw, 70vw" className="z-10 group-hover:-translate-y-[6%]" style={{ left: "33%", top: "56%", width: "60%" }} shadow="shadow-[0_22px_40px_-20px_rgba(58,38,32,0.5)]" />
    </div>
  );
}

function Kpop() {
  // typographic on purpose: no performer photos — a spotlight (the stage) giving way to a dot grid (the data)
  return (
    <div className="absolute inset-0 bg-[#f1dadd]">
      <div className={`absolute left-[-12%] top-[-30%] aspect-square w-[62%] rounded-full bg-[radial-gradient(circle,#fbf1f2_0%,#f6e3e6_45%,transparent_70%)] group-hover:translate-x-[4%] ${drift}`} aria-hidden="true" />
      <div
        className={`absolute bottom-[10%] right-[6%] h-[46%] w-[44%] opacity-70 group-hover:-translate-y-[4%] ${drift}`}
        style={{ backgroundImage: "radial-gradient(#694958 1.4px, transparent 1.6px)", backgroundSize: "14px 14px" }}
        aria-hidden="true"
      />
      <p className="display absolute left-[8%] top-1/2 -translate-y-1/2 text-[clamp(2rem,4.2vw,3.6rem)] leading-[0.92] text-[#694958]" aria-hidden="true">
        From stage
        <br />
        <em>to data</em>
      </p>
    </div>
  );
}

function Nuseum() {
  return (
    <div className="absolute inset-0 bg-[#ece2d2]">
      <Layer src="/images/projects/nuseum/logo.webp" w={600} h={600} sizes="(min-width: 1024px) 8vw, 24vw" className="group-hover:rotate-[8deg]" style={{ left: "8%", top: "12%", width: "20%" }} shadow="drop-shadow-[0_14px_18px_rgba(58,38,32,0.25)]" />
      {/* the four-step "How NUSEUM AI works" diagram */}
      <Layer src="/images/projects/nuseum/cover.webp" w={2000} h={800} sizes="(min-width: 1024px) 28vw, 90vw" className="group-hover:-translate-y-[4%]" style={{ left: "8%", top: "44%", width: "92%" }} shadow="shadow-[0_22px_40px_-22px_rgba(58,38,32,0.5)]" />
    </div>
  );
}

const COVERS: Record<string, (p: { priority?: boolean }) => React.ReactElement> = {
  lumen: Lumen,
  "costco-redesign": Costco,
  brookfield: Brookfield,
  "data-analysis": Data,
  "kpop-to-data": Kpop,
  nuseum: Nuseum,
};

/* The cover for a project; falls back to its cover image */
export default function Cover({ project, aspect, priority = false }: { project: Project; aspect: string; priority?: boolean }) {
  const Comp = COVERS[project.slug];
  return (
    <div role="img" aria-label={coverAlt[project.slug] ?? project.cover.alt} className={`relative w-full overflow-hidden bg-stone ${aspect}`}>
      {Comp ? (
        <Comp priority={priority} />
      ) : (
        <Image src={project.cover.src} alt="" fill sizes="50vw" className="object-cover" />
      )}
    </div>
  );
}

/* What each composition shows, for screen readers */
const coverAlt: Record<string, string> = {
  lumen: "Five LUMEN app screens: map, lineup, home, artist and wallet",
  "costco-redesign": "Three redesigned Costco app screens: landing, My Warehouse and cart",
  brookfield: "Brookfield Knowledge Hub dashboard with the card flagging two different IRR values",
  "data-analysis": "UNESCO World Heritage map visualization and a web traffic dashboard",
  "kpop-to-data": "Typographic cover: From stage to data",
  nuseum: "NUSEUM logo and the How NUSEUM AI works diagram: capture, structure, safety check, personalize",
};
