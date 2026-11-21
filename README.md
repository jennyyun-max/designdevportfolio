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
  the print’s bottom edge (the floor line is at 6 desktop / 5 mobile). A `hang.y` above 100 starts the print
  off-screen, so it rains in. `art: "michigan"` shows the intro’s last frame instead of a photo.
- **The reveal:** the print with `cover: true` (the Michigan drawing) hides `reveal` — a detail from the featured
  project. Its matching spot in the project screen is `spotlight.detail` in `content/projects.ts`
  (fractions of the screenshot). Change both together if you swap the featured project.
- **Drop timing:** `dropSettings` — `firstDropAt` (scroll before the Michigan print drops), `rainDelay` /
  `rainEvery` (when the other prints rain in), `tipSeconds` (how long it hangs by one corner) and
  `fallSeconds` (how heavy the prints feel).
- **The intro:** the hand-drawn story (California → Korea → Michigan) is drawn in
  `components/intro/Sketch.tsx`; every timing is in seconds in `components/intro/timeline.ts`. It plays on
  entering the homepage, once per browser session (the small script in `app/layout.tsx` decides), never for
  direct links such as `/#work` or a case study, and not for reduced-motion visitors. To see it again, open
  the site in a new tab or clear the `intro-seen` key in session storage.
- **Play:** `playPrints` — just a list; the table lays them out automatically.

## Design system

Colors live as CSS variables at the top of `app/globals.css`:

Warm pink and beige (from the earlier potato version): `--bg` cream page · `--surface` ivory ·
`--surface-2` pink chips · `--line` hairlines · `--fg` espresso type · `--muted` / `--silver` secondary
type · `--paper` ivory print borders · `--blush` featured-project backdrop · `--rose` decorative marks ·
`--accent` deepened rose for hover, active and focus. The photos supply the bright colors. There are no
dark-mode overrides, so the site looks the same in light and dark system settings.

Fonts (loaded with `next/font` in `app/layout.tsx`): **Instrument Serif** (the homepage “hi, i’m chloe”),
**Inter Tight** (headings + body) and **JetBrains Mono** (captions, metadata, navigation).

## Project structure

```
app/
  layout.tsx            fonts, metadata/SEO, header, footer, cursor
  page.tsx              homepage
  work/[slug]/page.tsx  case-study pages (statically generated)
  play/, about/         photo archive and the full story
  not-found.tsx, sitemap.ts, robots.ts, icon.svg
components/
  intro/                IntroStory (overlay, skip, hand-off to the hero print), Sketch (the drawings), timeline
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

- Respects `prefers-reduced-motion`: no intro (the finished Michigan drawing hangs beside the greeting),
  the other prints start settled on the floor, the detail flight is off, and reveals and the custom cursor
  are reduced or off.
- Prints: the photo well is a real button (opens the photo) or link (opens the case study), so every
  project is reachable by keyboard — and every project is also in Selected Work right below the hero.
  The white border picks a print up; arrow keys move a focused, landed print (Shift = bigger steps).
- Touchscreens keep vertical scrolling everywhere (prints use `touch-action: pan-y`).
- Skip link, visible rose focus outlines, labelled controls, keyboard-operable mobile menu, one `h1` per page.

## Deploy with GitHub + Vercel

1. Push this branch (or merge it into `main`) on GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), sign in with GitHub, and import
   **designdevportfolio**.
3. Vercel detects Next.js automatically — keep the defaults and click **Deploy**.
4. After the first deploy, set `site.url` in `content/site.ts` to your Vercel URL
   (or custom domain) so SEO metadata and the sitemap use the right address.

Every push to the connected branch redeploys automatically, and pull requests get preview links.
