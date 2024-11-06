// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBeTUJj0spa3mnNcNTqEs_vVh1KH-Bc7HE",
  authDomain: "mydiary-dev-5daf0.firebaseapp.com",
  projectId: "mydiary-dev-5daf0",
  storageBucket: "mydiary-dev-5daf0.appspot.com",
  messagingSenderId: "342289437608",
  appId: "1:342289437608:web:4947bcb393eefc4facc39d",
  measurementId: "G-6T43PWNLRS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const analytics = getAnalytics(app);
export const storage = getStorage(app)