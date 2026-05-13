# Hotel Landing Page — Complete Build & Deploy Instructions


## 1. Project Overview

**What it is:** A pure static marketing website for a hotel (Microtel Inn & Suites by Wyndham, Williston ND). Zero frameworks, zero build-time dependencies beyond Node.js for the dev server and build script. HTML + CSS + vanilla JS only.

**Target audience for content:** Extended-stay guests — oil field crews, travel nurses, business travelers. Lead with the kitchenette suite and extended-stay rates.

**Stack:**
- HTML5 (semantic, accessible)
- CSS3 (custom properties / design tokens, no preprocessors)
- Vanilla JavaScript (GSAP 3.12.5 from CDN for animations, no other dependencies)
- Node.js (dev server + build script — not bundled into the site)
- Cloudinary (image CDN)
- Vercel (hosting) + GoDaddy (domain)

---

## 2. Design System

### 2.1 Color Tokens (`style.css` `:root`)

```css
--teal:       #0d7f6e;   /* primary brand color */
--teal-d:     #085f53;   /* dark variant for hover/active */
--teal-l:     #3aaa96;   /* light variant for accents */
--teal-pale:  #e6f5f2;   /* very light teal for backgrounds */
--teal-xpale: #f0faf8;   /* ultra-light teal */
--slate:      #1e2d3d;   /* hero/dark section background */
--slate-d:    #111e2a;   /* darker slate for loader/navbar */
--slate-m:    #2e4560;   /* mid slate */
--cream:      #f8faf9;   /* page body background */
--white:      #ffffff;
--ink:        #0f1a14;   /* primary text */
--ink-m:      #4a5e56;   /* secondary text */
--ink-l:      #8aa09a;   /* tertiary / hint text */
--border:     #deeae6;   /* default border */
--border-d:   #c4d8d2;   /* stronger border */
```

### 2.2 Typography Tokens

```css
--serif: 'DM Serif Display', Georgia, serif;  /* headings, hero text, brand name */
--sans:  'Inter', system-ui, sans-serif;       /* body, labels, nav */
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);
--ease:     cubic-bezier(0.4, 0, 0.2, 1);
```

Load from Google Fonts in every HTML `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### 2.3 Typography Scale (usage patterns)

| Element | Font | Size | Weight | Notes |
|---------|------|------|--------|-------|
| Hero H1 | serif | `clamp(2.6rem, 5.5vw, 5rem)` | 400 | |
| Section H2 (`.sec-h2`) | serif | `clamp(1.8rem, 3.2vw, 2.8rem)` | 400 | `em` tags → italic teal |
| Eyebrow (`.eyebrow`) | sans | 0.6rem | 600 | uppercase, letter-spacing 0.38em, teal |
| Body text (`.body-text`) | sans | 0.88rem | 300 | line-height 1.85, ink-m |
| Nav links | sans | 0.7rem | 400 | uppercase, letter-spacing 0.12em |
| Buttons | sans | 0.68–0.72rem | 600 | uppercase, letter-spacing 0.12em |

### 2.4 Spacing & Layout

- Max content width: `1280px` centered with `margin: 0 auto`
- Section padding: `padding: 96px 8vw` (class `.sec`)
- Navbar height: `68px` (used as offset for sticky elements)
- Horizontal padding for nav/anchorbars: `0 5vw`

---

## 3. Project File Structure

```
/
├── index.html              # Landing page
├── amenities.html          # Amenities detail page
├── kitchenette.html        # Kitchenette suite page (main product page)
├── extended-stay.html      # Extended stay page
├── property-details.html   # Property details / specs
├── corporate.html          # Corporate / group bookings
├── meetings.html           # Meetings & events
├── contact.html            # Contact page
├── 404.html                # Custom 404
│
├── style.css               # SHARED — tokens, reset, navbar, footer, lightbox, all shared components
├── home.css                # Landing page only
├── amenities.css           # Amenities page only
├── kitchenette.css         # Kitchenette page only
├── extended-stay.css       # Extended stay page only
├── property-details.css    # Property details page only
├── corporate.css           # Corporate page only
├── meetings.css            # Meetings page only
├── contact.css             # Contact page only
├── 404.css                 # 404 page only
│
├── main.js                 # GSAP scroll animations (shared, all pages)
├── gallery.js              # Lightbox photo viewer (kitchenette + index)
│
├── partials/
│   ├── navbar.html         # Site-wide navigation partial
│   ├── footer.html         # Site-wide footer partial
│   └── enquiry.html        # Enquiry/contact form partial
│
├── server.js               # Dev server (Node.js, port 5000)
├── build.js                # Production build (outputs to dist/)
├── package.json            # npm scripts only: start, build
├── vercel.json             # Vercel deployment config
│
└── dist/                   # Build output — upload this to host
    ├── *.html              # All pages with partials injected
    ├── *.css               # All CSS files
    └── *.js                # All JS files
