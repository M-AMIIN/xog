# Xog

**Live site:** https://m-amiin.github.io/xog/

Xog is a research archive of Somali history, from around 2500 BCE to the present where sources on the site traces to a primary source that is published on the site itself. It is written for readers who want the Somali side of events with more to offer.

## What's on the site

- **14 era pages**, from the Adal Sultanate and the Ajuran state to independence, the 2006 period and the diaspora. Each opens with a full-width illustration, a credited caption and a small locator map showing where the era sits on the territory map.
- **11 source annotations** in `files/`, each reading one primary source closely: what it argues, what kind of evidence it is, what it leaves out. Examples are the Futuh al-Habasha, Ibn Battuta's Rihla and the British intelligence files.
- **Territory map** (`xog-map.html`): an interactive map of how borders and polities in the Horn changed over time, built on Leaflet.
- **Sources, Explore, Fragments and About** pages for browsing the archive by source, by theme and by work in progress.

## How it's built

Plain HTML, CSS and JavaScript. No framework and no build step, so every page opens straight from disk.

- `xog-nav.js` writes the shared navigation and footer on every page, and adjusts its links depending on whether the page sits in `files/` or at the top level.
- `xog-cite.js` is a small citation engine: click a marker in the text and a tooltip shows the source, click anywhere else and it closes. No dependencies.
- `xog-fable.js` reads which era page is open and draws that era's locator map and a faint period artefact, so era pages only need to include one script and one stylesheet.
- Type: DM Serif Display for headings, Source Serif 4 for reading text, DM Mono for labels, and Noto Sans Osmanya for the Osmanya script in the logo.
- `vercel.json` holds security headers (X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) for hosting on Vercel. GitHub Pages ignores this file.

```
index.html            redirects to the homepage
somali-archive.html   homepage
era-*.html            the 14 era pages
files/                source annotations
images/               photographs, illustrations and SVG artefacts
xog-*.css / xog-*.js  shared styles and scripts
```

## What I'd improve next

- The navigation wraps and gets cut off on phone screens, and the logo touches the menu on inner pages.
- The homepage carries its images inside the HTML, which makes it a 1.5 MB file. Moving them to `images/` would make the first load much faster.
- Pages have no description or Open Graph tags yet, so shared links show no preview.

## How it was made

Research, editorial standard, structure and design direction are mine. I built the code together with Claude as a coding partner.
