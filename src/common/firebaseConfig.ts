// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyBeTUJj0spa3mnNcNTqEs_vVh1KH-Bc7HE",
    authDomain: "mydiary-dev-5daf0.firebaseapp.com",
    projectId: "mydiary-dev-5daf0",
    storageBucket: "mydiary-dev-5daf0.appspot.com",
    messagingSenderId: "342289437608",
    appId: "1:342289437608:web:ff19149cc8134fdeacc39d",
    measurementId: "G-4P4KZEE19S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)