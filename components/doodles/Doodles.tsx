import type { SVGProps } from "react";

/* ==================================================================
   THE DOODLE KIT — every little illustration on the site comes from
   here, so they share one hand: an espresso pencil line (≈2px, round
   caps, slightly uneven curves) over soft pastel fills. 48 × 48 each.
   Used by the navigation rooms, stickers, guestbook stamps, the
   playground and floating decorations. Decorative: aria-hidden.
   ================================================================== */

const INK = "#3a2620";
const C = {
  blush: "#f2c4c0",
  pink: "#f8dedb",
  rose: "#c9736b",
  butter: "#f6e4a8",
  lavender: "#ddd4ef",
  sage: "#d3dfca",
  sky: "#cadded",
  peach: "#f4cdb6",
  paper: "#fffdf8",
};

type P = SVGProps<SVGSVGElement>;
function Svg({ children, ...props }: P) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
      {children}
    </svg>
  );
}

export const Heart = (p: P) => (
  <Svg {...p}>
    <path d="M24 39.5C14 32.6 7.6 26.4 8.3 18.6c.6-5.6 5.6-8.8 10.2-7.4 2.6.8 4.4 2.8 5.5 5 1.2-2.4 3.2-4.4 6-5 4.8-1 9.4 2.6 9.6 8 .2 7.6-6 13.4-15.6 20.3z" fill={C.blush} />
    <path d="M14.5 17.2c.6-1.6 2-2.6 3.4-2.8" stroke="#fff" strokeWidth={2.2} />
  </Svg>
);

export const Star = (p: P) => (
  <Svg {...p}>
    <path d="M24 6.8l4.7 10.3 11.1 1.1-8.4 7.5 2.5 11-9.9-5.8-9.8 5.9 2.3-11.1-8.5-7.4 11.2-1.2z" fill={C.butter} />
    <path d="M19 21.5c.6-.8 1.4-1.2 2.2-1.3" stroke="#fff" strokeWidth={2} />
  </Svg>
);

export const Sparkle = (p: P) => (
  <Svg {...p}>
    <path d="M24 5c1.4 9.6 4.4 13.2 14.6 15-10.2 1.9-13.2 5.4-14.6 15.4-1.5-10-4.5-13.5-14.6-15.4C19.6 18.2 22.6 14.6 24 5z" fill={C.butter} />
    <path d="M38.6 33.4c.5 3.2 1.4 4.3 4.6 4.8-3.2.6-4.1 1.7-4.6 4.9-.5-3.2-1.4-4.3-4.6-4.9 3.2-.5 4.1-1.6 4.6-4.8z" fill={C.blush} strokeWidth={1.6} />
  </Svg>
);

export const Flower = (p: P) => (
  <Svg {...p}>
    {[0, 72, 144, 216, 288].map((r) => (
      <ellipse key={r} cx="24" cy="13.6" rx="6.4" ry="8.6" fill={C.pink} transform={`rotate(${r} 24 24)`} />
    ))}
    <circle cx="24" cy="24" r="5.2" fill={C.butter} />
  </Svg>
);

export const Sun = (p: P) => (
  <Svg {...p}>
    <circle cx="24" cy="24" r="8.6" fill={C.butter} />
    <path d="M24 6.5v5M24 36.5v5M6.5 24h5M36.5 24h5M11.6 11.6l3.4 3.4M33 33l3.4 3.4M36.4 11.6L33 15M15 33l-3.4 3.4" />
  </Svg>
);

export const Palm = (p: P) => (
  <Svg {...p}>
    <path d="M22.6 42.5c.8-8 1.8-15.4 3.6-23" stroke="#a07d5c" strokeWidth={3.2} />
    <path d="M26.4 19.4c-4-4.6-9.6-5.2-14-2.4 4.8-.2 9 1 14 2.4zM26.4 19.4c-1.6-5.6-.2-10.4 4.4-12.6-2.2 4-3 8-4.4 12.6zM26.4 19.4c4.6-3.6 10-3.4 13.6.2-4.4-.6-8.6-.4-13.6-.2zM26.4 19.4c2.6 2.8 3.8 6.4 3.2 10-1.4-3.2-2.8-6.2-3.2-10z" fill={C.sage} />
    <path d="M10 42.5h28" />
  </Svg>
);

export const Wave = (p: P) => (
  <Svg {...p}>
    <path d="M5 28c4-4 7.8-4 11.6 0s7.8 4 11.6 0 7.8-4 11.6 0 4.6 3.4 4.6 3.4V41H5z" fill={C.sky} />
    <path d="M7 20c3-3 6-3 9 0M27 15c3-3 6-3 9 0" strokeWidth={1.8} />
  </Svg>
);

