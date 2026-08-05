import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaijW38ne0Vv4hSWg__1nGQK-a8jL6xXw",
  authDomain: "studymate-ai-b16e2.firebaseapp.com",
  projectId: "studymate-ai-b16e2",
  storageBucket: "studymate-ai-b16e2.firebasestorage.app",
  messagingSenderId: "483013410631",
  appId: "1:483013410631:web:e3b6d655daa02ab02fd662"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;