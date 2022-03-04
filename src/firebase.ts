// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDDCa_V4tuHJRiuQ0HJS_oqmkMFwXFNvJU',
  authDomain: 'world-cup-a7493.firebaseapp.com',
  projectId: 'world-cup-a7493',
  storageBucket: 'world-cup-a7493.appspot.com',
  messagingSenderId: '294816351849',
  appId: '1:294816351849:web:2aa5bc47aa37ea838004f8',
  measurementId: 'G-BWLSCSGQVD',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const authService = getAuth();
export const dbService = getFirestore();
