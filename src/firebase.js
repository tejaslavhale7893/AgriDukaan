import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// You can find this in your Firebase Console: Project Settings > General > Your apps
const firebaseConfig = {
  apiKey: "AIzaSyDWOZh3ji45KhenoxjPY9j0qOERYno4WJI",
  authDomain: "agridukaan-87c9e.firebaseapp.com",
  projectId: "agridukaan-87c9e",
  storageBucket: "agridukaan-87c9e.firebasestorage.app",
  messagingSenderId: "763481903647",
  appId: "1:763481903647:web:a7f289f6544b4ea62d3b2a",
  measurementId: "G-X39X52J16H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app);
export const auth = getAuth(app);
