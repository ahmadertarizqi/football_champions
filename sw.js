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
   "./js/materialize.min.js",
   "./js/dayjs.min.js",
   "./js/utils.js",
   "./js/api.js",
   "./js/view.js",
   "./js/index.js",
   "./img/img_default.png",
   "./img/icons/icon-96x96.png",
   "./img/icons/icon-144x144.png",
   "./img/icons/icon-192x192.png",
   "./img/icons/icon-512x512.png",
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

