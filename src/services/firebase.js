import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDR-BvedCwiDiSBpgCDDpEjpfo6PbMBXDs",
  authDomain: "musium-fe4da.firebaseapp.com",
  projectId: "musium-fe4da",
  storageBucket: "musium-fe4da.firebasestorage.app",
  messagingSenderId: "236131608434",
  appId: "1:236131608434:web:00ec1ef4761dab2a2f9feb",
  measurementId: "G-YFV66V0VPP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
