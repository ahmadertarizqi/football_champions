importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if(workbox) {
   console.log('Yay! Workbox is loaded 🎉');
} else {
   console.log('Boo! Workbox didnt load 😬');
}

const urlsToCache = [
   { url: "./", revision: "1" },
   { url: "./manifest.json", revision: "1" },
   { url: "./index.html", revision: "1" },
   { url: "./nav.html", revision: "1" },
   { url: "./pages/klasemen.html", revision: "1" },
   { url: "./pages/pertandingan.html", revision: "1" },
   { url: "./pages/clubs.html", revision: "1" },
   { url: "./pages/clubdetail.html", revision: "1" },
   { url: "./pages/favorites.html", revision: "1" },
   { url: "./css/materialize.min.css", revision: "1" },
   { url: "./css/main.css", revision: "1" },
   { url: "./js/initialize.js", revision: "1" },
   { url: "./js/materialize.min.js", revision: "1" },
   { url: "./js/dayjs.min.js", revision: "1" },
   { url: "./js/utils.js", revision: "1" },
   { url: "./js/api.js", revision: "1" },
   { url: "./js/view.js", revision: "1" },
   { url: "./js/index.js", revision: "1" },
   { url: "./js/idb.js", revision: "1" },
   { url: "./js/db.js", revision: "1" },
   { url: "./img/img_default.png", revision: "1" },
   { url: "./img/icons/icon-96x96.png", revision: "1" },
   { url: "./img/icons/icon-144x144.png", revision: "1" },
   { url: "./img/icons/icon-192x192.png", revision: "1" },
   { url: "./img/icons/icon-512x512.png", revision: "1" },
   { url: "https://fonts.googleapis.com/icon?family=Material+Icons", revision: "1" },
   { url: "https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2", revision: "1" },
];

workbox.precaching.precacheAndRoute(urlsToCache);

workbox.routing.registerRoute(
   /^https:\/\/api\.football-data\.org\//,
   workbox.strategies.staleWhileRevalidate({
      cacheName: 'url-api-cache'
   })
);

workbox.routing.registerRoute(
   /.*(?:png|gif|jpg|jpeg|svg)$/,
   workbox.strategies.cacheFirst({
      cacheName: 'images-cache',
      plugins: [
         new workbox.cacheableResponse.Plugin({
            statuses: [0, 200]
         }),
         new workbox.expiration.Plugin({
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60
         })
      ]
   })
);

/* push notification */
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

