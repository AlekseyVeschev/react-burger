import { getCookie } from '../../utils/cookies'
import {
   SET_AUTH_LOADING,
   SET_AUTH_ERROR,
   SET_USER,
   SET_MESSAGE,
   CLEAR_USER,
   RESPONCED_EMAIL,
} from '../actions/auth'

const initialState = {
   name: '',
   email: '',
   loading: false,
   error: null,
   message: '',
   isAuth: !!getCookie('accessToken'),
   isResponcedEmail: false,
}

export const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_AUTH_LOADING:
         return {
            ...state,
            loading: true,
            error: null,
         }
      case SET_USER:
         return {
            ...state,
            name: action.payload.name,
            email: action.payload.email,
            isAuth: true,
            loading: false,
            error: null,
         }
      case SET_MESSAGE:
         return {
            ...state,
            message: action.payload.message,
            loading: false,
            error: null,
         }
      case CLEAR_USER:
         return {
            ...initialState,
            isAuth: false
         }
      case RESPONCED_EMAIL:
         return {
            ...state,
            isResponcedEmail: action.payload,
         }
      case SET_AUTH_ERROR:
         return {
            ...state,
            loading: false,
            isAuth: false,
            error: action.payload ? action.payload.message : null
         }
      default:
         return state
   }
}