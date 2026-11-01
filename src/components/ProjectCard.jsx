import { Link } from "react-router-dom";
import Tag from "./ui/Tag.jsx";
import Thumbnail from "./Thumbnail.jsx";

/* A project “file”: window chrome, thumbnail, and the essentials.
   The whole card is one link to the project page. */
export default function ProjectCard({ project }) {
  const { slug, title, category, description, role, tools } = project;
  return (
    <Link
      to={`/work/${slug}`}
      className="lift group flex h-full flex-col overflow-hidden rounded-[var(--radius-window)] border border-ink bg-window shadow-[var(--shadow-window)]"
    >
      <div className="flex h-9 items-center justify-between border-b border-ink bg-window px-3 font-mono text-[0.8125rem]">
        <span className="truncate">{slug}/</span>
        <span aria-hidden="true" className="text-muted group-hover:text-ink">open →</span>
      </div>
      <Thumbnail project={project} className="border-b border-ink" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Tag className="self-start">{category}</Tag>
        <h3 className="font-subheading text-xl leading-snug group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
          {title}
        </h3>
        <p className="text-[0.9375rem] leading-relaxed text-muted">{description}</p>
        <dl className="mt-auto grid grid-cols-[3.5rem_1fr] gap-x-3 gap-y-1 border-t border-rule pt-3 text-sm">
          <dt className="font-mono text-xs leading-5 text-muted">Role</dt>
          <dd>{role}</dd>
          <dt className="font-mono text-xs leading-5 text-muted">Tools</dt>
          <dd>{tools.join(", ")}</dd>
        </dl>
      </div>
    </Link>
  );
}
