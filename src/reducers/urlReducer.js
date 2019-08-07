import {
  GET_URLS,
  ADD_URL,
  UPDATE_URL,
  DELETE_URL,
  UPDATE_CHECKBOX,
  TOGGLE_LOADING
} from '../actions/types'

const INITIAL_STATE = {
  urls: null,
  isLoading: true
}

export default ( state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_URLS:
      return { ...state, urls: action.payload }
    case ADD_URL:
      return { ...state, urls: action.payload }
    case UPDATE_URL:
      return { ...state, urls: action.payload }
    case DELETE_URL:
      return { ...state, urls: action.payload }
    case UPDATE_CHECKBOX:
      return { ...state, urls: action.payload }
    case TOGGLE_LOADING:
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}