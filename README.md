# Chloe Yun — UI/UX Design Portfolio

Built with React, Vite and Tailwind CSS.

## Preview

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Editing content

- **Projects, intro, about text and contact links:** `src/content.js`
- **About page (bio, involvement, values, closing, images):** `src/aboutContent.js` (images go in `public/images/about/`)
- **Case studies:** `src/caseStudies.js`, one entry per project `slug` → page at `/work/<slug>` (images go in `public/images/work/<slug>/`)
- **Resume:** put the PDF in `public/` (e.g. `public/resume.pdf`) and set `resume: "/resume.pdf"` in `src/content.js`
- **Project cover images:** put them in `public/projects/` and set each project's `image`
- **Fonts and colours:** `src/index.css`. Type roles follow the Figma reference (Instrument Serif / Bree Serif / Kyiv*Type Serif). Add `public/fonts/KyivTypeSerif.woff2` to enable the body font.

## Deploying

`npm run build` outputs to `dist/` and copies `index.html` to `404.html`, so loading `/about` directly works on static hosts such as GitHub Pages.
