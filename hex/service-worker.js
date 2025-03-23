const CACHE_NAME = 'hex-color-game-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './icon.png',
    './startup.png',
    './style.css', // 必要に応じてCSSファイルを追加
    './script.js'  // 必要に応じてJSファイルを追加
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
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
