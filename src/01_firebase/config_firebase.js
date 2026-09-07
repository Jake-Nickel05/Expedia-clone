// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy9SCjWCTK58lMQwZrcO-q-VvJIJpZ8xM",
  authDomain: "project-6482644175048071188.firebaseapp.com",
  projectId: "project-6482644175048071188",
  storageBucket: "project-6482644175048071188.firebasestorage.app",
  messagingSenderId: "841799443713",
  appId: "1:841799443713:web:8449200471763f615ee700",
  measurementId: "G-CVSK63KXBY"
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);

export default firebase_app