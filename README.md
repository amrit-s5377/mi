# Microtel Inn & Suites Williston

A static marketing website for Microtel Inn & Suites by Wyndham in Williston, ND, showcasing extended-stay kitchenette suites for Bakken oilfield crews, travel nurses, and business travelers.

## Stack

- Pure static site: HTML, CSS, vanilla JavaScript
- GSAP 3.12.5 + ScrollTrigger (CDN)
- Google Fonts: DM Serif Display + Inter

## Where things live

- `index.html` — Home / landing page
- `kitchenette.html` — Queen Kitchenette Suite detail page
- `extended-stay.html` — Weekly & Monthly Rates page
- `property-details.html` — Full property overview page
- `style.css` — Shared styles: reset, tokens, navbar, footer, loader, buttons, reveals, shared sub-page components (d-hero, d-body, d-sidebar, d-info-card, d-amen-grid, d-gallery, d-rooms-grid)
- `home.css` — Landing page specific styles
- `kitchenette.css` — Kitchenette page specific styles
- `extended-stay.css` — Extended stay page specific styles
- `property-details.css` — Property details page specific styles

## Architecture decisions

- Multi-page HTML architecture — real `<a href="page.html">` links, no JS-controlled visibility
- CSS split by page: `style.css` (shared) + one CSS file per page for clean organization
- Loader runs on home page only (`#loader` presence detected in `main.js`)
- Sub-pages auto-initialize scroll animations on `DOMContentLoaded`
- Navbar switches to light mode on sub-pages automatically (no hero to detect)
- GSAP parallax on hero bg, parallax divider, and CTA section (home only)

## Product

- Home page with full hero entrance animation, stat bar, about, kitchenette spotlight, rooms, parallax divider, amenities, explore, location, reviews, CTA
- Kitchenette Suite detail page with full equipment list, spec grid, rate cards, gallery
- Weekly & Monthly Rates page with rate tiers, loaner items, audience cards (Bakken/Nurse/Contractor), FAQ
- Property Details page with room grid, amenities, policies, location, gallery

## SEO Content Applied (from Excel)

- Home title: "Microtel Williston | Extended-Stay Suites in the Bakken"
- Home H1: "Williston's Newest Full-Kitchen Extended-Stay Hotel"
- Kitchenette title: "Queen Kitchenette Suites in Williston, ND | Microtel Williston"
- Kitchenette H1: "Queen Kitchenette Suites with Full Kitchen — Williston, ND"
- Extended Stay title: "Weekly & Monthly Hotel Rates Williston ND | Microtel Williston"
- Extended Stay H1: "Weekly & Monthly Hotel Rates — Williston, ND"
- Schema.org Hotel markup on all pages; HotelRoom markup on kitchenette.html

## User preferences

_Populate as you build_

## Gotchas

- GSAP loaded from CDN; internet required for animations
- `d-back-btn` uses `position: absolute` — hero must have `position: relative` on its parent
- `d-body` grid collapses to single column at 1100px (sidebar goes below content)
- Navbar `.light` mode auto-applies on sub-pages (no hero section present)

## Pointers

- Wyndham booking URL: https://www.wyndhamhotels.com/microtel/williston-north-dakota/microtel-williston/overview
- Phone: (701) 572-2000 | Address: 3820 4th Ave W, Williston, ND 58801
