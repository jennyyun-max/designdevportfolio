import { Link } from "react-router-dom";
import { about, personal, site } from "../../content.js";
import Polaroid from "./Polaroid.jsx";
import ContactList from "./ContactList.jsx";

/* The windows that desktop icons open. On small screens the same content
   is shown as stacked panels (see OnMyDesk). Positions are for desktop only. */

function AboutContent() {
  return (
    <div className="space-y-4">
      <p>{about.paragraphs[0]}</p>
      <dl className="grid grid-cols-[6rem_1fr] gap-y-1.5 text-[0.9375rem]">
        {about.education.details.slice(0, 3).map(({ term, value }) => (
          <div key={term} className="contents">
            <dt className="font-mono text-sm text-muted">{term}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <Link to="/about" className="text-link inline-block font-mono text-sm">
        Read more about me →
      </Link>
    </div>
  );
}

function PhotosContent() {
  return (
    <div>
      <ul className="grid grid-cols-3 gap-3">
        {personal.photos.map((photo, i) => (
          <li key={i}>
            <Polaroid {...photo} tilt={[-2, 1.5, -1][i % 3]} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FavoritesContent() {
  return (
    <div>
      <p className="text-[0.9375rem]">{personal.intro}</p>
      <dl className="mt-4 divide-y divide-rule border-y border-rule">
        {personal.favorites.map(({ label, value }) => (
          <div key={label} className="flex justify-between gap-4 py-2">
            <dt className="font-mono text-sm text-muted">{label}</dt>
            <dd className="text-right">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ContactContent() {
  return (
    <div className="space-y-4">
      <p className="text-[0.9375rem]">Happy to chat about internships, projects, or interesting data.</p>
      <ContactList />
    </div>
  );
}

function ResumeContent() {
  return site.resume ? (
    <div className="space-y-3">
      <p>My resume is available as a PDF.</p>
      <a href={site.resume} target="_blank" rel="noreferrer" className="text-link font-mono text-sm">
        Open resume (PDF) →
      </a>
    </div>
  ) : (
    <p className="text-muted">Resume coming soon.</p>
  );
}

export const deskWindows = [
  { id: "about", title: "about.txt", icon: "doc", tone: "sky", width: 380, x: 600, y: 36, Content: AboutContent },
  { id: "photos", title: "photos/", icon: "photo", tone: "lilac", width: 420, x: 540, y: 120, Content: PhotosContent },
  { id: "favorites", title: "favorites.list", icon: "doc", tone: "sage", width: 360, x: 620, y: 200, Content: FavoritesContent },
  { id: "contact", title: "contact.card", icon: "card", tone: "peach", width: 380, x: 580, y: 160, Content: ContactContent },
  { id: "resume", title: "resume.pdf", icon: "doc", tone: "butter", width: 300, x: 660, y: 260, Content: ResumeContent },
];
