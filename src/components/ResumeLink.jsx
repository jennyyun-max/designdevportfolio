import { site } from "../content.js";

/* Renders a real link only when a resume is configured in content.js */
export default function ResumeLink({ className = "" }) {
  if (site.resume) {
    return (
      <a href={site.resume} target="_blank" rel="noreferrer" className={className}>
        Resume
      </a>
    );
  }
  return (
    <span className={`text-muted ${className}`} title="Resume coming soon">
      Resume <span className="text-xs">(soon)</span>
    </span>
  );
}
