// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANIBeRcaEj0m5UmYkqwoH9eCKCZqjHXe4",
  authDomain: "e-commerce-bd85f.firebaseapp.com",
  projectId: "e-commerce-bd85f",
  storageBucket: "e-commerce-bd85f.firebasestorage.app",
  messagingSenderId: "506732487716",
  appId: "1:506732487716:web:eede830fcbae2d271ea4b1",
  measurementId: "G-YVEE44E4YH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};