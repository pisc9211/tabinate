import React, { useState, useEffect } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container'

import NavBar from './components/NavBar'
import Tabs from './components/Tabs'
import Landing from './components/Landing'

import withFirebaseAuth from 'react-with-firebase-auth'
import { providers, firebaseAppAuth } from './base'
import axios from 'axios'


function App({user, signOut, signInWithGoogle}) {
  let [urls, updateUrls] = useState([]);

  let addUrl = (url) => {
    updateUrls([...urls, {url, checked: true}])
    axios.post(`/api/url`, {url, uid: user.uid})
         .then(d => console.log('get back from post', d))
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

  let getUrls = () => {
    if (user) {
      axios.get(`/api/${user.uid}`)
           .then(({data}) => updateUrls(data[0].urls))
           .catch(err => console.error(err))
    }
  }
  
  useEffect(() => {
    getUrls()
  }, [user])

  console.log('user object from firebase', user)
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
