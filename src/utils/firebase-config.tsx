// lib/firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth"; // Import other services like firestore, storage, etc., as needed
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_YmIeBWymRpuHfc-IfxpA9V_b1CgnEW0",
  authDomain: "kipdanotify.firebaseapp.com",
  projectId: "kipdanotify",
  storageBucket: "kipdanotify.appspot.com",
  messagingSenderId: "979543206667",
  appId: "1:979543206667:web:6c8b4a274cd4326371100e",
  measurementId: "G-TJCWYBVGKT"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);
// Initialize Firebase Authentication and export for use
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };