// Firebase configuration and initialization
import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAD5Rff9jZZE27-8oyj2OONAVTnaiBxUeo",
  authDomain: "aletwende.firebaseapp.com",
  databaseURL: "https://aletwende-default-rtdb.firebaseio.com",
  projectId: "aletwende",
  storageBucket: "aletwende.firebasestorage.app",
  messagingSenderId: "142861545293",
  appId: "1:142861545293:web:7cefd83f005dc12de19104",
  measurementId: "G-R9FCMY742N"
}

// Initialize Firebase (prevent multiple initializations)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)

// Enable offline persistence for Firestore (only runs client-side)
if (typeof window !== "undefined") {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled in one tab at a time
      console.warn("Firestore persistence unavailable - multiple tabs open")
    } else if (err.code === "unimplemented") {
      // The current browser does not support persistence
      console.warn("Firestore persistence not supported by browser")
    }
  })
}

export default app
