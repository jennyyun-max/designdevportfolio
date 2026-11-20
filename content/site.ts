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
    "Chloe Yun — Information Analysis / Data Science student at the University of Michigan, exploring the space between data, technology, and people.",

  /* CONTACT */
  email: "jennyyun@umich.edu",
  linkedin: "https://www.linkedin.com/in/chloejiwonyun/",
  github: "", // e.g. "https://github.com/your-handle" — hidden while empty
  resume: "https://drive.google.com/file/d/1TuOWojUzS8913IjWCzmtRsSBz-P08I8j/view?usp=sharing", // or "/resume.pdf" in /public
};

/* Wrap a word in *asterisks* to set it in the italic accent font. */
export const hero = {
  eyebrow: "data ✦ product ✦ people",
  headline: "hi, i’m *chloe*!",
  text: "I’m an Information Analysis / Data Science student at the University of Michigan with experience across AI research, technology, operations, and entertainment.",
  status: "", // e.g. "open to internships · summer 2027" — "" hides it
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
  heading: "exploring the space between *data*, technology, and people",
  paragraphs: [
    "My path into technology has been a little unconventional. I’m an Information Analysis / Data Science student at the University of Michigan, but before returning to school, I spent five years in the K-pop industry as a member of the girl group cignature.",
    "Working in entertainment taught me to think deeply about audiences, communication, feedback, and collaboration — experiences that now influence how I approach technology and human-centered problem solving.",
    "My work in data and AI has taught me another side of problem-solving: breaking complex problems into pieces, testing assumptions, iterating, and using evidence to make decisions.",
    "UX interests me because it sits between those two worlds — analytical problem-solving and understanding people. I’m excited to bring that perspective to Atlas Digital while learning more about user research, product thinking, and design.",
  ],
  photo: { src: "/images/about/chloe.jpg", alt: "Portrait of Chloe Yun", caption: "" },
  philosophy: [
    { title: "Research + *analysis*", text: "Break complex problems into pieces, test assumptions, and use evidence to decide." },
    { title: "Creative *thinking*", text: "Years on stage taught me to notice how people react and what resonates." },
    { title: "*Collaborative*", text: "Music, choreography, production — great work comes from many teams toward one outcome." },
  ],
  interests: ["user research", "product thinking", "data & AI", "information visualization", "human behavior"],
  offTheClock: "Outside of school you’ll find me doing Pilates, reading, playing board games with friends, or watching soccer.",
};
