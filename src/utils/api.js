import { BASE_URL } from "./constants"
import { getCookie } from './cookies'
import { saveTokens, deleteTokens } from './tokens'
import { store } from '../services/store'
import { clearUser } from "../services/actions/auth"


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
   if (response.status === 401 && data.message === "You should be authorised") {
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
      const { data } = await request(`/ingredients`)
      return data
   },
   createOrder: async (idIngredients) => {
      return await request(`/orders`, {
         method: 'POST',
         body: { ingredients: idIngredients },
      })
   },

   register: async (form) => {
      const data = await request(`/auth/register`, {
         method: 'POST',
         body: form,
      })

      saveTokens(data)
      return data
   },

   login: async (form) => {
      const data = await request(`/auth/login`, {
         method: 'POST',
         body: form,
      })
      saveTokens(data)
      return data
   },

   updateAccessToken: async () => {
      const data = await request(`/auth/token`, {
         method: 'POST',
         body: {
            token: localStorage.getItem('refreshToken')
         },
      })

      if (!data.success) {
         store.dispatch(clearUser(data))
      }

      saveTokens(data)
      return data
   },

   logout: async () => {
      const data = await request(`/auth/logout`, {
         method: 'POST',
         body: {
            token: localStorage.getItem('refreshToken')
         },
      })
      deleteTokens()
      return data
   },

   restorePassword: async ({ email }) => {
      return await request(`/password-reset`, {
         method: 'POST',
         body: {
            email
         },
      })
   },

   setPassword: async (form) => {
      return await request(`/password-reset/reset`, {
         method: 'POST',
         body: form,
      })
   },

   getUser: async () => {
      return await request(`/auth/user`)
   },

   updateUser: async (form) => {
      return await request(`/auth/user`, {
         method: 'PATCH',
         body: form,
      })
   }
}
