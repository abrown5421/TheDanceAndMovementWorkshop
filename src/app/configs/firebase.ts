import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDxonEIElVKeZXzidBtiiAkcQohD3qnUJA",
  authDomain: "thedanceandmovementstudio.firebaseapp.com",
  projectId: "thedanceandmovementstudio",
  storageBucket: "thedanceandmovementstudio.firebasestorage.app",
  messagingSenderId: "471128297959",
  appId: "1:471128297959:web:6bc2323be7c4ed08d2ad42",
  measurementId: "G-ZKRPZ2W7Y8"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage(); 

export { db, storage }
