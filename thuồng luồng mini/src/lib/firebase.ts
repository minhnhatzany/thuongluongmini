import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { getAuth } from "firebase/auth";

// Using a mock config or the user's config if provided later
const firebaseConfig = {
  apiKey: "AIzaSyDTPbTFdMYc1XgAfLbYbGnJFPKKD5JrRFs",
  authDomain: "thuongluongmini.firebaseapp.com",
  databaseURL: "https://thuongluongmini-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "thuongluongmini",
  storageBucket: "thuongluongmini.firebasestorage.app",
  messagingSenderId: "812059244568",
  appId: "1:812059244568:web:b08773193f123cc06e6b6d",
  measurementId: "G-8KNH7S2ZF8"
};

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

let messaging: any = null;
if (typeof window !== "undefined") {
  import("firebase/messaging").then(({ getMessaging, isSupported }) => {
    isSupported().then((supported) => {
      if (supported) {
        messaging = getMessaging(app);
      }
    });
  });
}

export { db, storage, auth, app, messaging };
