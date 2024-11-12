import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCnf_R7prMBY2BrhNFrvhAkbCNV4DhHTyY",
  authDomain: "map-app-016.firebaseapp.com",
  projectId: "map-app-016",
  storageBucket: "map-app-016.firebasestorage.app",
  messagingSenderId: "17549335875",
  appId: "1:17549335875:web:d14dc8caa846239ce5a3f6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
