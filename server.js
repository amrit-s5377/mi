const http = require('http');
const fs = require('fs');
const path = require('path');
const { Resend } = require('resend');

const PORT = 5000;
const RECIPIENT = 'amrit.singh@gradientm.com'; /* temp — swap to info@merlinhotelgroup.com once domain verified */

const mimeTypes = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
};

/* ── Resend client ── */
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

/* ── Partial injection ── */
const partialsDir = path.join(__dirname, 'partials');
const partialCache = {};

function getPartial(name) {
  if (!partialCache[name]) {
    try {
      partialCache[name] = fs.readFileSync(path.join(partialsDir, name + '.html'), 'utf8');
    } catch { partialCache[name] = ''; }
  }
  return partialCache[name];
}

function injectPartials(html) {
  return html
    .replace(/<!--PARTIAL:navbar-->/g,  getPartial('navbar'))
    .replace(/<!--PARTIAL:enquiry-->/g, getPartial('enquiry'))
    .replace(/<!--PARTIAL:footer-->/g,  getPartial('footer'));
}

/* ── Read body helper ── */
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

/* ── Build email HTML ── */
function buildEmailHtml(d) {
  const row = (label, val) => val
    ? `<tr><td style="padding:6px 12px;font-weight:600;color:#4a5e56;width:140px;">${label}</td><td style="padding:6px 12px;color:#0f1a14;">${val}</td></tr>`
    : '';
  return `
  <div style="font-family:Inter,system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f8faf9;border-radius:12px;overflow:hidden;border:1px solid #deeae6;">
    <div style="background:#0d7f6e;padding:28px 32px;">
      <h1 style="margin:0;font-size:1.3rem;color:#fff;font-weight:600;">New Guest Enquiry</h1>
      <p style="margin:6px 0 0;font-size:0.8rem;color:rgba(255,255,255,0.7);">Microtel Inn &amp; Suites by Wyndham — Williston, ND</p>
    </div>
    <div style="padding:28px 32px;">
      <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #deeae6;">
        ${row('Name', d.name)}
        ${row('Email', `<a href="mailto:${d.email}" style="color:#0d7f6e;">${d.email}</a>`)}
        ${row('Phone', d.phone)}
        ${row('Enquiry Type', d.type)}
        ${row('Check-in', d.checkin)}
        ${row('Check-out', d.checkout)}
      </table>
      <div style="margin-top:20px;background:#fff;border-radius:8px;border:1px solid #deeae6;padding:16px 20px;">
        <p style="margin:0 0 8px;font-weight:600;font-size:0.8rem;color:#4a5e56;text-transform:uppercase;letter-spacing:0.1em;">Message</p>
        <p style="margin:0;color:#0f1a14;line-height:1.7;white-space:pre-wrap;">${d.message}</p>
      </div>
    </div>
    <div style="padding:16px 32px;background:#e6f5f2;font-size:0.72rem;color:#4a5e56;">
      Sent via the website enquiry form at ${new Date().toUTCString()}
    </div>
  </div>`;
}

/* ── HTTP Server ── */
const server = http.createServer(async (req, res) => {

  /* POST /api/enquiry — send email */
  if (req.method === 'POST' && req.url === '/api/enquiry') {
    res.setHeader('Content-Type', 'application/json');
    try {
      const raw = await readBody(req);
      const d = JSON.parse(raw);

      if (!d.name || !d.email || !d.type || !d.message) {
        res.writeHead(400);
        return res.end(JSON.stringify({ ok: false, error: 'Please fill in all required fields.' }));
      }

      const resend = getResend();
      if (!resend) {
        res.writeHead(503);
        return res.end(JSON.stringify({
          ok: false,
          error: 'Email service is not configured yet. Please call (701) 572-2000 or email info@merlinhotelgroup.com directly.'
        }));
      }

      const subject = `Guest Enquiry — ${d.type} | Microtel Williston`;
      const text = [
        `Name: ${d.name}`,
        d.phone    ? `Phone: ${d.phone}`        : null,
        `Email: ${d.email}`,
        `Enquiry Type: ${d.type}`,
        d.checkin  ? `Check-in: ${d.checkin}`   : null,
        d.checkout ? `Check-out: ${d.checkout}` : null,
        ``,
        `Message:`,
        d.message,
      ].filter(l => l !== null).join('\n');

      const { error: sendError } = await resend.emails.send({
        from: 'Microtel Williston <onboarding@resend.dev>',
        to:   RECIPIENT,
        reply_to: `${d.name} <${d.email}>`,
        subject,
        text,
        html: buildEmailHtml(d),
      });

      if (sendError) throw new Error(sendError.message);

      res.writeHead(200);
      return res.end(JSON.stringify({ ok: true }));

    } catch (err) {
      console.error('Enquiry send error:', err.message);
      res.writeHead(500);
      return res.end(JSON.stringify({ ok: false, error: 'Failed to send. Please try again or call (701) 572-2000.' }));
    }
  }

  /* Static file serving */
  let filePath = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  filePath = path.join(__dirname, filePath);

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(__dirname, '404.html'), (e, d) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(d || '<h1>404 Not Found</h1>');
        });
      } else {
        res.writeHead(500);
        res.end('Server error');
      }
      return;
    }

    let out = data;
    if (ext === '.html') {
      out = injectPartials(data.toString());
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(out);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  if (!process.env.RESEND_API_KEY) {
    console.log('  ⚠  RESEND_API_KEY not set — enquiry form email sending is disabled');
  }
});
