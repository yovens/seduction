const CACHE_NAME = 'seduction-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
  '/img/istockphoto-652380210-612x612.jpg',
  '/img/istockphoto-1251100905-612x612.jpg',
  '/img/istockphoto-2209116408-612x612.jpg',
  '/img/istockphoto-2166740858-612x612.jpg',
  '/img/istockphoto-1491416603-612x612.jpg',
  '/img/istockphoto-1328042999-612x612.jpg',
  '/img/istockphoto-839331408-612x612.jpg',
  '/img/istockphoto-665593608-612x612.jpg',
  '/img/istockphoto-1249500075-612x612.jpg',
  '/img/istockphoto-518312983-612x612.jpg'
];

// Installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
});

// Fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => resp || fetch(event.request))
  );
});
