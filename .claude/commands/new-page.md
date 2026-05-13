---
description: Generate a complete new hotel marketing page for the Microtel Williston project. Args: <filename.html> <type: subpage|home> "<Page Title>" "<one-line description of page content>"
---

You are generating a new page for the **Microtel Inn & Suites Williston** static hotel marketing website.

## How to parse $ARGUMENTS

Format: `<filename.html> <type> "<Title>" "<description>"`

- `filename` — e.g. `spa.html`
- `type` — `subpage` (detail page with hero + two-column body) or `home` (full landing page)
- `Title` — SEO page title, e.g. `Spa & Wellness Center`
- `description` — one sentence of page content, e.g. `Full-service spa with massage, sauna, and steam room`

## Project stack

- Pure static HTML + CSS + vanilla JS. No frameworks.
- GSAP 3.12.5 + ScrollTrigger from CDN.
- Fonts: DM Serif Display (serif headings) + Inter (body) via Google Fonts.
- `build.js` replaces `<!--PARTIAL:navbar-->`, `<!--PARTIAL:footer-->`, `<!--PARTIAL:enquiry-->` at build time.
- `npm start` — dev server with live partial injection (use this, not Live Server).
- `npm run build` — compiles to `dist/` for Vercel.

## Hotel constants

```
Name:     Microtel Inn & Suites by Wyndham Williston
Phone:    (701) 572-2000
Address:  3820 4th Ave W, Williston, ND 58801
Email:    info@merlinhotelgroup.com
Booking:  https://www.wyndhamhotels.com/microtel/williston-north-dakota/microtel-williston/overview
```

## CSS design tokens (from :root in style.css)

```css
--teal:       #0d7f6e   /* primary accent */
--teal-d:     #085f53   /* dark teal for hover */
--teal-l:     #3aaa96   /* light teal, used in dark sections */
--teal-pale:  #e6f5f2   /* soft teal background */
--teal-xpale: #f0faf8
--slate:      #1e2d3d   /* dark blue-slate */
--slate-d:    #111e2a   /* darkest bg (loader, footer, dark hero) */
--cream:      #f8faf9   /* page background */
--ink:        #0f1a14   /* body text */
--ink-m:      #4a5e56   /* secondary text */
--ink-l:      #8aa09a   /* muted / placeholder text */
--border:     #deeae6
--serif:      'DM Serif Display', Georgia, serif
--sans:       'Inter', system-ui, sans-serif
```

## Shared CSS classes (all in style.css — never redefine these)

**Typography**
- `.eyebrow` — tiny all-caps teal label above a heading (0.6rem, letter-spacing 0.38em)
- `.sec-h2` — section heading (serif, clamp(1.8rem, 3.2vw, 2.8rem)), `em` inside = italic teal
- `.sec-sub` — subtitle paragraph (0.9rem, 300 weight)
- `.body-text` — body paragraph (0.88rem, 300 weight, ink-m)
- `.text-link` — animated arrow text link (teal, uppercase)

**Buttons**
- `.btn-primary` — teal filled CTA (use on light backgrounds)
- `.btn-primary--light` — white filled (use on dark/hero backgrounds)
- `.btn-secondary` — ghost/outline (for dark backgrounds)

**Layout**
- `.sec` — section wrapper: `padding: 96px 8vw`

**Scroll animations** (GSAP wires these up automatically via `main.js`)
- `.reveal` — fade up (generic, on any element)
- `.reveal-l` — slide from left
- `.reveal-r` — slide from right
- `.reveal-up` — stagger fade-up (apply to sibling cards; parent triggers them)

**Subpage hero**
- `.d-hero` — full-height hero container
- `.d-hero-bg` — background image div (GSAP parallax applied here)
- `.d-hero-tint` — dark overlay gradient
- `.d-hero-content` — hero text wrapper
- `.d-back-btn` — glassy "Back to Home" button (absolute, top-left over hero)
- `.d-chip` — category label with decorative line prefix
- `.d-hero-title` — serif H1 (`em` = italic teal)
- `.d-meta` — row of key/value pills under H1

**Subpage body layout**
- `.d-body` — two-column grid: `1fr 320px` main + sticky sidebar
- `.d-section` — content block inside main
- `.d-eyebrow` — mini eyebrow label inside d-section
- `.d-sec-title` — section heading inside d-section

**Sticky sidebar**
- `.d-sidebar` — sticky sidebar (top: 82px)
- `.d-info-card` — white card with border
- `.d-info-card--accent` — card with 3px teal top border
- `.dic-label` — small card label
- `.dic-title` — card serif title
- `.dic-body` — card body paragraph
- `.dic-primary-btn` — full-width teal button
- `.dic-secondary-btn` — full-width outline button
- `.dic-perks` — checkmark bullet list (teal ✓ auto-added via CSS)
- `.dic-quick` / `.dic-row` — key-value quick-info rows

