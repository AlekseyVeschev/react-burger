import { Api } from '../../utils/api'

export const SET_AUTH_LOADING = 'SET_AUTH_LOADING'
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR'
export const SET_USER = 'SET_USER'
export const SET_MESSAGE = 'SET_MESSAGE'
export const CLEAR_USER = 'CLEAR_USER'
export const RESPONSED_EMAIL = 'RESPONSED_EMAIL'

export const setAuthLoading = () => ({ type: SET_AUTH_LOADING })
export const setAuthError = payload => ({ type: SET_AUTH_ERROR, payload })
export const setUser = payload => ({ type: SET_USER, payload })
export const setMessage = payload => ({ type: SET_MESSAGE, payload })
export const clearUser = () => ({ type: CLEAR_USER })
export const responsedEmail = payload => ({ type: RESPONSED_EMAIL, payload })

export const registerRequest = (form) => async dispatch => {
   try {
      dispatch(setAuthLoading())
      const data = await Api.register(form)
      dispatch(setUser(data))
   } catch (error) {
      dispatch(setAuthError(error))
   }
}
export const loginRequest = (form) => async dispatch => {
   try {
      dispatch(setAuthLoading())
      const data = await Api.login(form)
      dispatch(setUser(data.user))
   } catch (error) {
      dispatch(setAuthError(error))
   }
}
export const logoutRequest = () => async dispatch => {
   try {
      dispatch(setAuthLoading())
      await Api.logout()
      dispatch(clearUser())
   } catch (error) {
      dispatch(setAuthError(error))
   }
}
export const restorePasswordRequest = (email) => async dispatch => {
   try {
      dispatch(setAuthLoading())
      const data = await Api.restorePassword(email)
      console.log("restorePasswordData", data)
      dispatch(setMessage(data))
      dispatch(responsedEmail(true))
   } catch (error) {
      dispatch(setAuthError(error))
   }
}
export const setNewPassword = (form) => async dispatch => {
   try {
      dispatch(setAuthLoading())
      const data = await Api.setPassword(form)
      dispatch(setMessage(data))
   } catch (error) {
      dispatch(setAuthError(error))
   }
}
export const getUserRequest = () => async dispatch => {
   try {
      dispatch(setAuthLoading())
      const data = await Api.getUser()
      dispatch(setUser(data.user))
   } catch (error) {
      dispatch(setAuthError(error))
   }
}
export const updateUserRequest = (form) => async dispatch => {
   try {
      dispatch(setAuthLoading())
      const data = await Api.updateUser(form)
      dispatch(setUser(data.user))

   } catch (error) {
      dispatch(setAuthError(error))
   }
}