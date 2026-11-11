import { Link } from "react-router-dom";
import Tag from "./ui/Tag.jsx";
import Thumbnail from "./Thumbnail.jsx";

/* Editorial project row: big image + details. The whole row is one link.
   `flip` alternates the image side on large screens. */
export default function ProjectCard({ project, index, flip = false }) {
  const { slug, title, category, description, role, tools } = project;
  return (
    <Link to={`/work/${slug}`} className="group grid items-center gap-6 lg:grid-cols-2 lg:gap-14">
      <div className={`overflow-hidden rounded-[var(--radius-card)] border border-plum/10 ${flip ? "lg:order-2" : ""}`}>
        <Thumbnail project={project} className="zoom-on-hover" />
      </div>
      <div className={flip ? "lg:order-1" : ""}>
        <div className="flex items-center gap-3">
          <span className="serif-italic text-3xl leading-none text-bloom" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <Tag>{category}</Tag>
        </div>
        <h3 className="display mt-4 text-[clamp(2rem,4vw,3rem)] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-8">
          {title}
        </h3>
        <p className="mt-4 max-w-[30rem] text-lg leading-relaxed text-plum-soft">{description}</p>
        <dl className="mt-5 grid max-w-[30rem] grid-cols-[4rem_1fr] gap-x-4 gap-y-1 border-t border-line pt-4 text-[0.9375rem]">
          <dt className="eyebrow leading-6">Role</dt>
          <dd>{role}</dd>
          <dt className="eyebrow leading-6">Tools</dt>
          <dd>{tools.join(", ")}</dd>
        </dl>
        <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-plum px-5 py-2.5 text-[0.9375rem] font-semibold transition-colors group-hover:bg-plum group-hover:text-shell">
          view case study <span aria-hidden="true">↗</span>
        </span>
      </div>
    </Link>
  );
}
