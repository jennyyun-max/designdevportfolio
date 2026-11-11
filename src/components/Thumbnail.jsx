import PlaceholderVisual from "./PlaceholderVisual.jsx";

export const toneBg = {
  sage: "bg-sage",
  peach: "bg-peach",
  lilac: "bg-lilac",
  butter: "bg-butter",
  sky: "bg-sky",
  rose: "bg-rose",
  blush: "bg-blush",
};

/* Project thumbnail: real image if provided, otherwise abstract placeholder art */
export default function Thumbnail({ project, aspect = "aspect-[4/3]", className = "" }) {
  const { thumbnail, visual, tone } = project;
  return (
    <div className={`overflow-hidden ${toneBg[tone] ?? "bg-line"} ${aspect} ${className}`}>
      {thumbnail?.src ? (
        <img src={thumbnail.src} alt={thumbnail.alt} className="h-full w-full object-cover" />
      ) : (
        <PlaceholderVisual variant={visual} />
      )}
    </div>
  );
}