```

---

## 4. Partial Injection System

The site uses HTML comment markers that are replaced at build time (and on the fly by the dev server). This avoids repeating navbar/footer HTML across every page.

### Markers (insert in HTML where the partial should appear)

```html
<!--PARTIAL:navbar-->
<!--PARTIAL:enquiry-->
<!--PARTIAL:footer-->
```

### How it works

**Dev server (`server.js`):** Reads the source HTML file, replaces markers with partial file contents, serves the result. Changes to partials are reflected on next request with no restart needed.

**Build script (`build.js`):** Reads all partial files once, then iterates over every page in the `PAGES` array, does a global string replace of each marker, writes the result to `dist/`.

### Adding a new partial

1. Create `partials/newpartial.html`
2. Add `<!--PARTIAL:newpartial-->` to any page HTML
3. Add to `build.js`:
   ```js
   const newpartial = read(path.join(PARTIALS_DIR, 'newpartial.html'));
   // inside PAGES.forEach:
   html = html.replace(/<!--PARTIAL:newpartial-->/g, newpartial);
   ```

---

## 5. HTML Page Template

Every page follows this shell. Copy this for any new page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title — Microtel Inn & Suites Williston ND</title>
  <meta name="description" content="150-160 char page description for SEO.">

  <!-- Open Graph (for social sharing) -->
  <meta property="og:title" content="Page Title — Microtel Inn & Suites Williston ND">
  <meta property="og:description" content="Same as meta description.">
  <meta property="og:image" content="https://res.cloudinary.com/djcgfqesd/image/upload/w_1200,f_auto,q_auto/microtel/HERO-IMAGE-FILENAME.jpg">
  <meta property="og:type" content="website">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">

  <!-- Shared + page-specific CSS -->
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="pagename.css">
</head>
<body>

  <!-- Page loader (optional on inner pages) -->
  <div id="loader">
    <div id="ldInner">
      <div class="ld-logo">M<em class="ld-m">i</em></div>
      <div class="ld-sub">Williston, North Dakota</div>
      <div class="ld-bar-track"><div class="ld-bar" id="ldBar"></div></div>
    </div>
  </div>

  <!--PARTIAL:navbar-->

  <!-- HERO -->
  <section class="pagename-hero hero-dark">
    <div class="pagename-hero-bg hero-bg-img" role="img" aria-label="Hero image description"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <span class="eyebrow">EYEBROW TEXT</span>
      <h1>Heading <em>italic accent</em></h1>
      <p class="hero-sub">Supporting text.</p>
      <div class="hero-cta-row">
        <a href="#section" class="btn-primary">Primary CTA</a>
        <a href="contact.html" class="btn-secondary">Secondary CTA</a>
      </div>
    </div>
  </section>

  <!-- ANCHOR NAV (if the page has multiple scroll sections) -->
  <!-- See Section 8 for the anchor nav pattern -->

  <main>
    <!-- Page content sections -->
  </main>

  <!--PARTIAL:enquiry-->
  <!--PARTIAL:footer-->

  <!-- GSAP (always load) -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="main.js"></script>

  <!-- Gallery lightbox (only if the page has photo galleries) -->
  <script src="gallery.js"></script>

</body>
</html>
```

---

## 6. Hero Sections

### Dark hero (over full-bleed image)

```css
/* In page-specific CSS */
.pagename-hero { position: relative; height: 100vh; min-height: 560px; display: flex; align-items: center; }
.pagename-hero-bg {
  position: absolute; inset: 0;
  background-image: url('https://res.cloudinary.com/djcgfqesd/image/upload/w_1800,f_auto,q_auto/microtel/FILENAME.jpg');
  background-size: cover; background-position: center;
}
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(17,30,42,0.78) 0%, rgba(13,127,110,0.22) 100%); }
```

