export default function StickyNote({ children, tilt = 0, className = "" }) {
  return (
    <aside
      aria-label="Note"
      className={`border border-ink bg-butter p-4 font-mono text-[0.8125rem] leading-relaxed shadow-[var(--shadow-window)] ${className}`}
      style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined }}
    >
      <span className="mb-1 block text-xs uppercase tracking-[0.1em] text-muted">note</span>
      {children}
    </aside>
  );
}
