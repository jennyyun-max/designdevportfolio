/* ------------------------------------------------------------------
   ABOUT PAGE CONTENT — everything on /about is edited here.

   Images: put files in /public/images/about/ and reference them as "/images/about/<file>".
   If an image src is "", a built-in placeholder is shown instead.
   Contact links (email, LinkedIn, resume) live in src/content.js → site.
   ------------------------------------------------------------------ */

export const aboutPage = {
  intro: {
    headline: "I’m Chloe — exploring how people, data, and design connect.",

    // TODO: replace these filler paragraphs with your own story.
    paragraphs: [
      "I’m Chloe Yun, a student at the University of Michigan majoring in Information Analysis with a minor in Data Science. [Filler] This is where a short story about what first got you curious about design could go — a moment, a class, or a product that made you look twice at how things work.",
      "[Filler] A second paragraph can connect that curiosity to how you work today: asking questions, looking for patterns, and trying to understand the people behind the numbers before deciding what to design.",
      "[Filler] A short closing paragraph can share what you’re looking for next — the kinds of problems, teams, or opportunities you’d like to learn from.",
    ],

    // Real details, shown as a small list under the bio
    facts: [
      { term: "University", value: "University of Michigan" },
      { term: "Major", value: "Information Analysis" },
      { term: "Minor", value: "Data Science" },
    ],

    // TODO: replace with your portrait, e.g. "/images/about/portrait.jpg" (4:5 works best)
    portrait: {
      src: "/images/about/placeholder-portrait.svg",
      alt: "Portrait placeholder",
    },
  },

  involvement: {
    label: "Experience & Involvement",
    heading: "[Filler] Where I’ve been learning, building, and collaborating.",

    // TODO: replace each entry. Images are 4:3; description is optional ("" hides it).
    // When you add a real photo, also describe it in alt (e.g. "Team workshop at …").
    entries: [
      {
        role: "[Role title]",
        organization: "[Organization name]",
        description: "[Optional] One short sentence about what you did or learned.",
        image: { src: "/images/about/placeholder-involvement-1.svg", alt: "" },
      },
      {
        role: "[Role title]",
        organization: "[Organization name]",
        description: "[Optional] One short sentence about what you did or learned.",
        image: { src: "/images/about/placeholder-involvement-2.svg", alt: "" },
      },
      {
        role: "[Role title]",
        organization: "[Organization name]",
        description: "",
        image: { src: "/images/about/placeholder-involvement-3.svg", alt: "" },
      },
    ],
  },

  values: {
    label: "My core values",
    // TODO: these are sample values; edit freely.
    items: [
      {
        title: "Stay curious.",
        text: "[Filler] Ask one more question before settling on an answer.",
      },
      {
        title: "Create with intention.",
        text: "[Filler] Every choice in a design should have a reason behind it.",
      },
      {
        title: "Understand people first.",
        text: "[Filler] Good design starts with listening, not with pixels.",
      },
    ],
  },

  /* Closing message shown in the footer on this page */
  closing: {
    heading: "Thanks for stopping by.",
    text: "[Filler] I hope you leave with a little curiosity — I’d love to hear from you.",
  },
};
