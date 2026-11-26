/* ==================================================================
   COSTCO APP REDESIGN — the custom case study at /work/costco-redesign.

   Built only from the project's own material: the research numbers and
   insights, the survey chart (data transcribed exactly), the competitive
   analysis (dots read from the original table), the three hand-drawn
   sketches and the four screen recordings. Stills are frames from those
   recordings (300 × 618, shown no larger than that). Research, concepts
   and design decisions were a team effort.
   ================================================================== */

const M = (name: string) => `/images/projects/costco/media/${name}`;

export type Still = { src: string; alt: string; label: string; w: number; h: number };
const still = (name: string, label: string, alt: string): Still => ({ src: M(`${name}.webp`), label, alt, w: 300, h: 618 });

export const stills = {
  landingHome: still("landing-home", "Landing", "Redesigned landing page: search and cart, a Same Day button, Warehouse Savings cards and recommendations"),
  landingNew: still("landing-whats-new", "What’s new", "What’s new list with stock status and Add buttons"),
  shopShipping: still("shop-shipping", "Shop", "Shop page with Shipping, Same Day and Pick-up tabs, popular categories and a category grid"),
  shopSameDay: still("shop-same-day", "Shop — Same Day", "Shop page with the Same Day tab selected"),
  shopAll: still("shop-all-categories", "All categories", "Full list of shop categories with images"),
  warehouseHome: still("warehouse-home", "My Warehouse", "My Warehouse: opening hours, gas station prices and an hourly busyness chart"),
  warehouseLists: still("warehouse-lists-deals", "Lists & deals", "Warehouse page with Lists, Orders and Purchases, and member deals"),
  warehouseDetails: still("warehouse-details", "Warehouse details", "Warehouse details with directions, call, store map, gas prices and department hours"),
  warehouseMap: still("warehouse-map-search", "Store map", "Champaign store map with a search for eggs and a pin showing the item and price"),
  cartDelivery: still("cart-delivery", "Cart", "Cart with save for later, quantity controls and delivery options"),
  cartRecs: still("cart-recommendations", "Recommendations", "Cart showing recently viewed products and items members also bought"),
  cartTotal: still("cart-total", "Total & checkout", "Cart with the estimated total and a Checkout button"),
} satisfies Record<string, Still>;

export const recordings = {
  landing: { src: M("landing.mp4"), poster: M("landing-poster.jpg"), label: "Landing page walkthrough" },
  shop: { src: M("shop.mp4"), poster: M("shop-poster.jpg"), label: "Shop walkthrough" },
  warehouse: { src: M("warehouse.mp4"), poster: M("warehouse-poster.jpg"), label: "Warehouse walkthrough" },
  cart: { src: M("cart.mp4"), poster: M("cart-poster.jpg"), label: "Cart walkthrough" },
};

export const sketches = [
  { src: "/images/projects/costco/sketch-landing.webp", label: "Landing page", note: "Fewer items in the top banner, equal card shapes — and a note to move search down because the top felt heavy.", alt: "Hand-drawn landing page sketch with notes: reduce items in top banner, same shape and image, equal shape and border, moved search bar down because top heavy", w: 654, h: 930 },
  { src: "/images/projects/costco/sketch-shop.webp", label: "Departments & trending", note: "A scrolling departments grid and trending items with Add buttons — the start of the Shop category grid.", alt: "Hand-drawn sketch of a scrolling departments grid, trending items and an online savings ad", w: 654, h: 930 },
  { src: "/images/projects/costco/sketch-warehouse.webp", label: "Shop by brand", note: "Promoting Kirkland, and bringing Costco Connection recipes and tips into the app.", alt: "Hand-drawn sketch with a shop ad, shop by brand with Kirkland, and Costco Connection recipes", w: 654, h: 930 },
];

