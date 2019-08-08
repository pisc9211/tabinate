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

  let addUrl = async (url) => {
    updateLoading(true);
    axios.post(`/api/url`, {url, uid: user.uid })
         .then(d => {
           console.log(d)
           if (d.data === 'invalid url') {
             updateLoading(false)
             updateShow(true)
           } else {
             getUrls()
             updateShow(false)
           }
         })
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
      console.log('user', user)
      try {
        axios.get(`/api/${user.uid}`)
             .then(({data}) => {
               console.log(data[0].urls)
               updateUrls(data[0].urls)
              })
             .then(() => setTimeout(() => updateLoading(false), 1000))
             .catch(err => console.error(err))
      } catch (e) {
        console.log('status', e.status)
        try {
          axios.get(`/api/${user.uid}`)
             .then(({data}) => updateUrls(data[0].urls))
             .then(() => console.log(urls))
             .then(() => setTimeout(() => updateLoading(false), 1000))
             .catch(err => console.error(err))
        } catch {
          updateLoading(false)
          console.log(e.status)
          console.error(e)
        }
      }
    } else {
      updateLoading(false)
    }
  }
  
  useEffect(() => {
    console.log('useEffect going to get urls')
    getUrls()
  }, [user])

  return (
    loading ? <Loader /> : 
    <div style={style}>
      <NavBar user={user} signOut={signOut} signInWithGoogle={signInWithGoogle}/>
      { user ? 
        <Tabs 
          show={show} 
          updateShow={updateShow} 
          urls={urls} 
          openAll={openAll} 
          getUrls={getUrls} 
          addUrl={addUrl} 
          deleteUrl={deleteUrl} 
          uid={user.uid} 
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
