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
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
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
export let appCheck = null;
export const sendEmailVerification = sendEmailVerificationFn;
export const deleteDocument = deleteDoc;
export const getDocument = getDoc;
export const addDocument = addDoc;
export let analytics = null;
let analyticsInitPromise = Promise.resolve(null);

if (typeof window !== "undefined") {
  const APPCHECK_HMR_RESET_KEY = "bestcoach_appcheck_hmr_reset_done";

  setPersistence(auth, browserLocalPersistence).catch(() => {
    // Persistence can be unavailable in some restricted browser contexts.
  });

  const appCheckEnabled = process.env.REACT_APP_FIREBASE_APPCHECK_ENABLED !== "false";
  const appCheckKey =
    (process.env.REACT_APP_FIREBASE_APPCHECK_SITE_KEY || "").trim() ||
    (process.env.REACT_APP_RECAPTCHA_SITE_KEY || "").trim() ||
    (process.env.REACT_APP_RECAPTCHA_ID || "").trim();
  const debugTokenEnv = (process.env.REACT_APP_FIREBASE_APPCHECK_DEBUG_TOKEN || "").trim();
  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  const shouldUseDebugToken = isLocalhost && debugTokenEnv.length > 0;
  const clearPersistedDebugToken = () => {
    if (!("indexedDB" in window)) return;
    try {
      const request = window.indexedDB.open("firebase-app-check-database");
      request.onsuccess = () => {
        try {
          const db = request.result;
          if (!db.objectStoreNames.contains("firebase-app-check-store")) {
            db.close();
            return;
          }
          const tx = db.transaction("firebase-app-check-store", "readwrite");
          tx.objectStore("firebase-app-check-store").delete("debug-token");
          tx.oncomplete = () => db.close();
          tx.onerror = () => db.close();
        } catch {
          // Ignore IndexedDB cleanup failures.
        }
      };
      request.onerror = () => {
        // Ignore IndexedDB cleanup failures.
      };
    } catch {
      // Ignore IndexedDB cleanup failures.
    }
  };

  if (appCheckEnabled && shouldUseDebugToken) {
    // Allow local development without reCAPTCHA challenges when debug token is configured.
    // Use "true" to auto-generate a token (copy it from console and register it in Firebase App Check).
    // eslint-disable-next-line no-underscore-dangle
    window.FIREBASE_APPCHECK_DEBUG_TOKEN =
      debugTokenEnv === "true" ? true : debugTokenEnv;
  } else if (appCheckEnabled && debugTokenEnv && !isLocalhost) {
    console.warn("Ignoring REACT_APP_FIREBASE_APPCHECK_DEBUG_TOKEN outside localhost.");
  } else if (!shouldUseDebugToken) {
    // Prevent stale debug-token mode from previous hot-reload sessions.
    // eslint-disable-next-line no-underscore-dangle
    window.FIREBASE_APPCHECK_DEBUG_TOKEN = false;
    clearPersistedDebugToken();
  }

  if (appCheckEnabled && appCheckKey) {
    try {
      appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(appCheckKey),
        isTokenAutoRefreshEnabled: true,
      });
      if (isLocalhost) {
        sessionStorage.removeItem(APPCHECK_HMR_RESET_KEY);
      }
    } catch (error) {
      const shouldResetForHmr =
        isLocalhost &&
        error?.code === "appCheck/already-initialized" &&
        sessionStorage.getItem(APPCHECK_HMR_RESET_KEY) !== "1";

      if (shouldResetForHmr) {
        sessionStorage.setItem(APPCHECK_HMR_RESET_KEY, "1");
        window.location.reload();
      }

      // App Check initialization can fail in unsupported or constrained environments.
      appCheck = null;
      console.error("Firebase App Check initialization failed:", error);
    }
  } else if (appCheckEnabled && !appCheckKey) {
    console.warn(
      "App Check is enabled but no site key was found. Set REACT_APP_FIREBASE_APPCHECK_SITE_KEY."
    );
  }

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
