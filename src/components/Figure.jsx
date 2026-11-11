/* Image with a fixed aspect ratio. Falls back to a plain pastel block
   (labelled “Placeholder”) when no src is provided. */
export default function Figure({ src, alt = "", aspect = "aspect-[4/3]", className = "" }) {
  if (!src) {
    return (
      <div className={`relative rounded-[var(--radius-card)] bg-lilac ${aspect} ${className}`} role="img" aria-label="Placeholder image">
        <span className="absolute left-4 top-4 rounded-full bg-shell px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em]">
          Placeholder
        </span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`w-full rounded-[var(--radius-card)] bg-line object-cover ${aspect} ${className}`}
    />
  );
}
