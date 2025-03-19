import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAa4Gs8ynyseMC7zw019bi84dHgM-TUTQE",
  authDomain: "lab10-deabd.firebaseapp.com",
  projectId: "lab10-deabd",
  storageBucket: "lab10-deabd.firebasestorage.app",
  messagingSenderId: "326149404764",
  appId: "1:326149404764:web:e18ae9c2c67015083d8e99",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
