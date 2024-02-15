// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMuTOYjnjgAWHsSwRZU7-_ODcnZqcd1T4",
  authDomain: "finance-app-cbead.firebaseapp.com",
  projectId: "finance-app-cbead",
  storageBucket: "finance-app-cbead.appspot.com",
  messagingSenderId: "112492983841",
  appId: "1:112492983841:web:7cace1cb0c920f43201560",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
