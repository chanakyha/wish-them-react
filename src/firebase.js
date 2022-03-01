// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKdgze7ymbvW2kj0AsFnMSvfHyWkHKb04",
  authDomain: "wish-them-react.firebaseapp.com",
  projectId: "wish-them-react",
  storageBucket: "wish-them-react.appspot.com",
  messagingSenderId: "889458148622",
  appId: "1:889458148622:web:c2f1ad935fca13c9d0c35f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export { app, db };
