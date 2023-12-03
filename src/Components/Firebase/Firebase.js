import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBCAuVLysfydu-aJGChyq0V1_x6vq5KF9Q",
  authDomain: "chat-app-c62db.firebaseapp.com",
  projectId: "chat-app-c62db",
  storageBucket: "chat-app-c62db.appspot.com",
  messagingSenderId: "1032966264712",
  appId: "1:1032966264712:web:0b730f20e6ff948df84c3d"
};

const app=initializeApp(firebaseConfig)

export const auth = getAuth(app)