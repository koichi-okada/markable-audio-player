// service-worker.js
const CACHE_NAME = 'markable-audio-player-v1';
const urlsToCache = [
  './',
  './markable-audio-player.html',
  './manifest.json',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => {
      return new Response('オフラインです');
    })
  );
});
