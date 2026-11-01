import { site } from "../../content.js";

/* Email, LinkedIn, GitHub, Resume. Missing ones are labelled, never linked. */
export function contactItems() {
  return [
    { label: "Email", href: site.email ? `mailto:${site.email}` : "", text: site.email },
    { label: "LinkedIn", href: site.linkedin, text: "LinkedIn profile", external: true },
    { label: "GitHub", href: site.github, text: "GitHub profile", external: true },
    { label: "Resume", href: site.resume, text: "Resume (PDF)", external: true },
  ];
}

export default function ContactList({ className = "" }) {
  return (
    <dl className={`grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-2.5 ${className}`}>
      {contactItems().map((item) => (
        <div key={item.label} className="contents">
          <dt className="font-mono text-sm text-muted">{item.label}</dt>
          <dd>
            {item.href ? (
              <a
                href={item.href}
                className="text-link"
                {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {item.text}
              </a>
            ) : (
              <span className="text-muted">Coming soon</span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
