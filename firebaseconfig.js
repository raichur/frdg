import * as firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyD4bGTKw2TJ20kMMT0KT-KfKDvfAUxEitc",
  authDomain: "adept-now-130923.firebaseapp.com",
  databaseURL: "https://adept-now-130923.firebaseio.com",
  storageBucket: "adept-now-130923.appspot.com",
  messagingSenderId: "451820905019"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

var Fire = module.exports = firebaseConfig, firebaseApp;
