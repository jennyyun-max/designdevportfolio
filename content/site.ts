/* ==================================================================
   SITE CONTENT — edit text, links and images here.
   Anything in [square brackets] is a placeholder.
   Leave a link as "" and the site labels it “coming soon” instead.
   ================================================================== */

export const site = {
  name: "Chloe Yun",
  // Used for SEO + link previews. On Vercel it's your production domain automatically;
  // set NEXT_PUBLIC_SITE_URL (e.g. "https://chloeyun.com") to override it.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  description:
    "Chloe Yun — University of Michigan School of Information student and designer at Atlas Digital, exploring the space between data, technology, and people.",

  /* CONTACT */
  email: "jennyyun@umich.edu",
  linkedin: "https://www.linkedin.com/in/chloejiwonyun/",
  github: "", // e.g. "https://github.com/your-handle" — hidden while empty
  resume: "https://drive.google.com/file/d/1TuOWojUzS8913IjWCzmtRsSBz-P08I8j/view?usp=sharing", // or "/resume.pdf" in /public
};

/* HOMEPAGE */
export const hero = {
  name: "Chloe Yun",
  disciplines: ["Design", "Technology", "Creative Exploration"],
  intro: "Former performer, now exploring the intersection of design and technology.",
  // Small metadata around the name
  detail: "University of Michigan School of Information · Designer with Atlas Digital",
  status: "", // e.g. "Open to internships · Summer 2027" — "" hides it
  // The Polaroids that the welcome's stars become → content/polaroids.ts
};

/* NAVIGATION — Contact jumps to the footer, which is on every page */
export const nav = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Playground", href: "/playground" },
  { label: "Visitors", href: "/visitors" },
  { label: "Contact", href: "#contact" },
] as const;

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

/* THE JOURNEY — the editorial timeline on the About page (/about#journey).
   Only what Chloe has shared; California has no archive photo yet (add one to `photos`). */
export const journey = [
  {
    key: "california",
    n: "01",
    place: "California",
    when: "Growing up",
    title: "Where it started",
    text: ["I grew up in California.", "Then my path took me across the Pacific — to Korea, and a stage."],
    photos: [] as { src: string; alt: string; caption: string; focus?: string }[],
  },
  {
    key: "seoul",
    n: "02",
    place: "Seoul, South Korea",
    when: "Five years on stage",
    title: "Five years with cignature",
    text: [
      "Before returning to school, I spent five years pursuing a professional career as a K-pop artist, including as a member of cignature.",
      "Working in entertainment taught me how much success depends on understanding people — audiences, teammates, feedback, timing, and communication.",
    ],
    photos: [
      { src: "/images/polaroids/aurora-portrait.jpg", alt: "Chloe in a pastel stage photoshoot", caption: "The stage years" },
      { src: "/images/polaroids/cignature-apple.jpg", alt: "Chloe in a photoshoot, holding an apple on a picnic blanket", caption: "Photoshoot", focus: "50% 40%" },
    ],
  },
  {
    key: "ann-arbor",
    n: "03",
    place: "Ann Arbor, Michigan",
    when: "Back to school",
    title: "Studying information",
    text: [
      "I came back to the United States and to school: the University of Michigan School of Information — Information Analysis, with a minor in Data Science.",
      "Data Science gave me a new way to understand the questions entertainment made me curious about — through patterns, evidence, systems, and structured problem solving.",
    ],
    photos: [{ src: "/images/projects/lumen/07-sketches.png", alt: "Early hand sketches of the LUMEN app", caption: "LUMEN — sketches", focus: "50% 60%" }],
  },
  {
    key: "now",
    n: "04",
    place: "Design & technology",
    when: "Now",
    title: "Designing with Atlas Digital",
    text: [
      "UX interests me because it sits between two worlds — analytical problem-solving and understanding people.",
      "With Atlas Digital, I’m the designer on a team building a Financial Model Knowledge Hub for Brookfield Renewable.",
    ],
    photos: [{ src: "/images/polaroids/chloe-portrait.jpg", alt: "Portrait of Chloe Yun", caption: "Today", focus: "50% 25%" }],
    link: { label: "Read the Brookfield case study", href: "/work/brookfield" },
  },
];
