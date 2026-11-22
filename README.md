# Chloe Yun — portfolio

An editorial, art-directed design portfolio with a cinematic welcome. Next.js (App Router, every page
prerendered), React, TypeScript, Tailwind v4 and Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Pages

| Page | URL | What’s there |
| --- | --- | --- |
| Home | `/` | Night-sky welcome (until you’ve explored once), stars → prints transition, the name, selected work + project index, profile |
| Work | `/work`, `/work/<slug>` | Plates / Index views → case studies (Problem → Context → Research → Process → Design decisions → Final design → Outcomes → Reflection) |
| About | `/about` | Editorial profile: flip-over portrait, pull quote, the journey timeline (`#journey`), what carried over, how I work |
| Playground | `/playground` | Instant camera, type tester, drawing board |
| Visitors | `/visitors` | Design an admission card — **local prototype**, saved only in the visitor’s browser |
| Contact | `#contact` | The footer, on every page |

Old URLs redirect: `/guestbook` → `/visitors`, `/journey` → `/about#journey`, `/play` → `/playground`.

## Where to edit things

| What | File |
| --- | --- |
| Name, email, LinkedIn, résumé, hero text, navigation, journey chapters, about text | `content/site.ts` |
| Projects and case studies — **array order is the site order** (LUMEN, Costco, Brookfield, Data, K-pop, NUSEUM) | `content/projects.ts` |
| Personal photos (the Polaroid collection) | `content/personal.ts` + `public/images/personal/` |
| Homepage print positions, fall timing | `content/polaroids.ts` |
| Colors, type, grain, link styles | `app/globals.css` |
| The welcome + star → Polaroid transition | `components/intro/Welcome.tsx` |
| The visitor cards (colours, patterns, type) | `components/visitors/VisitorCards.tsx` |

- **Case studies:** every chapter is optional — leave a field out and the chapter disappears. Only put in
  what really happened; nothing is generated. LUMEN’s length is still unknown — add it to `timeline.duration`.
- **Personal photos (Polaroids):** only personal photos go in Polaroid frames — project work lives on `/work`.
  They live in `public/images/personal/` and are listed in `content/personal.ts`. To add one: drop the file
  in that folder, import it in `content/personal.ts`, add an entry (alt, caption, story, optional place /
  year / size), then add its id to `wall` (the "Kept loosely" photo wall on the homepage, `/#photographs` — photos already in the top collage are skipped there), `collection`
  (playground camera), a homepage print (`content/polaroids.ts`) or a journey chapter (`content/site.ts`).
  The wall lays out 20–30 photos by itself — stable positions from their order, varied sizes, small
  rotations, natural overlaps — and they fall in as the section scrolls into view (drag with mouse/pen;
  touch scrolls; click to enlarge; “Scatter again” resets; phones show 8 with “show all”). Frames take each photo’s own aspect ratio, so nothing is cropped. Image rule: no
  photos showing “title” or “cignature”, no group photos — the stage photo is a text-free crop.
- **Homepage prints** (`content/polaroids.ts`): `desktop` / `mobile` positions (`hang` = start above the
  screen, `rest` = where it lands, in % of the hero). Black & white until hovered; click to open the story.
- **The welcome** shows on entering the homepage until the visitor clicks Explore (or skip) once —
  remembered in `localStorage`; never for direct links like `/#work`. “Replay the intro” in the footer
  brings it back. Explore: the stars drift into clusters, each becomes one of the homepage prints (a copy of
  the real print) and springs onto its exact spot as the night fades to paper; then the real, draggable
  prints take over and the name + navigation rise in (~3s). Reduced motion: a simple fade. Phones: half
  the stars, no trails.

## Design system

- **Type:** Instrument Serif for display (carried over from the original portfolio, where it was the italic
  accent), DM Sans for text, IBM Plex Mono for metadata (`.meta`: small, uppercase, letter-spaced).
  No handwriting fonts.
- **Color:** warm paper `#F3F0E9`, charcoal `#252522`, stone `#E8E5DD`, muted gray `#77756F` (large text and
  rules; small text uses `#6B6964` to pass WCAG AA), oxblood `#9D4036` used sparingly, steel blue `#7A8291`.
  Night `#1C1C1A` for the welcome, the footer and the mobile menu.
- **Motion:** masked line-by-line type reveals, images uncovered on scroll with slow parallax, a cursor-
  following preview in the project index, prints that drop and can be dragged. One easing curve
  (`cubic-bezier(0.16, 1, 0.3, 1)`) throughout.

## Visitors: making it shared

There is no backend, so the visitor archive is honest about being a local prototype (cards stay in the
visitor’s browser; names and notes are length-limited and links are refused). To make a shared gallery, add
an API route + database (e.g. Vercel + Postgres/KV) with: server-side validation and length limits, rate
limiting per IP, a profanity filter, cards stored as **pending** until approved (moderation), visitor numbers
issued by the server, no emails or personal data collected, and signatures stored as size-limited PNGs.

## Accessibility & motion

- `prefers-reduced-motion`: the welcome stays still and Explore simply fades into the homepage; prints
  start settled; images appear without the reveal; no custom cursor; CSS animations off. Escape skips the welcome.
- Prints: the photo is a button/link (opens a story or project); the white border drags; arrow keys move
  a focused print.
- Skip link, labelled controls, visible focus (oxblood outline), one `h1` per page.
