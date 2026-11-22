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
| Home | `/` | Hand-drawn welcome (first visit), “hi, i’m chloe!”, falling Polaroids, selected work, doors, contact |
| My work | `/work`, `/work/<slug>` | Project cards → case studies (Problem → Research → Process → Design decisions → Final outcome → Reflection) |
| About me | `/about` | Scrapbook: flip-over Polaroid, sticky notes, interactive timeline, photo box |
| My journey | `/journey` | Illustrated storybook: California → Seoul → Ann Arbor |
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
| The welcome drawings / timings | `components/intro/Sketch.tsx`, `components/intro/timeline.ts` |

- **Case studies:** every chapter is optional — leave a field out and the chapter disappears. Only put in
  what really happened; nothing is generated. LUMEN’s length is still unknown — add it to `timeline.duration`.
- **Polaroids:** `src`, `alt`, `caption`, `story` (shown when the photo is opened) or `project` / `href`
  (opens that page), `tape` (washi tape color), and `desktop` / `mobile` positions (`hang` = start above
  the screen, `rest` = where it lands, in % of the hero). Image rule: no photos showing “title” or
  “cignature”, no group photos — the stage photo is a text-free crop (`aurora-portrait.jpg`).
- **The welcome** plays on the first visit to the homepage only (remembered in `localStorage`), never for
  direct links or reduced-motion visitors. “replay the intro” in the footer brings it back.

## Design system

Recovered from the original pink-and-beige version (commit `d6497c0`):

- **Type:** Fraunces display headings (weight 560, SOFT 100, opsz 144, −0.03em, line-height 0.98) with
  Instrument Serif italic accents (`*word*` / `<em>`), Figtree body (1.0625rem / 1.65), Caveat handwriting,
  eyebrow labels in Figtree 600, 0.75rem, 0.16em uppercase.
- **Color:** cream `#fbf6ef`, ivory `#fffbf6`, espresso `#3a2620` type, blush `#f2c4c0`, pink `#f8dedb`,
  rose `#c9736b`, butter `#f6e4a8`, lavender `#ddd4ef`, sage `#d3dfca`, sky `#cadded`, peach `#f4cdb6`.
  The same in light and dark system settings.

## Guestbook: making it shared

There is no backend, so the guestbook is honest about being a local demo. To make a shared visitor
gallery, add an API route + database (e.g. Vercel + Postgres/KV) with: server-side validation and length
limits, rate limiting per IP, a profanity filter, storing notes as **pending** until approved (moderation),
no emails or personal data collected, and doodles stored as size-limited PNGs.

## Accessibility & motion

- `prefers-reduced-motion`: no welcome, Polaroids start settled, no custom cursor; CSS animations off.
- Polaroids: the photo is a button/link (opens a story or project); the white border drags; arrow keys move
  a focused print. Stickers: click/Enter adds one, arrow keys move it, Delete peels it off.
- The About timeline is a keyboard tab list; skip link, labelled controls, one `h1` per page.
