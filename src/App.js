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
    axios.post(`/api/url`, {url, uid: user.uid})
         .then(() => getUrls())
         .catch(err => console.error(err))
  }

  let openAll = (urlArr) => {
    urlArr.forEach(url => {
      window.open(url, '_blank');
    })
  }

  let deleteUrl = (urlId) => {
    // axios.delete('/api', {
    //   uid: user.uid,
    //   urlId
    // }).then(() => getUrls())
    //   .catch(err => console.error(err))
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

  return (
    <Container>
      <NavBar user={user} signOut={signOut} signInWithGoogle={signInWithGoogle}/>
      <a href="https://www.reddit.com/r/nba" target="_blank">r/nba</a>
      { user ? <Tabs urls={urls} openAll={openAll} getUrls={getUrls} addUrl={addUrl} deleteUrl={deleteUrl} uid={user.uid}/> : <Landing />}
    </Container>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
