import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'
import 'firebase/database';
import 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIO_jTNxMivF_wKAogJznsHPdvlL-1kUs",
  authDomain: "my-community-99787.firebaseapp.com",
  projectId: "my-community-99787",
  storageBucket: "my-community-99787.appspot.com",
  messagingSenderId: "1020835749964",
  appId: "1:1020835749964:web:28332368148153492e14e9",
  measurementId: "G-E0B0P38EQW",
  databaseURL: "https://my-community-99787-default-rtdb.asia-southeast1.firebasedatabase.app",
}

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const realtime = firebase.database();
const auth = firebase.auth();
const firestore = firebase.firestore()
const storage = firebase.storage()
const apiKey = firebaseConfig.apiKey;

export { auth, apiKey, firestore, storage, realtime, firebase };