export const costco = {
  intro: "Making a crowded, disconnected shopping app easier to navigate — from planning a warehouse trip to checkout.",
  facts: [
    { term: "Role", value: "UX/UI designer — research, synthesis, ideation, UI" },
    { term: "Team", value: "Collaborative team project" },
    { term: "Timeline", value: "Spring 2026" },
    { term: "Methods", value: "Usability tests, interviews, survey, competitive analysis" },
  ],

  overview:
    "A collaborative UX/UI project focused on making Costco’s mobile experience clearer, more intuitive and easier to navigate — through research, usability testing and interface redesign.",

  problem: {
    statement: "The Costco app felt inconsistent, crowded and disconnected.",
    detail: "Important features were hard to find, navigation could feel overwhelming, and the interface lacked clear visual hierarchy.",
    hmw: ["make grocery shopping feel less overwhelming?", "make relevant features more visible and easier to access?", "make the Costco trip more time-efficient?"],
  },

  research: {
    numbers: [
      { value: "5", label: "usability tests" },
      { value: "10", label: "user interviews" },
      { value: "28", label: "survey responses" },
    ],
    summary:
      "We combined usability testing, interviews and a survey to understand how shoppers plan trips, use grocery apps, and experience Costco both digitally and in-store. Then we compared Costco with competing grocery and retail apps.",
    survey: {
      question: "What features of grocery store apps do you use? (Select all that apply)",
      responses: 28,
      // exactly as in the survey results
      rows: [
        { label: "Digital coupons", count: 16, pct: "57.1%" },
        { label: "Clear pricing breakdown", count: 7, pct: "25%" },
        { label: "Real-time inventory", count: 15, pct: "53.6%" },
        { label: "Store maps", count: 6, pct: "21.4%" },
        { label: "“Buy Again” feature", count: 12, pct: "42.9%" },
        { label: "Personalized recommendations", count: 6, pct: "21.4%" },
        { label: "Replacement suggestions", count: 5, pct: "17.9%" },
        { label: "Membership rewards tracking", count: 10, pct: "35.7%" },
        { label: "Order tracking", count: 11, pct: "39.3%" },
        { label: "None", count: 2, pct: "7.1%" },
      ],
    },
    competitive: {
      apps: ["Sam’s Club", "Walmart", "BJ’s", "Target", "Kroger", "Aldi", "Costco"],
      // S = supported, P = partial, M = missing — read from the original table
      rows: [
        { feature: "Online shopping", v: "SSSSSSS" },
        { feature: "Delivery / pickup", v: "SSSSSSS" },
        { feature: "Reorder", v: "SSSSPMP" },
        { feature: "Shopping lists", v: "SSSSPPP" },
        { feature: "In-store navigation", v: "PPMSMMM" },
        { feature: "Minimal content overload", v: "PPSSMSM" },
        { feature: "Strong branding", v: "PPPSPPS" },
        { feature: "Digital coupons / deals", v: "SSSSSSS" },
      ],
      takeaway: "The biggest opportunities were in planning, navigation, content hierarchy and everyday convenience.",
    },
  },

  // research insight -> design opportunity -> where it lives
  insights: [
    { title: "Crowds cause stress", detail: "Shoppers feel stressed when long lines and crowding make their trip unpredictable and inefficient.", opportunity: "Show how busy the warehouse is before people leave home.", feature: "warehouse", featureLabel: "Warehouse" },
    { title: "Items are hard to find", detail: "Costco’s large layout and limited navigation support make it hard to quickly find items.", opportunity: "Make categories — and where things are in the store — easy to reach.", feature: "shop", featureLabel: "Shop · store map" },
    { title: "Clutter drives people away", detail: "Users disengage when the app feels slow, cluttered, or difficult for basic tasks.", opportunity: "Strip the landing page back to the actions people come for.", feature: "landing", featureLabel: "Landing" },
    { title: "Apps are for saving time", detail: "Shoppers use grocery apps mainly to plan, check inventory, and navigate in-store.", opportunity: "Keep planning — lists, orders, store details — one tap away, and keep checkout short.", feature: "cart", featureLabel: "Warehouse · cart" },
    { title: "Value should be visible", detail: "Users see the most value when membership benefits, deals, and useful info are easy to find.", opportunity: "Keep savings and member deals in view instead of buried.", feature: "landing", featureLabel: "Landing · warehouse" },
  ],

  exploration:
    "Before polished UI, we explored navigation patterns, information hierarchy and feature organization through sketches — testing structural ideas before committing to visual design. The notes stayed on the page.",

  features: [
    {
      id: "landing",
      n: "01",
      title: "Landing",
      tagline: "Less clutter, important actions up front.",
      insight: "Clutter drives people away",
      problem: "The landing page competed for attention — and users disengage when the app feels cluttered or slow for basic tasks.",
      decision: "Search and the cart (with its running total) sit at the top, one Same Day button follows, then Warehouse Savings in equal-sized cards with an Add button each, and recommendations below.",
      benefit: "Fewer things compete on the first screen, so the actions people come for are the first things they see.",
      annotations: [
        { y: 0.125, label: "Search and cart, with the running total" },
        { y: 0.185, label: "One clear Same Day entry point" },
        { y: 0.4, label: "Savings in equal-sized cards, each with Add" },
        { y: 0.75, label: "Recommendations after the essentials" },
      ],
    },
    {
      id: "shop",
      n: "02",
      title: "Shop",
      tagline: "Clearer categories, less navigating.",
      insight: "Items are hard to find",
      problem: "With a huge catalogue and limited navigation support, finding items quickly was hard.",
      decision: "Shipping, Same Day and Pick-up became tabs at the top, so people choose how they’re shopping first. Popular categories come next, then every category as an image tile, with a link to the full list.",
      benefit: "Fewer steps between opening Shop and the right category — and how you’re shopping is chosen up front.",
      annotations: [
        { y: 0.2, label: "How you’re shopping: Shipping, Same Day, Pick-up" },
        { y: 0.36, label: "Popular categories first" },
        { y: 0.6, label: "Every category as an image tile" },
        { y: 0.865, label: "One link to all categories" },
      ],
    },
    {
      id: "warehouse",
      n: "03",
      title: "Warehouse",
      tagline: "Trip planning with crowd levels and gas prices.",
      insight: "Crowds cause stress",
      problem: "Long lines and crowding make a Costco trip unpredictable and inefficient — and shoppers use apps mainly to plan, check inventory and navigate in-store.",
      decision: "My Warehouse puts the trip on one card: opening hours, gas station hours and prices, and an hourly busyness chart with the current hour highlighted. Below: lists, orders and member deals; the warehouse details (directions, call, store map, department hours); and a store map you can search to pin an item and its price.",
      benefit: "Shoppers can decide when to go and what to expect before they leave — and find things once they’re there.",
      annotations: [
        { y: 0.245, label: "Your warehouse and its hours" },
        { y: 0.29, label: "Gas prices: regular and premium" },
        { y: 0.43, label: "How busy it is, hour by hour" },
        { y: 0.505, label: "Right now: busy" },
      ],
    },
    {
      id: "cart",
      n: "04",
      title: "Product details & cart",
      tagline: "Fewer interruptions to checkout.",
      insight: "Apps are for saving time",
      problem: "Getting to checkout meant working through interruptions.",
      decision: "Each item can be saved for later or added to a list, with a quantity stepper beside it. Delivery options — standard, express, or members-only pick-up at your warehouse — open right in the cart, and the estimated total and Checkout stay pinned at the bottom.",
      benefit: "The decisions that come before paying happen in one place, with the way to checkout always in reach.",
      annotations: [],
    },
  ],

  reflection: {
    lesson: "The biggest usability problems were structural, not just visual.",
    text: "Navigation, information architecture and task flow had a bigger impact on the experience than visual styling alone. Working as a team also showed me how important it is to align on research findings and priorities before moving into high-fidelity UI.",
    mine: ["User research", "Research synthesis", "Ideation", "UI and product design"],
    team: "Research, concepts and design decisions were developed as a team; this case study highlights my contributions.",
    next: [
      "Usability-test the redesigned prototype and measure task completion.",
      "Narrow the scope to deeply refine the highest-impact journey.",
    ],
  },
};
