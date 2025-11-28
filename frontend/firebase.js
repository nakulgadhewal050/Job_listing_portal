// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "joblistingportal-af1bd.firebaseapp.com",
  projectId: "joblistingportal-af1bd",
  storageBucket: "joblistingportal-af1bd.firebasestorage.app",
  messagingSenderId: "597742011148",
  appId: "1:597742011148:web:9df3e4c24e7570e7183f29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};