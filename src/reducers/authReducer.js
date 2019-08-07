import { SIGN_IN, SIGN_OUT } from '../actions/types'

const INITIAL_STATE = {
  isSignedIn: null,
  uid: null,
  userPicture: null
}

export default (state = INITIAL_STATE, action) => {
  console.log('action from authreducer', action.payload)
  switch(action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, uid: action.payload.uid, userPicture: action.payload.photoURL }
    case SIGN_OUT:
      return { ...state, isSignedIn: false, uid: null, userPicture: null }
    default:
      return state
  }
}