import React, { useState } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container'

import NavBar from './components/NavBar'
import Tabs from './components/Tabs'
import Landing from './components/Landing'

import withFirebaseAuth from 'react-with-firebase-auth'
import { providers, firebaseAppAuth } from './base'


function App({user, signOut, signInWithGoogle}) {
  let [urls, updateUrls] = useState([{url: 'https://www.google.com',checked: true}, {url:'https://www.youtube.com', checked: true}]);

  let addUrl = (url) => {
    updateUrls([...urls, {url, checked: true}])
  }

  let openAll = (urlArr) => {
    urlArr.forEach(url => {
      window.open(url, '_blank');
    })
  }

  let deleteUrl = (e, i) => {
    e.preventDefault()
    updateUrls([...urls.slice(0, i), ...urls.slice(i+1)])
  }
  console.log(user)
  return (
    <Container>
      <NavBar user={user} signOut={signOut} signInWithGoogle={signInWithGoogle}/>
      { user ? <Tabs urls={urls} openAll={openAll} addUrl={addUrl} deleteUrl={deleteUrl} user={user}/> : <Landing />}
    </Container>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
