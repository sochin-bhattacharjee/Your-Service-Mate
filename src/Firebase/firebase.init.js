// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-QUwFiu1q4Skh6Va8_XuoS1krZ6psauk",
  authDomain: "your-service-mate.firebaseapp.com",
  projectId: "your-service-mate",
  storageBucket: "your-service-mate.firebasestorage.app",
  messagingSenderId: "441601381641",
  appId: "1:441601381641:web:e7a4ad6b1e9ccd56ab2fd8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);