import { BASE_URL } from "./constants"
import { getCookie } from './cookies'
import { saveTokens, deleteTokens } from './tokens'
import { store } from './store'
import { setAuthError } from "../pages/services/actions/auth"


const request = async (url, { body, method = 'GET', headers = {} } = {}) => {
   const defaultHeaders = {
      'Content-Type': 'application/json',
   }

   const accessToken = getCookie('accessToken')
   if (accessToken) {
      defaultHeaders.authorization = `Bearer ${accessToken}`
   }

   const response = await fetch(`${BASE_URL}${url}`, {
      method,
      headers: {
         ...defaultHeaders,
         ...headers
      },
      body: JSON.stringify(body),
   })

   const data = await response.json()

   if (!data.success && data.message === "jwt expired") {
      const data = await Api.updateAccessToken()
      if (data.success) {
         return request(url, { body, method, headers })
      }
   }

   if (!data.success) {
      throw data
   }

   return data
}

export const Api = {
   getIngredients: async () => {
      try {
         const { data } = await request(`/ingredients`)
         return data
      } catch (error) {
         throw error
      }
   },
   createOrder: async (idIngredients) => {
      try {
         return await request(`/orders`, {
            method: 'POST',
            body: { ingredients: idIngredients },
         })
      } catch (error) {
         throw error
      }
   },

   register: async (form) => {
      try {
         const data = await request(`/auth/register`, {
            method: 'POST',
            body: form,
         })

         saveTokens(data)
         return data
      } catch (error) {
         throw error
      }
   },

   login: async (form) => {
      try {
         const data = await request(`/auth/login`, {
            method: 'POST',
            body: form,
         })
         saveTokens(data)
         return data
      } catch (error) {
         throw error
      }
   },

   updateAccessToken: async () => {
      try {
         const data = await request(`/auth/token`, {
            method: 'POST',
            body: {
               token: localStorage.getItem('refreshToken')
            },
         })

         if (!data.success) {
            store.dispatch(setAuthError(data))
         }

         saveTokens(data)
         return data
      } catch (error) {
         throw error
      }
   },
   logout: async () => {
      try {
         const data = await request(`/auth/logout`, {
            method: 'POST',
            body: {
               token: localStorage.getItem('refreshToken')
            },
         })
         deleteTokens()
         return data
      } catch (error) {
         throw error
      }
   },
   restorePassword: async ({ email }) => {
      try {
         return await request(`/password-reset`, {
            method: 'POST',
            body: {
               email
            },
         })
      } catch (error) {
         throw error
      }
   },
   setPassword: async (form) => {
      try {
         return await request(`/password-reset/reset`, {
            method: 'POST',
            body: form,
         })
      } catch (error) {
         throw error
      }
   },
   getUser: async () => {
      try {
         return await request(`/auth/user`)
      } catch (error) {
         throw error
      }
   },
   updateUser: async (form) => {
      try {
         return await request(`/auth/user`, {
            method: 'PATCH',
            body: form,
         })
      } catch (error) {
         throw error
      }
   }
}
