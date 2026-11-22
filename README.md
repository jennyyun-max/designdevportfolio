# Chloe’s World — Chloe Yun’s portfolio

An interactive storybook × digital scrapbook × design portfolio. Next.js (App Router, every page
prerendered), React, TypeScript, Tailwind v4 and Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## The rooms

| Room | URL | What’s there |
| --- | --- | --- |
| Home | `/` | Starry welcome (until you’ve explored once), stars → Polaroids transition, “hi, i’m chloe!”, selected work, doors, contact |
| My work | `/work`, `/work/<slug>` | Project cards → case studies (Problem → Context → Research → Process → Design decisions → Final design → Outcomes → Reflection) |
| About me | `/about` | Scrapbook: flip-over Polaroid, sticky notes, interactive timeline, photo box |
| My journey | `/journey` | Hand-drawn storybook you page through: California → Seoul → Ann Arbor |
| Playground | `/playground` | Instant camera, sticker scrapbook page, doodle pad (and a hidden potato) |
| Guestbook | `/guestbook` | Leave a note — **local demo**, saved only in the visitor’s browser |

## Where to edit things

| What | File |
| --- | --- |
| Name, email, LinkedIn, résumé, hero text, the five rooms, journey chapters, about text | `content/site.ts` |
| Projects and case studies (incl. `decisions`) | `content/projects.ts` |
| Homepage Polaroids, fall timing, camera photo archive | `content/polaroids.ts` |
| Colors, type, tape / paper textures | `app/globals.css` |
| The doodle illustrations (nav, stickers, stamps…) | `components/doodles/Doodles.tsx` |
| The welcome + star → Polaroid transition | `components/intro/Welcome.tsx` |
| The hand-drawn journey scenes | `components/intro/Sketch.tsx` |

- **Case studies:** every chapter is optional — leave a field out and the chapter disappears. Only put in
  what really happened; nothing is generated. LUMEN’s length is still unknown — add it to `timeline.duration`.
- **Polaroids:** `src`, `alt`, `caption`, `story` (shown when the photo is opened) or `project` / `href`
  (opens that page), `tape` (washi tape color), and `desktop` / `mobile` positions (`hang` = start above
  the screen, `rest` = where it lands, in % of the hero). Image rule: no photos showing “title” or
  “cignature”, no group photos — the stage photo is a text-free crop (`aurora-portrait.jpg`).
- **The welcome** shows on entering the homepage until the visitor clicks Explore (or skip) once —
  remembered in `localStorage`; never for direct links like `/#work`. “replay the intro” in the footer
  brings it back. Explore: the stars gather into glowing clusters, each becomes one of the homepage
  Polaroids (a copy of the real print) and springs onto its exact spot as the sky fades from blush to
  cream; then the real, draggable Polaroids take over and the greeting + navigation rise in (~3s).
  Reduced motion: a simple fade. Phones: half the stars, no trails.

## Design system

Typography recovered from the original pink-and-beige version (commit `d6497c0`), with Chloe’s palette:

- **Type:** Fraunces display headings (weight 560, SOFT 100, opsz 144, −0.03em, line-height 0.98) with
  Instrument Serif italic accents (`*word*` / `<em>`), Figtree body (1.0625rem / 1.65), Caveat handwriting,
  small labels in DM Mono (uppercase, letter-spaced).
- **Color:** dreamy blush `#F4E1E3` (welcome sky), warm cream `#FFF8F0` (pages), dusty rose `#B67D91`
  (decoration; `#8E5469` when used for small text), muted plum brown `#694958` (secondary text), butter
  `#F6E8B1`, champagne `#E8D6BD`; the original espresso `#3a2620` for body text (13.5:1 on cream).
  The same in light and dark system settings.

## Guestbook: making it shared

There is no backend, so the guestbook is honest about being a local demo. To make a shared visitor
gallery, add an API route + database (e.g. Vercel + Postgres/KV) with: server-side validation and length
limits, rate limiting per IP, a profanity filter, storing notes as **pending** until approved (moderation),
no emails or personal data collected, and doodles stored as size-limited PNGs.

## Accessibility & motion

- `prefers-reduced-motion`: the welcome stays still and Explore simply fades into the homepage; Polaroids
  start settled; no custom cursor; CSS animations off. Escape skips the welcome.
- Polaroids: the photo is a button/link (opens a story or project); the white border drags; arrow keys move
  a focused print. Stickers: click/Enter adds one, arrow keys move it, Delete peels it off.
- The About timeline is a keyboard tab list; skip link, labelled controls, one `h1` per page.
