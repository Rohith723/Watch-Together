// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6srfa0KBgzWf3ySEZJirVMNv-53zL4N4",
  authDomain: "watch-together-31ec8.firebaseapp.com",
  projectId: "watch-together-31ec8",
  storageBucket: "watch-together-31ec8.firebasestorage.app",
  messagingSenderId: "407689901190",
    appId: "1:407689901190:web:aebffda792b41700c64d07",
  };

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Firebase auth if needed
export const auth = getAuth(app);
export default app;