```html
<!-- In shared style.css, these classes are already defined: -->
.hero-dark .hero-content { ... }   /* centers content, z-index above overlay */
.hero-bg-img { ... }                /* absolute fill */
.hero-sub { ... }                   /* subtitle text in hero */
.hero-cta-row { ... }              /* flex row of CTA buttons */
```

---

## 7. Shared Component Classes (all in `style.css`)

### Sections
```html
<section class="sec">         <!-- padding: 96px 8vw -->
<section class="sec sec--alt"> <!-- same but background: white -->
```

### Text hierarchy
```html
<span class="eyebrow">LABEL</span>
<h2 class="sec-h2">Heading with <em>italic</em></h2>
<p class="sec-sub">Lead paragraph, larger.</p>
<p class="body-text">Body paragraph, lighter weight.</p>
<a href="#" class="text-link">Read more →</a>
```

### Buttons
```html
<a href="#" class="btn-primary">Primary Action</a>
<a href="#" class="btn-primary btn-primary--light">Light variant</a>
<a href="#" class="btn-secondary">Secondary (outlined, for dark backgrounds)</a>
<a href="#" class="btn-ghost-light">Ghost (outlined, light text)</a>
```

### Scroll reveal animations
Add these classes to any element; `main.js` applies GSAP ScrollTrigger to fade them in:
```html
<div class="reveal">    <!-- fade up from below -->
<div class="reveal-l">  <!-- slide in from left -->
<div class="reveal-r">  <!-- slide in from right -->
<div class="reveal-up"> <!-- pure upward fade -->
```

### Detail/subpage two-column layout
```html
<div class="d-layout">       <!-- grid: content area + sidebar -->
  <div class="d-main">...</div>
  <aside class="d-sidebar">
    <div class="d-card">     <!-- white card with border + padding -->
      ...
    </div>
  </aside>
</div>
```
The sidebar sticks at `top: 82px` (navbar height + buffer).

### Info list (used in sidebar cards)
```html
<ul class="info-list">
  <li><span>Label</span><strong>Value</strong></li>
</ul>
```

### Checklist (feature lists)
```html
<ul class="check-list">
  <li>Feature with auto teal checkmark</li>
</ul>
```

---

## 8. Anchor Navigation Pattern

Use on any page with multiple scroll sections. Sits between the hero and main content, sticky below the navbar.

### CSS (in page-specific CSS file)

```css
.page-anchor-nav {
  background: var(--white);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 68px;           /* exactly navbar height */
  z-index: 100;
  box-shadow: 0 2px 16px rgba(14,30,42,0.06);
}
.page-anchor-inner {
  display: flex; align-items: center; gap: 0;
  overflow-x: auto; scrollbar-width: none;
  max-width: 1280px; margin: 0 auto; padding: 0 5vw;
}
.page-anchor-inner::-webkit-scrollbar { display: none; }
.page-anchor-link {
  display: inline-flex; align-items: center; gap: 6px;
  flex-shrink: 0;
  font-size: 0.68rem; font-weight: 500;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--ink-l);
  padding: 14px 16px;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: color 0.2s, border-color 0.2s;
  white-space: nowrap;
}
.page-anchor-link:hover { color: var(--teal-d); border-bottom-color: var(--teal); }
.page-anchor-link.active { color: var(--teal-d); border-bottom-color: var(--teal); font-weight: 600; }
```

### HTML (between hero and `<main>`)

```html
<nav class="page-anchor-nav" aria-label="Page sections">
  <div class="page-anchor-inner">
    <a href="#section-one" class="page-anchor-link">
      <svg><!-- small icon --></svg> Section One
    </a>
    <a href="#section-two" class="page-anchor-link">Section Two</a>
    <!-- add more as needed -->
  </div>
</nav>
```

Each target section needs a matching `id`:
```html
<section id="section-one" class="sec">...</section>
```

### Scroll-spy script (inline, before `</body>`)

```html
<script>
(function () {
  var links = Array.from(document.querySelectorAll('.page-anchor-link'));
  var ids = links.map(function (l) { return l.getAttribute('href').slice(1); });
  var sections = ids.map(function (id) { return document.getElementById(id); });
  function update() {
    var offset = 140;
    var active = -1;
    sections.forEach(function (s, i) {
      if (s && s.getBoundingClientRect().top <= offset) active = i;
    });
    links.forEach(function (l, i) { l.classList.toggle('active', i === active); });
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();
</script>
```

---

