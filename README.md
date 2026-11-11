# Chloe Yun — UX & Product Design Portfolio

A soft, editorial portfolio built with **Next.js (App Router), React, TypeScript,
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
| Hero text, status line, portrait | `content/site.ts` → `hero` |
| Scrolling interests strip | `content/site.ts` → `marquee` |
| About section, philosophy, interests | `content/site.ts` → `about` |
| **Projects + case studies** | `content/projects.ts` |

- Anything in `[square brackets]` is a placeholder.
- Wrap a word in `*asterisks*` to set it in the italic accent font (e.g. `"hi, i’m *chloe*!"`).
- A link left as `""` shows “coming soon” instead of a broken link.
- **Images:** put them in `public/images/...` and set `src: "/images/..."`. An empty `src`
  shows placeholder art. Project images go in `public/images/projects/<slug>/`.
- **Resume:** add `public/resume.pdf` and set `resume: "/resume.pdf"`.
- **New project:** copy a project object in `content/projects.ts`, give it a unique `slug`.
  Its page appears at `/work/<slug>` automatically.
- **Potato quotes:** `LINES` in `components/ui/InteractivePotato.tsx`.

## Design system

Colors live as CSS variables at the top of `app/globals.css` — change a value there and it
updates everywhere:

`--cream` background · `--blush` signature · `--pink` cards/sections · `--espresso` text ·
`--lavender` / `--butter` / `--sage` accents · `--rose` decorative marks only.

Fonts (loaded with `next/font` in `app/layout.tsx`): **Fraunces** (display headings),
**Figtree** (body & navigation), **Instrument Serif italic** (accents).

## Project structure

```
app/
  layout.tsx            fonts, metadata/SEO, header, footer, cursor
  page.tsx              homepage
  work/[slug]/page.tsx  case-study pages (statically generated)
  template.tsx          page transition
  not-found.tsx, sitemap.ts, robots.ts, icon.svg
components/
  home/                 Hero, Marquee, SelectedWork, ProjectCard, AboutSection, ContactSection
  case-study/           CaseStudy template, CaseSection, Figure, ReadingProgress
  ui/                   ButtonLink, Reveal, MediaFrame, PlaceholderArt, Potato, InteractivePotato…
  SiteHeader.tsx, SiteFooter.tsx, CustomCursor.tsx, MotionProvider.tsx
content/                all editable text and links
lib/types.ts            content types
```

## Accessibility & motion

- Respects `prefers-reduced-motion`: reveals, page transitions, marquee, potato bounce,
  eye-tracking and the custom cursor are all reduced or turned off.
- Skip link, visible focus styles, labelled controls, keyboard-operable mobile menu
  (Escape closes it), one `h1` per page.
- The custom cursor only appears on devices with a mouse; the normal cursor stays visible.

## Deploy with GitHub + Vercel

1. Push this branch (or merge it into `main`) on GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), sign in with GitHub, and import
   **designdevportfolio**.
3. Vercel detects Next.js automatically — keep the defaults and click **Deploy**.
4. After the first deploy, set `site.url` in `content/site.ts` to your Vercel URL
   (or custom domain) so SEO metadata and the sitemap use the right address.

Every push to the connected branch redeploys automatically, and pull requests get preview links.
