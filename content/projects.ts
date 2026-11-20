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
    slug: "lumen",
    title: "LUMEN",
    category: "Mobile app · design challenge",
    year: "2026",
    description:
      "A festival companion app that puts lineups, maps, tickets and wristband access in one place, so 50,000 attendees spend less time on their phones.",
    cover: { src: "/images/projects/lumen/01-cover.png", alt: "LUMEN app home screen and lineup screen on two phones" },
    visual: "frames",
    tone: "blush",
    caseStudy: {
      overview:
        "LUMEN is a festival companion app I designed for the Atlas Digital design challenge. It brings the lineup, a live map, nearby services, and ticket and wristband access into one app for a 50,000-person outdoor festival.",
      problem:
        "At a crowded, fast-moving festival, attendees need fast access to what matters in the moment: where to go, what’s next, and how to get in.",
      role: {
        summary: "Product designer",
        responsibilities: [
          "Planned and ran short interviews with festival-goers",
          "Defined the information architecture and user journey",
          "Sketched and wireframed the core flows",
          "Designed high-fidelity screens and tested them with real tasks",
        ],
      },
      timeline: {
        duration: "[x weeks] · Fall 2026",
        phases: [
          { label: "Research", detail: "Interviews & working hypotheses" },
          { label: "Ideate", detail: "IA, user journey & sketches" },
          { label: "Design", detail: "Lo-fi wireframes to hi-fi screens" },
          { label: "Validate", detail: "Usability tasks & iteration" },
        ],
      },
      tools: ["Figma"],
      team: "Solo",
      research: {
        summary:
          "I ran short interviews to understand how people navigate, plan their day, get into the event, and discover things at large festivals. Questions were grouped into four areas: navigation, scheduling, access & wallet, and discovery.",
        methods: ["Short interviews", "Working hypotheses", "User journey map", "Information architecture"],
        image: {
          src: "/images/projects/lumen/03-research-plan.png",
          alt: "Research plan: four interview areas — navigation, scheduling, access and wallet, discovery — with notes from interviews",
          caption: "Research plan: four interview areas and what people told me",
        },
      },
      insights: [
        {
          title: "Signal disappears",
          detail:
            "Weak signal made finding friends hard. People relied on Google Maps, signs and staff, and texted a meeting point when they got separated.",
        },
        {
          title: "Schedules collide",
          detail: "The schedule felt confusing, with many stages and activities running at the same time.",
        },
        {
          title: "Access has to be bulletproof",
          detail:
            "People worried about losing their wristband, and planned for a dead phone with charging stations, staff help or a pre-decided meeting spot.",
        },
      ],
      process: [
        {
          title: "Frame",
          detail:
            "Turned the challenge into three jobs — navigate, plan, access — and wrote working hypotheses to test, not findings.",
        },
        {
          title: "Structure",
          detail:
            "Organized everything into four tabs: Home (what’s next, live updates, nearby), Map, Schedule and Wallet, then mapped the journey from before arriving to the last set.",
        },
        {
          title: "Sketch",
          detail:
            "Sketched and wireframed the core flows to test hierarchy before any visual design. The goal: make the next action obvious at a glance.",
        },
        {
          title: "Style",
          detail: "Explored icon styles, button treatments and color palettes before committing to a direction.",
        },
        {
          title: "Test",
          detail:
            "Tested the prototype with three tasks: enter with the digital wristband, navigate to Aurora Stage, and find nearby food or merch before the next set.",
        },
      ],
      wireframes: [
        { src: "/images/projects/lumen/05-ia.png", alt: "Information architecture with four sections: Home, Map, Schedule, Wallet", caption: "Information architecture" },
        { src: "/images/projects/lumen/06-journey.png", alt: "User journey: before, arrive, explore, attend, have fun", caption: "User journey" },
        { src: "/images/projects/lumen/07-sketches.png", alt: "Early hand sketches of the core flows", caption: "Early sketches" },
        { src: "/images/projects/lumen/08-lofi.png", alt: "Lo-fi wireframes of home, map, lineup and wallet screens", caption: "Lo-fi wireframes" },
        { src: "/images/projects/lumen/08b-colors.png", alt: "Visual exploration of icons, buttons and color palettes", caption: "Visual exploration" },
        {
          src: "/images/projects/lumen/10-testing.png",
          alt: "Usability tasks next to the festival map before and after iteration",
          caption: "Testing: the map went from static boxes to filters, live status and a details sheet",
        },
      ],
      finalDesigns: [
        { src: "/images/projects/lumen/09-hifi.png", alt: "Five hi-fi screens: home, festival map, lineup, artist detail, wallet", caption: "Hi-fi screens for the core flows" },
        { src: "/images/projects/lumen/11-final.png", alt: "Final solution: home, map and wallet screens fanned out", caption: "Final solution: the next relevant action first" },
      ],
      outcomes: [
        "Home shows the next saved artist, time, stage and walking time",
        "Live map with filters, crowd status and turn-by-turn directions",
        "Wallet with a QR fallback if the wristband is lost",
        "Lineup flags schedule overlaps between stages",
      ],
      reflection:
        "Less managing, more experiencing. Designing for a festival meant designing for the worst moment: no signal, a dying phone, a lost wristband. Next I’d keep researching, refine the flows, and test again with more festival-goers.",
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
