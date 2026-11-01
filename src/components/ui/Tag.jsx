export default function Tag({ children, className = "" }) {
  return (
    <span className={`inline-block rounded-[var(--radius-sm)] border border-rule bg-window px-2 py-0.5 font-mono text-xs leading-snug text-muted ${className}`}>
      {children}
    </span>
  );
}
