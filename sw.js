/* Surfboard service worker - offline-first caching */
const CACHE = 'surfboard-v5';
const ASSETS = [
  './',
  './index.html',
  './invite.html',
  './fonts.css',
  './og.png',
  './logo.png',
  './favicon.png',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './manifest.webmanifest',
  './logos/songchainn.png',
  './logos/zabal.png',
  './logos/base.png',
  './logos/metamask.png',
  './logos/binance.png',
  './logos/shwa.png',
  './fonts/font_0.woff2', './fonts/font_1.woff2', './fonts/font_2.woff2',
  './fonts/font_3.woff2', './fonts/font_4.woff2', './fonts/font_5.woff2',
  './fonts/font_6.woff2', './fonts/font_7.woff2', './fonts/font_8.woff2',
  './fonts/font_9.woff2', './fonts/font_10.woff2', './fonts/font_11.woff2'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // network-first for page navigations / HTML, so the newest page always wins when online
  const wantsHTML = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (wantsHTML) {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(req).then((c) => c || caches.match('./index.html')))
    );
    return;
  }

  // cache-first for static assets (fonts, images, css)
  e.respondWith(
    caches.match(req).then((cached) => {
      return cached || fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => cached);
    })
  );
});
