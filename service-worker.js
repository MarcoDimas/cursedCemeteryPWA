const cacheName = 'v1';
const cacheAssets = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/icon.png',
  '/assets/icon-512.png',
  '/style.css', // Si tienes un archivo CSS separado
];

// Instalación del Service Worker
self.addEventListener('install', (e) => {
  console.log('Service Worker: Instalado');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Service Worker: Cacheando Archivos');
      cache.addAll(cacheAssets);
    })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (e) => {
  console.log('Service Worker: Activado');
});

// Fetch (recuperar recursos desde cache)
self.addEventListener('fetch', (e) => {
  console.log('Service Worker: Fetching', e.request.url);
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('service-worker.js')
        .then((reg) => console.log('Service Worker registrado con éxito:', reg))
        .catch((err) => console.log('Error al registrar el Service Worker:', err));
    });
  }