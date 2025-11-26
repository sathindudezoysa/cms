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
  apiKey: "AIzaSyDppxueqxBM51yxZ33ztSSx1C6KCO9-4KQ",
  authDomain: "saat-srilanka.firebaseapp.com",
  projectId: "saat-srilanka",
  storageBucket: "saat-srilanka.firebasestorage.app",
  messagingSenderId: "897363486350",
  appId: "1:897363486350:web:370f4e279fd4e4ccae0bdf",
  measurementId: "G-8ZRHW47PXB"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
