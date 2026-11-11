/* ==================================================================
   SITE CONTENT — edit text, links and images here.
   Anything in [square brackets] is a placeholder.
   Leave a link as "" and the site labels it “coming soon” instead.
   ================================================================== */

export const site = {
  name: "Chloe Yun",
  // Used for SEO + link previews. Set to your deployed URL once you have one.
  url: "https://example.com",
  description:
    "Chloe Yun — aspiring UX & product designer. Information Analysis student at the University of Michigan School of Information.",

  /* CONTACT */
  email: "", // e.g. "chloe@example.com"
  linkedin: "", // e.g. "https://www.linkedin.com/in/your-handle"
  github: "", // e.g. "https://github.com/your-handle"
  resume: "", // e.g. "/resume.pdf" (put the PDF in /public)
};

/* Wrap a word in *asterisks* to set it in the italic accent font. */
export const hero = {
  eyebrow: "UX & product design · University of Michigan",
  headline: "hi, i’m *chloe*!",
  text: "an aspiring UX & product designer who loves turning complex problems into thoughtful, human-centered experiences.",
  status: "open to internships · [season & year]", // "" hides it
  // Hero photos are the falling polaroids → content/polaroids.ts
};

export const marquee = [
  "user research",
  "product design",
  "data analysis",
  "prototyping",
  "information visualization",
  "pilates",
  "board games",
  "soccer",
  "good books",
];

export const about = {
  heading: "where *people*, data, and design meet",
  paragraphs: [
    "I’m Chloe — a junior at the University of Michigan School of Information, studying Information Analysis with a minor in Data Science.",
    "I’m drawn to design because it sits right between creativity and technology. I like starting with people — listening, observing, asking better questions — and then using data and craft to shape something that feels clear and kind to use.",
  ],
  photo: { src: "", alt: "Photo of Chloe Yun", caption: "[your photo]" },
  philosophy: [
    { title: "Start with *people*", text: "Understand the humans and their context before deciding what to make." },
    { title: "Let data *guide*", text: "Use evidence to see patterns clearly — and stay honest about what it can’t say." },
    { title: "Craft with *care*", text: "Small details add up to experiences that feel thoughtful." },
  ],
  interests: ["user research", "interaction design", "data-informed design", "information visualization", "prototyping"],
  offTheClock: "Outside of design you’ll find me doing Pilates, reading, playing board games with friends, or watching soccer.",
};
