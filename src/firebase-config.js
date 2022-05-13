import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyANGJV2AvmJoKj_LPVUy4P2SmUfFY8cXEE",
    authDomain: "where-is-pikachu.firebaseapp.com",
    projectId: "where-is-pikachu",
    storageBucket: "where-is-pikachu.appspot.com",
    messagingSenderId: "292163890721",
    appId: "1:292163890721:web:5be61322ad44e4f35cbd60"
};
  
const app = initializeApp(firebaseConfig);

export const db = getFirestore();