**Content components**
- `.d-amen-grid` / `.d-amen-item` — 2-col amenities checkerboard (✦ auto-added)
- `.d-gallery` / `.d-gimg` / `.d-gimg--wide` — 3-col photo gallery grid
- `.d-rooms-grid` / `.d-room-card` / `.d-room-card--featured` — room cards grid

## Wyndham CDN image URLs

Base: `https://www.wyndhamhotels.com/content/dam/property-images/en-us/mt/us/nd/williston/40516/`
Append `?downsize=1800:*` or `?crop=3000:2000;*,*&downsize=1800:*`

Available images:
- `40516_exterior_view_1.jpg` — hotel exterior
- `40516_exterior_day_1.jpg` — exterior daytime
- `40516_guest_room_8.jpg` — guest room
- `40516_property_amenity_2.jpg` — pool/amenity area
- `40516_complimentary_breakfast_1.jpg` — breakfast area

## Standard subpage HTML template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>PAGE_TITLE | Microtel Williston</title>
  <meta name="description" content="META_DESCRIPTION" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://www.wyndhamhotels.com/microtel/williston-north-dakota/microtel-williston/overview" />

  <meta property="og:title" content="PAGE_TITLE | Microtel Williston" />
  <meta property="og:description" content="META_DESCRIPTION" />
  <meta property="og:type" content="website" />

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "Microtel Inn & Suites by Wyndham Williston",
    "telephone": "+17015722000"
  }
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="PAGENAME.css" />
</head>
<body>

  <!--PARTIAL:navbar-->

  <a href="index.html" class="d-back-btn">
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M13 8H3M7 4l-4 4 4 4"/></svg>
    Back to Home
  </a>

  <div class="d-hero">
    <div class="d-hero-bg PAGENAME-hero-bg" role="img" aria-label="HERO_ALT_TEXT"></div>
    <div class="d-hero-tint"></div>
    <div class="d-hero-content">
      <div class="d-chip">CATEGORY · SUBCATEGORY</div>
      <h1 class="d-hero-title">Main Title<br><em>Italic Subtitle</em></h1>
      <div class="d-meta">
        <span><strong>Key 1</strong> Value 1</span>
        <span><strong>Key 2</strong> Value 2</span>
        <span><strong>Key 3</strong> Value 3</span>
      </div>
    </div>
  </div>

  <div class="d-body">
    <main>

      <section class="d-section">
        <span class="d-eyebrow">SECTION LABEL</span>
        <h2 class="d-sec-title">Section Heading</h2>
        <p>Section body copy...</p>
      </section>

      <!-- Add more d-section blocks for each content area -->

    </main>
    <aside class="d-sidebar">
      <div class="d-info-card d-info-card--accent">
        <span class="dic-label">QUICK INFO</span>
        <h3 class="dic-title">Card Title</h3>
        <p class="dic-body">Short supporting copy for this sidebar card.</p>
        <a href="https://www.wyndhamhotels.com/microtel/williston-north-dakota/microtel-williston/overview"
           target="_blank" rel="noopener" class="dic-primary-btn">
          Book Now
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </a>
        <a href="tel:+17015722000" class="dic-secondary-btn">Call (701) 572-2000</a>
        <ul class="dic-perks">
          <li>Perk 1</li>
          <li>Perk 2</li>
          <li>Perk 3</li>
        </ul>
      </div>
    </aside>
  </div>

  <!--PARTIAL:enquiry-->
  <!--PARTIAL:footer-->

  <script src="main.js"></script>
</body>
</html>
```

## Standard subpage CSS template

```css
/* PAGENAME.css — PAGE_TITLE */

/* Hero background image */
.PAGENAME-hero-bg {
  background: url('IMAGE_URL?downsize=1800:*') center/cover no-repeat;
}

/* Page-specific styles only — shared styles are in style.css */
```

## Rules & conventions

1. **Copywriting tone**: professional hotel marketing — confident, warm, benefit-led. No filler phrases.
2. **`em` inside headings** always means italic teal. Use for the "wow phrase" part of a heading.
3. **Add `.reveal` / `.reveal-up` / `.reveal-l` / `.reveal-r`** to any element that should animate in on scroll. GSAP handles it automatically — no extra JS needed.
4. **Sub-pages never include `#loader`** and never link `home.css`.
5. **Navbar `.light` mode** auto-applies on sub-pages (no hero section = no dark overlay needed).
6. **Image alt text**: descriptive, location-specific (e.g., "Indoor heated pool — Microtel Inn Williston ND").
7. **No inline styles** except `background-image` on `.d-hero-bg`.

## Your task

Given `$ARGUMENTS`:

1. Parse filename, type, title, and description from the arguments.
2. Generate the complete **`.html`** file for the page using the template above.
3. Generate the companion **`.css`** file.
4. Edit **`build.js`** to add the new filename to the `PAGES` array.
5. Run `npm run build` to verify the build succeeds.
6. Report the files created and confirm the build passed.

Write real, complete marketing copy — not Lorem Ipsum placeholders. The content should match the page's described purpose and the Microtel Williston brand.
