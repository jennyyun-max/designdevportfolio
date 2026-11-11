/* Chloe’s signature mark: a small, friendly potato. Decorative.
   `look` shifts the pupils (−1…1); `happy` swaps in squinty ^ ^ eyes. */
export default function Potato({
  className = "",
  look = { x: 0, y: 0 },
  happy = false,
}: {
  className?: string;
  look?: { x: number; y: number };
  happy?: boolean;
}) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <path
        d="M6.5 22.5C4.8 14.6 11 7.4 20 6.6c9.2-.8 15.4 5 14.6 13.2-.8 8.6-7.6 14.2-16.2 14.2-6.6 0-11-4-11.9-11.5z"
        fill="#e7c69a"
        stroke="var(--espresso)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M11.5 14.2l1.6.6M28.6 28.4l1.2-1.2M30.4 12.6l-.4 1.6" stroke="#a9825a" strokeWidth="1.4" strokeLinecap="round" />
      {happy ? (
        <path d="M14.4 20.2l1.8-1.8 1.8 1.8M22.8 19.6l1.8-1.8 1.8 1.8" fill="none" stroke="var(--espresso)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <>
          <circle cx={16.2 + look.x} cy={19.6 + look.y} r="1.5" fill="var(--espresso)" />
          <circle cx={24.6 + look.x} cy={19 + look.y} r="1.5" fill="var(--espresso)" />
        </>
      )}
      {happy ? (
        <path d="M18.2 23c1.2 2.2 3.8 2.2 5-.2" fill="var(--espresso)" stroke="var(--espresso)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M18.6 23.4c1.2 1.3 3 1.3 4.2-.1" fill="none" stroke="var(--espresso)" strokeWidth="1.4" strokeLinecap="round" />
      )}
      <ellipse cx="12.8" cy="23.2" rx="2.1" ry="1.3" fill="var(--blush)" />
      <ellipse cx="28.2" cy="22.4" rx="2.1" ry="1.3" fill="var(--blush)" />
    </svg>
  );
}

export function Sparkle({ className = "", color = "var(--rose)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M12 1c.9 6 5 10.1 11 11-6 .9-10.1 5-11 11-.9-6-5-10.1-11-11 6-.9 10.1-5 11-11z" fill={color} />
    </svg>
  );
}
