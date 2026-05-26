'use strict';
/* ─────────────────────────────────────────────────────────────
   serve-dist.js  —  Local server for the built dist/ folder
   Mirrors Vercel's cleanUrls behaviour so you can test the
   production build exactly as it will appear on the domain.

   Usage:  node serve-dist.js
           Then open http://localhost:4000
─────────────────────────────────────────────────────────────── */

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = process.env.PORT || 4567;
const DIST = path.join(__dirname, 'dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.xml':  'application/xml',
  '.txt':  'text/plain',
  '.webmanifest': 'application/manifest+json',
};

function serve404(res) {
  const p = path.join(DIST, '404.html');
  fs.readFile(p, (err, data) => {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(err ? '<h1>404 Not Found</h1>' : data);
  });
}

http.createServer((req, res) => {
  /* Strip query string and decode */
  let urlPath = req.url.split('?')[0].split('#')[0];
  try { urlPath = decodeURIComponent(urlPath); } catch {}

  /* Resolve to a file in dist/ */
  let filePath = path.join(DIST, urlPath);

  function tryFile(fp, cb) {
    fs.stat(fp, (err, stat) => {
      if (!err && stat.isFile()) return cb(fp);

      /* cleanUrls: try appending .html */
      const withHtml = fp.replace(/\/?$/, '.html').replace(/\.html\.html$/, '.html');
      fs.stat(withHtml, (e2, s2) => {
        if (!e2 && s2.isFile()) return cb(withHtml);

        /* Try index.html inside a directory */
        const indexPath = path.join(fp, 'index.html');
        fs.stat(indexPath, (e3, s3) => {
          if (!e3 && s3.isFile()) return cb(indexPath);
          cb(null); /* not found */
        });
      });
    });
  }

  tryFile(filePath, (resolved) => {
    if (!resolved) return serve404(res);

    fs.readFile(resolved, (err, data) => {
      if (err) return serve404(res);
      const ext = path.extname(resolved);
      const mime = MIME[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': mime });
      res.end(data);
    });
  });

}).listen(PORT, '0.0.0.0', () => {
  console.log('\n  ✅  Serving dist/ at  http://localhost:' + PORT);
  console.log('  Clean URLs active — /kitchenette → kitchenette.html');
  console.log('  Press Ctrl+C to stop\n');
});
