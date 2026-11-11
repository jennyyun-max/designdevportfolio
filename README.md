# Chloe Yun — Portfolio

A soft, editorial UX & product design portfolio (“Soft bloom”).
Built with React, Vite, React Router and Tailwind CSS.

## Run it locally

Requires [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

```bash
npm run build     # production build in dist/
npm run preview   # serve the production build locally
```

## Edit the content

**All text, links and image paths live in [`src/content.js`](src/content.js).**
Anything in `[square brackets]` is a placeholder.

| What | Where in `content.js` |
|---|---|
| Email, LinkedIn, GitHub, resume | `site` — leave `""` to show “Coming soon” (no broken links) |
| Homepage headline, greeting, intro, status, portrait, interests strip | `home` — wrap a word in `*asterisks*` for the italic accent |
| Projects (cards + project pages) | `projects` — each needs a unique `slug`; its page is `/work/<slug>` |
| Project page sections, charts, screenshots, code links | `projects[].sections` |
| About page (education, interests, photo) | `about` |
| Photos, favorites, creative work | `personal` |

**Images:** put them in `public/images/…` and reference them as `"/images/…"`.
An empty `src` shows a labelled placeholder.

**Resume:** put the PDF in `public/` (e.g. `public/resume.pdf`) and set `site.resume: "/resume.pdf"`.

**Fonts and colors:** `src/index.css` — Bricolage Grotesque (headlines), Instrument Serif italic (accents), Figtree (body), loaded from Google Fonts in `index.html`.

## Project structure

```
src/
  content.js            ← all editable content
  index.css             ← design tokens (colors, fonts, motion)
  pages/                ← Home, About, Project (detail template), NotFound
  components/
    ui/                 ← Button, Tag, Bloom mark, ArchPhoto, Rich (italic accents)
    home/               ← Hero, Marquee, AboutTeaser
    ProjectCard.jsx, Work.jsx, Header.jsx, Footer.jsx, BarChart.jsx …
```

## Deploy

`npm run build` outputs static files to `dist/` and copies `index.html` to `404.html`,
so routes like `/about` load directly on static hosts.

- **Vercel / Netlify:** import the GitHub repo; build command `npm run build`, output folder `dist`.
- **GitHub Pages:** serve `dist/`. If the site lives at `username.github.io/designdevportfolio/`,
  set `base: "/designdevportfolio/"` in `vite.config.js` first.
