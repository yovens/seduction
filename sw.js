const CACHE_NAME = 'seduction-cache-v1';
const urlsToCache = [
  './index.html',
  './style.css',
  './app.js',
  './pages/aborder.html',
  './pages/conversation.html',
  './pages/confiance.html',
  './pages/look.html',
  './pages/sortir.html',
  './pages/erreurs.html',
  './pages/langage.html',
  './pages/psychologie.html',
  './pages/test.html',
  './pages/faq.html',
  './images/rencontre.svg',
  './images/conversation.svg',
  './images/confiance.svg',
  './images/look.svg',
  './images/sortir.svg',
  './images/erreurs.svg',
  './images/langage.svg',
  './images/psychologie.svg',
  './images/test.svg',
  './images/faq.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching app assets...');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
