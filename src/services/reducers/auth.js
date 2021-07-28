import { getCookie } from '../../utils/cookies'
import {
   SET_AUTH_LOADING,
   SET_AUTH_ERROR,
   SET_USER,
   SET_MESSAGE,
   CLEAR_USER,
   RESPONSED_EMAIL,
} from '../actions/auth'

const initialState = {
   name: '',
   email: '',
   isLoading: false,
   error: null,
   message: '',
   isAuth: !!getCookie('accessToken'),
   isResponsedEmail: false,
}

export const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_AUTH_LOADING:
         return {
            ...state,
            isLoading: true,
            error: null,
         }
      case SET_USER:
         return {
            ...state,
            name: action.payload.name,
            email: action.payload.email,
            isAuth: true,
            isLoading: false,
            error: null,
         }
      case SET_MESSAGE:
         return {
            ...state,
            message: action.payload.message,
            isLoading: false,
            error: null,
         }
      case CLEAR_USER:
         return {
            ...initialState,
            isAuth: false
         }
      case RESPONSED_EMAIL:
         return {
            ...state,
            isResponsedEmail: action.payload,
         }
      case SET_AUTH_ERROR:
         return {
            ...state,
            isLoading: false,
            isAuth: false,
            error: action.payload ? action.payload.message : null
         }
      default:
         return state
   }
}