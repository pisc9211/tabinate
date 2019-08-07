import axios from 'axios'
import {
  SIGN_IN,
  SIGN_OUT,
  ADD_URL,
  UPDATE_URL,
  DELETE_URL,
  UPDATE_CHECKBOX,
  GET_URLS,
  TOGGLE_LOADING
} from './types'

export const reduxSignIn = (user) => {
  return {
    type: SIGN_IN,
    payload: user
  }
}

export const reduxSignOut = () => {
  return {
    type: SIGN_OUT
  }
}

export const toggleLoading = (isLoading) => {
  return {
    type: TOGGLE_LOADING,
    payload: isLoading
  }
}

// export const addUrl = (url) => async (dispatch, getState) => {
//   updateLoading(true);
//   axios.post(`/api/url`, {
//       url,
//       uid: user.uid
//     })
//     .then(d => {
//       console.log(d)
//       if (d.data === 'invalid url') {
//         updateLoading(false)
//         updateShow(true)
//       } else {
//         getUrls()
//         updateShow(false)
//       }
//     })
//     .catch(err => console.error(err))
// }

// let openAll = (urlArr) => {
//   urlArr.forEach(url => {
//     window.open(url, '_blank');
//   })
// }

// let deleteUrl = (urlId) => {
//   console.log(user.uid, urlId)
//   axios.delete('/api', {
//       params: {
//         uid: user.uid,
//         urlId: urlId
//       }
//     }).then(() => getUrls())
//     .catch(err => console.error(err))
// }

export const getUrls = () => async (dispatch, getState) =>  {
  // dispatch({ type: TOGGLE_LOADING, payload: !getState().url.isLoading})
  const response = await axios.get(`/api/${getState().auth.uid}`)
  dispatch({ type: GET_URLS, payload: response.data[0].urls })
  dispatch({ type: TOGGLE_LOADING, payload: false})
}

export const addUrl = (url) => async (dispatch, getState) => {
  axios.post('/api/url', { url, uid: getState().auth.uid })
       .then((d) => {
         if (d === 'invalid url') {
           console.log('invalid url')
         } else {
           dispatch(getUrls())
         }
        })
       .catch((e) => console.error('invalid url', e))

  // axios.post(`/api/url`, {
  //     url,
  //     uid: user.uid
  //   })
  //   .then(d => {
  //     console.log(d)
  //     if (d.data === 'invalid url') {
  //       updateLoading(false)
  //       updateShow(true)
  //     } else {
  //       getUrls()
  //       updateShow(false)
  //     }
  //   })
  //   .catch(err => console.error(err))
}