export const MusicNote = (p: P) => (
  <Svg {...p}>
    <path d="M19.4 34.6V11.8l17-4.2v22.6" />
    <path d="M19.4 17.2l17-4.2" />
    <ellipse cx="14.6" cy="35" rx="5.4" ry="4.2" fill={C.lavender} transform="rotate(-18 14.6 35)" />
    <ellipse cx="31.6" cy="30.6" rx="5.4" ry="4.2" fill={C.lavender} transform="rotate(-18 31.6 30.6)" />
  </Svg>
);

export const Mic = (p: P) => (
  <Svg {...p}>
    <path d="M22.4 22.4L11 39.8c-.8 1.2.6 2.6 1.8 1.8l17.4-11.4" fill={C.paper} />
    <circle cx="29.6" cy="18.4" r="9" fill={C.blush} />
    <path d="M24.6 13.6l10 10M28 10.6l9.4 9.4" strokeWidth={1.6} />
  </Svg>
);

export const Laptop = (p: P) => (
  <Svg {...p}>
    <path d="M10.6 12.2h26.8c1 0 1.6.6 1.6 1.6v17H9v-17c0-1 .6-1.6 1.6-1.6z" fill={C.paper} />
    <path d="M14 18h9M14 22.6h6M16.4 27h8" stroke={C.rose} />
    <rect x="27" y="17" width="7.4" height="9.4" rx="1.4" fill={C.butter} strokeWidth={1.6} />
    <path d="M5.2 30.8h37.6l-2.2 5.4H7.4z" fill={C.lavender} />
  </Svg>
);

export const Pencil = (p: P) => (
  <Svg {...p}>
    <path d="M30.8 8.8l8.4 8.4-21 21-10.6 2.2 2.2-10.6z" fill={C.butter} />
    <path d="M26.4 13.2l8.4 8.4M9.8 29.8l8.4 8.4" />
    <path d="M30.8 8.8l2.6-2.6c1-1 2.4-1 3.4 0l5 5c1 1 1 2.4 0 3.4l-2.6 2.6z" fill={C.blush} />
  </Svg>
);

export const Envelope = (p: P) => (
  <Svg {...p}>
    <rect x="6" y="12" width="36" height="25" rx="2.4" fill={C.paper} />
    <path d="M6.8 13.2L24 27l17.2-13.8" />
    <path d="M24 33.6c-3.2-2.2-5.2-4-5-6.2.2-1.6 1.6-2.4 2.8-2 .8.2 1.6 1 2.2 1.8.6-.8 1.4-1.6 2.4-1.8 1.4-.2 2.6.8 2.6 2.2 0 2.2-1.8 4-5 6z" fill={C.rose} stroke="none" />
  </Svg>
);

export const Camera = (p: P) => (
  <Svg {...p}>
    <path d="M8 15.4h8.6l3-4.6h8.8l3 4.6H40c1.2 0 2 .8 2 2v18.2c0 1.2-.8 2-2 2H8c-1.2 0-2-.8-2-2V17.4c0-1.2.8-2 2-2z" fill={C.pink} />
    <circle cx="24" cy="26" r="7.4" fill={C.paper} />
    <circle cx="24" cy="26" r="3.6" fill={C.lavender} />
    <path d="M35 20.4h2.4" />
  </Svg>
);

export const Plane = (p: P) => (
  <Svg {...p}>
    <path d="M5.6 23.4L41.4 9.2 33 39.4l-9.2-8.8z" fill={C.paper} />
    <path d="M41.4 9.2L23.8 30.6l-2 9.4-3.6-11.2" fill={C.sky} />
    <path d="M6 40c3-1 5-3 6.4-5.6" strokeDasharray="2.4 3.4" strokeWidth={1.6} />
  </Svg>
);

export const Sketchbook = (p: P) => (
  <Svg {...p}>
    <rect x="9.6" y="7" width="29" height="35" rx="2.6" fill={C.lavender} />
    <path d="M14.4 7v35" />
    <path d="M9.6 12.6h-3M9.6 19h-3M9.6 25.4h-3M9.6 31.8h-3M9.6 38.2h-3" strokeWidth={1.8} />
    <path d="M20 17.4c2.6-2.6 6.4-2.8 9-.2 2.6 2.6 2.4 6.4-.2 9-2.6 2.6-6.4 2.8-9 .2" fill={C.butter} strokeWidth={1.8} />
  </Svg>
);

export const PolaroidIcon = (p: P) => (
  <Svg {...p}>
    <rect x="9" y="6.8" width="30" height="35" rx="1.6" fill={C.paper} transform="rotate(-6 24 24)" />
    <rect x="12.6" y="10" width="22.6" height="20" fill={C.blush} transform="rotate(-6 24 24)" strokeWidth={1.6} />
    <path d="M17 26.6l5-5.4 3.6 3.6 3-2.6 4.2 4" transform="rotate(-6 24 24)" strokeWidth={1.6} />
    <circle cx="28.6" cy="15.4" r="2" fill={C.butter} strokeWidth={1.4} />
  </Svg>
);

