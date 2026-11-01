/* ------------------------------------------------------------------
   CASE STUDIES — one entry per project, keyed by the project's `slug`
   in src/content.js. A project with an entry here gets its own page at
   /work/<slug> and its homepage card links to it automatically.

   Images: put files in /public/images/work/<slug>/ and reference them as
   "/images/work/<slug>/<file>". Leave src "" to show a placeholder block.

   Every section is optional — delete any you don't need, reorder freely,
   or add new ones with the same shape:
     { id, label, heading, paragraphs: [], points: [], images: [] }
   ------------------------------------------------------------------ */

export const caseStudies = {
  "project-one": {
    // TODO: replace everything marked [Filler] with your own project.
    summary:
      "[Filler] One or two sentences that explain what this project is, who it was for, and what you designed.",

    // Shown as a row of facts under the title. Remove any you don't have.
    overview: [
      { label: "My role", value: "[Filler] e.g. UX researcher & designer" },
      { label: "Timeline", value: "[Filler] e.g. 6 weeks" },
      { label: "Team", value: "[Filler] e.g. Solo, or 4 students" },
      { label: "Tools", value: "[Filler] e.g. Figma, Excel, Python" },
    ],

    sections: [
      {
        id: "problem",
        label: "The problem",
        heading: "[Filler] A short, clear statement of the problem.",
        paragraphs: [
          "[Filler] Describe the situation and who was affected. What made this worth solving? Keep it to what you actually observed or were given — no invented numbers.",
        ],
      },
      {
        id: "research",
        label: "Research",
        heading: "[Filler] How you learned about the people and the problem.",
        paragraphs: [
          "[Filler] Explain your methods — interviews, surveys, competitive analysis, usability tests, or data you explored — and why you chose them.",
        ],
        images: [
          { src: "", alt: "", caption: "[Filler] Caption for a research artifact, like an affinity map." },
        ],
      },
      {
        id: "insights",
        label: "Key insights",
        heading: "[Filler] What you found.",
        // Rendered as a numbered list
        points: [
          "[Filler] First insight, written as one clear sentence.",
          "[Filler] Second insight.",
          "[Filler] Third insight.",
        ],
      },
      {
        id: "process",
        label: "Design process",
        heading: "[Filler] From ideas to a direction.",
        paragraphs: [
          "[Filler] Walk through sketches, wireframes, and iterations. Mention a decision you changed and what made you change it.",
        ],
        images: [
          { src: "", alt: "", caption: "[Filler] Early sketches or wireframes." },
          { src: "", alt: "", caption: "[Filler] A later iteration." },
        ],
      },
      {
        id: "solution",
        label: "Final design",
        heading: "[Filler] The design you landed on.",
        paragraphs: [
          "[Filler] Show the final screens and explain how they address the insights above.",
        ],
        images: [{ src: "", alt: "", caption: "[Filler] Final design." }],
      },
      {
        id: "reflection",
        label: "Reflection",
        heading: "[Filler] What I learned.",
        paragraphs: [
          "[Filler] Share what you would do differently, what you’d test next, or what this project taught you.",
        ],
      },
    ],
  },
};
