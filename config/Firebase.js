import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyAQT5HpICWK7Rc1Av4Jo4hVLAr4cmSV05o",
    authDomain: "marvel-884ea.firebaseapp.com",
    databaseURL: "https://marvel-884ea.firebaseio.com",
    projectId: "marvel-884ea",
    storageBucket: "marvel-884ea.appspot.com",
    messagingSenderId: "957738891750",
    appId: "1:957738891750:web:e25d6ad991558dc398fe27",
    measurementId: "G-WCBXVWLS6R"
  }

const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase
