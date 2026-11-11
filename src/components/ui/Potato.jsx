/* The site's signature mark: a small, friendly potato. Decorative. */
export default function Potato({ className = "" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <path
        d="M6.5 22.5C4.8 14.6 11 7.4 20 6.6c9.2-.8 15.4 5 14.6 13.2-.8 8.6-7.6 14.2-16.2 14.2-6.6 0-11-4-11.9-11.5z"
        fill="#e7c69a"
        stroke="var(--color-plum)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* potato “eyes” (the little spots) */}
      <path d="M11.5 14.2l1.6.6M28.6 28.4l1.2-1.2M30.4 12.6l-.4 1.6" stroke="#a9825a" strokeWidth="1.4" strokeLinecap="round" />
      {/* face */}
      <circle cx="16.2" cy="19.6" r="1.5" fill="var(--color-plum)" />
      <circle cx="24.6" cy="19" r="1.5" fill="var(--color-plum)" />
      <path d="M18.6 23.4c1.2 1.3 3 1.3 4.2-.1" fill="none" stroke="var(--color-plum)" strokeWidth="1.4" strokeLinecap="round" />
      <ellipse cx="12.8" cy="23.2" rx="2.1" ry="1.3" fill="var(--color-rose)" />
      <ellipse cx="28.2" cy="22.4" rx="2.1" ry="1.3" fill="var(--color-rose)" />
    </svg>
  );
}

export function Sparkle({ className = "", color = "var(--color-plum)" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M12 1c.9 6 5 10.1 11 11-6 .9-10.1 5-11 11-.9-6-5-10.1-11-11 6-.9 10.1-5 11-11z" fill={color} />
    </svg>
  );
}
