const cacheName = 'v1';
const cacheAssets = [
  '/',
  '/index.html',
  '/manifest.json',
  '/styles.css', // Corrige el nombre del archivo CSS si es styles.css
  '/main.js',
  '/assets/icon-128.png',
  '/assets/icon-512.png',
  '/assets/jugador1.jpg',
  '/assets/jugador2.jpg',
  '/assets/jugador3.jpg',
  '/assets/temple-background.jpg',
  '/assets/background-texture.jpg',
  '/assets/terreno1.jpg ',
  '/assets/terreno2.jpg',
  '/views/home.html',        // Agrega las vistas
  '/views/api.html',
  '/views/acercaJuego.html',
  '/views/niveles.html',
  '/views/instalacion.html',
  '/views/contacto.html',


];

// Instalación del Service Worker
self.addEventListener('install', (e) => {
  console.log('Service Worker: Instalado');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Service Worker: Cacheando Archivos');
      return cache.addAll(cacheAssets);
    })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (e) => {
  console.log('Service Worker: Activado');
});

// Fetch (recuperar recursos desde cache o red)
self.addEventListener('fetch', (e) => {
  console.log('Service Worker: Fetching', e.request.url);
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});

// Registrar el Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((reg) => console.log('Service Worker registrado con éxito:', reg))
      .catch((err) => console.log('Error al registrar el Service Worker:', err));
  });
}
