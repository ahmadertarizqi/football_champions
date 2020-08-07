const webPush = require('web-push');
const vapidKeys = require('./vapidkeys.json');

webPush.setVapidDetails('mailto:example@yourdomain.org', vapidKeys.publicKey, vapidKeys.privateKey);

const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fT4vlKeN5Xs:APA91bG4Eb-RSsQca514nr4Ie9WE2LIocp8V2GmE0426_-pQGlknZHfTWnoAL74w0XK-axKeE3kAJXnBqi0fHsyH3_W0roBZ35GmnAwmUIEO6qLaC7zSvFF5gmPCYEmod8FBNC98eIMo",
   "keys": {
      "p256dh": "BOjtbBniJX61xnd/UMPXutyEEe57DCi3RKPFazvAl08YXFxX4HJbaYrSeYvVo3spnHpX7N8D+AItMevG3yR1jMc=",
      "auth": "w6eIGYcybYx+Mf+GRGuGvQ=="
   }
}

const payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

const options = {
   gcmAPIKey: "982562143304",
   TTL: 60
}

webPush.sendNotification(pushSubscription, payload, options);