const http = require('http');
const https = require('https');
const http_ = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 4500;
const ROOT = __dirname;
const RSS_URL = process.env.RSS_URL || 'https://app.trysoro.com/api/rss/4bf8bb35-204c-4ff2-8667-8720cfb5ca54';
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

// ── Site-wide password gate ───────────────────────────────────────────────
// Everything is gated behind a "coming soon" page except /ai-enabled-design
// (and shared static assets it depends on). Entering the password sets a
// signed cookie that unlocks the whole site for that browser.

const GATE_PASSWORD = process.env.GATE_PASSWORD || 'NoFomo';
const GATE_SECRET = process.env.GATE_SECRET || 'antiphono-preview-gate';
const GATE_COOKIE = 'aid_gate';
const GATE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days, in seconds

function gateToken() {
  return crypto.createHmac('sha256', GATE_SECRET).update(GATE_PASSWORD).digest('hex');
}

function parseCookies(req) {
  const out = {};
  const header = req.headers.cookie;
  if (!header) return out;
  header.split(';').forEach((pair) => {
    const idx = pair.indexOf('=');
    if (idx === -1) return;
    const key = pair.slice(0, idx).trim();
    const val = pair.slice(idx + 1).trim();
    if (key) out[key] = decodeURIComponent(val);
  });
  return out;
}

function isUnlocked(req) {
  const cookies = parseCookies(req);
  const given = cookies[GATE_COOKIE];
  if (!given) return false;
  const expected = gateToken();
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// The gate/coming-soon page itself must always be reachable, in every environment.
const GATE_SYSTEM_PAGES = ['/coming-soon', '/coming-soon.html'];

// Pages that stay public even when the rest of the site is gated. Defaults to
// today's production behaviour (only /ai-enabled-design). Override with the
// GATE_PUBLIC_PATHS env var — a comma-separated list, or an empty string to
// gate everything (e.g. on a private staging environment).
const GATE_PUBLIC_PATHS = process.env.GATE_PUBLIC_PATHS !== undefined
  ? process.env.GATE_PUBLIC_PATHS.split(',').map((p) => p.trim()).filter(Boolean)
  : ['/ai-enabled-design', '/ai-enabled-design.html'];

function isGatedRequest(urlPath) {
  if (urlPath === '/api/unlock') return false;
  // Only HTML page requests are gated — static assets (css/js/svg/fonts/etc.)
  // always pass through, since pages depend on them regardless of gate state.
  const ext = path.extname(urlPath);
  if (ext && ext !== '.html') return false;
  if (GATE_SYSTEM_PAGES.includes(urlPath)) return false;
  if (GATE_PUBLIC_PATHS.includes(urlPath)) return false;
  return true;
}

function readBody(req, maxBytes) {
  return new Promise((resolve, reject) => {
    let data = '';
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > maxBytes) { reject(new Error('Body too large')); req.destroy(); return; }
      data += chunk;
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
};

// ── RSS cache ──────────────────────────────────────────────────────────────

let articlesCache = null;
let cacheExpiry = 0;

function fetchURL(targetUrl, redirects) {
  if (redirects === undefined) redirects = 5;
  return new Promise((resolve, reject) => {
    if (redirects <= 0) return reject(new Error('Too many redirects'));
    let parsed;
    try { parsed = new URL(targetUrl); } catch (e) { return reject(e); }
    const mod = parsed.protocol === 'https:' ? https : http_;
    const req = mod.get(targetUrl, {
      headers: { 'User-Agent': 'Antiphono/1.0 (RSS Reader)' },
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) {
        res.resume();
        return resolve(fetchURL(res.headers.location, redirects - 1));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error('HTTP ' + res.statusCode));
      }
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (c) => { body += c; });
      res.on('end', () => resolve(body));
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('RSS fetch timeout')); });
  });
}

function cdata(s) {
  return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
}

function getTag(block, tag) {
  // Handles both <tag>val</tag> and namespace tags like content:encoded
  const escaped = tag.replace(':', '\\:');
  const re = new RegExp('<' + escaped + '[^>]*>([\\s\\S]*?)<\\/' + escaped + '>', 'i');
  const m = re.exec(block);
  return m ? cdata(m[1]) : '';
}

