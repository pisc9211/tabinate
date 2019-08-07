import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { reduxSignIn, reduxSignOut, getUrls, addUrl, toggleLoading } from './actions'
import './App.css';

import NavBar from './components/NavBar'
import Tabs from './components/Tabs'
import Landing from './components/Landing'
import Loader from './components/Loader'

import withFirebaseAuth from 'react-with-firebase-auth'
import { providers, firebaseAppAuth } from './base'
import axios from 'axios'

function App(state) {
  let [urls, updateUrls] = useState([]);
  let [loading, updateLoading] = useState(true);
  let [show, updateShow] = useState(true)

  // let addUrl = async (url) => {
  //   updateLoading(true);
  //   axios.post(`/api/url`, {url, uid: state.user.uid })
  //        .then(d => {
  //          console.log(d)
  //          if (d.data === 'invalid url') {
  //            updateLoading(false)
  //            updateShow(true)
  //          } else {
  //            getUrls()
  //            updateShow(false)
  //          }
  //        })
  //        .catch(err => console.error(err))
  // }

  let openAll = (urlArr) => {
    urlArr.forEach(url => {
      window.open(url, '_blank');
    })
  }

  let deleteUrl = (urlId) => {
    console.log(state.user.uid, urlId)
    axios.delete('/api', { params: {
      uid: state.user.uid,
      urlId: urlId
    }}).then(() => getUrls())
      .catch(err => console.error(err))
  }

  // let getUrls = () => {
  //   if (state.user) {
  //     console.log('user', state.user)
  //     state.reduxSignIn({uid:state.user.uid, photoURL: state.user.photoURL})
  //     try {
  //       axios.get(`/api/${state.user.uid}`)
  //            .then(({data}) => updateUrls(data[0].urls))
  //            .then(() => setTimeout(() => updateLoading(false), 1000))
  //            .catch(err => console.error(err))
  //     } catch (e) {
  //       console.log('status', e.status)
  //       try {
  //         axios.get(`/api/${state.user.uid}`)
  //            .then(({data}) => updateUrls(data[0].urls))
  //            .then(() => console.log(urls))
  //            .then(() => setTimeout(() => updateLoading(false), 1000))
  //            .catch(err => console.error(err))
  //       } catch {
  //         updateLoading(false)
  //         console.log(e.status)
  //         console.error(e)
  //       }
  //     }
  //   } else {
  //     state.reduxSignOut()
  //     updateLoading(false)
  //   }
  //   console.log(state)
  // }
  
  useEffect(() => {
    console.log('state at useEffect', state)
    if (state.user) {
      state.reduxSignIn({uid:state.user.uid, photoURL: state.user.photoURL})
    }
    state.getUrls()
    state.toggleLoading(!state.isLoading)
    // setTimeout(() => console.log('state after first geturl call', state), 5000)
  }, [state.user])

  return (
    state.isLoading ? <Loader /> :
    <div style={style}>
      <NavBar user={state.user} signOut={() => {state.signOut();state.reduxSignOut();}} signInWithGoogle={state.signInWithGoogle}/>
      { state.user ? 
        <Tabs 
          urls={state.url ? state.url.urls:null}
          show={show} 
          updateShow={updateShow}
          openAll={openAll} 
          // getUrls={state.getUrls} 
          // addUrl={state.addUrl} 
          deleteUrl={deleteUrl} 
          uid={state.user.uid} 
        /> : 
        <Landing 
          signInWithGoogle={state.signInWithGoogle}
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

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, uid: state.auth.uid, photoURL: state.auth.photoURL, isLoading: state.url.isLoading}
}

export default connect(mapStateToProps, {reduxSignIn, reduxSignOut, getUrls, addUrl, toggleLoading})(withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App));
