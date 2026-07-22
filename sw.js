/* Surfboard service worker - offline-first caching */
const CACHE = 'surfboard-v1';
const ASSETS = [
  './',
  './index.html',
  './invite.html',
  './fonts.css',
  './og.png',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './manifest.webmanifest',
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
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      return cached || fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      }).catch(() => cached);
    })
  );
});