export const MapPin = (p: P) => (
  <Svg {...p}>
    <path d="M24 42c-7.6-9.2-12.2-15.6-12.2-21.6C11.8 13.6 17.2 8 24 8s12.2 5.6 12.2 12.4c0 6-4.6 12.4-12.2 21.6z" fill={C.blush} />
    <circle cx="24" cy="20.4" r="4.6" fill={C.paper} />
  </Svg>
);

export const Bow = (p: P) => (
  <Svg {...p}>
    <path d="M24 22.6c-5.6-6.6-13-9.2-15.4-6.2-2.4 3 .8 9.8 6.6 12.2 3.4 1.4 6.6.6 8.8-6zM24 22.6c5.6-6.6 13-9.2 15.4-6.2 2.4 3-.8 9.8-6.6 12.2-3.4 1.4-6.6.6-8.8-6z" fill={C.pink} />
    <path d="M21.6 24.4L17 38.6M26.4 24.4L31 38.6" />
    <ellipse cx="24" cy="23.4" rx="3.4" ry="3.8" fill={C.blush} />
  </Svg>
);

export const Cloud = (p: P) => (
  <Svg {...p}>
    <path d="M13.6 34.6c-4.4 0-7.4-3-7.2-6.8.2-3.4 3-6 6.6-5.8.6-5.4 5-9.2 10.4-8.8 4.4.4 7.6 3.4 8.6 7.4 4.2-.4 8 2.6 8.2 6.8.2 4.2-3 7.2-7.4 7.2z" fill={C.paper} />
  </Svg>
);

export const Strawberry = (p: P) => (
  <Svg {...p}>
    <path d="M24 42c-8-4.4-13.8-11.8-13-18.6.6-4.6 4.4-7.2 8.2-6.8 1.8.2 3.4.8 4.8 1.8 1.4-1 3-1.6 4.8-1.8 3.8-.4 7.6 2.2 8.2 6.8.8 6.8-5 14.2-13 18.6z" fill={C.blush} />
    <path d="M16.4 17.2c2-3.4 5-4.6 7.6-3.6 2.6-1 5.6.2 7.6 3.6-2.6.6-5.2.4-7.6-.6-2.4 1-5 1.2-7.6.6zM24 13.6c0-2.6.6-4.8 2.4-6.4" fill={C.sage} />
    <path d="M18.8 25l.2 1.4M25 23.8l.2 1.4M29.6 28.4l.2 1.4M21.6 31.6l.2 1.4M26.6 34.4l.2 1.2" strokeWidth={2.2} />
  </Svg>
);

export const Ticket = (p: P) => (
  <Svg {...p}>
    <path d="M7 14h34v6.4c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6V34H7v-6.4c2 0 3.6-1.6 3.6-3.6S9 20.4 7 20.4z" fill={C.butter} />
    <path d="M30 14.6v18.8" strokeDasharray="2 3" strokeWidth={1.6} />
    <path d="M14 21h10M14 26.6h7" strokeWidth={1.8} />
  </Svg>
);

export const Coffee = (p: P) => (
  <Svg {...p}>
    <path d="M10.6 18.4h22.2v12.4c0 5-4 9-9 9h-4.2c-5 0-9-4-9-9z" fill={C.sky} />
    <path d="M32.8 22h2.4c2.6 0 4.4 2 4.4 4.4s-1.8 4.4-4.4 4.4h-2.6" />
    <path d="M10.6 24.4h22.2" stroke={C.butter} strokeWidth={3.2} />
    <path d="M17 12.6c-1.4-1.6.6-3 0-4.8M23.2 12.6c-1.4-1.6.6-3 0-4.8" strokeWidth={1.8} />
  </Svg>
);

/* Registry: used by sticker trays, stamps and the doodle picker */
export const doodles = {
  heart: Heart,
  star: Star,
  sparkle: Sparkle,
  flower: Flower,
  sun: Sun,
  palm: Palm,
  wave: Wave,
  note: MusicNote,
  mic: Mic,
  laptop: Laptop,
  pencil: Pencil,
  envelope: Envelope,
  camera: Camera,
  plane: Plane,
  sketchbook: Sketchbook,
  polaroid: PolaroidIcon,
  pin: MapPin,
  bow: Bow,
  cloud: Cloud,
  strawberry: Strawberry,
  ticket: Ticket,
  coffee: Coffee,
} as const;

export type DoodleName = keyof typeof doodles;

export function Doodle({ name, ...props }: { name: DoodleName } & P) {
  const D = doodles[name];
  return <D {...props} />;
}
