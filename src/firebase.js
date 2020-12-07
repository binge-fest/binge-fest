import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDYkqhaqsze7amglX05aj9wzKoawwX7VbM",
  authDomain: "project6-2c309.firebaseapp.com",
  databaseURL: "https://project6-2c309-default-rtdb.firebaseio.com",
  projectId: "project6-2c309",
  storageBucket: "project6-2c309.appspot.com",
  messagingSenderId: "855605215169",
  appId: "1:855605215169:web:08bd616f4287874f8cb940"
};

firebase.initializeApp(firebaseConfig);
export default firebase;