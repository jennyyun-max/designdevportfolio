/* ==================================================================
   ALL SITE CONTENT LIVES IN THIS FILE.

   Anything in [square brackets] is a placeholder — replace it.
   Leave a link as "" to hide it; the site labels it “coming soon”
   instead of showing a broken link.

   Images go in /public/images/... and are referenced as "/images/...".
   An empty image src shows a labelled placeholder.
   ================================================================== */

/* ---------- Site-wide ---------- */
export const site = {
  name: "Chloe Yun",
  // Shown in the browser tab and link previews
  description:
    "Chloe Yun — Information Analysis student at the University of Michigan School of Information. Projects, analysis, and a little about me.",

  /* CONTACT — fill these in. "" = shown as “coming soon”. */
  email: "", // e.g. "chloe@example.com"
  linkedin: "", // e.g. "https://www.linkedin.com/in/your-handle"
  github: "", // e.g. "https://github.com/your-handle"
  resume: "", // e.g. "/resume.pdf" (put the PDF in /public)
};

/* ---------- Home ---------- */
export const home = {
  greeting: "Hi, I’m Chloe.",
  intro:
    "I’m a junior at the University of Michigan School of Information, studying Information Analysis with a minor in Data Science. I’m interested in how data and research can help people understand things more clearly.",
  // Small status line under the intro. "" hides it.
  status: "Looking for internships · [season & year]",

  // Sticky note on the desktop
  note: "[A short note to visitors — e.g. what you’re learning or curious about right now.]",

  // Photo corner on the desktop
  photo: { src: "", alt: "", caption: "[your photo]" },

  // Small decorative stickers on the desktop. Set to false to hide them.
  stickers: true,
};

/* ---------- Projects ----------
   Each project gets a card on the homepage and a page at /work/<slug>.
   - visual / tone: placeholder thumbnail art used when thumbnail.src is ""
       visual: "bars" | "circles" | "frames"
       tone:   "sage" | "peach" | "lilac" | "butter" | "sky"
   - links: code/demo links. Empty href = not shown.
   - sections: the project page. Any section can be removed or reordered.
       Each section can have: paragraphs, points (numbered), images,
       chart ({ title, caption, data: [{ label, value }] }), code ({ label, href }).
*/
export const projects = [
  {
    slug: "project-one",
    title: "[Project One]",
    category: "[Category — e.g. Data analysis]",
    description: "[One sentence: the question you explored and what you found or made.]",
    role: "[Your role]",
    tools: ["[Tool]", "[Tool]", "[Tool]"],
    timeline: "[e.g. 6 weeks, Fall 2026]",
    team: "[e.g. Solo, or 4 students]",
    thumbnail: { src: "", alt: "" },
    visual: "bars",
    tone: "sage",
    links: [
      { label: "Code on GitHub", href: "" },
      { label: "Notebook", href: "" },
    ],
    summary:
      "[Two sentences: what this project is, who or what it was for, and what you produced.]",
    sections: [
      {
        id: "question",
        label: "The question",
        heading: "[The problem or question, in one clear sentence.]",
        paragraphs: [
          "[Why did this question matter, and to whom? Describe the context you were given or observed.]",
        ],
      },
      {
        id: "data",
        label: "Data & research",
        heading: "[What you worked with.]",
        paragraphs: [
          "[Describe the dataset or research methods: where the data came from, its size and shape, and any cleaning you did.]",
        ],
        points: [
          "[Source — e.g. public dataset, survey, interviews]",
          "[Scope — e.g. time range, number of records or participants]",
          "[Cleaning or preparation step]",
        ],
      },
      {
        id: "process",
        label: "Process",
        heading: "[How you approached it.]",
        paragraphs: [
          "[Walk through your analysis or research steps — exploration, modeling, visualizing, testing.]",
        ],
        images: [
          { src: "", alt: "", caption: "[Screenshot of an exploration step]" },
          { src: "", alt: "", caption: "[Screenshot of a draft visualization]" },
        ],
        code: { label: "View the analysis code", href: "" },
      },
      {
        id: "decisions",
        label: "Key decisions",
        heading: "[Choices that shaped the outcome.]",
        points: [
          "[Decision — and why you made it]",
          "[Decision — and the trade-off you accepted]",
        ],
      },
      {
        id: "results",
        label: "Results",
        heading: "[What you found or delivered.]",
        paragraphs: ["[Summarize the outcome. Only include numbers you can support.]"],
        chart: {
          title: "[Chart title]",
          caption: "Sample data — replace with your own values.",
          data: [
            { label: "[A]", value: 42 },
            { label: "[B]", value: 28 },
            { label: "[C]", value: 17 },
            { label: "[D]", value: 9 },
          ],
        },
      },
      {
        id: "limitations",
        label: "Limitations",
        heading: "[What this project can’t tell us.]",
        paragraphs: ["[Note gaps in the data, assumptions, or things you’d verify next.]"],
      },
      {
        id: "reflection",
        label: "Reflection",
        heading: "[What I learned.]",
        paragraphs: ["[What would you do differently? What skill did this project grow?]"],
      },
    ],
  },
  {
    slug: "project-two",
    title: "[Project Two]",
    category: "[Category — e.g. User research]",
    description: "[One sentence describing the project.]",
    role: "[Your role]",
    tools: ["[Tool]", "[Tool]"],
    timeline: "[Timeline]",
    team: "[Team]",
    thumbnail: { src: "", alt: "" },
    visual: "circles",
    tone: "peach",
    links: [{ label: "Code on GitHub", href: "" }],
    summary: "[Two sentences summarizing the project.]",
    sections: placeholderSections(),
  },
  {
    slug: "project-three",
    title: "[Project Three]",
    category: "[Category — e.g. Visualization]",
    description: "[One sentence describing the project.]",
    role: "[Your role]",
    tools: ["[Tool]", "[Tool]"],
    timeline: "[Timeline]",
    team: "[Team]",
    thumbnail: { src: "", alt: "" },
    visual: "frames",
    tone: "sky",
    links: [{ label: "Live demo", href: "" }],
    summary: "[Two sentences summarizing the project.]",
    sections: placeholderSections(),
  },
];