## 9. Gallery & Lightbox

### How it works

`gallery.js` is a self-contained vanilla JS lightbox. It reads from a `PHOTOS` array (Cloudinary filenames + captions). Two HTML data attributes wire up the interactions:
- `data-lb-idx="N"` on any clickable element → opens lightbox at photo N
- `data-lb-open="N"` on any button → opens lightbox at photo N (used for "View all" buttons)

### Cloudinary URL helper (inside `gallery.js`)

```js
var CL     = 'https://res.cloudinary.com/djcgfqesd/image/upload';
var FOLDER = 'microtel';
function cl(transforms, filename) {
  return CL + '/' + transforms + '/' + FOLDER + '/' + filename;
}
// Usage:
// Thumbnail strip:  cl('w_200,f_auto,q_auto', filename)
// Lightbox display: cl('w_1400,f_auto,q_auto', filename)
```

### Adding photos to `gallery.js`

```js
var PHOTOS = [
  { name: 'cloudinary-filename.jpg', cap: 'Caption shown under photo' },
  // ...
];
```

### Gallery grid HTML (in page)

```html
<div class="d-gallery">
  <!-- Wide/featured image -->
  <div class="d-gimg d-gimg--wide" data-lb-idx="0">
    <img
      src="https://res.cloudinary.com/djcgfqesd/image/upload/w_1000,f_auto,q_auto/microtel/FILENAME.jpg"
      srcset="https://res.cloudinary.com/djcgfqesd/image/upload/w_700,f_auto,q_auto/microtel/FILENAME.jpg 700w,
              https://res.cloudinary.com/djcgfqesd/image/upload/w_1000,f_auto,q_auto/microtel/FILENAME.jpg 1000w,
              https://res.cloudinary.com/djcgfqesd/image/upload/w_1400,f_auto,q_auto/microtel/FILENAME.jpg 1400w"
      sizes="(max-width: 768px) 100vw, (max-width: 1100px) 66vw, 560px"
      alt="Descriptive alt text"
      width="1400" height="933"
      loading="lazy">
  </div>

  <!-- Regular grid images -->
  <div class="d-gimg" data-lb-idx="1">
    <img
      src="https://res.cloudinary.com/djcgfqesd/image/upload/w_700,f_auto,q_auto/microtel/FILENAME.jpg"
      srcset="https://res.cloudinary.com/djcgfqesd/image/upload/w_400,f_auto,q_auto/microtel/FILENAME.jpg 400w,
              https://res.cloudinary.com/djcgfqesd/image/upload/w_700,f_auto,q_auto/microtel/FILENAME.jpg 700w"
      sizes="(max-width: 768px) 50vw, (max-width: 1100px) 33vw, 260px"
      alt="Descriptive alt text"
      width="700" height="700"
      loading="lazy">
  </div>
</div>

<!-- View all button -->
<div class="kit-gallery-footer">
  <button class="kit-view-all" data-lb-open="0">
    <svg><!-- grid icon --></svg>
    View all 9 photos
  </button>
  <span class="kit-gallery-hint">Click any photo to enlarge</span>
</div>
```

### Including the script

Add before `</body>` on any page that uses the gallery:
```html
<script src="gallery.js"></script>
```

And add `gallery.js` to the `ASSETS` array in `build.js`.

---

## 10. Navbar (`partials/navbar.html`)

The navbar is glassmorphic dark by default and transitions to a light mode when the user scrolls (handled by `main.js` via the `.light` class toggle on `#siteNav`).

**Key classes:**
- `#siteNav` — fixed, `z-index: 800`, height 68px
- `#siteNav.light` — light background mode when scrolled
- `.nav-brand` — logo area (icon square + text)
- `.nav-links` — desktop horizontal links
- `.nav-dropdown` — hover dropdown menu
- `.nav-book-btn` — primary "Book Now" button
- `.nav-ham` — hamburger button (mobile, hidden on desktop)
- `.mob-drawer` — full-screen mobile drawer overlay
- `.mob-nav` — large serif links in mobile drawer
- `.mob-book-btn` — book button in mobile drawer

**Responsive breakpoint:** hamburger shows at `≤900px`, desktop links hidden.

---

## 11. Footer (`partials/footer.html`)

Dark slate background. Structured in 3 columns:
1. Brand / tagline / social icons
2. Quick links (pages)
3. Contact details (address, phone, email)

