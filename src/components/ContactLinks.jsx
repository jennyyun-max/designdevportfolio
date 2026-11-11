import { site } from "../content.js";

/* Email, LinkedIn, GitHub, Résumé as pills. Missing ones are labelled “soon”, never linked. */
export const contactItems = () => [
  { label: "Email", href: site.email ? `mailto:${site.email}` : "", text: site.email || "Email" },
  { label: "LinkedIn", href: site.linkedin, text: "LinkedIn ↗", external: true },
  { label: "GitHub", href: site.github, text: "GitHub ↗", external: true },
  { label: "Résumé", href: site.resume, text: "Résumé ↗", external: true },
];

export default function ContactLinks({ className = "" }) {
  return (
    <ul className={`flex flex-wrap justify-center gap-3 ${className}`}>
      {contactItems().map((item, i) => (
        <li key={item.label}>
          {item.href ? (
            <a
              href={item.href}
              className={`inline-flex rounded-full px-5 py-2.5 text-[0.9375rem] font-semibold transition-colors ${
                i === 0 ? "bg-plum text-shell hover:bg-[#54404a]" : "border border-plum hover:bg-blush"
              }`}
              {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {item.text}
            </a>
          ) : (
            <span className="inline-flex rounded-full border border-dashed border-plum-soft px-5 py-2.5 text-[0.9375rem] font-semibold text-plum-soft">
              {item.label} · soon
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
