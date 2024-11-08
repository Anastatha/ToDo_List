import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBXf0GK8T0TI3hN3kpKVQLIMmZ42xuByV4",
  authDomain: "todoproject-3267a.firebaseapp.com",
  projectId: "todoproject-3267a",
  storageBucket: "todoproject-3267a.firebasestorage.app",
  messagingSenderId: "59251035941",
  appId: "1:59251035941:web:5bd864277a6502fd8314cc",
  databaseURL: 'https://todoproject-3267a-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

