// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCa8vRqpKgJSbapWv3zjbsaSdl_yExNFGA",
  authDomain: "restaurant-menu-d737e.firebaseapp.com",
  projectId: "restaurant-menu-d737e",
  storageBucket: "restaurant-menu-d737e.firebasestorage.app",
  messagingSenderId: "18298451432",
  appId: "1:18298451432:web:4ed0338e053fe24ed7605d"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Firestore database (this was missing)
export const db = getFirestore(app);
