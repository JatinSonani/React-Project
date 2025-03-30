import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Import Firestore
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKPdC8Sv1sWoaKpDwXdRZayMW4H-5dtWU",
  authDomain: "flipkart-clone-firebase-f41dd.firebaseapp.com",
  projectId: "flipkart-clone-firebase-f41dd",
  storageBucket: "flipkart-clone-firebase.appspot.com",
  messagingSenderId: "254170912374",
  appId: "1:254170912374:web:b6615706d9b33724a77157"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
export { auth };