import firebase from 'firebase'


var firebaseConfig = {
  apiKey: "AIzaSyBnDy_S-bFN7hNO3qvw3LYg-1unnoZ5PxM",
  authDomain: "marvelapp-9d24b.firebaseapp.com",
  projectId: "marvelapp-9d24b",
  storageBucket: "marvelapp-9d24b.appspot.com",
  messagingSenderId: "186055597146",
  appId: "1:186055597146:web:fbd89572d04e746cfa0c63",
  measurementId: "G-ZBP93X999Q"
}

const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase
