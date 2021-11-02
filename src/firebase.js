// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXAeItiCHU5NHOzgn9GyO4fRHiqK7tnUs",
  authDomain: "blood-donation-bce1b.firebaseapp.com",
  databaseURL: "https://blood-donation-bce1b-default-rtdb.firebaseio.com",
  projectId: "blood-donation-bce1b",
  storageBucket: "blood-donation-bce1b.appspot.com",
  messagingSenderId: "434535205200",
  appId: "1:434535205200:web:c2f06bc77697bc9a028455",
  measurementId: "G-RENDC6LYW5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);