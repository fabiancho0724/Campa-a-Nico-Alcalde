// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLS2LYNJypvGovQoiteLEUjsQ3MGwaftE",
  authDomain: "nico-alcalde.firebaseapp.com",
  databaseURL: "https://nico-alcalde-default-rtdb.firebaseio.com",
  projectId: "nico-alcalde",
  storageBucket: "nico-alcalde.firebasestorage.app",
  messagingSenderId: "174235643320",
  appId: "1:174235643320:web:f6d045969f653dbcaf734d",
  measurementId: "G-92ZPE5GG6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (solo en el navegador, no en SSR)
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Enable offline persistence (permite que la app funcione sin conexión)
if (typeof window !== "undefined") {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === "failed-precondition") {
      console.warn("Firebase: Persistencia offline no disponible (múltiples pestañas abiertas).");
    } else if (err.code === "unimplemented") {
      console.warn("Firebase: El navegador no soporta persistencia offline.");
    }
  });
}
