// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBriog3DLN6Ofocx6dIMBp2IOKeqC5pXsE",
  authDomain: "besctcoach-app.firebaseapp.com",
  projectId: "besctcoach-app",
  storageBucket: "besctcoach-app.firebasestorage.app",
  messagingSenderId: "408678623618",
  appId: "1:408678623618:web:a83abab3c6e804d093c79b",
  measurementId: "G-1PCHN98LJ5"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app, 'bestcoach-db');   // ← Named database
export const storage = getStorage(app);

// Providers for OAuth
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
// src/firebase.js - Updated Microsoft Provider
export const microsoftProvider = new OAuthProvider('microsoft.com');
/*export const microsoftProvider = new OAuthProvider('microsoft.com');
microsoftProvider.setCustomParameters({
  tenant: 'consumers',        // ← THIS LINE FIXES PERSONAL ACCOUNTS
  prompt: 'select_account'
});*/
