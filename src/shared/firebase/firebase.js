// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; // Include doc and getDoc here
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxGpNwNcCuaqQlkredjBudWZDSxuCvV3Y",
  authDomain: "hiringservice-419012.firebaseapp.com",
  projectId: "hiringservice-419012",
  storageBucket: "hiringservice-419012.appspot.com",
  messagingSenderId: "992389980385",
  appId: "1:992389980385:web:b9a789123ce7d0161b57a0",
  measurementId: "G-4T7GVPEEF7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

// Export for use in your components
export { db, auth, provider, doc, getDoc, setDoc, getFirestore, storage }; // Include storage in the export
