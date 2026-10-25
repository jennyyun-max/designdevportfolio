/* Image with a fixed aspect ratio. Falls back to a plain pastel block
   (labelled “Placeholder”) when no src is provided. */
export default function Figure({ src, alt = "", aspect = "aspect-[4/3]", className = "" }) {
  if (!src) {
    return (
      <div className={`relative bg-lilac ${aspect} ${className}`} role="img" aria-label="Placeholder image">
        <span className="absolute left-3 top-3 bg-paper px-2 py-0.5 text-xs uppercase tracking-[0.08em]">
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
      className={`w-full bg-rule object-cover ${aspect} ${className}`}
    />
  );
}
