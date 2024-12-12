// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsUSFPyCnfszSiPNjtGhRRJ1M4morPxLY",
  authDomain: "thankstape-3c117.firebaseapp.com",
  projectId: "thankstape-3c117",
  storageBucket: "thankstape-3c117.firebasestorage.app",
  messagingSenderId: "703633262883",
  appId: "1:703633262883:web:7eb4ed9bdf18de4c10a496",
  measurementId: "G-3DN387BC0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const analytics = getAnalytics(app);
export const storage = getStorage(app)