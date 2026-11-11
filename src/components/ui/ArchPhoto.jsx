/* Photo in a soft arch frame. Empty src = labelled placeholder. */
export default function ArchPhoto({ src, alt = "", caption, tone = "bg-blush", className = "" }) {
  return (
    <figure className={className}>
      <div className={`overflow-hidden rounded-t-full rounded-b-[var(--radius-card)] border border-plum/15 ${tone}`}>
        {src ? (
          <img src={src} alt={alt} className="aspect-[4/5] w-full object-cover" />
        ) : (
          <div className="grid aspect-[4/5] w-full place-items-center" role="img" aria-label="Photo placeholder">
            <span className="rounded-full bg-shell px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em]">Photo</span>
          </div>
        )}
      </div>
      {caption && <figcaption className="mt-2 text-center text-sm text-plum-soft">{caption}</figcaption>}
    </figure>
  );
}
