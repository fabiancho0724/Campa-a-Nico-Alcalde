import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

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

const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const db = getFirestore(app);
export const auth = getAuth(app);