Bottom strip: copyright + brand credit line.

---

## 12. Enquiry Form (`partials/enquiry.html`)

Full-width dark section (`.enquiry-section`) with a centered form. Fields:
- Name, Email, Phone (3-column on desktop, stacked on mobile)
- Check-in / Check-out dates
- Guests count
- Message textarea
- Submit button

The form uses `netlify` attributes for Netlify form handling, or wire to any form backend by replacing the `<form>` action/method. Currently no backend — static HTML form.

---

## 13. `main.js` — Animations

Handles three things:

1. **Loader animation:** Fades in logo, animates progress bar, then fades out the `#loader` overlay. Fires on `DOMContentLoaded`.

2. **Navbar scroll behavior:** On scroll, adds `.light` class to `#siteNav` once page scrolls past 60px. Also wires the hamburger to open/close `.mob-drawer`.

3. **Scroll reveal:** Uses GSAP `ScrollTrigger` to animate all `.reveal`, `.reveal-l`, `.reveal-r`, `.reveal-up` elements as they enter the viewport. Elements start at `opacity: 0; transform: translateY(40px)` and animate to natural position.

---

## 14. Build System

### Dev workflow

```bash
npm start        # node server.js → http://localhost:5000
```

The dev server:
- Serves source files directly from the project root
- Injects partials on the fly (no rebuild needed for partial changes)
- Correct MIME types for CSS, JS, images
- Any source file change is visible on next browser refresh (no hot reload)

### Production build

```bash
npm run build    # node build.js → outputs to dist/
```

The build script:
1. Deletes and recreates `dist/`
2. Reads all 3 partials into memory
3. For each page in `PAGES`, replaces partial markers, writes to `dist/`
4. Copies each file in `ASSETS` to `dist/`

### Adding a new page

1. Create `newpage.html` and `newpage.css` in root
2. Add `'newpage.html'` to `PAGES` array in `build.js`
3. Add `'newpage.css'` to `ASSETS` array in `build.js`
4. Add links to/from other pages as needed

### Adding a new asset (JS file, etc.)

Add the filename to the `ASSETS` array in `build.js`.

---

## 15. Cloudinary Image Setup

**Account:** `djcgfqesd` | **Folder:** `microtel`

### URL pattern

```
https://res.cloudinary.com/djcgfqesd/image/upload/{transforms}/microtel/{filename}
```

### Transform presets used in this project

| Use case | Transform string |
|----------|-----------------|
| CSS hero background | `w_1800,f_auto,q_auto` |
| Lightbox main image | `w_1400,f_auto,q_auto` |
| Gallery wide image | `w_1000,f_auto,q_auto` (default src) |
| Gallery grid image | `w_700,f_auto,q_auto` (default src) |
| Gallery thumbnail | `w_400,f_auto,q_auto` |
| Lightbox thumbnails | `w_200,f_auto,q_auto` |
| OG / social share | `w_1200,f_auto,q_auto` |

`f_auto` → serves WebP/AVIF automatically based on browser support.
`q_auto` → Cloudinary picks optimal quality (typically 60–80 for photos).

### Uploading images to Cloudinary

1. Go to cloudinary.com → Media Library
2. Navigate to or create the `microtel` folder
3. Drag and drop images (or use "Upload" button)
4. Cloudinary auto-assigns public IDs matching the filename you upload

### SEO image naming convention

Always use lowercase hyphens, include location keyword, describe the content:

```
microtel-williston-{descriptive-content}.jpg

Examples:
  microtel-williston-kitchenette-cooktop-dishwasher-refrigerator.jpg
  microtel-williston-queen-suite-bedroom-kitchenette-area.jpg
  microtel-williston-extended-stay-suite-kitchen-bedroom.jpg
```

Never use: spaces, underscores, numbers like `1.jpg`, generic names like `photo.jpg`.

### Using images in HTML (always include srcset)

```html
<img
  src="https://res.cloudinary.com/djcgfqesd/image/upload/w_700,f_auto,q_auto/microtel/FILENAME.jpg"
  srcset="
    https://res.cloudinary.com/djcgfqesd/image/upload/w_400,f_auto,q_auto/microtel/FILENAME.jpg 400w,
    https://res.cloudinary.com/djcgfqesd/image/upload/w_700,f_auto,q_auto/microtel/FILENAME.jpg 700w,
    https://res.cloudinary.com/djcgfqesd/image/upload/w_1000,f_auto,q_auto/microtel/FILENAME.jpg 1000w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Specific description of what is visible in the photo"
  width="700" height="467"
  loading="lazy">
```

