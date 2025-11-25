// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFJvVE2b_rjnhaMKLBJpvj3UjRyOYyGuw",
  authDomain: "saatsrilanka-8ceea.firebaseapp.com",
  projectId: "saatsrilanka-8ceea",
  storageBucket: "saatsrilanka-8ceea.firebasestorage.app",
  messagingSenderId: "632140555928",
  appId: "1:632140555928:web:f9fadbb42ee5a1718c52ed",
  measurementId: "G-QZ5XY33D0S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
