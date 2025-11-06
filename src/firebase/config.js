import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Substitua estas informações pelas suas credenciais do Firebase
  apiKey: "AIzaSyCmCbihkyjauRFgHJ0J3kA_6TtmbHQE_VA",
  authDomain: "sarau-655de.firebaseapp.com",
  projectId: "sarau-655de",
  storageBucket: "sarau-655de.firebasestorage.app",
  messagingSenderId: "1063972416902",
  appId: "1:1063972416902:web:60dee2f00b6c82a7561007",
  measurementId: "G-W3HM32VNN7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
