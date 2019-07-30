import * as firebase from 'firebase/app'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyC64IGxJpId-a_QVdXuKsgPCfFT35K7y1E",
    authDomain: "tabinate-2d51f.firebaseapp.com",
    databaseURL: "https://tabinate-2d51f.firebaseio.com",
    projectId: "tabinate-2d51f",
    storageBucket: "",
    messagingSenderId: "593242313861",
    appId: "1:593242313861:web:15020f076e7c0a6f"
  };

const firebaseApp = firebase.initializeApp(config)
export const firebaseAppAuth = firebaseApp.auth()
export const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
}
