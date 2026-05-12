const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;

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

/* ── HTTP Server ── */
const server = http.createServer((req, res) => {
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
});
