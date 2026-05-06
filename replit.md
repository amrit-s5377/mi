# Microtel Inn & Suites Williston

A static marketing website for Microtel Inn & Suites by Wyndham in Williston, ND, showcasing extended-stay kitchenette suites for Bakken oilfield crews, travel nurses, and business travelers.

## Run & Operate

- **Start**: `node server.js`
- No environment variables required

## Stack

- Pure static site: HTML, CSS, vanilla JavaScript
- GSAP 3.12.5 + ScrollTrigger (loaded via CDN in index.html)
- Node.js static file server (server.js) on port 5000

## Where things live

- `index.html` — full single-page app (all pages in one HTML file)
- `style.css` — all styles
- `main.js` — GSAP animations and page navigation logic
- `server.js` — simple Node.js HTTP server

## Architecture decisions

- Single-page application using JS-controlled visibility (no router library)
- Pages: `#landingPg`, `#kitchenettePg`, `#extendedPg`, `#detailPg`
- GSAP handles all animations and scroll triggers
- No build step needed — pure static files served directly

## Product

- Landing page with hero section and property highlights
- Kitchenette Suite detail page
- Weekly & Monthly Rates / Extended Stay page
- Full property detail page
- Links out to Wyndham booking engine

## User preferences

_Populate as you build_

## Gotchas

- GSAP is loaded from CDN; internet access required for full animation support
- All page navigation is JS-driven via `goHome()`, `openDetail()`, etc.

## Pointers

- Wyndham booking URL: https://www.wyndhamhotels.com/microtel/williston-north-dakota/microtel-williston/overview
