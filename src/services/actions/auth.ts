import { TError } from './../../types/data';
import { TAuthState } from './../reducers/auth';
import { Api } from '../../utils/api'
import { AppDispatch, AppThunk } from '../../types';

export const SET_AUTH_LOADING = 'SET_AUTH_LOADING'
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR'
export const SET_USER = 'SET_USER'
export const SET_MESSAGE = 'SET_MESSAGE'
export const CLEAR_USER = 'CLEAR_USER'
export const RESPONSED_EMAIL = 'RESPONSED_EMAIL'

export type TAuthActions = ReturnType<typeof setAuthLoading>
   | ReturnType<typeof setAuthError>
   | ReturnType<typeof setUser>
   | ReturnType<typeof setMessage>
   | ReturnType<typeof clearUser>
   | ReturnType<typeof responsedEmail>

export const setAuthLoading = () => ({ type: SET_AUTH_LOADING } as const)
export const setAuthError = (payload: TError) => ({ type: SET_AUTH_ERROR, payload } as const)
export const setUser = (payload: Pick<TAuthState, 'name' | 'email'>) => ({ type: SET_USER, payload } as const)
export const setMessage = (payload: Pick<TAuthState, 'message'>) => ({ type: SET_MESSAGE, payload } as const)
export const clearUser = () => ({ type: CLEAR_USER } as const)
export const responsedEmail = (payload: boolean) => ({ type: RESPONSED_EMAIL, payload } as const)

export const registerRequest: AppThunk = (form) => async (dispatch: AppDispatch) => {
   try {
      dispatch(setAuthLoading())
      const data = await Api.register(form)
      dispatch(setUser(data))
   } catch (error) {
      dispatch(setAuthError(error as TError))
   }
}
export const loginRequest: AppThunk = (form) => async (dispatch: AppDispatch) => {
   try {
      dispatch(setAuthLoading())
      const data = await Api.login(form)
      dispatch(setUser(data))
   } catch (error) {
      dispatch(setAuthError(error as TError))
   }
}
export const logoutRequest: AppThunk = () => async (dispatch: AppDispatch) => {
   try {
      dispatch(setAuthLoading())
      await Api.logout()
      dispatch(clearUser())
   } catch (error) {
      dispatch(setAuthError(error as TError))
   }
}
export const restorePasswordRequest: AppThunk = (email) => async (dispatch: AppDispatch) => {
   try {
      dispatch(setAuthLoading())
      const data = await Api.restorePassword(email)
      dispatch(setMessage(data))
      dispatch(responsedEmail(true))
   } catch (error) {
      dispatch(setAuthError(error as TError))
   }
}
export const setNewPassword: AppThunk = (form) => async (dispatch: AppDispatch) => {
   try {
      dispatch(setAuthLoading())
      const data = await Api.setPassword(form)
      dispatch(setMessage(data))
   } catch (error) {
      dispatch(setAuthError(error as TError))
   }
}
export const getUserRequest: AppThunk = () => async (dispatch: AppDispatch) => {
   try {
      dispatch(setAuthLoading())
      const data = await Api.getUser()
      dispatch(setUser(data))
   } catch (error) {
      dispatch(setAuthError(error as TError))
   }
}
export const updateUserRequest: AppThunk = (form) => async (dispatch: AppDispatch) => {
   try {
      dispatch(setAuthLoading())
      const data = await Api.updateUser(form)
      dispatch(setUser(data))
   } catch (error) {
      dispatch(setAuthError(error as TError))
   }
}