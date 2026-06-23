// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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

// Initialize Analytics safely
let analytics = null;
if (typeof window !== "undefined") {
  import('firebase/analytics').then(({ isSupported, getAnalytics }) => {
    isSupported().then(supported => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    });
  });
}
export { analytics };

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Enable offline persistence (permite que la app funcione sin conexión)
if (typeof window !== "undefined") {
  try {
    enableIndexedDbPersistence(db).catch((err) => {
      console.warn("Firebase persistence error:", err.code);
    });
  } catch (err) {
    console.warn("Firebase persistence sync error:", err);
  }
}
