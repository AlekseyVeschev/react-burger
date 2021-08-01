import { BASE_URL } from "./constants"
import { store } from '../services/store'
import { getCookie } from './cookies'
import { saveTokens, deleteTokens } from './tokens'
import { TIngredient, TForm } from './../types/data';
import { clearUser } from "../services/actions/auth"

type THeaders = Record<string, string>

type TResponseBody<TDataKey extends string = '', TDataType = {}> = {
   [key in TDataKey]: TDataType
} & {
   success: boolean;
   message?: string;
   headers?: THeaders;
};

enum RequestMethod {
   get = 'GET',
   post = 'POST',
   patch = 'PATCH',
   delete = 'DELETE',
}

type TRequestBody<TBody> = Partial<{
   body: TBody,
   method: RequestMethod,
   headers: THeaders
}>

const request = async <TBody>(url: string, { body, method = RequestMethod.get, headers = {} }: TRequestBody<TBody> = {}): Promise<any> => {
   const defaultHeaders: THeaders = {
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
   getIngredients: async (): Promise<TResponseBody<'ingredients', ReadonlyArray<TIngredient>>
   > => {
      const { data }: any = await request(`/ingredients`)
      return data
   },
   createOrder: async (idIngredients: string) => {
      return await request(`/orders`, {
         method: RequestMethod.post,
         body: { ingredients: idIngredients },
      })
   },

   register: async (form: TForm) => {
      const data = await request(`/auth/register`, {
         method: RequestMethod.post,
         body: form,
      })

      saveTokens(data)
      return data
   },

   login: async (form: TForm) => {
      const data = await request(`/auth/login`, {
         method: RequestMethod.post,
         body: form,
      })
      saveTokens(data)
      return data
   },

   updateAccessToken: async () => {
      const data = await request(`/auth/token`, {
         method: RequestMethod.post,
         body: {
            token: localStorage.getItem('refreshToken')
         },
      })

      if (!data.success) {
         store.dispatch(clearUser())
      }

      saveTokens(data)
      return data
   },

   logout: async () => {
      const data = await request(`/auth/logout`, {
         method: RequestMethod.post,
         body: {
            token: localStorage.getItem('refreshToken')
         },
      })
      deleteTokens()
      return data
   },

   restorePassword: async (email: string) => {
      return await request(`/password-reset`, {
         method: RequestMethod.post,
         body: {
            email
         },
      })
   },

   setPassword: async (form: TForm) => {
      return await request(`/password-reset/reset`, {
         method: RequestMethod.post,
         body: form,
      })
   },

   getUser: async () => {
      return await request(`/auth/user`)
   },

   updateUser: async (form: TForm) => {
      return await request(`/auth/user`, {
         method: RequestMethod.patch,
         body: form,
      })
   }
}
