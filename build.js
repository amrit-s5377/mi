'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT         = __dirname;
const DIST         = path.join(ROOT, 'dist');
const PARTIALS_DIR = path.join(ROOT, 'partials');

const PAGES = [
  'index.html',
  'amenities.html',
  'kitchenette.html',
  'extended-stay.html',
  'property-details.html',
  'corporate.html',
  'meetings.html',
  'contact.html',
  'bakken-oilfield-housing.html',
  'travel-nurse-housing.html',
  '404.html',
];

const ASSETS = [
  'style.css',
  'home.css',
  'amenities.css',
  'kitchenette.css',
  'extended-stay.css',
  'property-details.css',
  'corporate.css',
  'meetings.css',
  'contact.css',
  'bakken.css',
  'travel-nurse.css',
  '404.css',
  'main.js',
  'gallery.js',
  'sitemap.xml',
  'robots.txt',
];

function read(file)           { return fs.readFileSync(file, 'utf8'); }
function write(file, content) { fs.writeFileSync(file, content, 'utf8'); }
function copy(src, dest)      { if (fs.existsSync(src)) fs.copyFileSync(src, dest); }

/* ── Clean dist ── */
if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

/* ── Load partials ── */
const navbar  = read(path.join(PARTIALS_DIR, 'navbar.html'));
const footer  = read(path.join(PARTIALS_DIR, 'footer.html'));
const enquiry = read(path.join(PARTIALS_DIR, 'enquiry.html'));

/* ── Build each HTML page ── */
let built = 0;
PAGES.forEach(page => {
  const src = path.join(ROOT, page);
  if (!fs.existsSync(src)) {
    console.warn('  ⚠ skipped  ', page, '(file not found)');
    return;
  }

  let html = read(src);
  html = html
    .replace(/<!--PARTIAL:navbar-->/g,  navbar)
    .replace(/<!--PARTIAL:enquiry-->/g, enquiry)
    .replace(/<!--PARTIAL:footer-->/g,  footer);

  write(path.join(DIST, page), html);
  console.log('  ✓ built   ', page);
  built++;
});

/* ── Copy static assets ── */
ASSETS.forEach(asset => {
  const src = path.join(ROOT, asset);
  if (fs.existsSync(src)) {
    copy(src, path.join(DIST, asset));
    console.log('  ✓ copied  ', asset);
  } else {
    console.warn('  ⚠ missing  ', asset);
  }
});

console.log('\n✅  Build complete →', DIST);
console.log(`   ${built} pages built, ${ASSETS.length} assets copied`);
console.log('   Upload the dist/ folder to Vercel, Netlify, GitHub Pages, etc.\n');
