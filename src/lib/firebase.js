import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
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
let analyticsInstance = null;
try {
  analyticsInstance = getAnalytics(app);
} catch (e) {
  console.warn("Analytics failed to initialize:", e.message);
}

export const analytics = analyticsInstance;

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

export { app };
