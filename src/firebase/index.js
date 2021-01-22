import firebase from "firebase";
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyAxVOPiOJPV3vn00Qco9TUaqvUbzaHYjgo",
  authDomain: "campusmarketapp.firebaseapp.com",
  projectId: "campusmarketapp",
  storageBucket: "campusmarketapp.appspot.com",
  messagingSenderId: "208348551981",
  appId: "1:208348551981:web:69e5a4ded6ef21f72811a4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default}