// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEmzm4w4K8V3_PxdFIr-cNYyARsu6v3l4",
  authDomain: "awsomeproject-56cad.firebaseapp.com",
  projectId: "awsomeproject-56cad",
  storageBucket: "awsomeproject-56cad.appspot.com",
  messagingSenderId: "1072574787194",
  appId: "1:1072574787194:web:45ebcc1518a755aa6895c3"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);