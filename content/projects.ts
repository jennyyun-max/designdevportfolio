import type { CaseStudy, Project } from "@/lib/types";

/* ==================================================================
   PROJECTS — each one gets a card on the homepage and a case-study
   page at /work/<slug>. Replace anything in [square brackets].

   Images: put files in /public/images/projects/<slug>/ and set
   src: "/images/projects/<slug>/cover.jpg". An empty src shows
   placeholder art in the project's `tone` color.
   ================================================================== */

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "[Project One]",
    category: "[Mobile app redesign]",
    year: "[2026]",
    description: "[One or two sentences: the problem you tackled and what you designed.]",
    cover: { src: "", alt: "" },
    visual: "frames",
    tone: "blush",
    caseStudy: {
      overview:
        "[Two or three sentences that set the scene: what the product is, who it’s for, and what you set out to improve.]",
      problem:
        "[State the core problem in one or two sentences. Who is struggling, with what, and why does it matter?]",
      role: {
        summary: "[e.g. UX designer & researcher]",
        responsibilities: [
          "[Planned and ran user interviews]",
          "[Synthesized findings into insights]",
          "[Designed wireframes and high-fidelity prototypes]",
          "[Ran usability tests and iterated]",
        ],
      },
      timeline: {
        duration: "[e.g. 8 weeks · Fall 2026]",
        phases: [
          { label: "[Weeks 1–2]", detail: "[Research & discovery]" },
          { label: "[Weeks 3–4]", detail: "[Synthesis & ideation]" },
          { label: "[Weeks 5–6]", detail: "[Wireframes & testing]" },
          { label: "[Weeks 7–8]", detail: "[Final designs]" },
        ],
      },
      tools: ["[Figma]", "[FigJam]", "[Maze]", "[Notion]"],
      team: "[e.g. Solo project, or 4 designers + 1 PM]",
      research: {
        summary:
          "[Describe how you learned about the problem and the people — what methods you used and why.]",
        methods: ["[User interviews]", "[Survey]", "[Competitive analysis]", "[Data review]"],
        image: { src: "", alt: "", caption: "[Affinity map or research artifact]" },
      },
      insights: [
        { title: "[Insight one]", detail: "[What you learned, in one or two sentences.]" },
        { title: "[Insight two]", detail: "[What you learned, in one or two sentences.]" },
        { title: "[Insight three]", detail: "[What you learned, in one or two sentences.]" },
      ],
      process: [
        { title: "[Define]", detail: "[How you framed the problem and success criteria.]" },
        { title: "[Ideate]", detail: "[How you explored directions — sketches, crazy 8s, flows.]" },
        { title: "[Prototype]", detail: "[What you built to test your ideas.]" },
        { title: "[Test & iterate]", detail: "[What you learned from testing and what changed.]" },
      ],
      wireframes: [
        { src: "", alt: "", caption: "[Early sketches]" },
        { src: "", alt: "", caption: "[Low-fidelity wireframes]" },
        { src: "", alt: "", caption: "[Iteration after testing]" },
      ],
      finalDesigns: [
        { src: "", alt: "", caption: "[Final design — key screen]" },
        { src: "", alt: "", caption: "[Final design — detail]" },
      ],
      outcomes: [
        "[An outcome you can support — e.g. what testing showed]",
        "[Another outcome or deliverable]",
      ],
      reflection:
        "[What did you learn? What would you do differently, and what would you test next?]",
      links: [{ label: "[Prototype]", href: "" }],
    },
  },
  {
    slug: "project-two",
    title: "[Project Two]",
    category: "[Web app · research]",
    year: "[2025]",
    description: "[One or two sentences describing the project.]",
    cover: { src: "", alt: "" },
    visual: "circles",
    tone: "lavender",
    caseStudy: placeholderCaseStudy(),
  },
  {
    slug: "project-three",
    title: "[Project Three]",
    category: "[Data visualization]",
    year: "[2025]",
    description: "[One or two sentences describing the project.]",
    cover: { src: "", alt: "" },
    visual: "bars",
    tone: "butter",
    caseStudy: placeholderCaseStudy(),
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/* Shorter filler for Projects Two and Three — replace with a full
   object like Project One’s when you write these case studies. */
function placeholderCaseStudy(): CaseStudy {
  return {
    overview: "[Project overview.]",
    problem: "[Problem statement.]",
    role: { summary: "[Your role]", responsibilities: ["[Responsibility]", "[Responsibility]"] },
    timeline: { duration: "[Timeline]", phases: [{ label: "[Phase]", detail: "[What happened]" }] },
    tools: ["[Tool]", "[Tool]"],
    team: "[Team]",
    research: { summary: "[Research & discovery.]", methods: ["[Method]", "[Method]"] },
    insights: [
      { title: "[Insight]", detail: "[Detail]" },
      { title: "[Insight]", detail: "[Detail]" },
    ],
    process: [
      { title: "[Step]", detail: "[Detail]" },
      { title: "[Step]", detail: "[Detail]" },
    ],
    wireframes: [{ src: "", alt: "", caption: "[Wireframe]" }],
    finalDesigns: [{ src: "", alt: "", caption: "[Final design]" }],
    outcomes: ["[Outcome]"],
    reflection: "[Reflection.]",
  };
}
