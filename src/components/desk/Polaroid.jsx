/* Photo with a white border and caption. Empty src = labelled placeholder. */
export default function Polaroid({ src, alt = "", caption, tilt = 0, className = "" }) {
  return (
    <figure
      className={`w-full border border-ink bg-window p-2.5 pb-3 shadow-[var(--shadow-window)] ${className}`}
      style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined }}
    >
      {src ? (
        <img src={src} alt={alt} className="aspect-square w-full object-cover" />
      ) : (
        <div className="grid aspect-square w-full place-items-center bg-lilac" role="img" aria-label="Photo placeholder">
          <span className="bg-window px-1.5 py-0.5 font-mono text-[0.6875rem] uppercase tracking-wider">Photo</span>
        </div>
      )}
      {caption && <figcaption className="mt-2 text-center font-mono text-xs text-muted">{caption}</figcaption>}
    </figure>
  );
}
