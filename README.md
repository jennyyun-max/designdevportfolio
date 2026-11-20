# Chloe Yun — UX & Product Design Portfolio

A futuristic, editorial portfolio built with **Next.js (App Router), React, TypeScript,
Tailwind CSS v4, Motion for React and Lucide icons**.

## Run it locally

Requires [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (all pages are pre-rendered as static HTML) |
| `npm run start` | Serve the production build locally |
| `npm run typecheck` | TypeScript check |

## Edit the content

You shouldn't need to touch components to update the site.

| What | File |
|---|---|
| Name, SEO description, site URL, **email / LinkedIn / GitHub / resume** | `content/site.ts` → `site` |
| Hero text, status line | `content/site.ts` → `hero` |
| **Hero prints, Play archive, drop timing** | `content/polaroids.ts` (`prints`, `playPrints`, `reveal`, `dropSettings`) |
| About page story (`/about`) and homepage teaser | `content/site.ts` → `story`, `about` |
| **Projects + case studies** (incl. each one-line `tagline`, and Brookfield’s `spotlight`) | `content/projects.ts` |

- Anything in `[square brackets]` is a placeholder.
- Wrap a word in `*asterisks*` to set it in the italic accent font (e.g. `"hi, i’m *chloe*!"`).
- A link left as `""` shows “coming soon” instead of a broken link.
- **Images:** put them in `public/images/...` and set `src: "/images/..."`. An empty `src`
  shows placeholder art. Project images go in `public/images/projects/<slug>/`.
- **Resume:** add `public/resume.pdf` and set `resume: "/resume.pdf"`.
- **New project:** copy a project object in `content/projects.ts`, give it a unique `slug`.
  Its page appears at `/work/<slug>` automatically.
- **Hero prints:** `prints` in `content/polaroids.ts`. Each has `src` (`""` = empty photo well), `alt`, a
  short `caption`, optional `focus` (square crop, e.g. `"50% 30%"`), `size` (`"large"` / `"focal"`) and
  `project: "<slug>"` (the print then opens that case study). `desktop` / `mobile` set where it hangs
  (`hang`, omit to start on the floor) and where it lands (`rest`), in % of the hero — `y` is the height of
  the print’s bottom edge (the silver floor is at 6 desktop / 5 mobile). Prints drop in the order listed.
- **The reveal:** the print with `cover: true` (keep it last) hides `reveal` — a detail from the featured
  project. Its matching spot in the project screen is `spotlight.detail` in `content/projects.ts`
  (fractions of the screenshot). Change both together if you swap the featured project.
- **Drop timing:** `dropSettings` — `firstDropAt` (scroll before the first drop), `dropEvery` (scroll
  between drops), `tipSeconds` (how long a print hangs by one corner) and `fallSeconds` (how heavy it feels).
- **Play:** `playPrints` — just a list; the table lays them out automatically.

## Design system

Colors live as CSS variables at the top of `app/globals.css`:

`--bg` graphite canvas · `--surface` / `--surface-2` panels · `--line` hairlines · `--fg` cool-white
type · `--muted` secondary type · `--silver` brushed-silver details · `--paper` print borders ·
`--accent` electric pink — **only** for links, focus states and selected items.

Fonts (loaded with `next/font` in `app/layout.tsx`): **Inter Tight** (oversized headings + body) and
**JetBrains Mono** (captions, metadata, navigation).

## Project structure

```
app/
  layout.tsx            fonts, metadata/SEO, header, footer, cursor
  page.tsx              homepage
  work/[slug]/page.tsx  case-study pages (statically generated)
  play/, about/         photo archive and the full story
  template.tsx          page transition
  not-found.tsx, sitemap.ts, robots.ts, icon.svg
components/
  home/                 DeskHero (scroll-released prints), Print (tip, fall, toss), DetailFlight (reveal →
                        spread), SelectedWork (Brookfield spread + project rows), AboutSection, ContactSection
  play/                 PlayTable (the photo archive at /play)
  polaroids/            PhotoPreview (enlarged photo dialog)
  case-study/           CaseStudy template, CaseSection, Figure, ReadingProgress
  ui/                   ButtonLink, Reveal, MediaFrame, PlaceholderArt…
  SiteHeader.tsx, SiteFooter.tsx, CustomCursor.tsx, MotionProvider.tsx
content/                all editable text and links
lib/types.ts            content types
```

## Accessibility & motion

- Respects `prefers-reduced-motion`: prints start settled on the floor, the featured detail is visible,
  the detail flight is off, and reveals, page transitions and the custom cursor are reduced or off.
- Prints: the photo well is a real button (opens the photo) or link (opens the case study), so every
  project is reachable by keyboard — and every project is also in Selected Work right below the hero.
  The white border picks a print up; arrow keys move a focused, landed print (Shift = bigger steps).
- Touchscreens keep vertical scrolling everywhere (prints use `touch-action: pan-y`).
- Skip link, visible pink focus outlines, labelled controls, keyboard-operable mobile menu, one `h1` per page.

## Deploy with GitHub + Vercel

1. Push this branch (or merge it into `main`) on GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), sign in with GitHub, and import
   **designdevportfolio**.
3. Vercel detects Next.js automatically — keep the defaults and click **Deploy**.
4. After the first deploy, set `site.url` in `content/site.ts` to your Vercel URL
   (or custom domain) so SEO metadata and the sitemap use the right address.

Every push to the connected branch redeploys automatically, and pull requests get preview links.
