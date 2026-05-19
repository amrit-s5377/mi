# Microtel Williston — Complete Build Instructions
### From scratch to production. Every step. For any AI agent.

---

## 0. Project Context (Read Before Building)

**What this is:** A pure static marketing website for a Wyndham-franchise hotel (Microtel Inn & Suites by Wyndham, Williston ND). It does **not** handle bookings directly. All booking flows go to Wyndham.com (nightly) or via phone/enquiry form (extended-stay, corporate, crew blocks).

**Business model:**
- Wyndham controls nightly booking at Wyndham.com (~6-8% commission vs OTA's 15-25%)
- Phone / enquiry form captures extended-stay, corporate, and crew-block leads at $0 commission
- The site's job: tell the product story, rank in Google, and route the right traffic to the right CTA

**Primary guest personas:**
1. Bakken oilfield crews (21/7, 14/14 rotations) — need weekly/monthly rates, crew blocks
2. Travel nurses (13-week contracts) — need monthly rate, direct billing
3. Business travelers / transient guests — nightly via Wyndham.com

**Always lead with:** Queen Kitchenette Suite (39 newly renovated full-kitchen suites) — this is the premium differentiator.

**CTA hierarchy:**
1. Call (701) 572-2000 — extended-stay, corporate, crew
2. Book on Wyndham.com — nightly transient
3. Send Enquiry — group/workforce/direct billing

---

## 1. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Markup | HTML5, semantic | No framework overhead, fast, fully indexable |
| Styling | CSS3, custom properties | No preprocessor, design tokens, zero build deps |
| Scripting | Vanilla JS + GSAP 3.12.5 from CDN | Animations only, no framework |
| Dev server | Node.js (`server.js`, port 5000) | Injects partials on the fly |
| Build | Node.js (`build.js`) | Outputs `dist/` with partials injected |
| Images | Cloudinary CDN | Auto WebP/AVIF, transform URLs, no local assets |
| Hosting | GoDaddy shared hosting (Apache) | Upload `dist/` to `public_html` |
| Domain | `microtelwilliston.com` (no www) | Canonical — all canonicals point here |

---

## 2. Design System

### 2.1 Color Tokens

Define in `style.css` `:root`. Use these variables everywhere — never hardcode hex values.

```css
:root {
  --teal:       #0d7f6e;   /* primary brand — buttons, accents, links */
  --teal-d:     #085f53;   /* hover/active state */
  --teal-l:     #3aaa96;   /* lighter accent, gradients */
  --teal-pale:  #e6f5f2;   /* badge backgrounds, highlights */
  --teal-xpale: #f0faf8;   /* section backgrounds, price blocks */
  --slate:      #1e2d3d;   /* hero, navbar, dark sections */
  --slate-d:    #111e2a;   /* loader background */
  --slate-m:    #2e4560;   /* mid-dark elements */
  --cream:      #f8faf9;   /* page body background */
  --white:      #ffffff;
  --ink:        #0f1a14;   /* primary text */
  --ink-m:      #4a5e56;   /* secondary / body text */
  --ink-l:      #8aa09a;   /* muted / label text */
  --border:     #deeae6;   /* default borders */
  --border-d:   #c4d8d2;   /* stronger borders */
  --serif:      'DM Serif Display', Georgia, serif;
  --sans:       'Inter', system-ui, sans-serif;
  --ease-out:   cubic-bezier(0.22, 1, 0.36, 1);
  --ease:       cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 2.2 Base Reset

The two most important global rules — get these right from the start:

```css
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

/* overflow-x: clip (not hidden) — clip prevents horizontal overflow without
   creating a scroll container, so position:sticky still works on all pages. */
html {
  scroll-behavior: smooth;
  font-size: 16px;
  overflow-x: clip;
  overscroll-behavior-x: none; /* kills iOS horizontal rubber-band bounce */
}
body {
  font-family: var(--sans);
  background: var(--cream);
  color: var(--ink);
  overflow-x: clip;
  overscroll-behavior-x: none;
  -webkit-font-smoothing: antialiased;
}
```

> **Critical:** Using `overflow-x: hidden` on `html` or `body` breaks `position: sticky`. Use `clip` instead — identical visual result, does not create a scroll container.

### 2.3 Typography

Load fonts in every `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

| Element | Font | Size | Weight |
|---|---|---|---|
| Hero H1 | `--serif` | `clamp(2.6rem, 5.5vw, 5rem)` | 400 |
| Section H2 | `--serif` | `clamp(1.8rem, 3.2vw, 2.8rem)` | 400 |
| Eyebrow | `--sans` | 0.6rem | 600, uppercase, letter-spacing 0.38em |
| Body text | `--sans` | 0.88rem | 300, line-height 1.85 |
| Nav links | `--sans` | 0.7rem | 400, uppercase, letter-spacing 0.12em |
| Buttons / CTAs | `--sans` | 0.68–0.72rem | 600, uppercase, letter-spacing 0.12em |

`<em>` tags inside headings → italic teal (`color: var(--teal-l); font-style: italic`).

---

## 3. File Structure

```
/
├── index.html                    # Homepage / landing page
├── kitchenette.html              # Queen Kitchenette Suite detail (primary product)
├── extended-stay.html            # Weekly & monthly rates
├── amenities.html                # Hotel amenities
├── property-details.html         # Full property specs
├── corporate.html                # Corporate & group bookings
├── meetings.html                 # Meeting room
├── contact.html                  # Contact page
├── bakken-oilfield-housing.html  # SEO landing — Bakken crew housing
├── travel-nurse-housing.html     # SEO landing — travel nurse housing
├── 404.html                      # Custom 404 page
│
├── style.css          # SHARED — tokens, reset, navbar, footer, common components
├── home.css           # Homepage only
├── kitchenette.css    # Kitchenette page only
├── extended-stay.css  # Extended-stay page only
├── amenities.css      # Amenities page only
├── property-details.css
├── corporate.css
├── meetings.css
├── contact.css
├── bakken.css
├── travel-nurse.css
├── 404.css
│
├── main.js            # GSAP scroll animations + navbar scroll + loader (all pages)
├── gallery.js         # Vanilla JS lightbox photo viewer
│
├── partials/
│   ├── navbar.html    # Site-wide navigation
│   ├── footer.html    # Site-wide footer
│   └── enquiry.html   # Enquiry / contact form section
│
├── sitemap.xml        # All pages, canonical URLs, priorities
├── robots.txt         # Allow all, Sitemap pointer
├── .htaccess          # Apache: HTTPS redirect, www→non-www, gzip, caching, security
├── favicon.svg        # SVG favicon (works in all modern browsers)
├── site.webmanifest   # PWA manifest (theme color, icons)
│
├── server.js          # Dev server (Node.js, port 5000, injects partials on request)
├── build.js           # Production build → dist/
├── package.json       # npm scripts: start, build
└── dist/              # Build output — upload this entire folder to host
```

---

## 4. Partial Injection System

Shared HTML (navbar, footer, enquiry form) lives in `partials/` and is injected by the build script and dev server. This avoids copy-pasting across 11 pages.

### Markers (insert in HTML where the partial should appear)

```html
<!--PARTIAL:navbar-->
<!--PARTIAL:enquiry-->
<!--PARTIAL:footer-->
```

### `build.js` — how it works

```js
const PAGES = ['index.html', 'amenities.html', /* ...all pages... */];
const ASSETS = ['style.css', 'home.css', /* ...all CSS, JS, and static files... */,
                'sitemap.xml', 'robots.txt', '.htaccess', 'favicon.svg', 'site.webmanifest'];

// Read partials once
const navbar  = fs.readFileSync('partials/navbar.html',  'utf8');
const footer  = fs.readFileSync('partials/footer.html',  'utf8');
const enquiry = fs.readFileSync('partials/enquiry.html', 'utf8');

// For each page: inject partials, write to dist/
PAGES.forEach(page => {
  let html = fs.readFileSync(page, 'utf8');
  html = html
    .replace(/<!--PARTIAL:navbar-->/g,  navbar)
    .replace(/<!--PARTIAL:enquiry-->/g, enquiry)
    .replace(/<!--PARTIAL:footer-->/g,  footer);
  fs.writeFileSync(path.join('dist', page), html);
});

// Copy all static assets to dist/
ASSETS.forEach(asset => fs.copyFileSync(asset, path.join('dist', asset)));
```

### Adding a new page

1. Create `newpage.html` + `newpage.css` in root
2. Add `'newpage.html'` to `PAGES` array in `build.js`
3. Add `'newpage.css'` to `ASSETS` array in `build.js`
4. Add canonical URL to `sitemap.xml`

---

## 5. Complete `<head>` Template

Use this for **every page**. Swap out page-specific values. All canonical URLs use `https://microtelwilliston.com` (no www).

```html
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- ═══ SEO ═══ -->
  <title>Page Title ≤60 chars | Microtel Inn &amp; Suites Williston ND</title>
  <meta name="description" content="Unique description ≤160 chars. Include Williston ND and primary keyword.">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <meta name="googlebot" content="index, follow">
  <link rel="canonical" href="https://microtelwilliston.com/pagename.html">

  <!-- Geo / Local SEO -->
  <meta name="geo.region" content="US-ND">
  <meta name="geo.placename" content="Williston, North Dakota">
  <meta name="geo.position" content="48.1470;-103.6180">
  <meta name="ICBM" content="48.1470, -103.6180">

  <!-- Open Graph -->
  <meta property="og:locale" content="en_US">
  <meta property="og:site_name" content="Microtel Williston">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://microtelwilliston.com/pagename.html">
  <meta property="og:title" content="Page Title ≤60 chars">
  <meta property="og:description" content="Same as meta description.">
  <meta property="og:image" content="https://res.cloudinary.com/djcgfqesd/image/upload/w_1200,h_630,c_fill,f_auto,q_auto/v.../filename.avif">
  <meta property="og:image:alt" content="Microtel Inn &amp; Suites by Wyndham Williston exterior">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Page Title">
  <meta name="twitter:description" content="Same as meta description.">
  <meta name="twitter:image" content="same Cloudinary URL as og:image">

  <!-- Favicon -->
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="favicon.svg">
  <link rel="manifest" href="site.webmanifest">
  <meta name="theme-color" content="#0d7f6e">

  <!-- Schema.org — Homepage only (Hotel + Organization + BreadcrumbList in @graph) -->
  <!-- Inner pages: BreadcrumbList + page-type schema (HotelRoom, etc.) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Hotel",
        "@id": "https://microtelwilliston.com/#hotel",
        "name": "Microtel Inn & Suites by Wyndham Williston",
        "url": "https://microtelwilliston.com/",
        "telephone": "+17015722000",
        "email": "sales@merlinhotelgroup.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "3820 4th Avenue West",
          "addressLocality": "Williston",
          "addressRegion": "ND",
          "postalCode": "58801",
          "addressCountry": "US"
        },
        "geo": { "@type": "GeoCoordinates", "latitude": 48.1470, "longitude": -103.6180 },
        "image": "https://res.cloudinary.com/.../hotel-outside.avif",
        "priceRange": "$$",
        "starRating": { "@type": "Rating", "ratingValue": "3" },
        "numberOfRooms": 77,
        "petsAllowed": true,
        "checkinTime": "15:00",
        "checkoutTime": "11:00",
        "amenityFeature": [
          { "@type": "LocationFeatureSpecification", "name": "Full Kitchen Suites", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Free Wi-Fi", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Free Parking", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Free Hot Breakfast", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Free Guest Laundry", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Indoor Heated Pool", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Fitness Center", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "24-Hour Front Desk", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Pet Friendly", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Meeting Room (800 sq ft)", "value": true }
        ],
        "makesOffer": [
          {
            "@type": "Offer",
            "name": "Queen Kitchenette Suite — Nightly Rate",
            "priceCurrency": "USD",
            "priceSpecification": { "@type": "PriceSpecification", "minPrice": "129", "maxPrice": "225", "priceCurrency": "USD" },
            "availability": "https://schema.org/InStock",
            "url": "https://www.wyndhamhotels.com/microtel/williston-north-dakota/microtel-williston/overview"
          },
          {
            "@type": "Offer",
            "name": "Queen Kitchenette Suite — Weekly Rate",
            "priceCurrency": "USD",
            "priceSpecification": { "@type": "UnitPriceSpecification", "price": "799", "priceCurrency": "USD", "unitText": "WEEK" },
            "availability": "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            "name": "Queen Kitchenette Suite — Monthly Rate",
            "priceCurrency": "USD",
            "priceSpecification": { "@type": "UnitPriceSpecification", "price": "2799", "priceCurrency": "USD", "unitText": "MONTH" },
            "availability": "https://schema.org/InStock"
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://microtelwilliston.com/" }
        ]
      }
    ]
  }
  </script>

  <!-- Preconnect -->
  <link rel="preconnect" href="https://res.cloudinary.com">
  <link rel="dns-prefetch" href="https://res.cloudinary.com">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">

  <!-- GSAP -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

  <!-- Stylesheets -->
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="pagename.css">
</head>
```

### SEO limits — enforce on every page

| Tag | Limit | Notes |
|---|---|---|
| `<title>` | ≤60 chars (rendered) | `&amp;` = 1 char |
| `meta description` | ≤160 chars (rendered) | |
| `og:title` | ≤60 chars | Same as title or shorter |
| `og:description` | ≤160 chars | Same as meta description |
| Canonical | Must point to `microtelwilliston.com` | Never Wyndham, never vercel URL |
| 404 page | `noindex, follow` | No canonical on 404 |

---

## 6. Page Body Template

```html
<body>

  <!-- LOADER (homepage only; optional on inner pages) -->
  <div id="loader">
    <div id="ldInner">
      <div class="ld-logo" id="ldLogo"><span class="ld-m">M</span>icrotel</div>
      <p class="ld-sub">Williston, North Dakota</p>
      <div class="ld-bar-track"><div class="ld-bar" id="ldBar"></div></div>
    </div>
  </div>

  <!--PARTIAL:navbar-->

  <!-- HERO SECTION -->

  <!-- ANCHOR NAV (if multi-section page) -->

  <main>
    <!-- PAGE SECTIONS -->
  </main>

  <!--PARTIAL:enquiry-->
  <!--PARTIAL:footer-->

  <script src="main.js"></script>
  <!-- <script src="gallery.js"></script> only on pages with photo gallery -->

</body>
```

---

## 7. Homepage — Special Components

The homepage (`index.html` + `home.css`) has several unique components not on inner pages.

### 7.1 Hero Section Structure

```html
<section class="hero" id="heroSec" aria-label="Hero">
  <div class="hero-bg" id="heroBg" role="img" aria-label="Microtel Inn Williston hotel exterior"></div>
  <div class="hero-tint"></div>
  <div class="hero-layout">
    <div class="hero-copy">

      <!-- Chip row: property badge + animated price badge -->
      <div class="hero-chip-row">
        <div class="hero-chip" id="hChip">
          <span class="chip-dot"></span>
          39 Newly Renovated Kitchenette Suites
        </div>
        <div class="hero-price-badge">
          <div class="hpb-cycle" role="text" aria-label="From $129 per night — weekly and monthly rates available">
            <span class="hpb-c-price">
              <span class="hpb-label">From</span>
              <strong>$129</strong>
              <span class="hpb-per">/ night</span>
            </span>
            <span class="hpb-c-rates" aria-hidden="true">Weekly &middot; Monthly Rates</span>
          </div>
          <a href="kitchenette.html" class="hpb-link" aria-label="View Queen Kitchenette Suite">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
              <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5"/>
            </svg>
          </a>
        </div>
      </div>

      <h1 class="hero-h1">...</h1>
      <p class="hero-sub">...</p>
      <div class="hero-actions">...</div>
    </div>
  </div>
</section>
```

### 7.2 Animated Price Badge CSS

The badge cycles between price and rate text using a CSS grid overlay + blur crossfade:

```css
/* Both spans share the same grid cell — they overlap */
.hpb-cycle { display: grid; grid-template-areas: 'text'; }
.hpb-c-price, .hpb-c-rates {
  grid-area: text;
  white-space: nowrap;
  display: flex; align-items: baseline; gap: 0.4rem; line-height: 1;
}

/* Price: visible 0–38%, fades 46–94%, back at 100% */
.hpb-c-price { animation: hpb-price-in 6s ease-in-out infinite; }
@keyframes hpb-price-in {
  0%, 38%  { opacity: 1; filter: blur(0px); }
  46%, 94% { opacity: 0; filter: blur(5px); }
  100%     { opacity: 1; filter: blur(0px); }
}

/* Rates: hidden 0–40%, visible 50–88%, fades 96–100% */
.hpb-c-rates { animation: hpb-rates-in 6s ease-in-out infinite; }
@keyframes hpb-rates-in {
  0%, 40%  { opacity: 0; filter: blur(5px); }
  50%, 88% { opacity: 1; filter: blur(0px); }
  96%, 100% { opacity: 0; filter: blur(5px); }
}

/* Entrance animation — badge fades in 1.5s after hero loads */
.hero-price-badge { animation: hpb-appear 0.65s var(--ease-out) 1.5s both; }
@keyframes hpb-appear {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Price numeral — DM Serif italic for elegance */
.hpb-c-price strong {
  font-family: var(--serif); font-style: italic;
  font-size: 1.75rem; font-weight: 400; color: #fff; line-height: 1;
  text-shadow: 0 0 32px rgba(255,255,255,0.22), 0 0 60px rgba(58,170,150,0.35);
}
```

### 7.3 Room Card with Price Overlay on Hover

Price appears at the bottom of the card image on hover (desktop), always visible on mobile touch devices:

```html
<div class="room-card room-card--featured">
  <div class="room-img">
    <img src="..." alt="...">
    <span class="room-tag room-tag--teal">★ New</span>
    <!-- Price overlay — on image bottom, revealed on hover -->
    <div class="room-price-overlay">
      <div class="rpo-top">
        <span class="rpo-from">From</span>
        <span class="rpo-amount">$129</span>
        <span class="rpo-unit">/ night</span>
      </div>
      <span class="rpo-ext">Weekly from $799 &middot; Monthly from $2,799</span>
    </div>
  </div>
  <div class="room-body">
    <!-- NO price here — price is on the image overlay only -->
    <h3 class="room-name">Queen Kitchenette Suite</h3>
    ...
  </div>
</div>
```

```css
.room-price-overlay {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(to top, rgba(11,20,30,0.9) 0%, rgba(11,20,30,0.55) 60%, transparent 100%);
  padding: 2.2rem 1rem 0.9rem;
  transform: translateY(30%); opacity: 0;
  transition: transform 0.38s ease, opacity 0.32s ease;
  pointer-events: none;
}

/* Desktop: reveal on hover */
@media (hover: hover) {
  .room-card--featured:hover .room-price-overlay { transform: translateY(0); opacity: 1; }
}

/* Mobile touch: always visible (no hover available) */
@media (hover: none) {
  .room-price-overlay { transform: translateY(0); opacity: 1; }
}
```

### 7.4 Seasonal Pricing Banner

Placed between the Rooms section and the Reserve/Booking section:

```html
<div class="seasonal-banner reveal">
  <div class="sb-inner">
    <div class="sb-label">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
        <rect x="2" y="3" width="12" height="12" rx="2"/><path d="M5 1v3M11 1v3M2 7h12"/>
      </svg>
      Bakken Seasonal Pricing
    </div>
    <p class="sb-text">
      Nightly rates from <strong>$99</strong> in low season up to <strong>$225</strong>
      during peak July drilling season. Book nightly stays on
      <a href="https://www.wyndhamhotels.com/microtel/williston-north-dakota/microtel-williston/overview"
         target="_blank" rel="noopener">Wyndham.com</a>
      — or call us for weekly/monthly extended-stay quotes.
    </p>
    <a href="tel:+17015722000" class="sb-cta">Call for Quote</a>
  </div>
</div>
```

```css
.seasonal-banner {
  background: var(--teal-xpale);
  border-top: 1px solid rgba(13,127,110,0.12);
  border-bottom: 1px solid rgba(13,127,110,0.12);
  padding: 0.9rem 5vw;
}
.sb-inner {
  max-width: 900px; margin: 0 auto;
  display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap;
}
.sb-label {
  display: flex; align-items: center; gap: 0.4rem;
  font-size: 0.6rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--teal-d); white-space: nowrap; flex-shrink: 0;
}
.sb-text { font-size: 0.79rem; color: var(--ink-m); line-height: 1.55; flex: 1; }
.sb-text strong { color: var(--slate); font-weight: 600; }
.sb-text a { color: var(--teal-d); font-weight: 500; text-decoration: underline; }
.sb-cta {
  font-size: 0.6rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
  padding: 8px 16px; background: var(--teal); color: #fff;
  border-radius: 6px; text-decoration: none; white-space: nowrap;
  flex-shrink: 0; transition: background 0.2s;
}
.sb-cta:hover { background: var(--teal-d); }
@media (max-width: 600px) {
  .sb-cta { width: 100%; text-align: center; }
}
```

### 7.5 Reserve Your Stay / Booking Explainer Section

Three-card grid explaining HOW to book (Wyndham.com / phone / enquiry). Uses border beam animation on hover.

```html
<section class="booking-explainer-sec" id="how-to-book" aria-labelledby="be-heading">
  <div class="be-eyebrow">Best Way to Book</div>
  <h2 class="be-h2" id="be-heading">Reserve <em>Your Stay</em></h2>
  <div class="be-grid">
    <div class="be-card">
      <!-- icon-wrap + h5 + p + CTA link -->
      <h5>Online via Wyndham.com</h5>
      <p>Secure instant confirmation and earn Wyndham Rewards points. Best for nightly reservations.</p>
      <a href="https://www.wyndhamhotels.com/..." target="_blank" rel="noopener" class="be-cta">
        Check Availability
        <svg><!-- arrow --></svg>
      </a>
    </div>
    <div class="be-card be-featured">
      <h5>Call Our Front Desk</h5>
      <p>Speak with our team for weekly, monthly, and corporate rates. Available 24 hours.</p>
      <a href="tel:+17015722000" class="be-cta be-cta--phone">(701) 572-2000</a>
    </div>
    <div class="be-card">
      <h5>Corporate &amp; Group Enquiry</h5>
      <p>For crew blocks, direct billing, and long-term workforce solutions.</p>
      <a href="#enquiry" class="be-cta">Send Enquiry <svg><!-- arrow --></svg></a>
    </div>
  </div>
</section>
```

#### Border Beam Animation (CSS-only, on `.be-card:hover::after`)

Requires `@property` for animating a CSS custom property angle:

```css
@property --be-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.be-card {
  position: relative; isolation: isolate; overflow: hidden;
  border: 1px solid var(--border); border-radius: 12px;
}

/* The rotating beam sits in ::after, masked to show only the border strip */
.be-card::after {
  content: ''; position: absolute; inset: 0; border-radius: 12px;
  padding: 1.5px; /* thickness of the beam strip */
  background: conic-gradient(
    from var(--be-angle),
    transparent 0deg, transparent 310deg,
    rgba(58,170,150,0.55) 345deg, rgba(255,255,255,0.85) 360deg,
    rgba(58,170,150,0.55) 15deg, transparent 45deg
  );
  /* CSS mask: show only the padding area (the border strip) */
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: be-spin 2.5s linear infinite;
  opacity: 0; transition: opacity 0.4s;
  pointer-events: none; z-index: -1;
}
.be-card:hover::after { opacity: 1; }
@keyframes be-spin { to { --be-angle: 360deg; } }
```

### 7.6 Sticky Mobile Price Bar

Fixed bar at bottom of screen on mobile (`≤768px`). Shows from price + two CTAs:

```html
<div class="mobile-price-bar" id="mobilePriceBar" aria-label="Quick booking">
  <div class="mpb-content">
    <div class="mpb-price">
      <span class="mpb-from">From</span>
      <span class="mpb-amount">$129</span>
      <span class="mpb-unit">/ night</span>
    </div>
    <div class="mpb-ctas">
      <a href="tel:+17015722000" class="mpb-cta mpb-call">Call</a>
      <a href="https://www.wyndhamhotels.com/..." target="_blank" rel="noopener" class="mpb-cta mpb-book">
        Book Wyndham
      </a>
    </div>
  </div>
</div>
```

```css
.mobile-price-bar {
  display: none; /* shown only on mobile via media query below */
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 900;
  background: var(--white); border-top: 1px solid var(--border);
  box-shadow: 0 -4px 20px rgba(14,30,42,0.1);
  padding: 0.6rem 1.2rem;
}
.mpb-content { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; }
.mpb-price { display: flex; align-items: baseline; gap: 0.25rem; }
.mpb-amount { font-size: 1.3rem; font-weight: 800; color: var(--slate); }
.mpb-ctas { display: flex; gap: 0.5rem; }
.mpb-cta {
  padding: 0.6rem 0.9rem; border-radius: 7px;
  font-size: 0.72rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
  text-decoration: none; white-space: nowrap; transition: opacity 0.2s;
}
.mpb-call { background: var(--teal-pale); color: var(--teal-d); }
.mpb-book { background: var(--teal); color: #fff; }
@media (max-width: 768px) {
  .mobile-price-bar { display: block; }
  body { padding-bottom: 72px; } /* prevent content hidden behind bar */
}
```

---

## 8. Anchor Navigation Pattern

Use on any page with 3+ scroll sections. Sticky below the navbar at `top: 68px` (navbar height).

```css
.page-anchor-nav {
  background: var(--white);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 68px;       /* exactly navbar height */
  z-index: 100;
  box-shadow: 0 2px 16px rgba(14,30,42,0.06);
}
.page-anchor-inner {
  display: flex; align-items: center;
  overflow-x: auto; scrollbar-width: none;
  max-width: 1280px; margin: 0 auto; padding: 0 5vw;
}
.page-anchor-inner::-webkit-scrollbar { display: none; }
.page-anchor-link {
  display: inline-flex; align-items: center; gap: 6px; flex-shrink: 0;
  font-size: 0.68rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--ink-l); padding: 14px 16px;
  border-bottom: 2px solid transparent; margin-bottom: -1px;
  transition: color 0.2s, border-color 0.2s; white-space: nowrap;
}
.page-anchor-link:hover,
.page-anchor-link.active { color: var(--teal-d); border-bottom-color: var(--teal); font-weight: 600; }
```

```html
<nav class="page-anchor-nav" aria-label="Page sections">
  <div class="page-anchor-inner">
    <a href="#section-id" class="page-anchor-link">
      <svg><!-- 14×14 icon --></svg> Section Name
    </a>
  </div>
</nav>
```

Scroll-spy (inline script before `</body>`):

```html
<script>
(function () {
  var links = Array.from(document.querySelectorAll('.page-anchor-link'));
  var sections = links.map(function(l) {
    return document.getElementById(l.getAttribute('href').slice(1));
  });
  function update() {
    var active = -1;
    sections.forEach(function(s, i) {
      if (s && s.getBoundingClientRect().top <= 140) active = i;
    });
    links.forEach(function(l, i) { l.classList.toggle('active', i === active); });
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();
</script>
```

> **Why sticky works:** Because `html` and `body` use `overflow-x: clip` (not `hidden`). `clip` does not create a new scroll container, so `position: sticky` resolves against the viewport correctly.

---

## 9. Extended-Stay Rate Cards

Used on `extended-stay.html`. Three cards: Nightly / Weekly (Most Popular) / Monthly (Best Value).

```html
<!-- Lead-in text above the grid -->
<p class="ext-rates-intro">Stay longer, pay less. Nightly transient bookings are best on Wyndham.com.
  For weekly, monthly, corporate, or crew-block rates — call us directly for a custom quote.</p>

<div class="ext-rate-grid">

  <!-- Nightly -->
  <div class="ext-rate-card">
    <div class="erc-badge erc-badge--book">Nightly · Book Online</div>
    <div class="erc-icon">🌙</div>
    <h3 class="erc-title">Nightly</h3>
    <p class="erc-desc">Flexible. No minimum stay. Full kitchen access. All amenities included.</p>
    <ul class="erc-list">...</ul>
    <div class="erc-price">
      <span class="erc-price-from">From</span>
      <span class="erc-price-num">$129</span>
      <span class="erc-price-period">/ night</span>
    </div>
    <a href="https://www.wyndhamhotels.com/..." class="erc-btn">Book on Wyndham →</a>
  </div>

  <!-- Weekly — Most Popular -->
  <div class="ext-rate-card ext-rate-card--mid">
    <div class="erc-badge erc-badge--popular">★ Most Popular · Call Direct</div>
    <div class="erc-icon">📅</div>
    <h3 class="erc-title">Weekly</h3>
    <p class="erc-desc">Lower per-night cost than transient rates. Cook in and save.</p>
    <ul class="erc-list">...</ul>
    <div class="erc-price">
      <span class="erc-price-from">From</span>
      <span class="erc-price-num">$799</span>
      <span class="erc-price-period">/ week</span>
      <span class="erc-price-avg">~$114 / night avg · Custom quote available</span>
    </div>
    <a href="tel:+17015722000" class="erc-btn">Call for Weekly Rate →</a>
  </div>

  <!-- Monthly — Best Value -->
  <div class="ext-rate-card ext-rate-card--best">
    <div class="erc-badge">Best Value</div>
    <div class="erc-icon">🏠</div>
    <h3 class="erc-title">Monthly</h3>
    <p class="erc-desc">Our lowest per-night value. All-inclusive. Direct billing available.</p>
    <ul class="erc-list">...</ul>
    <div class="erc-price">
      <span class="erc-price-from">From</span>
      <span class="erc-price-num">$2,799</span>
      <span class="erc-price-period">/ month</span>
      <span class="erc-price-avg">~$93 / night avg · Direct billing accepted</span>
    </div>
    <a href="tel:+17015722000" class="erc-btn erc-btn--teal">Call for Monthly Rate →</a>
  </div>

</div>

<!-- Disclaimer after grid -->
<p class="ext-rates-disclaimer">* Rates vary by season and availability. Corporate &amp; crew block
  rates available upon request. Direct billing accepted for verified corporate accounts and major
  travel nurse agencies (AMN, Aya, Cross Country). For nightly bookings, please use Wyndham.com
  to ensure Wyndham Rewards points are credited to your account.</p>
```

Key CSS classes:

```css
.erc-badge {
  position: absolute; top: -13px; left: 50%; transform: translateX(-50%);
  font-size: 0.55rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
  background: var(--teal); color: #fff; padding: 4px 14px; border-radius: 999px;
}
.erc-badge--book    { background: var(--teal-pale); color: var(--teal-d); }
.erc-badge--popular { background: var(--slate); color: #fff; }

.erc-price-avg {
  flex-basis: 100%; text-align: center;
  font-size: 0.62rem; color: var(--ink-l); font-style: italic; padding-top: 0.15rem;
}
.ext-rates-intro {
  font-size: 0.85rem; color: var(--ink-m); line-height: 1.7;
  text-align: center; max-width: 580px; margin: 1rem auto 0;
}
.ext-rates-disclaimer {
  font-size: 0.68rem; color: var(--ink-l); line-height: 1.75;
  text-align: center; font-style: italic; margin-top: 1.4rem;
  max-width: 720px; margin-left: auto; margin-right: auto;
}
```

---

## 10. Gallery & Lightbox (`gallery.js`)

Self-contained vanilla JS lightbox. Reads from a `PHOTOS` array, builds the lightbox DOM dynamically.

### `gallery.js` structure

```js
var PHOTOS = [
  { name: 'cloudinary-filename.avif', cap: 'Caption for the photo' },
  // ...
];

var CL     = 'https://res.cloudinary.com/djcgfqesd/image/upload';
var V      = 'v1778701557'; // Cloudinary version string for your uploads
function cl(t, filename) { return CL + '/' + t + '/' + V + '/' + filename; }
// Thumbnail: cl('w_200,f_auto,q_auto', filename)
// Lightbox:  cl('w_1400,f_auto,q_auto', filename)
```

Trigger with data attributes on any element:

```html
<div data-lb-idx="0">  <!-- opens lightbox at photo 0 -->
<button data-lb-open="0">View all photos</button>
```

### Gallery grid HTML

```html
<div class="d-gallery">
  <div class="d-gimg d-gimg--wide" data-lb-idx="0">
    <img src="..." srcset="... 700w, ... 1000w, ... 1400w" sizes="..." alt="..." loading="lazy">
  </div>
  <div class="d-gimg" data-lb-idx="1">
    <img src="..." alt="..." loading="lazy">
  </div>
  <!-- repeat for more photos -->
</div>
<button class="view-all-btn" data-lb-open="0">View all N photos</button>
```

---

## 11. Navbar (`partials/navbar.html`)

Fixed, `z-index: 800`, height `68px`. Glassmorphic dark by default, transitions to light when scrolled.

- **Desktop (>900px):** Horizontal links + dropdown + "Book Now" button
- **Mobile (≤900px):** Hamburger icon + full-screen drawer with large serif links

JS in `main.js` handles:
- Scroll → adds `.light` class to `#siteNav` after 60px scroll
- Hamburger click → toggles `.mob-drawer` open/closed

---

## 12. Footer (`partials/footer.html`)

Dark slate (`var(--slate-d)`) background. Three columns:
1. Brand / tagline / social icons
2. Quick navigation links
3. Contact: address, phone `(701) 572-2000`, email `sales@merlinhotelgroup.com`

Bottom strip: copyright + Wyndham franchise attribution.

---

## 13. Enquiry Form (`partials/enquiry.html`)

Full-width dark section. Static HTML form (no JS validation, no backend). Fields:
- Name, Email, Phone (3-column desktop, stacked mobile)
- Check-in / Check-out (date inputs)
- Number of guests
- Message (textarea)
- Submit button

Wire to a form backend (Netlify Forms, Formspree, etc.) by adding `action=` and `method="POST"` to `<form>`.

---

## 14. Scroll Animations (`main.js`)

Three responsibilities:

### 14.1 Loader

On `DOMContentLoaded`: animates the `#loader` overlay — logo fades in, progress bar fills, overlay fades out. Fires only if `#loader` exists.

### 14.2 Navbar scroll behavior

```js
window.addEventListener('scroll', function() {
  document.getElementById('siteNav').classList.toggle('light', window.scrollY > 60);
}, { passive: true });
```

### 14.3 GSAP ScrollTrigger reveal

```js
gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .reveal-up').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: el.classList.contains('reveal-l') ? 0 :
                    el.classList.contains('reveal-r') ? 0 : 40,
      x: el.classList.contains('reveal-l') ? -40 :
         el.classList.contains('reveal-r') ? 40 : 0 },
    { opacity: 1, y: 0, x: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    }
  );
});
```

Add to any element: `class="reveal"`, `class="reveal-l"`, `class="reveal-r"`, or `class="reveal-up"`.

---

## 15. Cloudinary Image CDN

**Cloud name:** `djcgfqesd`

### URL format

```
https://res.cloudinary.com/djcgfqesd/image/upload/{transforms}/{version}/{filename}
```

Version is a timestamp like `v1778701557` — Cloudinary assigns it on upload.

### Transform cheatsheet

| Use case | Transform string |
|---|---|
| Hero background (CSS) | `w_1800,f_auto,q_auto` |
| OG / social share | `w_1200,h_630,c_fill,f_auto,q_auto` |
| Gallery large | `w_1000,f_auto,q_auto` |
| Gallery grid | `w_700,f_auto,q_auto` |
| Lightbox thumbnail | `w_200,f_auto,q_auto` |
| Room card image | `w_800,f_auto,q_auto` |
| Dialog/modal image | `w_900,f_auto,q_auto` |

`f_auto` → auto-selects WebP or AVIF based on browser. `q_auto` → Cloudinary picks quality.

### Image naming convention

```
microtel-williston-{descriptive-subject}.jpg
```

Always lowercase, hyphens, location keyword, specific description. Never: spaces, underscores, `1.jpg`, `photo.jpg`.

### Always use `srcset` for `<img>` tags

```html
<img
  src="https://res.cloudinary.com/djcgfqesd/image/upload/w_700,f_auto,q_auto/v.../filename.avif"
  srcset="
    https://res.cloudinary.com/djcgfqesd/image/upload/w_400,f_auto,q_auto/v.../filename.avif 400w,
    https://res.cloudinary.com/djcgfqesd/image/upload/w_700,f_auto,q_auto/v.../filename.avif 700w,
    https://res.cloudinary.com/djcgfqesd/image/upload/w_1000,f_auto,q_auto/v.../filename.avif 1000w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Specific visible-content description"
  width="700" height="467"
  loading="lazy">
```

Use `loading="eager"` only for the hero/above-fold image.

---

## 16. Shared Component Classes (`style.css`)

### Layout

```html
<section class="sec">         <!-- 96px vertical padding, 8vw horizontal -->
<section class="sec sec--alt"> <!-- same + white background -->
<div class="d-layout">        <!-- two-column: main content + sidebar -->
  <div class="d-main">...</div>
  <aside class="d-sidebar">
    <div class="d-card">...</div>  <!-- white card, border, shadow -->
  </aside>
</div>
```

### Typography hierarchy

```html
<span class="eyebrow">SECTION LABEL</span>         <!-- teal, small caps -->
<h2 class="sec-h2">Title with <em>accent</em></h2> <!-- serif, em = italic teal -->
<p class="sec-sub">Lead paragraph.</p>             <!-- slightly larger body -->
<p class="body-text">Body copy.</p>                <!-- 0.88rem, 300 weight -->
```

### Buttons

```html
<a class="btn-primary">Primary (teal bg)</a>
<a class="btn-primary btn-primary--light">Primary light variant</a>
<a class="btn-secondary">Secondary (outlined)</a>
<a class="btn-ghost-light">Ghost (dark bg contexts)</a>
```

### Lists

```html
<ul class="check-list">  <!-- auto teal ✓ bullets -->
<ul class="info-list">   <!-- label / value pairs for sidebar -->
```

### Scroll reveal

```html
<div class="reveal">    <!-- fade up from below -->
<div class="reveal-l">  <!-- slide from left -->
<div class="reveal-r">  <!-- slide from right -->
<div class="reveal-up"> <!-- pure upward fade -->
```

---

## 17. Responsive Breakpoints

Consistent across all CSS files:

```css
@media (max-width: 1100px) { /* two-column → stacked */ }
@media (max-width: 900px)  { /* desktop nav → hamburger */ }
@media (max-width: 768px)  { /* mobile layout, hero shrinks */ }
@media (max-width: 480px)  { /* small phones */ }

/* Touch vs pointer device (for hover effects) */
@media (hover: hover) { /* desktop: reveal price on hover */ }
@media (hover: none)  { /* mobile: show price always */ }
```

---

## 18. `sitemap.xml` and `robots.txt`

### `sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://microtelwilliston.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Add each page with appropriate priority (0.9 for product pages, 0.7 for contact) -->
  <!-- Do NOT include 404.html -->
</urlset>
```

### `robots.txt`

```
User-agent: *
Allow: /
Disallow: /partials/

Sitemap: https://microtelwilliston.com/sitemap.xml
```

---

## 19. `.htaccess` (Apache / GoDaddy Shared Hosting)

This file must be in the root of `public_html` and is copied to `dist/` by `build.js`.

```apache
Options -Indexes

# Custom 404
ErrorDocument 404 /404.html

# Force HTTPS + www → non-www (enforce canonical)
<IfModule mod_rewrite.c>
  RewriteEngine On
  # HTTP → HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
  # www → non-www
  RewriteCond %{HTTP_HOST} ^www\.(.+)$ [NC]
  RewriteRule ^ https://%1%{REQUEST_URI} [R=301,L]
</IfModule>

# index.html → /
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteRule ^index\.html$ / [R=301,L]
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html              "access plus 1 hour"
  ExpiresByType text/css               "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg             "access plus 1 year"
  ExpiresByType image/avif             "access plus 1 year"
  ExpiresByType image/svg+xml          "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  <FilesMatch "\.html$">
    Header set Cache-Control "no-cache, must-revalidate"
  </FilesMatch>
</IfModule>
```

---

## 20. Deployment to GoDaddy

1. Run `npm run build` → generates `dist/`
2. Log into GoDaddy cPanel → File Manager → `public_html`
3. Upload **all contents** of `dist/` (including hidden `.htaccess` — most FTP clients hide dotfiles, enable "show hidden files")
4. Verify: visit `https://microtelwilliston.com/` — should load, HTTPS active, www redirects to non-www

### DNS setup (if pointing domain to GoDaddy hosting)

- GoDaddy hosting assigns a server IP — set an `A` record for `@` pointing to that IP
- Set `CNAME` for `www` → your hosting IP or hostname
- Wait up to 48h for propagation (usually under 2h)

---

## 21. Dev Workflow

```bash
# Start dev server (http://localhost:5000, partials injected live)
npm start

# Build for production (writes to dist/)
npm run build

# Deploy: upload dist/ contents to GoDaddy public_html
```

No hot reload — save file, refresh browser.

---

## 22. Quick Reference

| Task | Where / How |
|---|---|
| Start dev | `npm start` → `http://localhost:5000` |
| Build | `npm run build` → `dist/` |
| Add a page | Create `.html` + `.css`, add both to `build.js` arrays, add to `sitemap.xml` |
| Add a partial | Create `partials/name.html`, add read + replace in `build.js` |
| Add gallery photo | Add `{ name, cap }` to `PHOTOS` in `gallery.js` |
| Change brand colors | Edit `:root` in `style.css` |
| Change nav links | Edit `partials/navbar.html` |
| Change footer | Edit `partials/footer.html` |
| Phone number | `+17015722000` / `(701) 572-2000` |
| Email | `sales@merlinhotelgroup.com` |
| Wyndham booking URL | `https://www.wyndhamhotels.com/microtel/williston-north-dakota/microtel-williston/overview` |
| Cloudinary account | `djcgfqesd` |
| Production domain | `https://microtelwilliston.com` (no www, no trailing slash except homepage) |
| GoDaddy hosting | Upload `dist/` to `public_html` (include `.htaccess`) |
