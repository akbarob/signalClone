// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlKF26kcy-pk2W0mn5xLHpObJp5xda5w0",
  authDomain: "signalclone-31788.firebaseapp.com",
  projectId: "signalclone-31788",
  storageBucket: "signalclone-31788.appspot.com",
  messagingSenderId: "821705070489",
  appId: "1:821705070489:web:d9287bc9a3c86d519d6508",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage(app);
