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
    "Chloe Yun — University of Michigan School of Information student and designer at Atlas Digital, exploring the space between data, technology, and people.",

  /* CONTACT */
  email: "jennyyun@umich.edu",
  linkedin: "https://www.linkedin.com/in/chloejiwonyun/",
  github: "", // e.g. "https://github.com/your-handle" — hidden while empty
  resume: "https://drive.google.com/file/d/1TuOWojUzS8913IjWCzmtRsSBz-P08I8j/view?usp=sharing", // or "/resume.pdf" in /public
};

/* Wrap a word in *asterisks* to set it in the italic accent font. */
export const hero = {
  eyebrow: "UX & product design · University of Michigan",
  headline: "hi, i’m *chloe*!",
  text: "I’m exploring the intersection of creativity, design, and technology — studying information at the University of Michigan and designing with Atlas Digital.",
  status: "", // e.g. "open to internships · summer 2027" — "" hides it
  // The falling Polaroids → content/polaroids.ts
};

/* THE ROOMS — the five places in Chloe’s world. Used by the header, the mobile menu,
   the homepage “doors” and the footer. `doodle` is a name from components/doodles. */
export const rooms = [
  { key: "work", label: "my work", href: "/work", doodle: "sketchbook", tone: "var(--lavender)", blurb: "case studies, from research to the final screens" },
  { key: "about", label: "about me", href: "/about", doodle: "polaroid", tone: "var(--blush)", blurb: "a scrapbook of who I am and what I’m building" },
  { key: "journey", label: "my journey", href: "/journey", doodle: "plane", tone: "var(--sky)", blurb: "california → seoul → ann arbor" },
  { key: "playground", label: "playground", href: "/playground", doodle: "star", tone: "var(--butter)", blurb: "a camera, stickers and a doodle pad" },
  { key: "guestbook", label: "guestbook", href: "/guestbook", doodle: "envelope", tone: "var(--sage)", blurb: "leave a little note in my scrapbook" },
] as const;

export type RoomKey = (typeof rooms)[number]["key"];

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
  heading: "Between *data*, technology, and people",
  paragraphs: [
    "My path into technology has been a little unconventional. I’m an Information Analysis / Data Science student at the University of Michigan, but before returning to school, I spent five years in the K-pop industry as a member of the girl group cignature.",
    "Working in entertainment taught me to think deeply about audiences, communication, feedback, and collaboration — experiences that now influence how I approach technology and human-centered problem solving.",
    "My work in data and AI has taught me another side of problem-solving: breaking complex problems into pieces, testing assumptions, iterating, and using evidence to make decisions.",
    "UX interests me because it sits between those two worlds — analytical problem-solving and understanding people. That’s the perspective I bring to my design work at Atlas Digital while I keep learning about user research, product thinking, and design.",
  ],
  photo: { src: "/images/about/chloe.jpg", alt: "Portrait of Chloe Yun", caption: "" },
  philosophy: [
    { title: "Research + analysis", text: "Break complex problems into pieces, test assumptions, and use evidence to decide." },
    { title: "Creative thinking", text: "Years on stage taught me to notice how people react and what resonates." },
    { title: "Collaborative", text: "Music, choreography, production — great work comes from many teams toward one outcome." },
  ],
  interests: ["user research", "product thinking", "data & AI", "information visualization", "human behavior"],
  offTheClock: "Outside of school you’ll find me doing Pilates, reading, playing board games with friends, or watching soccer.",
};

/* ABOUT PAGE (/about) — the fuller story, in chapters. */
export const story = {
  heading: "From stage to *screen*",
  lead: "My path into technology has been a little unconventional. Before returning to school, I spent five years in the K-pop industry as a member of the girl group cignature. Now I study information at the University of Michigan and design with Atlas Digital.",
  chapters: [
    {
      label: "On stage",
      title: "Five years with cignature",
      text: [
        "Before returning to school, I spent five years pursuing a professional career as a K-pop artist, including as a member of cignature.",
        "Working in entertainment taught me how much success depends on understanding people — audiences, teammates, feedback, timing, and communication.",
      ],
      images: [
        { src: "/images/projects/kpop-to-data/sweetie-but-saltie.webp", alt: "cignature lying in a circle holding telephones", caption: "Sweetie but Saltie" },
        { src: "/images/projects/kpop-to-data/my-little-aurora.webp", alt: "cignature in pink stage outfits", caption: "My Little Aurora" },
      ],
    },
    {
      label: "What carried over",
      title: "Different field. Same core skills.",
      points: [
        { title: "Audience", text: "Performing taught me to pay attention to how people react, what resonates, and how small changes can shape an experience." },
        { title: "Feedback", text: "I became comfortable receiving constant feedback, adjusting quickly, and improving under pressure." },
        { title: "Collaboration", text: "Music, choreography, content, styling, production, and promotion all required working across teams toward one shared outcome." },
        { title: "Adaptability", text: "Live performances and fast-moving schedules taught me to stay calm, react quickly, and keep moving when plans changed." },
      ],
    },
    {
      label: "Back to school",
      title: "Studying information at Michigan",
      text: [
        "I’m a student at the University of Michigan School of Information, studying Information Analysis with a minor in Data Science.",
        "Data Science gave me a new way to understand the questions entertainment made me curious about — why people respond differently to the same thing, how feedback changes decisions — through patterns, evidence, systems, and structured problem solving.",
        "My work in data and AI has taught me another side of problem-solving: breaking complex problems into pieces, testing assumptions, iterating, and using evidence to make decisions.",
      ],
    },
    {
      label: "Now",
      title: "Designing with Atlas Digital",
      text: [
        "UX interests me because it sits between those two worlds — analytical problem-solving and understanding people.",
        "With Atlas Digital, I’m the designer on a team building a Financial Model Knowledge Hub for Brookfield Renewable: one searchable source of truth for 100+ Excel deal models, where every number is traced back to the cell it came from.",
      ],
      link: { label: "Read the Brookfield case study", href: "/work/brookfield" },
    },
  ],
};

/* MY JOURNEY — the three chapters, used by the About timeline and the Journey room.
   California details are limited to what Chloe has shared (she grew up there). */
export const journey = [
  {
    key: "california",
    place: "California",
    when: "growing up",
    doodle: "palm",
    tone: "var(--butter)",
    title: "Where it started",
    text: [
      "I grew up in California.",
      "Then my path took me all the way across the Pacific — to Korea, and a stage.",
    ],
  },
  {
    key: "seoul",
    place: "Seoul, South Korea",
    when: "five years on stage",
    doodle: "mic",
    tone: "var(--blush)",
    title: "Five years with cignature",
    text: [
      "Before returning to school, I spent five years pursuing a professional career as a K-pop artist, including as a member of cignature.",
      "Working in entertainment taught me how much success depends on understanding people — audiences, teammates, feedback, timing, and communication.",
    ],
    carried: ["Audience", "Feedback", "Collaboration", "Adaptability"],
  },
  {
    key: "ann-arbor",
    place: "Ann Arbor, Michigan",
    when: "now",
    doodle: "laptop",
    tone: "var(--lavender)",
    title: "Back to school — and designing",
    text: [
      "I came back to the United States and to school: I study at the University of Michigan School of Information — Information Analysis, with a minor in Data Science.",
      "UX interests me because it sits between two worlds — analytical problem-solving and understanding people. With Atlas Digital, I’m the designer on a team building a Financial Model Knowledge Hub for Brookfield Renewable.",
    ],
    link: { label: "Read the Brookfield case study", href: "/work/brookfield" },
  },
] as const;