function getAttr(block, tag, attr) {
  const re = new RegExp('<' + tag + '[^>]+' + attr + '="([^"]+)"', 'i');
  const m = re.exec(block);
  return m ? m[1] : '';
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function extractSlug(link, title) {
  try {
    const parts = new URL(link).pathname.split('/').filter(Boolean);
    const last = parts[parts.length - 1];
    if (last && last.length > 2 && !/^\d+$/.test(last)) return last;
  } catch {}
  return slugify(title || link);
}

function parseRSS(xml) {
  const articles = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRe.exec(xml)) !== null) {
    const block = m[1];

    const title = getTag(block, 'title');
    if (!title) continue;

    // RSS <link> is tricky — may be bare text or have href attribute
    let link = getTag(block, 'link');
    if (!link) link = getAttr(block, 'link', 'href');
    if (!link) link = getTag(block, 'guid');

    const pubDate = getTag(block, 'pubDate') || getTag(block, 'dc:date');
    const description = getTag(block, 'description');
    const contentEncoded = getTag(block, 'content:encoded');
    const author = getTag(block, 'dc:creator') || getTag(block, 'author');

    // Categories / tags — may have multiple <category> elements
    const tags = [];
    const catRe = /<category[^>]*>([\s\S]*?)<\/category>/gi;
    let cm;
    while ((cm = catRe.exec(block)) !== null) {
      const t = cdata(cm[1]);
      if (t) tags.push(t);
    }

    // Cover image — try enclosure, media:content, media:thumbnail, then first <img> in content
    let image = '';
    const encM = /<enclosure[^>]+>/i.exec(block);
    if (encM && /type="image/i.test(encM[0])) {
      const uM = /url="([^"]+)"/.exec(encM[0]);
      if (uM) image = uM[1];
    }
    if (!image) image = getAttr(block, 'media:content', 'url');
    if (!image) image = getAttr(block, 'media:thumbnail', 'url');
    if (!image && contentEncoded) {
      const imgM = /<img[^>]+src="([^"]+)"/i.exec(contentEncoded);
      if (imgM) image = imgM[1];
    }

    const slug = extractSlug(link, title);
    let date = '';
    try { date = new Date(pubDate).toISOString().split('T')[0]; } catch {}
    if (!date) date = new Date().toISOString().split('T')[0];

    const rawExcerpt = description ? stripTags(description) : stripTags(contentEncoded || '');
    const excerpt = rawExcerpt.slice(0, 240).replace(/\s+\S*$/, '…');

    // Body: prefer full HTML content, fall back to description
    const body = contentEncoded || (description ? '<p>' + description + '</p>' : '');

    articles.push({
      slug,
      title,
      link,
      author,
      date,
      category: tags[0] || 'Article',
      tags,
      image,
      excerpt,
      body,
      source: 'rss',
    });
  }
  return articles;
}

async function getArticles() {
  if (articlesCache && Date.now() < cacheExpiry) return articlesCache;
  try {
    const xml = await fetchURL(RSS_URL);
    const parsed = parseRSS(xml);
    if (parsed.length > 0) {
      articlesCache = parsed;
      cacheExpiry = Date.now() + CACHE_TTL;
      console.log('RSS synced: ' + parsed.length + ' articles at ' + new Date().toISOString());
    } else {
      console.log('RSS returned 0 items (feed may be disabled or empty)');
    }
  } catch (err) {
    console.error('RSS fetch error:', err.message);
  }
  return articlesCache || [];
}

// Pre-warm cache on startup, then refresh on interval
getArticles();
setInterval(getArticles, CACHE_TTL);

// ── Static file server ────────────────────────────────────────────────────

function safeJoin(root, requestPath) {
  const resolved = path.normalize(path.join(root, requestPath));
  if (!resolved.startsWith(root)) return null;
  return resolved;
}

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);

  // POST /api/unlock — check the gate password, set the unlock cookie
  if (urlPath === '/api/unlock' && req.method === 'POST') {
    readBody(req, 10 * 1024).then((body) => {
      let password = '';
      try { password = (JSON.parse(body || '{}').password || '').toString(); } catch (e) {}
      if (password === GATE_PASSWORD) {
        const secure = req.headers['x-forwarded-proto'] === 'https' || req.socket.encrypted ? '; Secure' : '';
        res.setHeader('Set-Cookie', GATE_COOKIE + '=' + encodeURIComponent(gateToken()) +
          '; Path=/; HttpOnly; Max-Age=' + GATE_MAX_AGE + '; SameSite=Lax' + secure);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true }));
      } else {
        res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false }));
      }
    }).catch(() => {
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ success: false }));
    });
    return;
  }

  // /api/articles — serve RSS articles as JSON
  if (urlPath === '/api/articles') {
    getArticles().then((articles) => {
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=300',
      });
      res.end(JSON.stringify(articles));
    }).catch((err) => {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: err.message }));
    });
    return;
  }

  // Site-wide password gate — every HTML page except /ai-enabled-design
  // shows the coming-soon page until the visitor has unlocked it.
  if (isGatedRequest(urlPath) && !isUnlocked(req)) {
    fs.readFile(path.join(ROOT, 'coming-soon.html'), (err, data) => {
      if (err) { res.writeHead(404); res.end('Not found'); return; }
      res.writeHead(200, { 'Content-Type': MIME['.html'] });
      res.end(data);
    });
    return;
  }

  let filePath = safeJoin(ROOT, urlPath === '/' ? '/index.html' : urlPath);
  if (!filePath) {
    res.writeHead(400);
    res.end('Bad request');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Extensionless URL: try appending .html before falling back to index
      if (!path.extname(filePath)) {
        return fs.readFile(filePath + '.html', (err2, data2) => {
          if (!err2) {
            res.writeHead(200, { 'Content-Type': MIME['.html'] });
            res.end(data2);
            return;
          }
          fs.readFile(path.join(ROOT, 'index.html'), (err3, fallback) => {
            if (err3) { res.writeHead(404); res.end('Not found'); return; }
            res.writeHead(200, { 'Content-Type': MIME['.html'] });
            res.end(fallback);
          });
        });
      }
      fs.readFile(path.join(ROOT, 'index.html'), (err2, fallback) => {
        if (err2) { res.writeHead(404); res.end('Not found'); return; }
        res.writeHead(200, { 'Content-Type': MIME['.html'] });
        res.end(fallback);
      });
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log('Antiphono site listening on port ' + PORT);
});
