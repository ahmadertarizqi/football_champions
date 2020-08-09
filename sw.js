const CACHE_NAME = 'FOOTBALL_PWA';
const urlsToCache = [
   "./",
   "./manifest.json",
   "./index.html",
   "./nav.html",
   "./pages/klasemen.html",
   "./pages/pertandingan.html",
   "./pages/clubs.html",
   "./pages/clubdetail.html",
   "./pages/favorites.html",
   "./css/materialize.min.css",
   "./css/main.css",
   "./js/initialize.js",
   "./js/materialize.min.js",
   "./js/dayjs.min.js",
   "./js/utils.js",
   "./js/api.js",
   "./js/view.js",
   "./js/index.js",
   "./js/idb.js",
   "./js/db.js",
   "./img/img_default.png",
   "./img/icons/icon-96x96.png",
   "./img/icons/icon-144x144.png",
   "./img/icons/icon-192x192.png",
   "./img/icons/icon-512x512.png",
   "https://fonts.googleapis.com/icon?family=Material+Icons",
   "https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"
];

self.addEventListener('install', function(ev) {
   ev.waitUntil(
      caches.open(CACHE_NAME)
            .then(function(cache) {
               return cache.addAll(urlsToCache);
            })
   );
});

self.addEventListener('fetch', function(ev) {
   const apiURL = 'https://api.football-data.org/v2';

   if(ev.request.url.indexOf(apiURL) > -1) {
      ev.respondWith(
         caches.open(CACHE_NAME)
               .then(function(cache) {
                  return fetch(ev.request).then(function(response) {
                     cache.put(ev.request.url, response.clone());
                     return response;
                  });
               })
      );
   } else {
      ev.respondWith(
         caches.match(ev.request, { ignoreSearch: true })
               .then(function(response) {
                  return response || fetch(ev.request);
               })
      );
   }
});

self.addEventListener('activate', function(ev) {
   ev.waitUntil(
      caches.keys().then(function(cachesName) {
         return Promise.all(
            cachesName.map(function(cacheName) {
               if(cacheName !== CACHE_NAME) {
                  console.log(`Service Worker : cache ${cacheName} dihapus`);
                  return caches.delete(cacheName);
               }
            })
         )
      })
   );
});

self.addEventListener('push', function(ev) {
   let body;
   if(ev.data) {
      body = ev.data.text();
   } else {
      body = 'Push message no Payload';
   }

   const options = {
      body: body,
      icon: './img/icons/icon-96x96.png',
      vibrate: [100, 50, 100],
      data: {
         dateOfArrival: Date.now(),
         primaryKey: 1
      }
   }

   ev.waitUntil(self.registration.showNotification('Push Notification', options));
});

