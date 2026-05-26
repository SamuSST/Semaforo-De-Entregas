// public/sw.js
const CACHE_NAME = 'version-1';

const urlsToCache = [
  '/',           // Tu página Home (page.tsx)
  '/agregar',    // Tu página Agregar (agregar/page.tsx)
  '/manifest.json'
];

// Instalar el Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cacheando rutas de la app...');
      return cache.addAll(urlsToCache);
    })
  );
});

// Escuchar peticiones para servir desde el caché (Modo Offline)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Limpiar cachés antiguos (opcional pero recomendado)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});