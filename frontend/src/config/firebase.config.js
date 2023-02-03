// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6GmiewMVuAQfGgqudPxv66eaJp0lyjq0",
  authDomain: "nft-marketplace-d368b.firebaseapp.com",
  projectId: "nft-marketplace-d368b",
  storageBucket: "nft-marketplace-d368b.appspot.com",
  messagingSenderId: "265597873671",
  appId: "1:265597873671:web:9f5c5e9905ad58755604a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage=getStorage(app)