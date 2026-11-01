/* Original line icons for the desktop. Decorative unless labelled. */
const INK = "#2a2723";

export function FileGlyph({ className = "" }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
      <path d="M3 1.5h6.5L13 5v9.5H3z" fill="none" stroke={INK} strokeWidth="1.3" />
      <path d="M9.5 1.5V5H13" fill="none" stroke={INK} strokeWidth="1.3" />
    </svg>
  );
}

const fills = {
  marigold: "#f0c35a",
  sage: "#c4d6bb",
  peach: "#f1d0c2",
  lilac: "#dcd6ef",
  butter: "#f5e6b3",
  sky: "#c5d8e8",
};

export function FolderIcon({ tone = "marigold", className = "" }) {
  return (
    <svg viewBox="0 0 64 52" className={className} aria-hidden="true" focusable="false">
      <path d="M3 9a3 3 0 0 1 3-3h17l5 6h30a3 3 0 0 1 3 3v31a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" fill={fills[tone]} stroke={INK} strokeWidth="2" />
      <path d="M3 18h58" stroke={INK} strokeWidth="2" />
    </svg>
  );
}

export function DocIcon({ tone = "sky", lines = 4, className = "" }) {
  return (
    <svg viewBox="0 0 48 60" className={className} aria-hidden="true" focusable="false">
      <path d="M4 3h28l12 12v42H4z" fill="#fffcf6" stroke={INK} strokeWidth="2" />
      <path d="M32 3v12h12" fill={fills[tone]} stroke={INK} strokeWidth="2" />
      {Array.from({ length: lines }).map((_, i) => (
        <path key={i} d={`M11 ${26 + i * 7}h${i % 2 ? 18 : 26}`} stroke={INK} strokeWidth="2" opacity="0.55" />
      ))}
    </svg>
  );
}

export function CardIcon({ tone = "peach", className = "" }) {
  return (
    <svg viewBox="0 0 64 46" className={className} aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="58" height="40" rx="3" fill={fills[tone]} stroke={INK} strokeWidth="2" />
      <circle cx="18" cy="20" r="6" fill="none" stroke={INK} strokeWidth="2" />
      <path d="M10 34c2-6 14-6 16 0M33 16h20M33 23h16M33 30h12" stroke={INK} strokeWidth="2" fill="none" />
    </svg>
  );
}

export function PhotoIcon({ tone = "lilac", className = "" }) {
  return (
    <svg viewBox="0 0 60 56" className={className} aria-hidden="true" focusable="false">
      <rect x="9" y="3" width="44" height="44" fill="#fffcf6" stroke={INK} strokeWidth="2" transform="rotate(8 31 25)" />
      <rect x="5" y="7" width="44" height="46" fill="#fffcf6" stroke={INK} strokeWidth="2" />
      <rect x="10" y="12" width="34" height="28" fill={fills[tone]} stroke={INK} strokeWidth="1.5" />
      <path d="M10 36l9-9 7 6 6-5 12 9" fill="none" stroke={INK} strokeWidth="1.5" />
    </svg>
  );
}

/* Small decorative stickers */
export function Sticker({ kind, className = "" }) {
  const common = { className, "aria-hidden": true, focusable: "false" };
  if (kind === "sparkle")
    return (
      <svg viewBox="0 0 40 40" {...common}>
        <path d="M20 3c2 10 7 15 17 17-10 2-15 7-17 17-2-10-7-15-17-17 10-2 15-7 17-17z" fill="#f0c35a" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  if (kind === "chart")
    return (
      <svg viewBox="0 0 48 44" {...common}>
        <rect x="2" y="2" width="44" height="40" rx="8" fill="#fffcf6" stroke={INK} strokeWidth="2" />
        <rect x="10" y="24" width="6" height="11" fill="#c4d6bb" stroke={INK} strokeWidth="1.5" />
        <rect x="21" y="14" width="6" height="21" fill="#f1d0c2" stroke={INK} strokeWidth="1.5" />
        <rect x="32" y="19" width="6" height="16" fill="#c5d8e8" stroke={INK} strokeWidth="1.5" />
      </svg>
    );
  // heart
  return (
    <svg viewBox="0 0 40 36" {...common}>
      <path d="M20 33S3 22 3 11a8 8 0 0 1 17-4 8 8 0 0 1 17 4c0 11-17 22-17 22z" fill="#f1d0c2" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
