/* ==================================================================
   LUMEN — the custom case study at /work/lumen.

   Everything here comes from the LUMEN Figma file (slides + screens):
   the challenge, research plan and interview notes, working hypotheses,
   IA, journey, sketches, lo-fi, visual exploration, testing and the
   final screens. Screens live in /public/images/projects/lumen/screens
   (exported from Figma at 3x, outer frame background removed).
   Nothing is added that the material doesn't support — no metrics.
   ================================================================== */

const S = (name: string) => `/images/projects/lumen/screens/${name}.webp`;

export type Screen = { src: string; alt: string; label: string; w: number; h: number };
const phone = (name: string, label: string, alt: string, w = 972, h = 2113): Screen => ({ src: S(name), label, alt, w, h });
const tall = (name: string, label: string, alt: string): Screen => phone(name, label, alt, 1036, 2176);

export const screens = {
  welcome: tall("onboarding-welcome", "Welcome", "LUMEN welcome screen: your festival companion, with a Get started button"),
  link: tall("onboarding-link-wristband", "Link wristband", "Link wristband screen asking to hold the phone near the wristband"),
  scanning: tall("onboarding-scanning", "Scanning", "Pairing device screen reading wristband data"),
  youreIn: tall("onboarding-youre-in", "You’re in", "Confirmation screen: You’re in, Chloe Yun, with a welcome message"),
  pass: tall("onboarding-festival-pass", "Festival pass", "Festival pass screen showing the LUMEN Pass and wristband status: linked"),
  home: phone("home", "Home", "Home screen: what’s next card for cignature at Aurora Stage with a Navigate button, and nearby services"),
  mapStages: phone("map-stages", "Map", "Festival map with category filters, live status tags and a Show list button", 972, 2112),
  mapFilters: phone("map-filters", "Map — filtered", "Festival map filtered to merch, with Near me and Open now filters and an Artist Merch Pop-Up card"),
  mapSheet: phone("map-stage-sheet", "Stage details", "Map with the Aurora Stage details sheet and a Get directions button", 972, 2112),
  mapDirections: phone("map-directions", "Directions", "Walking directions to Aurora Stage, 5 minutes (320 meters), with End navigation", 972, 2112),
  lineup: phone("lineup", "Lineup", "Lineup by day with saved artists, a Live now tag and an overlap warning"),
  lineupSearch: phone("lineup-search", "Lineup search", "Lineup search for cignature with a top match and related K-pop acts"),
  artist: phone("artist-detail", "Artist", "Artist detail for cignature: time, stage, about the artist and Save to lineup", 972, 2114),
  wallet: phone("wallet", "Wallet", "Wallet with the LUMEN Pass QR code, wristband status, festival balance and Report lost band"),
  merch: tall("merch-popup", "Merch pop-up", "Merch pop-up detail with location, walking time, description and exclusive drops"),
  // process
  mapBefore: { src: S("testing-map-before"), label: "Before", alt: "Lo-fi festival map with stages drawn as plain boxes and three filter chips", w: 446, h: 968 },
  lofiHome: phone("lofi-home", "Home", "Lo-fi home wireframe with a what’s next card and nearby services", 668, 1452),
  lofiMap: phone("lofi-map", "Map", "Lo-fi map wireframe with stage boxes and filter chips", 668, 1452),
  lofiLineup: phone("lofi-lineup", "Lineup", "Lo-fi lineup wireframe with day tabs and saved artists", 668, 1452),
  lofiWallet: phone("lofi-wallet", "Wallet", "Lo-fi wallet wireframe with a QR pass and wristband actions", 668, 1452),
  exploreHome: phone("explore-home", "Home", "Color exploration of the home screen in pastel blue", 804, 1748),
  exploreMap: phone("explore-map", "Map", "Color exploration of the map with pastel stage tags", 804, 1748),
  exploreLineup: phone("explore-lineup", "Lineup", "Color exploration of the lineup with colored stage bars", 804, 1748),
  exploreArtist: phone("explore-artist", "Artist", "Color exploration of the artist page with a pink Save to lineup button", 804, 1748),
  exploreWallet: phone("explore-wallet", "Wallet", "Color exploration of the wallet with a butter-yellow pass", 804, 1748),
} satisfies Record<string, Screen>;

export const sketches = [
  { src: S("sketch-map-schedule"), alt: "Hand sketches of the map and schedule screens with notes", label: "Map & schedule", w: 1488, h: 1070 },
  { src: S("sketch-brainstorm-wallet"), alt: "Hand sketches of a brainstorm page and the wallet / ticket screen", label: "Brainstorm & wallet", w: 1390, h: 1070 },
];

