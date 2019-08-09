import React, { useState, useEffect } from 'react';
import './App.css';

import NavBar from './components/NavBar'
import Tabs from './components/Tabs'
import Landing from './components/Landing'
import Loader from './components/Loader'

import withFirebaseAuth from 'react-with-firebase-auth'
import { providers, firebaseAppAuth } from './base'
import axios from 'axios'

function App({user, signOut, signInWithGoogle}) {
  let [urls, updateUrls] = useState([]);
  let [loading, updateLoading] = useState(true);
  let [show, updateShow] = useState(false)
  let [demo, updateDemo] = useState(null)
  
  let addUrl = async (url) => {
    updateLoading(true);
    let uid = demo ? demo.uid : user.uid
    axios.post(`/api/url`, {url, uid })
         .then(d => {
           if (d.data === 'invalid url') {
             updateLoading(false)
             updateShow(true)
           } else {
             getUrls()
             updateShow(false)
           }
         })
         .catch(err => {
           console.error(err)
           updateLoading(false);
          })
  }

  let openAll = (urlArr) => {
    urlArr.forEach(url => {
      window.open(url, '_blank');
    })
  }

  let deleteUrl = (urlId) => {
    let uid = demo ? demo.uid : user.uid
    axios.delete('/api', { params: {
      uid,
      urlId: urlId
    }}).then(() => getUrls())
      .catch(err => console.error(err))
  }

  let getUrls = () => {
    if (demo || user) {
      let uid = demo ? demo.uid : user.uid
      try {
        axios.get(`/api/${uid}`)
             .then(({data}) => {
               updateUrls(data[0].urls)
              })
             .then(() => setTimeout(() => updateLoading(false), 1000))
             .catch(err => console.error(err))
      } catch (e) {
        try {
          let uid = demo ? demo.uid : user.uid
          axios.get(`/api/${uid}`)
             .then(({data}) => updateUrls(data[0].urls))
             .then(() => setTimeout(() => updateLoading(false), 1000))
             .catch(err => console.error(err))
        } catch {
          updateLoading(false)
          console.error(e)
        }
      }
    } else {
      updateLoading(false)
    }
  }

  let demoLogIn = async () => {
      await updateDemo({
        uid: 'demouser',
        photoURL: 'https://static.thenounproject.com/png/363633-200.png'
      });
      getUrls()
  }
  
  useEffect(() => {
    getUrls()
  }, [user, demo])

  return (
    loading ? <Loader /> : 
    <div style={style}>
      <NavBar user={demo !== null ? demo : user} signOut={signOut} signInWithGoogle={signInWithGoogle} updateDemo={updateDemo} demoLogIn={demoLogIn}/>
      { demo || user ? 
        <Tabs 
          show={show} 
          updateShow={updateShow} 
          urls={urls} 
          openAll={openAll} 
          getUrls={getUrls} 
          addUrl={addUrl} 
          deleteUrl={deleteUrl} 
          uid={demo !== null ? demo.uid : user.uid} 
        /> : 
        <Landing 
          signInWithGoogle={signInWithGoogle}
        />
      }
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
