/* ------------------------------------------------------------------
   All About-page copy and images live here.
   Images go in /public/about/ and are referenced as "/about/<file>".
   Leave a src as "" and the layout adapts (placeholder or hidden).
   ------------------------------------------------------------------ */

export const aboutPage = {
  intro: {
    label: "About",
    headline: "Hi, I’m Chloe — curious about people, thoughtful about design.",
    text: "I’m studying Information Analysis with a minor in Data Science at the University of Michigan. I’m interested in how research, data, and design can come together to make digital experiences easier to understand and more enjoyable to use.",
    portrait: {
      src: "", // e.g. "/about/portrait.jpg"
      alt: "Portrait of Chloe Yun",
    },
  },

  approach: {
    label: "My approach",
    heading: "Understanding people. Making things clearer.",
    text: "What draws me to UI/UX is the opportunity to understand how people think and turn that understanding into something useful. My studies encourage me to look for patterns, ask better questions, and consider the reasoning behind a design—not just how it looks.",
  },

  education: {
    label: "Education",
    school: "University of Michigan",
    details: [
      { term: "Major", value: "Information Analysis" },
      { term: "Minor", value: "Data Science" },
    ],
  },

  exploring: {
    label: "What I’m exploring",
    note: "Areas I’m interested in and learning more about.",
    items: [
      "UI/UX design",
      "User research",
      "Interaction design",
      "Data-informed design",
      "Information visualization",
    ],
  },

  beyond: {
    label: "Beyond design",
    text: "Outside of design, you’ll probably find me doing Pilates, reading, playing board games with friends, or watching soccer.",
    /* Up to three optional photos. Empty entries are skipped. */
    photos: [
      { src: "", alt: "" }, // e.g. { src: "/about/pilates.jpg", alt: "Pilates studio" }
      { src: "", alt: "" },
      { src: "", alt: "" },
    ],
  },
};