Always include `width` and `height` to prevent Cumulative Layout Shift (CLS).
Use `loading="lazy"` for all images below the fold. Use `loading="eager"` for the hero/above-fold image.

### Using images in CSS (hero backgrounds)

```css
.hero-bg {
  background-image: url('https://res.cloudinary.com/djcgfqesd/image/upload/w_1800,f_auto,q_auto/microtel/FILENAME.jpg');
  background-size: cover;
  background-position: center;
}
```

---

## 16. SEO Checklist Per Page

Every page should have:

```html
<title>Specific Page Title — Microtel Inn & Suites Williston ND</title>
<meta name="description" content="150–160 characters. Unique to this page. Include location (Williston, ND) and primary keyword.">
<meta property="og:title" content="Same as title tag">
<meta property="og:description" content="Same as meta description">
<meta property="og:image" content="Cloudinary URL, 1200×630 ideal, w_1200,f_auto,q_auto">
<meta property="og:type" content="website">
<link rel="canonical" href="https://yourdomain.com/pagename.html">
```

For the homepage, add JSON-LD structured data for the hotel:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Hotel",
  "name": "Microtel Inn & Suites by Wyndham Williston",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "YOUR STREET ADDRESS",
    "addressLocality": "Williston",
    "addressRegion": "ND",
    "postalCode": "YOUR ZIP",
    "addressCountry": "US"
  },
  "telephone": "+1-YOUR-PHONE",
  "url": "https://yourdomain.com"
}
</script>
```

---

## 17. Responsive Design Breakpoints

All page-specific CSS files follow the same breakpoint structure at the bottom:

```css
/* ═══════════════════════════════════
   RESPONSIVE
═══════════════════════════════════ */
@media (max-width: 1100px) {
  /* two-column → stacked layout switches */
}
@media (max-width: 900px) {
  /* desktop nav hidden, hamburger shown */
}
@media (max-width: 768px) {
  /* major layout stacking, hero height shrinks */
}
@media (max-width: 480px) {
  /* small phones: reduce padding, font sizes */
}
```

---

## 18. Deployment: Vercel

### `vercel.json` (in project root)

```json
{
  "buildCommand": "node build.js",
  "outputDirectory": "dist",
  "framework": null
}
```

### First deploy

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root
3. Follow prompts: link to your Vercel account, select project settings
4. Vercel runs `node build.js`, deploys the `dist/` folder
5. You get a `.vercel.app` URL immediately

### Subsequent deploys

```bash
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deploys on every push to `main`.

---

## 19. Domain Connection: GoDaddy → Vercel

### Step 1 — Get Vercel's nameservers or DNS records

In Vercel dashboard → your project → Settings → Domains → Add domain → enter your GoDaddy domain.

Vercel will give you either:
- **Option A (recommended): Nameservers** — `ns1.vercel-dns.com`, `ns2.vercel-dns.com`
- **Option B: DNS records** — An `A` record (IP) + a `CNAME` for `www`

### Step 2 — Option A: Switch nameservers in GoDaddy (easiest)

1. GoDaddy dashboard → My Products → Domains → your domain → Manage
2. Click "Manage DNS" → Scroll to "Nameservers"
3. Click "Change" → select "Enter my own nameservers (advanced)"
4. Enter `ns1.vercel-dns.com` and `ns2.vercel-dns.com`
5. Save. Propagation takes up to 48 hours (usually under 2 hours).

### Step 2 — Option B: Add DNS records in GoDaddy (keep GoDaddy DNS)

1. GoDaddy → Manage DNS → DNS Records
2. Add **A record:** `@` → Vercel's IP (shown in Vercel dashboard) → TTL 600
3. Add **CNAME record:** `www` → `cname.vercel-dns.com` → TTL 600
4. Delete any existing A records for `@` that point elsewhere

### Step 3 — Verify in Vercel

Back in Vercel → Settings → Domains → your domain should show as "Valid Configuration" once DNS propagates.

### Step 4 — Force HTTPS

