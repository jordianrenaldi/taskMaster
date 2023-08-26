import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB3Go25nab6HRmV07VWUiwR4YmFWb5uC78",
  authDomain: "taskmaster-b19cb.firebaseapp.com",
  projectId: "taskmaster-b19cb",
  storageBucket: "taskmaster-b19cb.appspot.com",
  messagingSenderId: "688177993084",
  appId: "1:688177993084:web:311056637a18a6c64bc0f9"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }