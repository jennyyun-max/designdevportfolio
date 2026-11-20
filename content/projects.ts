import type { Project } from "@/lib/types";

/* ==================================================================
   PROJECTS — each one gets a card on the homepage and a case-study
   page at /work/<slug>. Order here = order on the homepage
   (the first one gets the big featured card).

   Every case-study section except `overview` is optional: leave one
   out and it disappears. Images live in /public/images/projects/<slug>/.
   Anything in [square brackets] is a placeholder.
   ================================================================== */

export const projects: Project[] = [
  {
    slug: "brookfield",
    tagline: "Helping analysts spot when one deal model reports two different IRRs — before anyone quotes the wrong one.",
    title: "Brookfield Knowledge Hub",
    category: "Data product · Atlas Digital",
    year: "2026",
    description:
      "One searchable source of truth for Brookfield Renewable’s 100+ Excel deal models — every number traced back to the cell it came from.",
    cover: { src: "/images/projects/brookfield/project-page.webp", alt: "Knowledge Hub project page for Solar Alpha, flagging two different IRRs" },
    visual: "frames",
    tone: "ivory",
    spotlight: {
      image: {
        src: "/images/projects/brookfield/project-page-top.webp",
        alt: "Knowledge Hub project page. The IRR card reads: two values found, 16.98% or 16.56%, each linked to its Excel cell — don’t quote until a reviewer confirms which is right.",
      },
      detail: { x: 954 / 1440, y: 354 / 560, w: 438 / 1440, h: 181 / 560 },
      heading: "Two IRRs. Which one do you trust?",
      text: "When a deal model reports two different IRRs, the hub never picks one. It shows both, links each to the exact Excel cell it came from, and tells the analyst not to quote either until a reviewer confirms. Hide the volume — never hide the risk.",
    },
    caseStudy: {
      overview:
        "With Atlas Digital, our team is building a Financial Model Knowledge Hub for Brookfield Renewable’s Business Development team: one searchable source of truth for 100+ Excel deal models, with every number traced back to the cell it came from.",
      problem:
        "Brookfield’s Excel deal models sit in SharePoint with no way to search across them — every model is built differently, and numbers get quoted without knowing if they’re current.",
      role: {
        summary: "Designer",
        responsibilities: [
          "Dashboard: risk stands out",
          "Project page: three numbers, full evidence",
          "Detail view: every figure read from the workbook",
        ],
      },
      timeline: {
        duration: "Fall 2026 · in progress",
        phases: [
          { label: "01", detail: "Context" },
          { label: "02", detail: "Design" },
          { label: "03", detail: "Ingestion" },
          { label: "04", detail: "Search" },
        ],
      },
      team: "6 — 2 project managers, 3 analysts, 1 designer",
      research: {
        stats: [
          { value: "100+", label: "Excel models in SharePoint" },
          { value: "57", label: "data fields per model" },
          { value: "1", label: "source cell behind every number" },
        ],
        summary:
          "Brookfield Renewable develops, acquires, sells and refinances renewable projects. Its Business Development team builds an Excel financial model for every deal — generation, cost, financing, revenue, return — and those models are the analytical record of every deal, approved or not. Portfolio questions mean opening files by hand.",
      },
      labels: { insights: "the constraints", insightsHeading: "Too much information, too little attention", process: "the design rule", final: "the screens", wireframes: "iteration", outcomes: "trade-offs" },
      insights: [
        { title: "Every number needs its source", detail: "Each figure links back to its Excel cell." },
        { title: "Uncertainty has to be seen", detail: "Low confidence and conflicts can’t be buried." },
        { title: "Users are busy executives", detail: "A cluttered screen gets abandoned." },
      ],
      process: [
        { title: "Hide the volume", detail: "Extra columns, charts and capacity totals, and long narrative sections can wait — one click away." },
        { title: "Never hide the risk", detail: "Confidence and review status, conflicting values, units and source cells are always visible." },
        { title: "Conflicts are flagged", detail: "Two IRRs found: we show both, never pick one." },
        { title: "Gaps are stated", detail: "“Not stated in model”, so empty never looks like a bug." },
      ],
      wireframes: [
        { src: "/images/projects/brookfield/dashboard-first-pass.webp", alt: "First-pass dashboard with four summary cards and charts behind a Show breakdown toggle", caption: "First pass — 4 of 7 summary cards; charts one click away", fit: "contain", aspect: "aspect-[1440/1141]" },
        { src: "/images/projects/brookfield/dashboard.webp", alt: "Revised dashboard with all seven summary cards and six small grey charts", caption: "Revised — all 7 cards and 6 charts on screen, kept small and grey", fit: "contain", aspect: "aspect-[1440/1229]" },
      ],
      finalDesigns: [
        { src: "/images/projects/brookfield/project-page-full.webp", alt: "Solar Alpha project page: a warning that the model shows two IRRs, key numbers with source cells, and collapsed detail sections", caption: "Project page — three numbers, full evidence", fit: "contain", aspect: "aspect-[1440/1330]" },
        { src: "/images/projects/brookfield/more-details.webp", alt: "More details view: quotes from the workbook, a Not stated in model note, and every metric with its source and confidence", caption: "More details — nothing is hidden for good", fit: "contain", aspect: "aspect-[1440/1100]" },
      ],
      outcomes: ["Only the risk is loud", "Trust on every row", "Every number links to its Excel cell"],
      reflection:
        "What minimalism cost us: our first dashboard showed 4 of 7 summary cards and put the charts behind a toggle the spec wanted visible. The revision brings all 7 cards and 6 charts back on screen, kept small and grey — full spec, still calm. These are trade-offs we still want to confirm with Brookfield.",
    },
  },
  {
    slug: "lumen",
    tagline: "Helping 50,000 festival-goers see what’s next, where to go, and how to get in — without digging through screens.",
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
        images: [{
          src: "/images/projects/lumen/03-research-plan.png",
          alt: "Research plan: four interview areas — navigation, scheduling, access and wallet, discovery — with notes from interviews",
          caption: "Research plan: four interview areas and what people told me",
        }],
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
    slug: "costco-redesign",
    tagline: "Making a crowded, disconnected shopping app easier to navigate, from planning a warehouse trip to checkout.",
    title: "Costco App Redesign",
    category: "UX/UI · research · mobile",
    year: "2026",
    description:
      "A collaborative redesign exploring how clearer navigation, stronger information architecture, and more intentional UI could improve the Costco mobile shopping experience.",
    cover: { src: "/images/projects/costco/cover.webp", alt: "Costco Redesign title card with two redesigned app screens", focus: "15% 50%" },
    visual: "frames",
    tone: "lavender",
    caseStudy: {
      overview:
        "A collaborative UX/UI project focused on making Costco’s mobile experience clearer, more intuitive, and easier to navigate through research, usability testing, and interface redesign.",
      problem:
        "The Costco app felt inconsistent, crowded, and disconnected. Important features were hard to find, navigation could feel overwhelming, and the interface lacked clear visual hierarchy.",
      role: {
        summary: "Team project",
        responsibilities: [
          "User research",
          "Synthesis of findings",
          "Ideation",
          "UI / product design",
        ],
      },
      timeline: { duration: "Spring 2026" },
      team: "Collaborative UX/UI",
      research: {
        stats: [
          { value: "5", label: "usability tests" },
          { value: "10", label: "user interviews" },
          { value: "28", label: "survey responses" },
        ],
        summary:
          "We combined usability testing, interviews, and survey research to understand how shoppers plan trips, use grocery apps, and experience Costco both digitally and in-store. Then we compared Costco with competing grocery and retail apps — the biggest opportunities were in planning, navigation, content hierarchy, and everyday convenience.",
        methods: ["Usability testing", "User interviews", "Survey", "Competitive analysis"],
        images: [
          { src: "/images/projects/costco/survey.webp", alt: "Survey bar chart: which features of grocery store apps do you use, 28 responses", caption: "Survey: the grocery-app features shoppers actually use", fit: "contain" },
          { src: "/images/projects/costco/competitive.webp", alt: "Competitive analysis table comparing Costco with Sam’s Club, Walmart, BJ’s, Target, Kroger and Aldi across eight features", caption: "Competitive analysis across seven grocery and retail apps", fit: "contain" },
        ],
      },
      labels: { insightsHeading: "what the research revealed" },
      insights: [
        { title: "Crowds cause stress", detail: "Shoppers feel stressed when long lines and crowding make their trip unpredictable and inefficient." },
        { title: "Items are hard to find", detail: "Costco’s large layout and limited navigation support make it hard to quickly find items." },
        { title: "Clutter drives people away", detail: "Users disengage when the app feels slow, cluttered, or difficult for basic tasks." },
        { title: "Apps are for saving time", detail: "Shoppers use grocery apps mainly to plan, check inventory, and navigate in-store." },
        { title: "Value should be visible", detail: "Users see the most value when membership benefits, deals, and useful info are easy to find." },
      ],
      process: [
        { title: "How might we…", detail: "…make grocery shopping feel less overwhelming? …make relevant features more visible and easier to access? …make the Costco trip more time-efficient?" },
        { title: "Structure", detail: "Before polished UI, we explored navigation patterns, information hierarchy, and feature organization through sketches and low-fidelity wireframes, testing structural ideas before committing to visual design." },
        { title: "Redesign", detail: "Landing, Shop, Warehouse, and Product details & cart — each redesigned around simpler navigation, clearer hierarchy, and fewer interruptions." },
      ],
      wireframes: [
        { src: "/images/projects/costco/sketch-landing.webp", alt: "Hand-drawn sketch of the Costco landing page with annotations", caption: "Landing page sketch", fit: "contain", aspect: "aspect-[4/5]" },
        { src: "/images/projects/costco/sketch-shop.webp", alt: "Hand-drawn sketch of the shop page with departments and trending items", caption: "Shop sketch", fit: "contain", aspect: "aspect-[4/5]" },
        { src: "/images/projects/costco/sketch-warehouse.webp", alt: "Hand-drawn sketch of the warehouse page with annotations", caption: "Warehouse sketch", fit: "contain", aspect: "aspect-[4/5]" },
      ],
      finalLayout: "phones",
      finalDesigns: [
        { src: "/images/projects/costco/landing.webp", alt: "Screen recording of the redesigned landing page", caption: "Landing — less clutter, important actions up front", aspect: "aspect-[300/618]" },
        { src: "/images/projects/costco/shop.webp", alt: "Screen recording of the redesigned shop page", caption: "Shop — clearer categories, less navigating", aspect: "aspect-[300/618]" },
        { src: "/images/projects/costco/warehouse.webp", alt: "Screen recording of the warehouse page showing crowd levels and gas prices", caption: "Warehouse — trip planning with crowd levels & gas prices", aspect: "aspect-[300/618]" },
        { src: "/images/projects/costco/cart.webp", alt: "Screen recording of product details and the cart", caption: "Product details & cart — fewer interruptions to checkout", aspect: "aspect-[300/618]" },
      ],
      outcomes: [
        "The biggest usability problems were structural, not just visual",
      ],
      reflection:
        "Navigation, information architecture, and task flow had a bigger impact on the experience than visual styling alone. Working as a team also showed me how important it is to align on research findings and priorities before moving into high-fidelity UI. With more time, I’d prototype and test the redesigned flows to measure task completion, and narrow the scope to deeply refine the highest-impact journey. (Research, concepts, and design decisions were developed as a team; this case study highlights my contributions.)",
    },
  },
  {
    slug: "nuseum",
    tagline: "Turning research, market data and internal know-how into systems a fast-moving AI nutrition startup could use.",
    title: "AI Food & Health Startup",
    category: "Product · research · operations",
    year: "2026",
    description:
      "Working across research, operations, and technology at NUSEUM taught me how products are shaped by both user needs and business constraints.",
    cover: { src: "/images/projects/nuseum/cover.webp", alt: "Diagram: how NUSEUM AI works — capture, structure, safety check, personalize", fit: "contain" },
    visual: "circles",
    tone: "ivory",
    caseStudy: {
      overview:
        "At NUSEUM, I worked across research, operations, and technology to support the development of a personalized food-as-medicine platform.",
      problem: "NUSEUM is a precision nutrition AI platform connecting food, health information, and personalized recommendations — a product where accuracy really matters.",
      role: {
        summary: "Research, operations & technology",
        responsibilities: [
          "Organized information and supported internal workflows",
          "Studied the market",
          "Helped the team communicate complex ideas",
        ],
      },
      processFirst: true,
      labels: { process: "the work", insights: "connecting research to product", insightsHeading: "turning complex information into something a team can use", outcomes: "the takeaway" },
      process: [
        { title: "Research", detail: "Researched healthcare, digital health, food delivery, and industry trends to support product and business decisions." },
        { title: "Structure", detail: "Organized research, hiring, and onboarding information into clearer systems and reusable internal resources." },
        { title: "Support", detail: "Contributed to operations across recruiting, research, partnerships, and team workflows in a fast-moving startup." },
      ],
      insights: [
        { title: "Market research", detail: "Understanding companies, trends, and opportunities." },
        { title: "Internal systems", detail: "Creating clearer workflows for hiring and onboarding." },
        { title: "Product context", detail: "Connecting business needs, technical constraints, and user-facing problems." },
      ],
      finalDesigns: [
        { src: "/images/projects/nuseum/what-is-nuseum.webp", alt: "What is NUSEUM: safety first and evidence & validation", fit: "contain" },
      ],
      reflection:
        "Good products are shaped by more than the technology behind them. NUSEUM showed me how product decisions are influenced by research, user needs, business constraints, operations, and technical feasibility at the same time — and made me more interested in the space between data, product, and people.",
    },
  },
  {
    slug: "data-analysis",
    tagline: "Turning messy real-world datasets into charts and takeaways people can actually act on.",
    title: "Data Analysis Projects",
    category: "Data · analytics · visualization",
    year: "",
    description:
      "Exploring real-world datasets through analysis, experimentation, and visualization to uncover patterns and communicate actionable insights.",
    cover: { src: "/images/projects/data-analysis/cover.webp", alt: "Three data projects: Grammy web traffic analysis, UNESCO World Heritage visualization, A/B testing", fit: "contain" },
    visual: "bars",
    tone: "ivory",
    caseStudy: {
      overview:
        "A collection of analytics projects exploring user behavior, experimentation, web traffic, and real-world datasets through Excel, Tableau, and statistical analysis.",
      problem: "Real-world datasets are often messy, complex, and difficult to interpret without structure.",
      role: { summary: "Data analysis · research · strategy" },
      tools: ["Excel", "Tableau", "Statistical analysis"],
      labels: { process: "the process", final: "selected work", outcomes: "the takeaway" },
      process: [
        { title: "Explore", detail: "Cleaned and organized datasets to understand the variables, context, and questions worth investigating." },
        { title: "Analyze", detail: "Used comparisons, statistical methods, and visualization to uncover patterns and evaluate relationships." },
        { title: "Communicate", detail: "Turned results into charts, dashboards, and concise takeaways that made the findings easier to understand." },
      ],
      finalDesigns: [
        { src: "/images/projects/data-analysis/unesco-map.webp", alt: "World map of 1,121 UNESCO World Heritage Sites", caption: "UNESCO World Heritage Sites — data visualization", fit: "contain" },
        { src: "/images/projects/data-analysis/web-traffic.webp", alt: "Web traffic and engagement dashboard", caption: "Web traffic & engagement analysis", fit: "contain" },
      ],
      reflection:
        "Data is only useful when people can understand what it means. Good analysis means deciding what matters, finding the clearest way to show it, and helping someone understand what to do next.",
    },
  },
  {
    slug: "kpop-to-data",
    tagline: "What five years on stage with cignature taught me about audiences, feedback, and people.",
    title: "From K-pop to Data Science",
    category: "Story · communication · curiosity",
    year: "",
    description:
      "What five years in entertainment taught me about audiences, feedback, collaboration, adaptability, and understanding people.",
    cover: { src: "/images/projects/kpop-to-data/cover.webp", alt: "cignature album cover: the group standing in stadium seats", focus: "50% 60%" },
    visual: "circles",
    tone: "lavender",
    caseStudy: {
      overview:
        "Before returning to school to study Data Science at the University of Michigan, I spent five years pursuing a professional career as a K-pop artist, including as a member of cignature.",
      role: { summary: "K-pop artist → Data Science student" },
      timeline: { duration: "5 years in entertainment" },
      team: "cignature",
      processFirst: true,
      labels: {
        problem: "the shift",
        process: "then → now",
        insights: "what transferred",
        insightsHeading: "different field. same core skills.",
        final: "the cignature years",
        outcomes: "the connection",
      },
      problem: "Changing industries without starting from zero.",
      process: [
        { title: "Where I came from", detail: "Entertainment taught me how much success depends on understanding people — audiences, teammates, feedback, timing, and communication." },
        { title: "Where I am now", detail: "Data Science gave me a new way to understand those same questions: through patterns, evidence, systems, and structured problem solving." },
      ],
      insights: [
        { title: "Audience", detail: "Performing taught me to pay attention to how people react, what resonates, and how small changes can shape an experience." },
        { title: "Feedback", detail: "I became comfortable receiving constant feedback, adjusting quickly, and improving under pressure." },
        { title: "Collaboration", detail: "Music, choreography, content, styling, production, and promotion all required working across teams toward one shared outcome." },
        { title: "Adaptability", detail: "Live performances and fast-moving schedules taught me to stay calm, react quickly, and keep moving when plans changed." },
      ],
      outcomes: [
        "People — understanding behavior, audiences, and needs",
        "Patterns — looking for signals inside complex information",
        "Decisions — turning observations into something useful",
      ],
      finalDesigns: [
        { src: "/images/projects/kpop-to-data/sweetie-but-saltie.webp", alt: "cignature group photo for Sweetie but Saltie", caption: "Sweetie but Saltie", aspect: "aspect-[5/4]" },
        { src: "/images/projects/kpop-to-data/my-little-aurora.webp", alt: "cignature group photo for My Little Aurora", caption: "My Little Aurora", aspect: "aspect-[4/3]" },
        { src: "/images/projects/kpop-to-data/spotify.webp", alt: "cignature’s Spotify artist page with popular tracks", caption: "cignature on Spotify", fit: "contain", aspect: "aspect-[2000/1243]" },
      ],
      reflection:
        "Entertainment made me curious about why people respond differently to the same thing, how feedback changes decisions, and how teams turn ideas into something people actually experience — Data Science gave me tools to explore those questions. My path into technology was unconventional, but the skills were never unrelated. Today I bring both perspectives with me: the analytical mindset I’m developing through Data Science, and the communication, adaptability, collaboration, and audience awareness I learned through entertainment. I’m especially interested in work where technology, data, and human behavior meet.",
      links: [{ label: "Watch a cignature performance", href: "https://www.youtube.com/watch?v=C3diP5kT6HI" }],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
