/* Original five-petal “bloom” mark used as the site's signature. Decorative. */
export default function Bloom({ className = "", color = "var(--color-bloom)", center = "var(--color-butter)" }) {
  const petals = [0, 72, 144, 216, 288];
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      {petals.map((deg) => (
        <ellipse key={deg} cx="20" cy="10.5" rx="6" ry="9.5" fill={color} transform={`rotate(${deg} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="5" fill={center} stroke="var(--color-plum)" strokeWidth="1.2" />
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
