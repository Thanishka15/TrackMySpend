import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDaeDAZqPzm9rcPh-7KePytCSmSpW83Dts",
  authDomain: "expensetracker-f18a8.firebaseapp.com",
  projectId: "expensetracker-f18a8",
  storageBucket: "expensetracker-f18a8.firebasestorage.app",
  messagingSenderId: "797420722698",
  appId: "1:797420722698:web:6130649d97548930a61df3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
