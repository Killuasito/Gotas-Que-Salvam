import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Substitua estas informações pelas suas credenciais do Firebase
  apiKey: "AIzaSyBeEz2m21rW2m4zSo4SARdMkaTzErNj6YA",
  authDomain: "gotas-que-salvam.firebaseapp.com",
  projectId: "gotas-que-salvam",
  storageBucket: "gotas-que-salvam.firebasestorage.app",
  messagingSenderId: "702495072549",
  appId: "1:702495072549:web:aa035cc24f88617939facc",
  measurementId: "G-3W10XNWH7Z",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
