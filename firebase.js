import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCmljHrZ1tuKcq_GWzc8CH_HRIC67UVnGc",
    authDomain: "clone-2-5047d.firebaseapp.com",
    projectId: "clone-2-5047d",
    storageBucket: "clone-2-5047d.appspot.com",
    messagingSenderId: "909766203578",
    appId: "1:909766203578:web:5e5ea95e35d09a8afaca83"
  };

const app = !firebase.apps.length
              ? firebase.initializeApp(firebaseConfig) 
              : firebase.app();

const db = app.firestore();

export default db;
