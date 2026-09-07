// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAliGSsi91GmK4A11pMVsoLrOHm1VM6GYM",
  authDomain: "spmassignment1-d99e1.firebaseapp.com",
  projectId: "spmassignment1-d99e1",
  storageBucket: "spmassignment1-d99e1.firebasestorage.app",
  messagingSenderId: "395517179521",
  appId: "1:395517179521:web:c548618b2a8f5f65e63f80",
  measurementId: "G-H0ZFRNJGVF"
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase_app);

export default firebase_app;
export { analytics };