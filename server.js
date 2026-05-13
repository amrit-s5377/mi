const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;
const ROOT = __dirname;

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
const partialsDir = path.join(ROOT, 'partials');
let partialCache = {};

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

/* ── Live reload ── */
const lrClients = [];

const LR_SCRIPT = `\n<script>
(function(){
  var es = new EventSource('/__livereload');
  es.onmessage = function(){ location.reload(); };
  es.onerror   = function(){ es.close(); };
})();
</script>`;

let reloadTimer = null;
fs.watch(ROOT, { recursive: true }, (_, filename) => {
  if (!filename) return;
  // ignore dist/ and hidden files
  if (filename.startsWith('dist') || filename.startsWith('.')) return;
  clearTimeout(reloadTimer);
  reloadTimer = setTimeout(() => {
    partialCache = {};  // bust partial cache so changes to partials are picked up
    lrClients.forEach(res => res.write('data: reload\n\n'));
    console.log('  ↻  reload →', filename);
  }, 80);
});

/* ── HTTP Server ── */
const server = http.createServer((req, res) => {
  /* SSE endpoint for live reload */
  if (req.url === '/__livereload') {
    res.writeHead(200, {
      'Content-Type':  'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection':    'keep-alive',
    });
    res.write(': connected\n\n');
    lrClients.push(res);
    req.on('close', () => {
      const i = lrClients.indexOf(res);
      if (i !== -1) lrClients.splice(i, 1);
    });
    return;
  }

  let filePath = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  filePath = path.join(ROOT, filePath);

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(ROOT, '404.html'), (e, d) => {
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
      out = injectPartials(data.toString()).replace('</body>', LR_SCRIPT + '\n</body>');
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(out);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n  Dev server → http://localhost:${PORT}`);
  console.log('  Live reload active — browser refreshes on any file save\n');
});
