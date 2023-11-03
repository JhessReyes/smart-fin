// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: 'AIzaSyCjNvGpBRDgp7Yo8j01jzA4V3G9dG8iI0s',
    authDomain: 'smart-fin.firebaseapp.com',
    projectId: 'smart-fin',
    storageBucket: 'smart-fin.appspot.com',
    messagingSenderId: '686114140867',
    appId: '1:686114140867:web:4a9b3fe6e470383c802876',
    measurementId: 'G-CWWZ3NBV8B'
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
