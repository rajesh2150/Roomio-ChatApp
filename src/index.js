import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app'

const firebaseConfig = {
  apiKey: "AIzaSyBCAuVLysfydu-aJGChyq0V1_x6vq5KF9Q",
  authDomain: "chat-app-c62db.firebaseapp.com",
  projectId: "chat-app-c62db",
  storageBucket: "chat-app-c62db.appspot.com",
  messagingSenderId: "1032966264712",
  appId: "1:1032966264712:web:0b730f20e6ff948df84c3d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
