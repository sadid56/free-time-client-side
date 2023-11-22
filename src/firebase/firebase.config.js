// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEpsC3NDkPJPYwS8F10l5yzq3AbOV7XiU",
  authDomain: "free-time-56230.firebaseapp.com",
  projectId: "free-time-56230",
  storageBucket: "free-time-56230.appspot.com",
  messagingSenderId: "3351795130",
  appId: "1:3351795130:web:1dcdcc733bc5051708b983"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;