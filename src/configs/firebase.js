// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeiR5HSaCaqHo4AleBiSI3KQc1JEyiIXs",
  authDomain: "p2-gc01-ideadly-skies.firebaseapp.com",
  projectId: "p2-gc01-ideadly-skies",
  storageBucket: "p2-gc01-ideadly-skies.firebasestorage.app",
  messagingSenderId: "344710508832",
  appId: "1:344710508832:web:d28cfdc204491e80d0a745",
  measurementId: "G-MYCB9ZNHTK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);