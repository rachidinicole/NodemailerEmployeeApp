import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeZs-QlSZoNxeuwNIxacgIET2YmUDffSk",
  authDomain: "employee-app-a77ce.firebaseapp.com",
  projectId: "employee-app-a77ce",
  storageBucket: "employee-app-a77ce.appspot.com",
  messagingSenderId: "1069866023831",
  appId: "1:1069866023831:web:3c357edf94c931c91a62d2",
  measurementId: "G-WT4HQB761N",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };