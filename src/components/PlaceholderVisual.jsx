/* Abstract placeholder art for projects without a cover image.
   Drawn on an 800×600 canvas; key shapes stay inside y 140–460 so the
   wide (21:9) featured crop still shows the whole composition. */

const INK = "#2b2a28";
const PAPER = "#fbfaf7";

function Frames() {
  return (
    <g>
      {/* desktop screen */}
      <rect x="170" y="150" width="440" height="290" fill={PAPER} stroke={INK} strokeWidth="2" />
      <line x1="170" y1="182" x2="610" y2="182" stroke={INK} strokeWidth="2" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={188 + i * 14} cy="166" r="4" fill={INK} opacity="0.35" />
      ))}
      <rect x="198" y="210" width="180" height="16" fill={INK} opacity="0.85" />
      <rect x="198" y="240" width="250" height="8" fill={INK} opacity="0.2" />
      <rect x="198" y="256" width="220" height="8" fill={INK} opacity="0.2" />
      <rect x="198" y="290" width="120" height="120" fill={INK} opacity="0.08" />
      <rect x="334" y="290" width="120" height="120" fill={INK} opacity="0.08" />
      <rect x="470" y="290" width="112" height="120" fill={INK} opacity="0.08" />
      {/* phone screen */}
      <rect x="560" y="230" width="110" height="215" fill={PAPER} stroke={INK} strokeWidth="2" />
      <rect x="576" y="252" width="60" height="10" fill={INK} opacity="0.85" />
      <rect x="576" y="272" width="78" height="6" fill={INK} opacity="0.2" />
      <rect x="576" y="284" width="66" height="6" fill={INK} opacity="0.2" />
      <rect x="576" y="304" width="78" height="96" fill={INK} opacity="0.08" />
      <rect x="590" y="418" width="50" height="12" fill="none" stroke={INK} strokeWidth="1.5" />
    </g>
  );
}

function Bars() {
  const heights = [120, 180, 150, 230, 200, 270, 245];
  const base = 440;
  return (
    <g>
      <line x1="170" y1={base} x2="630" y2={base} stroke={INK} strokeWidth="2" />
      {[200, 280, 360].map((y) => (
        <line key={y} x1="170" y1={y} x2="630" y2={y} stroke={INK} strokeWidth="1" opacity="0.15" />
      ))}
      {heights.map((h, i) => (
        <rect
          key={i}
          x={196 + i * 62}
          y={base - h}
          width="34"
          height={h}
          fill={i % 2 ? INK : PAPER}
          stroke={INK}
          strokeWidth="2"
          opacity={i % 2 ? 0.85 : 1}
        />
      ))}
      <polyline
        points={heights.map((h, i) => `${213 + i * 62},${base - h - 24}`).join(" ")}
        fill="none"
        stroke={INK}
        strokeWidth="2"
        strokeDasharray="4 6"
      />
      {heights.map((h, i) => (
        <circle key={i} cx={213 + i * 62} cy={base - h - 24} r="5" fill={PAPER} stroke={INK} strokeWidth="2" />
      ))}
    </g>
  );
}

function Circles() {
  return (
    <g>
      {Array.from({ length: 5 }).flatMap((_, r) =>
        Array.from({ length: 4 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={150 + c * 26} cy={200 + r * 50} r="4" fill={INK} opacity="0.3" />
        ))
      )}
      <circle cx="350" cy="275" r="100" fill={PAPER} fillOpacity="0.7" stroke={INK} strokeWidth="2" />
      <circle cx="470" cy="275" r="100" fill={PAPER} fillOpacity="0.7" stroke={INK} strokeWidth="2" />
      <circle cx="410" cy="365" r="100" fill={PAPER} fillOpacity="0.7" stroke={INK} strokeWidth="2" />
      <circle cx="410" cy="305" r="9" fill={INK} />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="580" y1={190 + i * 22} x2={680 - i * 18} y2={190 + i * 22} stroke={INK} strokeWidth="2" opacity="0.5" />
      ))}
    </g>
  );
}

const variants = { frames: Frames, bars: Bars, circles: Circles };

export default function PlaceholderVisual({ variant = "frames" }) {
  const Art = variants[variant] ?? Frames;
  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <Art />
      </svg>
      <span className="absolute left-3 top-3 bg-paper px-2 py-0.5 text-xs uppercase tracking-[0.08em] text-ink">
        Placeholder
      </span>
    </div>
  );
}
