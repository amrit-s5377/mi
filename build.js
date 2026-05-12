/**
 * build.js
 * Pre-injects shared partials (navbar, enquiry form, footer) into every HTML
 * page and outputs a ready-to-deploy dist/ folder.
 *
 * Usage:
 *   RESEND_API_KEY=re_xxxx node build.js
 *
 * The dist/ folder works on ANY static host:
 *   GitHub Pages, Netlify, Vercel, S3, cPanel, Cloudflare Pages, etc.
 * The enquiry form calls the Resend API directly from the browser.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

/* ── Config ─────────────────────────────────────────────────── */
const ROOT         = __dirname;
const DIST         = path.join(ROOT, 'public');
const PARTIALS_DIR = path.join(ROOT, 'partials');

const RESEND_KEY = process.env.RESEND_API_KEY || '';
const RECIPIENT  = process.env.ENQUIRY_EMAIL  || 'amrit.singh@gradientm.com';
// ↑ swap ENQUIRY_EMAIL to sales@merlinhotelgroup.com once domain verified in Resend

const PAGES  = ['index.html', 'kitchenette.html', 'extended-stay.html', 'property-details.html'];
const ASSETS = ['style.css', 'home.css', 'kitchenette.css', 'extended-stay.css',
                'property-details.css', 'main.js'];

/* ── Helpers ─────────────────────────────────────────────────── */
function read(file) { return fs.readFileSync(file, 'utf8'); }
function write(file, content) { fs.writeFileSync(file, content, 'utf8'); }
function copy(src, dest) { if (fs.existsSync(src)) fs.copyFileSync(src, dest); }

/* ── Clean dist ──────────────────────────────────────────────── */
if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

/* ── Load partials ───────────────────────────────────────────── */
const navbar  = read(path.join(PARTIALS_DIR, 'navbar.html'));
const footer  = read(path.join(PARTIALS_DIR, 'footer.html'));
const enquiry = read(path.join(PARTIALS_DIR, 'enquiry.html'));

/* ── Static form handler (replaces server-side /api/enquiry) ─── */
const STATIC_FETCH = `
    try {
      var emailHtml = [
        '<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;border:1px solid #deeae6;border-radius:12px;overflow:hidden">',
        '<div style="background:#0d7f6e;padding:24px 32px"><h1 style="margin:0;color:#fff;font-size:1.1rem">New Guest Enquiry</h1>',
        '<p style="margin:4px 0 0;color:rgba(255,255,255,.7);font-size:.75rem">Microtel Inn &amp; Suites — Williston, ND</p></div>',
        '<div style="padding:24px 32px">',
        '<table style="width:100%;border-collapse:collapse;border:1px solid #deeae6;border-radius:8px;overflow:hidden">',
        payload.name    ? '<tr><td style="padding:8px 14px;font-weight:600;color:#4a5e56;width:130px">Name</td><td style="padding:8px 14px">'    + payload.name    + '</td></tr>' : '',
        payload.email   ? '<tr><td style="padding:8px 14px;font-weight:600;color:#4a5e56">Email</td><td style="padding:8px 14px">'   + payload.email   + '</td></tr>' : '',
        payload.phone   ? '<tr><td style="padding:8px 14px;font-weight:600;color:#4a5e56">Phone</td><td style="padding:8px 14px">'   + payload.phone   + '</td></tr>' : '',
        payload.type    ? '<tr><td style="padding:8px 14px;font-weight:600;color:#4a5e56">Enquiry</td><td style="padding:8px 14px">' + payload.type    + '</td></tr>' : '',
        payload.checkin ? '<tr><td style="padding:8px 14px;font-weight:600;color:#4a5e56">Check-in</td><td style="padding:8px 14px">'+ payload.checkin + '</td></tr>' : '',
        payload.checkout? '<tr><td style="padding:8px 14px;font-weight:600;color:#4a5e56">Check-out</td><td style="padding:8px 14px">'+ payload.checkout+ '</td></tr>' : '',
        '</table>',
        '<div style="margin-top:16px;padding:16px;border:1px solid #deeae6;border-radius:8px">',
        '<p style="margin:0 0 8px;font-weight:600;font-size:.75rem;text-transform:uppercase;color:#4a5e56">Message</p>',
        '<p style="margin:0;white-space:pre-wrap;color:#0f1a14">' + payload.message + '</p>',
        '</div></div></div>'
      ].join('');

      var res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ${RESEND_KEY}'
        },
        body: JSON.stringify({
          from: 'Microtel Williston <onboarding@resend.dev>',
          to: '${RECIPIENT}',
          reply_to: payload.email,
          subject: 'Guest Enquiry \\u2014 ' + payload.type + ' | Microtel Williston',
          html: emailHtml
        })
      });

      var data = res.ok ? { ok: true } : { ok: false, error: 'Send failed (HTTP ' + res.status + ').' };
      if (data.ok) {
        successEl.hidden = false;
        form.reset();
      } else {
        errorMsg.textContent = data.error || 'Something went wrong. Please email info@merlinhotelgroup.com or call (701) 572-2000.';
        errorEl.hidden = false;
      }
    } catch (err) {
      errorMsg.textContent = 'Network error. Please check your connection and try again.';
      errorEl.hidden = false;`;

const SERVER_FETCH = `
    try {
      var res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      var data = await res.json();
      if (data.ok) {
        successEl.hidden = false;
        form.reset();
      } else {
        errorMsg.textContent = data.error || 'Something went wrong. Please try again or call (701) 572-2000.';
        errorEl.hidden = false;`;

/* ── Build each HTML page ────────────────────────────────────── */
let built = 0;

PAGES.forEach(page => {
  let html = read(path.join(ROOT, page));

  // Inject shared partials
  html = html
    .replace(/<!--PARTIAL:navbar-->/g,  navbar)
    .replace(/<!--PARTIAL:enquiry-->/g, enquiry)
    .replace(/<!--PARTIAL:footer-->/g,  footer);

  // Swap server-side fetch for direct Resend API call
  html = html.replace(SERVER_FETCH, STATIC_FETCH);

  write(path.join(DIST, page), html);
  console.log('  ✓ built   ', page);
  built++;
});

/* ── Copy static assets ──────────────────────────────────────── */
ASSETS.forEach(asset => {
  const src = path.join(ROOT, asset);
  if (fs.existsSync(src)) {
    copy(src, path.join(DIST, asset));
    console.log('  ✓ copied  ', asset);
  }
});

/* ── Summary ─────────────────────────────────────────────────── */
console.log('\n✅  Build complete →', DIST);
console.log(`   ${built} pages built, ${ASSETS.length} assets copied`);
console.log('\n   Upload the dist/ folder to any static host:');
console.log('   GitHub Pages · Netlify · Vercel · S3 · Cloudflare Pages · cPanel\n');

if (!RESEND_KEY) {
  console.log('⚠   RESEND_API_KEY was not set — the enquiry form will not send emails.');
  console.log('    Rebuild with:  RESEND_API_KEY=re_xxxx node build.js\n');
}
