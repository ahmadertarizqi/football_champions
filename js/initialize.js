/* initial service-worker and push notification */
if('serviceWorker' in navigator) {
   registerServiceWorker();
   requestPermission();
} else {
   console.log("ServiceWorker belum didukung browser ini.");
}

function registerServiceWorker() {
   return navigator.serviceWorker.register("./sw.js")
      .then(function(registration) {
         console.log("Pendaftaran ServiceWorker berhasil");
         return registration;
      })
      .catch(function(error) {
         console.log("Pendaftaran ServiceWorker gagal", error);
      });
}

function requestPermission() {
   if('Notification' in window) {
      Notification.requestPermission().then(function(result) {
         if(result === 'denied') {
            console.log("Fitur notifikasi tidak diijinkan.");
            return;
         } else if (result === 'default') {
            console.error("Pengguna menutup kotak dialog permintaan ijin.");
            return;
         }

         navigator.serviceWorker.ready.then(function() {
            if(('PushManager' in window)) {
               navigator.serviceWorker.getRegistration().then(function(regist) {
                  regist.pushManager.subscribe({
                     userVisibleOnly: true,
                     applicationServerKey: urlBase64ToUint8Array('BE6jkR-c4aAvt2At4O514Dnkx5o2YFy7Di32vvxEsUAZDe5Xxik-XOpIdHOLuyZx5cgSPxAoLPhSg3WatRtLwLk')
                  }).then(function(subscribe) {
                     console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                     console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh')))));
                     console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth')))));
                  }).catch(function(error) {
                     console.error('Tidak dapat melakukan subscribe ', error.message);
                  });
               });
            }
         });
      });
   }
}