import PlaceholderVisual from "./PlaceholderVisual.jsx";

const toneBg = {
  sage: "bg-sage",
  peach: "bg-peach",
  lilac: "bg-lilac",
  butter: "bg-butter",
};

export default function ProjectCard({ project }) {
  const { title, description, tags, href, image, visual, tone, featured } = project;
  const aspect = featured ? "aspect-[4/3] md:aspect-[21/9]" : "aspect-[4/3]";

  const media = (
    <div className={`overflow-hidden ${toneBg[tone] ?? "bg-rule"} ${aspect}`}>
      {image ? (
        <img src={image} alt="" className="h-full w-full object-cover" />
      ) : (
        <PlaceholderVisual variant={visual} tone={tone} />
      )}
    </div>
  );

  return (
    <article className="group">
      {href ? (
        <a href={href} className="block" aria-label={`${title} — view case study`}>
          {media}
        </a>
      ) : (
        media
      )}

      <div className="mt-5 flex flex-col gap-3 md:max-w-[40rem]">
        <ul className="flex flex-wrap gap-2" aria-label="Project type and skills">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-sm border border-rule px-2 py-0.5 text-[0.8125rem] leading-snug text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
        <h3 className="font-subheading text-2xl leading-tight">
          {href ? (
            <a href={href} className="hover:underline underline-offset-4 decoration-1">
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        <p className="text-muted">{description}</p>
        {href ? (
          <a href={href} className="text-link self-start">
            View case study <span aria-hidden="true">→</span>
          </a>
        ) : (
          <p className="text-sm text-muted">Case study coming soon</p>
        )}
      </div>
    </article>
  );
}
