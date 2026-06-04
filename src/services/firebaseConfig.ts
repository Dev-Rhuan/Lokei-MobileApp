import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB80BcZgUnN8gHMtZII4G1i7EdC4-uRgFE",
  authDomain: "lokei-b2399.firebaseapp.com",
  projectId: "lokei-b2399",
  storageBucket: "lokei-b2399.firebasestorage.app",
  messagingSenderId: "365450208234",
  appId: "1:365450208234:web:462d50a2d8e79a5f774893",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