/* Short filler used by Projects Two and Three.
   Replace `placeholderSections()` with your own list, like Project One. */
function placeholderSections() {
  return [
    { id: "question", label: "The question", heading: "[The problem or question.]", paragraphs: ["[Context.]"] },
    { id: "data", label: "Data & research", heading: "[What you worked with.]", paragraphs: ["[Sources and methods.]"] },
    { id: "process", label: "Process", heading: "[How you approached it.]", paragraphs: ["[Steps you took.]"] },
    { id: "decisions", label: "Key decisions", heading: "[Choices that mattered.]", points: ["[Decision and why.]"] },
    { id: "results", label: "Results", heading: "[Outcome.]", paragraphs: ["[What you found or delivered.]"] },
    { id: "limitations", label: "Limitations", heading: "[What it can’t tell us.]", paragraphs: ["[Gaps and assumptions.]"] },
    { id: "reflection", label: "Reflection", heading: "[What I learned.]", paragraphs: ["[Takeaways.]"] },
  ];
}

/* ---------- About ---------- */
export const about = {
  headline: "A little about me.",
  paragraphs: [
    "I’m Chloe Yun, a junior at the University of Michigan School of Information. I study Information Analysis with a minor in Data Science.",
    "[A paragraph about what draws you to working with information — the kinds of questions you like, and how you like to work.]",
  ],
  photo: { src: "", alt: "", caption: "[your photo]" },
  education: {
    school: "University of Michigan",
    unit: "School of Information",
    details: [
      { term: "Year", value: "Junior" },
      { term: "Major", value: "Information Analysis" },
      { term: "Minor", value: "Data Science" },
      { term: "Coursework", value: "[Relevant courses]" },
    ],
  },
  interests: [
    "Data analysis",
    "Research",
    "Information visualization",
    "[Another interest]",
  ],
};

/* ---------- Personal (“off the clock”) ---------- */
export const personal = {
  intro: "Outside of class you’ll probably find me doing Pilates, reading, playing board games with friends, or watching soccer.",
  // Up to 3 photos. Empty src = labelled placeholder.
  photos: [
    { src: "", alt: "", caption: "[photo caption]" },
    { src: "", alt: "", caption: "[photo caption]" },
    { src: "", alt: "", caption: "[photo caption]" },
  ],
  favorites: [
    { label: "Reading", value: "[a book you loved]" },
    { label: "Board game", value: "[your favorite]" },
    { label: "Soccer", value: "[team or player]" },
    { label: "Currently", value: "[something you’re into]" },
  ],
  // Optional creative work. Empty list hides the section.
  creative: [],
};