export const lumen = {
  intro:
    "A festival companion app that brings the lineup, a live map and wristband access into one place — so 50,000 attendees can spend less time on their phones and more time enjoying the festival.",
  facts: [
    { term: "Role", value: "Product designer — research, IA, wireframes, visual design, testing" },
    { term: "Context", value: "Atlas Digital design challenge" },
    { term: "Team", value: "Solo" },
    { term: "Timeline", value: "Fall 2026" },
    { term: "Tools", value: "Figma" },
    { term: "Platform", value: "Mobile app" },
  ],

  overview: {
    text: "LUMEN brings 50,000 attendees across stages, vendors, art, sponsors, transportation and restricted areas into one outdoor venue. I designed the companion app for it: what to see, where to go, and how to get in — in one place.",
    did: [
      "Planned and ran short interviews with festival-goers",
      "Defined the information architecture and user journey",
      "Sketched and wireframed the core flows",
      "Designed the high-fidelity screens and tested them with real tasks",
    ],
  },

  challenge: {
    heading: "Designing clarity for a crowded, fast-moving festival.",
    jobs: [
      { n: "01", title: "Navigate", text: "Find where to go without getting overwhelmed by a dense festival map." },
      { n: "02", title: "Plan", text: "Know what is happening next and manage schedule conflicts quickly." },
      { n: "03", title: "Access", text: "Enter, pay and manage wristband access with speed and confidence." },
    ],
    hypothesis: "Attendees need faster access to what matters in the moment.",
  },

  research: {
    method: "Short interviews to understand how people navigate, plan their day, enter the event and discover things at large festivals.",
    areas: [
      { title: "Navigation", question: "How do people find stages, food, restrooms and exits?", heard: ["Weak signal made finding friends difficult", "Used Google Maps, signs and staff to navigate", "Found food via the event map, their phone, or asking people", "Texted their location and chose a meeting point when separated"] },
      { title: "Scheduling", question: "How do attendees track what is happening next?", heard: ["The schedule was confusing — many stages and activities ran at the same time"] },
      { title: "Access & wallet", question: "Where does friction appear around tickets, wristbands and payment?", heard: ["Worried about losing a wristband — replacing it takes time and money", "If the phone died: a charging station, staff help, or a pre-decided meeting spot"] },
      { title: "Discovery", question: "What makes food, art and sponsor experiences worth exploring?", heard: ["Would visit sponsor booths for free items, charging stations, games or useful information"] },
    ],
    hypotheses: [
      "Attendees may struggle to get to where they want in a crowded, fast-moving environment.",
      "Navigation may be most useful when it leads to the user’s next destination.",
      "Sponsor experiences may feel better when they provide things that are useful.",
      "Essential access should still work even if there’s no service, the phone dies, or the wristband is lost.",
    ],
  },

  // How each working hypothesis became something the product has to do, and where it lives
  goals: [
    { from: "Hypothesis 02", goal: "Lead with the next relevant action", where: "Home — What’s next" },
    { from: "Hypothesis 01 · interviews", goal: "Make the map something you can act on", where: "Map — filters, live status, directions" },
    { from: "Interviews", goal: "Make schedule conflicts visible", where: "Lineup — overlap warnings" },
    { from: "Hypothesis 04 · interviews", goal: "Entry can never depend on a single thing", where: "Wallet — wristband + QR fallback" },
    { from: "Hypothesis 03 · interviews", goal: "Make sponsor and merch stops worth visiting", where: "Map — pop-ups with open status" },
  ],

  ia: [
    { tab: "Home", items: ["What’s next", "Live updates", "Nearby"] },
    { tab: "Map", items: ["Stages", "Food & restrooms", "Pop-up events"] },
    { tab: "Schedule", items: ["Lineup", "Saved artists", "My schedule"] },
    { tab: "Wallet", items: ["Ticket", "Wristband", "Payments"] },
  ],
  journey: [
    { step: "Before", text: "Plan which stages to watch, what to eat, confirm tickets." },
    { step: "Arrive", text: "Scan in and know where to go." },
    { step: "Explore", text: "Navigate to stages, food, art and activities." },
    { step: "Attend", text: "Go to events and adjust as live updates pop up." },
    { step: "Have fun", text: "Enjoy sets, share moments with friends, make memories." },
  ],

  process: {
    sketches: "Quick sketches explored the core flows before any visual polish.",
    lofi: "Simple digital layouts tested hierarchy, flow and structure before visual design. The early wireframes focus on four essential areas — home, map, schedule and wallet — so the main task is visible immediately.",
    lofiQuestions: ["What’s next?", "Where am I?", "Where is my wallet?"],
    explore: "Exploring icon styles, button treatments and color palettes before committing to a final visual direction.",
  },

  testing: {
    intro: "I tested the prototype with real tasks and improved the parts that confused people.",
    tasks: [
      "Use your digital wristband to access the festival.",
      "Find Aurora Stage and start navigation from your current location.",
      "Discover a nearby food, merch or brand experience before the next set.",
    ],
    change: "The map went from static boxes to something you can act on.",
    after: ["Category filters: stages, merch, food, experiences", "Quick filters: near me, open now, saved", "Live status on places — busy, short wait, open now", "A list view, and a details sheet with walking time"],
  },

  decisions: [
    {
      id: "whats-next",
      title: "The next relevant action, first",
      problem: "In a crowded, fast-moving festival, people need what matters in the moment — not a menu of everything.",
      why: "My working hypothesis was that navigation is most useful when it leads to your next destination. The lo-fi rule was simple: make the next action obvious at a glance.",
      how: "Home opens on a What’s next card — the next saved artist, time, stage and walking time — with a single Navigate button. Nearby services (food court, merch tent, restrooms, first aid) sit right below, each with its walking time.",
      better: "Fast, contextual information without digging through multiple screens.",
      screens: ["home"],
    },
    {
      id: "live-map",
      title: "A map you can act on",
      problem: "People told me they relied on Google Maps, signs and staff — and that weak signal made finding friends hard.",
      why: "In testing, the static map of boxes wasn’t enough to find Aurora Stage or a nearby food or merch stop before the next set.",
      how: "The map gained category and quick filters, live status on places (busy, short wait, open now), a list view, a details sheet with walking time, and walking directions with distance.",
      better: "From “where is it?” to “how long, how busy, and how do I get there” in a couple of taps.",
      screens: ["mapFilters", "mapSheet", "mapDirections"],
    },
    {
      id: "overlaps",
      title: "Make schedule collisions visible",
      problem: "The schedule was confusing — many stages and activities ran at the same time.",
      why: "Planning is about choices between sets, so the lineup has to show where choices collide.",
      how: "The lineup is split by day, with saved artists, a Live now tag, and a warning right on the card when sets clash — “Overlaps with Solaris”. Search finds an artist fast and suggests related acts; the artist page has time, stage and Save to lineup.",
      better: "Conflicts are spotted while planning, not discovered at the stage.",
      screens: ["lineup", "lineupSearch", "artist"],
    },
    {
      id: "access",
      title: "Access that can’t fail",
      problem: "People worried about losing a wristband — replacing it takes time and money — and about a phone dying mid-festival.",
      why: "Working hypothesis 04: essential access should still work with no service, a dead phone, or a lost wristband.",
      how: "Onboarding links the wristband by holding the phone near it, then confirms: You’re in. The Wallet keeps the LUMEN Pass with a QR fallback — “No wristband? No problem. Show QR to enter.” — plus wristband status, festival balance and Report lost band.",
      better: "Getting in never depends on a single point of failure.",
      screens: ["link", "youreIn", "wallet"],
    },
    {
      id: "discovery",
      title: "Discovery that’s worth the walk",
      problem: "People said they’d visit sponsor booths for free items, charging stations, games or useful information.",
      why: "Working hypothesis 03: sponsor experiences feel better when they provide something useful.",
      how: "Pop-ups appear on the map with their open status. Each has a page with its location and walking time, what it offers, and exclusive drops.",
      better: "Discovery fits around the sets instead of competing with them.",
      screens: ["merch"],
    },
  ],

  // the walkthrough, in the order an attendee meets it
  flows: [
    { id: "arrive", label: "Arrive", text: "Get started, link the wristband, and you’re in — the pass is ready.", screens: ["welcome", "link", "scanning", "youreIn", "pass"] },
    { id: "home", label: "Home", text: "What’s next, one tap to navigate, and what’s nearby.", screens: ["home"] },
    { id: "map", label: "Map", text: "Filter, check what’s busy, open a place and walk there.", screens: ["mapStages", "mapFilters", "mapSheet", "mapDirections"] },
    { id: "lineup", label: "Lineup", text: "Plan by day, spot overlaps, find and save artists.", screens: ["lineup", "lineupSearch", "artist"] },
    { id: "wallet", label: "Wallet", text: "Pass, QR fallback, balance and lost-wristband help.", screens: ["wallet"] },
    { id: "discover", label: "Discover", text: "Pop-ups with what’s on offer and how far they are.", screens: ["merch"] },
  ],

  reflection: {
    quote: ["Less managing.", "More experiencing."],
    text: "Designing for a festival meant designing for the worst moment: no signal, a dying phone, a lost wristband. LUMEN helps people find what they need quickly, so they can spend less time on their phones and more time enjoying the festival.",
    next: ["Research", "Refine", "Prototype", "Test", "Iterate"],
    nextText: "Next I’d keep researching, refine the flows, and test again with more festival-goers.",
  },
};

export type ScreenKey = keyof typeof screens;
