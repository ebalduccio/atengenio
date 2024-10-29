// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAKEJGr5fTXCIW-zY4C7UXgJv2molkrWC4",
    authDomain: "ai-costumers.firebaseapp.com",
    projectId: "ai-costumers",
    storageBucket: "ai-costumers.appspot.com",
    messagingSenderId: "758160614751",
    appId: "1:758160614751:web:039f90c8370134d20c82ea",
    measurementId: "G-DWFEGZBP7D"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);