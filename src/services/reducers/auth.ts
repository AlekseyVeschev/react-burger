import { TError } from './../../types/data';
import {
   SET_AUTH_LOADING,
   SET_AUTH_ERROR,
   SET_USER,
   SET_MESSAGE,
   CLEAR_USER,
   RESPONSED_EMAIL,
   TAuthActions
} from '../actions/auth'

const refreshToken = localStorage.getItem('refreshToken');

const initialState = {
   name: '',
   email: '',
   isLoading: false,
   error: null as TError | null,
   message: '',
   isAuth: !!refreshToken,
   isResponsedEmail: false,
}
export type TAuthState = typeof initialState

export const authReducer = (state = initialState, action: TAuthActions): TAuthState => {
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
            error: action.payload
         }
      default:
         return state
   }
}