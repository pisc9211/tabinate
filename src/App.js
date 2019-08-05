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

  let addUrl = async (url) => {
    axios.post(`/api/url`, {url, uid: user.uid })
         .then(d => console.log(d.data))
         .then(() => getUrls())
         .catch(err => console.error(err))
  }

  let openAll = (urlArr) => {
    urlArr.forEach(url => {
      window.open(url, '_blank');
    })
  }

  let deleteUrl = (urlId) => {
    console.log(user.uid, urlId)
    axios.delete('/api', { params: {
      uid: user.uid,
      urlId: urlId
    }}).then(() => getUrls())
      .catch(err => console.error(err))
  }

  let getUrls = () => {
    if (user) {
      axios.get(`/api/${user.uid}`)
           .then(({data}) => updateUrls(data[0].urls))
           .then(() => console.log(urls))
           .catch(err => console.error(err))
    }
  }
  
  useEffect(() => {
    getUrls()
  }, [user])

  return (
    <div style={style}>
      <NavBar user={user} signOut={signOut} signInWithGoogle={signInWithGoogle}/>
      { user ? <Tabs urls={urls} openAll={openAll} getUrls={getUrls} addUrl={addUrl} deleteUrl={deleteUrl} uid={user.uid} /> : <Landing signInWithGoogle={signInWithGoogle}/>}
    </div>
  );
}

let style = {
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  margin: '0 !important',
  padding: 0
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
