import firebase from "firebase";

var config = {
  apiKey: "AIzaSyAGO0q7WjakjW2vNyxIVThAVPWxm-xozj8",
  authDomain: "givethvideowalloffame.firebaseapp.com",
  databaseURL: "https://givethvideowalloffame.firebaseio.com",
  projectId: "givethvideowalloffame",
  storageBucket: "givethvideowalloffame.appspot.com",
  messagingSenderId: "271393366127"
};

export default () => {
  // Next.js firebase bug workaround when in development
  !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
};
