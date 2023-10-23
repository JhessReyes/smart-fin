import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCjNvGpBRDgp7Yo8j01jzA4V3G9dG8iI0s',
    authDomain: 'smart-fin.firebaseapp.com',
    projectId: 'smart-fin',
    storageBucket: 'smart-fin.appspot.com',
    messagingSenderId: '686114140867',
    appId: '1:686114140867:web:4a9b3fe6e470383c802876',
    measurementId: 'G-CWWZ3NBV8B'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app }