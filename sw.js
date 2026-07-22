/* Self-destructing service worker.
   Any device that still has an old cached Surfboard will, on its next visit,
   fetch this file, wipe every cache, unregister the worker, and reload with the
   live version. After that there is no service worker and the site always loads
   fresh from the network. */
self.addEventListener('install', () => { self.skipWaiting(); });

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      await self.registration.unregister();
      const clientsArr = await self.clients.matchAll({ type: 'window' });
      clientsArr.forEach((client) => client.navigate(client.url));
    } catch (e) { /* no-op */ }
  })());
});
/* No fetch handler on purpose: every request goes straight to the network. */
