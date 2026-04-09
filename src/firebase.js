import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  browserLocalPersistence,
  setPersistence,
  sendEmailVerification as sendEmailVerificationFn,
} from "firebase/auth";
import { addDoc, deleteDoc, getDoc, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBriog3DLN6Ofocx6dIMBp2IOKeqC5pXsE",
  authDomain: "besctcoach-app.firebaseapp.com",
  projectId: "besctcoach-app",
  storageBucket: "besctcoach-app.firebasestorage.app",
  messagingSenderId: "408678623618",
  appId: "1:408678623618:web:a83abab3c6e804d093c79b",
  measurementId: "G-1PCHN98LJ5",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app, "bestcoach-db");
export const auth = getAuth(app);
export const storage = getStorage(app);
export const sendEmailVerification = sendEmailVerificationFn;
export const deleteDocument = deleteDoc;
export const getDocument = getDoc;
export const addDocument = addDoc;
export let analytics = null;
let analyticsInitPromise = Promise.resolve(null);

if (typeof window !== "undefined") {
  setPersistence(auth, browserLocalPersistence).catch(() => {
    // Persistence can be unavailable in some restricted browser contexts.
  });

  analyticsInitPromise = isSupported()
    .then((supported) => {
      if (supported && firebaseConfig.measurementId) {
        analytics = getAnalytics(app);
        return analytics;
      }
      return null;
    })
    .catch(() => {
      // Analytics can be unavailable in some environments (privacy mode, extensions, etc.).
      return null;
    });
}

export const getAnalyticsInstance = () => analyticsInitPromise;

export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
export const microsoftProvider = new OAuthProvider("microsoft.com");
