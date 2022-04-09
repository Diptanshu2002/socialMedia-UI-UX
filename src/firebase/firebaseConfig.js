import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-t6I7bsM2arVe08-rETWeqDD-819SmM4",
  authDomain: "relier-media-storage.firebaseapp.com",
  projectId: "relier-media-storage",
  storageBucket: "relier-media-storage.appspot.com",
  messagingSenderId: "114531805607",
  appId: "1:114531805607:web:a97eede6e9225592c52e82",
  measurementId: "G-0G3J14MW8E",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };
