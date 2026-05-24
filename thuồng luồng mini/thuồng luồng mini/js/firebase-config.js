// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// TODO: Replace with your actual Firebase project config
// Bạn vào Firebase Console -> Project Settings -> General -> Web Apps để lấy đoạn config này nhé
const firebaseConfig = {
  apiKey: "AIzaSyDTPbTFdMYc1XgAfLbYbGnJFPKKD5JrRFs",
  authDomain: "thuongluongmini.firebaseapp.com",
  projectId: "thuongluongmini",
  storageBucket: "thuongluongmini.firebasestorage.app",
  messagingSenderId: "812059244568",
  appId: "1:812059244568:web:b08773193f123cc06e6b6d",
  measurementId: "G-8KNH7S2ZF8",
  databaseURL: "https://thuongluongmini-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

export { app, auth, database, storage };
