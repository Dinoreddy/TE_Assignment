// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBH7vENRIgt0xA7XfcnbfhymEDLk61bN44",
    authDomain: "ccminiproject-d48d4.firebaseapp.com",
    projectId: "ccminiproject-d48d4",
    storageBucket: "ccminiproject-d48d4.firebasestorage.app",
    messagingSenderId: "114891213294",
    appId: "1:114891213294:web:da0349cde81b72d53ee6ff"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
