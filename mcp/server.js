#!/usr/bin/env node
'use strict';

/**
 * Microtel Williston — Hotel Site MCP Server
 *
 * Tools exposed:
 *   hotel_design_system   — full design token + component reference
 *   hotel_partials        — read navbar / footer / enquiry HTML
 *   hotel_list_pages      — pages registered in build.js
 *   hotel_scaffold_page   — create new HTML + CSS + register in build.js
 */

const fs   = require('fs');
const path = require('path');
const rl   = require('readline').createInterface({ input: process.stdin, crlfDelay: Infinity });

const ROOT = path.resolve(__dirname, '..');

/* ─── helpers ─── */

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function exists(rel) {
  return fs.existsSync(path.join(ROOT, rel));
}

function write(rel, content) {
  fs.writeFileSync(path.join(ROOT, rel), content, 'utf8');
}

function readPartial(name) {
  try { return read(`partials/${name}.html`); }
  catch { return `<!-- partial '${name}' not found -->`; }
}

/* ─── tool: hotel_design_system ─── */

function getDesignSystem() {
  const styleRaw = read('style.css');
  const tokensMatch = styleRaw.match(/:root\s*\{([^}]+)\}/);
  const tokens = tokensMatch ? tokensMatch[0] : '/* tokens not found */';

  return `# Microtel Williston — Design System Reference

## Stack
- Pure static HTML + CSS + vanilla JS. No frameworks.
- GSAP 3.12.5 + ScrollTrigger (CDN).
- Fonts: DM Serif Display (headings) + Inter (body) via Google Fonts.
- \`build.js\` — replaces <!--PARTIAL:navbar-->, <!--PARTIAL:footer-->, <!--PARTIAL:enquiry--> and outputs to dist/.
- Dev: \`npm start\` (server.js handles partials on-the-fly). Never use VS Code Live Server directly on source files.
- Deploy: \`npm run build\` → dist/ → Vercel.

## Hotel constants
- Name: Microtel Inn & Suites by Wyndham Williston
- Phone: (701) 572-2000
- Address: 3820 4th Ave W, Williston, ND 58801
- Email: info@merlinhotelgroup.com
- Booking URL: https://www.wyndhamhotels.com/microtel/williston-north-dakota/microtel-williston/overview

## CSS design tokens
\`\`\`css
${tokens}
\`\`\`

## Wyndham CDN images
Base: https://www.wyndhamhotels.com/content/dam/property-images/en-us/mt/us/nd/williston/40516/
Append ?downsize=1800:* or ?crop=3000:2000;*,*&downsize=1800:*

Available:
  40516_exterior_view_1.jpg       hotel exterior
  40516_exterior_day_1.jpg        exterior daytime
  40516_guest_room_8.jpg          guest room
  40516_property_amenity_2.jpg    pool/amenity
  40516_complimentary_breakfast_1.jpg  breakfast

## Shared CSS classes (style.css — never redefine in page CSS)

### Typography
.eyebrow         tiny all-caps teal label above headings (0.6rem, letter-spacing 0.38em)
.sec-h2          section heading (serif, clamp 1.8–2.8rem) — em inside = italic teal
.sec-sub         subtitle under heading (0.9rem, 300 weight)
.body-text       body paragraph (0.88rem, 300 weight, ink-m)
.text-link       animated arrow text link (teal, uppercase)

### Buttons
.btn-primary          teal filled CTA — for light backgrounds
.btn-primary--light   white filled — for dark/hero backgrounds
.btn-secondary        ghost/outline — for dark backgrounds
.btn-ghost-light      ghost variant for dark backgrounds

### Layout
.sec              section wrapper: padding 96px 8vw

### Scroll animations (wired by main.js automatically)
.reveal           fade up on scroll
.reveal-l         slide in from left
.reveal-r         slide in from right
.reveal-up        stagger fade-up (apply to sibling cards)

### Subpage hero
.d-hero           full-height hero container
.d-hero-bg        parallax background div (set background-image in page CSS)
.d-hero-tint      dark overlay gradient
.d-hero-content   hero text wrapper (z-index 2)
.d-back-btn       glassy Back-to-Home button (absolute, top-left over hero)
.d-chip           category label with decorative line prefix
.d-hero-title     serif H1 — em inside = italic teal
.d-meta           row of key/value pills under H1

### Subpage body
.d-body           two-column grid: 1fr + 320px sidebar
.d-section        content block inside <main>
.d-eyebrow        mini eyebrow label inside d-section
.d-sec-title      section heading inside d-section

### Sticky sidebar
.d-sidebar        sticky sidebar (top: 82px)
.d-info-card      white card with border
.d-info-card--accent   card with 3px teal top border
.dic-label        small card label
.dic-title        card serif title
.dic-body         card body paragraph
.dic-primary-btn  full-width teal button
.dic-secondary-btn full-width outline button
.dic-perks        checkmark list (✓ auto-added via CSS)
.dic-quick/.dic-row  key-value quick-info rows

### Content components
.d-amen-grid / .d-amen-item       2-col amenities checkerboard (✦ auto)
.d-gallery / .d-gimg / .d-gimg--wide   3-col photo gallery
.d-rooms-grid / .d-room-card / .d-room-card--featured   room cards grid

## HTML conventions
1. <!--PARTIAL:navbar-->  immediately after <body>
2. <!--PARTIAL:enquiry--> before <!--PARTIAL:footer--> at end of body
3. <script src="main.js"></script> last line before </body>
4. Sub-pages: no #loader div, no home.css link
5. Home page: include #loader div + home.css
6. Navbar auto-applies .light on sub-pages (no hero = no dark overlay)
`;
}

