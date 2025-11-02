// Simple PWA service worker with cache-first for app shell
const CACHE = 'seduction-cache-v1';
const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './offline.html',
  './manifest.webmanifest',
  '/img/istockphoto-652380210-612x612.jpg',
  '/img/istockphoto-1251100905-612x612.jpg',
  '/img/istockphoto-2209116408-612x612.jpg',
  '/img/istockphoto-2166740858-612x612.jpg',
  '/img/istockphoto-1491416603-612x612.jpg',
  '/img/istockphoto-1328042999-612x612.jpg',
  '/img/istockphoto-839331408-612x612.jpg',
  '/img/istockphoto-665593608-612x612.jpg',
  '/img/istockphoto-1249500075-612x612.jpg',
  '/img/istockphoto-518312983-612x612.jpg',
   './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (e)=>{
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e)=>{
  const { request } = e;
  // Only GET
  if(request.method !== 'GET'){ return; }
  e.respondWith(
    caches.match(request).then(cached => {
      if(cached) return cached;
      return fetch(request).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(request, copy)).catch(()=>{});
        return resp;
      }).catch(()=> caches.match('./offline.html'));
    })
  );
});
