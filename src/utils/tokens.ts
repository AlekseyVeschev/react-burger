import { deleteCookie, setCookie } from './cookies'

export const saveTokens = ({ refreshToken = '', accessToken = '' } = {}) => {
   localStorage.setItem('refreshToken', refreshToken)
   let authToken
   if (accessToken.indexOf('Bearer') === 0) {
      authToken = accessToken.split('Bearer ')[1]
   }
   if (authToken) {
      setCookie('accessToken', authToken, { expires: 20 * 60, path: '/' })
   }
}

export const deleteTokens = () => {
   deleteCookie('accessToken')
   localStorage.removeItem('refreshToken')
}