/* ─── tool: hotel_list_pages ─── */

function listPages() {
  const src = read('build.js');
  const match = src.match(/const PAGES\s*=\s*\[([^\]]+)\]/s);
  if (!match) return 'Could not parse PAGES from build.js';
  const pages = (match[1].match(/'[^']+'/g) || []).map(s => s.replace(/'/g, ''));
  return pages.join('\n');
}

/* ─── tool: hotel_scaffold_page ─── */

function scaffoldPage({ filename, title, description, heroTitle, heroSubtitle, heroChip, heroMeta, heroImage }) {
  const base = filename.replace(/\.html$/, '');

  if (exists(filename)) {
    return { error: `${filename} already exists — choose a different filename` };
  }

  const imgUrl = heroImage ||
    'https://www.wyndhamhotels.com/content/dam/property-images/en-us/mt/us/nd/williston/40516/40516_guest_room_8.jpg?downsize=1800:*';

  const metaHtml = (heroMeta || [])
    .map(m => `        <span><strong>${m.key}</strong> ${m.value}</span>`)
    .join('\n');

  const subtitleHtml = heroSubtitle ? `<br><em>${heroSubtitle}</em>` : '';

  const html =
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>${title} | Microtel Williston</title>
  <meta name="description" content="${description}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://www.wyndhamhotels.com/microtel/williston-north-dakota/microtel-williston/overview" />

  <meta property="og:title" content="${title} | Microtel Williston" />
  <meta property="og:description" content="${description}" />
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
  <link rel="stylesheet" href="${base}.css" />
</head>
<body>

  <!--PARTIAL:navbar-->

  <a href="index.html" class="d-back-btn">
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M13 8H3M7 4l-4 4 4 4"/></svg>
    Back to Home
  </a>

  <div class="d-hero">
    <div class="d-hero-bg ${base}-hero-bg" role="img" aria-label="${heroTitle} — Microtel Inn Williston ND"></div>
    <div class="d-hero-tint"></div>
    <div class="d-hero-content">
      <div class="d-chip">${heroChip || 'Microtel Williston'}</div>
      <h1 class="d-hero-title">${heroTitle}${subtitleHtml}</h1>
      <div class="d-meta">
${metaHtml}
      </div>
    </div>
  </div>

  <div class="d-body">
    <main>

      <section class="d-section">
        <span class="d-eyebrow">Overview</span>
        <h2 class="d-sec-title">${title}</h2>
        <p>${description}</p>
        <!-- TODO: expand with real marketing copy and more d-section blocks -->
      </section>

    </main>
    <aside class="d-sidebar">
      <div class="d-info-card d-info-card--accent">
        <span class="dic-label">Book Your Stay</span>
        <h3 class="dic-title">Ready to Reserve?</h3>
        <p class="dic-body">Book directly on Wyndham.com for the best available rate and Wyndham Rewards points.</p>
        <a href="https://www.wyndhamhotels.com/microtel/williston-north-dakota/microtel-williston/overview"
           target="_blank" rel="noopener" class="dic-primary-btn">
          Book Now
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </a>
        <a href="tel:+17015722000" class="dic-secondary-btn">Call (701) 572-2000</a>
        <ul class="dic-perks">
          <li>Free Wi-Fi included</li>
          <li>Free hot breakfast daily</li>
          <li>Free parking on-site</li>
          <li>Pet friendly</li>
          <li>Wyndham Rewards eligible</li>
        </ul>
      </div>
    </aside>
  </div>

  <!--PARTIAL:enquiry-->
  <!--PARTIAL:footer-->

  <script src="main.js"></script>
</body>
</html>`;

  const css =
`/* ${base}.css — ${title} */

.${base}-hero-bg {
  background: url('${imgUrl}') center/cover no-repeat;
}
`;

  write(filename, html);
  write(`${base}.css`, css);

  // Register in build.js PAGES array
  let buildSrc = read('build.js');
  buildSrc = buildSrc.replace(
    /(const PAGES\s*=\s*\[)/,
    `$1\n  '${filename}',`
  );
  write('build.js', buildSrc);

  return {
    created: [`${filename}`, `${base}.css`],
    registeredIn: 'build.js',
    nextStep: "Run 'npm run build' to compile, then 'npm start' to preview at http://localhost:5000"
  };
}

/* ─── tool definitions ─── */

const TOOLS = [
  {
    name: 'hotel_design_system',
    description: 'Returns the complete design system reference for the Microtel Williston hotel site: CSS tokens, all shared component classes, HTML conventions, image URLs, and hotel constants. Read this before generating or editing any page.',
    inputSchema: { type: 'object', properties: {}, required: [] }
  },
  {
    name: 'hotel_partials',
    description: 'Returns the raw HTML for one or all partials (navbar, footer, enquiry form). Useful when you need to understand the exact markup structure.',
    inputSchema: {
      type: 'object',
      properties: {
        partial: {
          type: 'string',
          enum: ['navbar', 'footer', 'enquiry', 'all'],
          description: "Which partial to return. Use 'all' to get all three at once."
        }
      },
      required: ['partial']
    }
  },
  {
    name: 'hotel_list_pages',
    description: 'Lists all HTML pages currently registered in build.js. Use this to check what pages already exist before creating a new one.',
    inputSchema: { type: 'object', properties: {}, required: [] }
  },
  {
    name: 'hotel_scaffold_page',
    description: 'Creates a new subpage: generates the .html file, the companion .css file, and registers the page in build.js. Returns the created file paths.',
    inputSchema: {
      type: 'object',
      properties: {
        filename:      { type: 'string', description: "HTML filename, e.g. 'spa.html'" },
        title:         { type: 'string', description: "SEO page title, e.g. 'Spa & Wellness'" },
        description:   { type: 'string', description: 'Meta description (1-2 sentences)' },
        heroTitle:     { type: 'string', description: "Main H1 text, e.g. 'Spa &amp; Wellness'" },
        heroSubtitle:  { type: 'string', description: "Italic subtitle shown after <br><em>…</em> in H1, e.g. 'Williston, ND'" },
        heroChip:      { type: 'string', description: "Category chip label, e.g. 'Microtel Williston · Wellness'" },
        heroMeta:      {
          type: 'array',
          description: 'Key/value pills shown under H1',
          items: {
            type: 'object',
            properties: {
              key:   { type: 'string' },
              value: { type: 'string' }
            },
            required: ['key', 'value']
          }
        },
        heroImage:     { type: 'string', description: 'Full hero background image URL (leave empty for default guest-room photo)' }
      },
      required: ['filename', 'title', 'description', 'heroTitle']
    }
  }
];

/* ─── dispatcher ─── */

function callTool(name, args) {
  try {
    if (name === 'hotel_design_system') {
      return { content: [{ type: 'text', text: getDesignSystem() }] };
    }
    if (name === 'hotel_partials') {
      const { partial } = args;
      let text;
      if (partial === 'all') {
        text = `## navbar.html\n\n${readPartial('navbar')}\n\n---\n\n## footer.html\n\n${readPartial('footer')}\n\n---\n\n## enquiry.html\n\n${readPartial('enquiry')}`;
      } else {
        text = readPartial(partial);
      }
      return { content: [{ type: 'text', text }] };
    }
    if (name === 'hotel_list_pages') {
      return { content: [{ type: 'text', text: listPages() }] };
    }
    if (name === 'hotel_scaffold_page') {
      const result = scaffoldPage(args);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
    return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
  } catch (err) {
    return { content: [{ type: 'text', text: err.message }], isError: true };
  }
}

/* ─── MCP stdio transport (JSON-RPC 2.0) ─── */

function send(obj) {
  process.stdout.write(JSON.stringify(obj) + '\n');
}

rl.on('line', (line) => {
  if (!line.trim()) return;
  let msg;
  try { msg = JSON.parse(line); } catch { return; }

  const { id, method, params } = msg;

  if (method === 'initialize') {
    send({ jsonrpc: '2.0', id, result: {
      protocolVersion: '2024-11-05',
      capabilities: { tools: {} },
      serverInfo: { name: 'hotel-site', version: '1.0.0' }
    }});
  } else if (method === 'notifications/initialized') {
    /* notification — no response */
  } else if (method === 'ping') {
    send({ jsonrpc: '2.0', id, result: {} });
  } else if (method === 'tools/list') {
    send({ jsonrpc: '2.0', id, result: { tools: TOOLS } });
  } else if (method === 'tools/call') {
    const result = callTool(params.name, params.arguments || {});
    send({ jsonrpc: '2.0', id, result });
  } else {
    if (id != null) {
      send({ jsonrpc: '2.0', id, error: { code: -32601, message: 'Method not found' } });
    }
  }
});
