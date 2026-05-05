import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtaUAW6T1b4jHXDTbFcl5tplrbPzShqJY",
  authDomain: "keeps-notes-ebd9e.firebaseapp.com",
  projectId: "keeps-notes-ebd9e",
  storageBucket: "keeps-notes-ebd9e.firebasestorage.app",
  messagingSenderId: "198489473982",
  appId: "1:198489473982:web:d8ee6b244d97767903afef"
  
};


 export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);