Vercel automatically provisions a free SSL certificate (Let's Encrypt) once the domain verifies. HTTPS is on by default. HTTP redirects to HTTPS automatically.

### Step 5 — Set primary domain

In Vercel → Settings → Domains → mark your `www.yourdomain.com` or `yourdomain.com` as primary. Set up a redirect from the other variant.

---

## 20. Starting From Scratch With an AI Agent

If you're giving these instructions to an AI agent to build a similar site, give it this sequence:

### Phase 1 — Project skeleton

```
Create a static hotel marketing website with:
- Node.js dev server (server.js, port 5000) that injects HTML partials
- Build script (build.js) that outputs to dist/
- package.json with scripts: start (server.js) and build (build.js)
- vercel.json with buildCommand: "node build.js", outputDirectory: "dist", framework: null
- partials/ folder with navbar.html, footer.html, enquiry.html
- Partial markers: <!--PARTIAL:navbar-->, <!--PARTIAL:footer-->, <!--PARTIAL:enquiry-->
```

### Phase 2 — Design system

```
Create style.css with:
- CSS custom properties (design tokens) as listed in the design system section
- Reset
- Glassmorphism navbar with .light scroll state and mobile drawer
- Shared section, typography, button, and utility classes
- GSAP scroll reveal classes (.reveal, .reveal-l, .reveal-r, .reveal-up)
- Lightbox overlay CSS (.lb-overlay, .lb-stage, .lb-thumbs etc.)
```

### Phase 3 — Landing page (index.html + home.css + main.js)

```
Create index.html as the landing page with sections:
- Full-bleed hero with dark overlay, H1, subtext, two CTAs
- Stats bar (4 key numbers)
- Sticky anchor nav linking to page sections
- About / property overview section
- Kitchenette suite feature section with photo gallery + lightbox trigger
- Standard rooms section
- Amenities grid
- Corporate/extended-stay callout
- Location map embed or static map
- Enquiry form (via partial)
- Footer (via partial)

Also create main.js with GSAP loader animation, navbar scroll toggle, and ScrollTrigger reveal.
```

### Phase 4 — Detail pages

Build each subpage with:
1. Hero (shorter, ~60–70vh, dark overlay over Cloudinary image)
2. Sticky anchor nav pointing to page sections
3. Two-column layout (d-layout: d-main + d-sidebar) for detailed content
4. Page-specific CSS file

Pages to build: amenities.html, kitchenette.html, extended-stay.html, property-details.html, corporate.html, meetings.html, contact.html, 404.html

### Phase 5 — Images & Cloudinary

```
1. Gather all photos, name them with SEO-friendly hyphenated names including location keyword
2. Upload to Cloudinary under the project folder
3. Replace all local image references with Cloudinary URLs using f_auto,q_auto transforms
4. Add srcset with multiple widths to all <img> tags
5. Add width/height attributes to prevent CLS
6. Use w_1800 for CSS hero backgrounds
```

### Phase 6 — Gallery & lightbox

```
Create gallery.js with:
- PHOTOS array (filename + caption for each photo)
- Cloudinary URL helper function
- Lightbox overlay (builds DOM once, reuses)
- Keyboard navigation (Esc, ArrowLeft, ArrowRight)
- Touch swipe support (>44px threshold)
- Thumbnail strip with active state
- Preloads adjacent images
Wire via data-lb-idx and data-lb-open attributes on HTML elements.
```

### Phase 7 — Build & deploy

```
1. Run npm run build — verify dist/ contains all pages with partials injected
2. Push to GitHub
3. Connect repo to Vercel (or run vercel --prod)
4. Add custom domain in Vercel dashboard
5. Point GoDaddy nameservers to Vercel (ns1.vercel-dns.com, ns2.vercel-dns.com)
6. Wait for DNS propagation (< 2 hours usually)
7. Verify HTTPS is active
```

---

## 21. Quick Reference

| Task | Command / Where |
|------|-----------------|
| Start dev server | `npm start` → http://localhost:5000 |
| Build for production | `npm run build` → `dist/` |
| Add a new page | Create HTML + CSS, add both to `build.js` arrays |
| Add a new partial | Create in `partials/`, add read + replace in `build.js` |
| Add a new gallery photo | Add entry to `PHOTOS` array in `gallery.js` |
| Change brand colors | Edit CSS custom properties in `:root` in `style.css` |
| Change navbar links | Edit `partials/navbar.html` |
| Deploy to production | `vercel --prod` or push to GitHub (auto-deploy) |
| Cloudinary cloud name | `djcgfqesd` |
| Cloudinary folder | `microtel` |
