// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpK_bD1yUC5L-lDXvzYjyMdLE0r7XY3LI",
  authDomain: "sparta-react-basic-8bbdb.firebaseapp.com",
  projectId: "sparta-react-basic-8bbdb",
  storageBucket: "sparta-react-basic-8bbdb.appspot.com",
  messagingSenderId: "491271361387",
  appId: "1:491271361387:web:d40a7b7d6f13042e3e322e",
  measurementId: "G-J7TTB0RWLY"
};

initializeApp(firebaseConfig);

const db = getFirestore();

export {db};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);