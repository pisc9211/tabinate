import React from 'react'
import firebase from 'firebase'

let fb = firebase.initializeApp({
  apiKey: "AIzaSyB_HvMrDuMk8MifWM72DCQ3pWg72VXYbH4",
  authDomain: "tabinate-75e2f.firebaseapp.com",
  databaseURL: "https://tabinate-75e2f.firebaseio.com",
  projectId: "tabinate-75e2f",
  storageBucket: "",
  messagingSenderId: "251793672016",
  appId: "1:251793672016:web:47626c0b35516a5b"
})
const SignIn = () => {
  console.log(fb, 'firebase intitialized')
  let provider = new firebase.auth.GoogleAuthProvider();
  let googleSignIn = () => {
    console.log('signin button!')
    fb.auth().signInWithPopup(provider).then(result => { console.log(result) })
  }
  return(
    <div> 
      <div>SignIN</div>
      <button onClick={googleSignIn}>Singin</button>
    </div>

  )
}

export default SignIn

