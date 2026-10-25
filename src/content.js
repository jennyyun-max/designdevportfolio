/* ------------------------------------------------------------------
   All editable site content lives here.
   ------------------------------------------------------------------ */

export const site = {
  name: "Chloe Yun",

  /* CONFIGURE: contact links.
     Leave a value as "" to hide it. Nothing here is a real link until you fill it in. */
  email: "", // e.g. "chloe@example.com"
  linkedin: "", // e.g. "https://www.linkedin.com/in/your-handle"
  resume: "", // e.g. "/resume.pdf" (put the file in /public) or a full URL

  /* Shown under “Let’s connect.” in the footer on every page */
  contactText: "I’d love to connect about design, opportunities, or interesting ideas.",
};

export const intro = {
  headline: "Hi, I’m Chloe!",
  text: "I study Information Analysis with a minor in Data Science at the University of Michigan. I’m interested in designing thoughtful digital experiences through research, creativity, and data.",
};

/* Projects
   - title, description, tags: shown on the card
   - href: link to the case study. Leave "" to show “Case study coming soon”.
   - image: path to a cover image (e.g. "/projects/my-project.jpg" in /public).
            Leave "" to use the abstract placeholder.
   - visual: which placeholder pattern to draw ("bars" | "circles" | "frames")
   - tone: pastel accent for the placeholder ("sage" | "peach" | "lilac" | "butter")
   - featured: spans the full width on desktop */
export const projects = [
  {
    title: "Project One",
    description:
      "Placeholder — a one-sentence summary of the problem you explored and the design you created.",
    tags: ["UX Research", "Product Design"],
    href: "",
    image: "",
    visual: "frames",
    tone: "lilac",
    featured: true,
  },
  {
    title: "Project Two",
    description:
      "Placeholder — a one-sentence summary of how data informed this design.",
    tags: ["Data Visualization", "UI Design"],
    href: "",
    image: "",
    visual: "bars",
    tone: "sage",
  },
  {
    title: "Project Three",
    description:
      "Placeholder — a one-sentence summary of who you designed for and what you made.",
    tags: ["User Interviews", "Prototyping"],
    href: "",
    image: "",
    visual: "circles",
    tone: "peach",
  },
];

/* Short About section on the homepage (the full page is in aboutContent.js) */
export const about = {
  paragraphs: [
    "I’m Chloe, an Information Analysis student at the University of Michigan with a minor in Data Science.",
    "I’m drawn to UI/UX design because it sits where understanding people meets working with information. I like starting with research to learn what people actually need, using data to see patterns more clearly, and bringing creativity to shape experiences that feel considered and easy to use.",
  ],
};
