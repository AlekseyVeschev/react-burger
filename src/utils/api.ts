import { BASE_URL } from "./constants"
import { store } from '../services/store'
import { getCookie } from './cookies'
import { saveTokens, deleteTokens } from './tokens'
import { TIngredient, TForm, TSetOrder, TTokens, TUser, TResetPasswordResponse } from './../types/data';
import { clearUser } from "../services/actions/auth"

type THeaders = Record<string, string>

type TResponseBody<TDataType = {}> = TDataType & {
   success: boolean;
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
const request = async <TData = {}, TBody = unknown>(url: string, { body, method = RequestMethod.get, headers = {} }: TRequestBody<TBody> = {}): Promise<TResponseBody<TData>> => {
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

   const isShoudBeAuthorized = response.status === 401 && data.message === (
      "You should be authorised" || "Token is invalid");
   // const isTokenExperied = response.status === 401 && data.message === "Token is invalid";
   const isJwtExperied = response.status === 403 && data.message === "jwt expired";
   if (isShoudBeAuthorized || isJwtExperied) {
      console.log("response.status === 401")
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
      const { data } = await request<{ data: Array<TIngredient> }>(`/ingredients`)
      return data
   },
   createOrder: async (idIngredients: string[]) => {
      const { order } = await request<{ order: TSetOrder }>(`/orders`, {
         method: RequestMethod.post,
         body: { ingredients: idIngredients },
      })

      return order
   },

   register: async (form: TForm) => {
      const { refreshToken, accessToken, ...data } = await request<TTokens & TUser>(`/auth/register`, {
         method: RequestMethod.post,
         body: form,
      })

      saveTokens({ refreshToken, accessToken })
      return data
   },

   login: async (form: TForm) => {
      const { refreshToken, accessToken, user } = await request<TTokens & { user: TUser }>(`/auth/login`, {
         method: RequestMethod.post,
         body: form,
      })
      saveTokens({ refreshToken, accessToken })
      return user
   },

   updateAccessToken: async () => {
      const data = await request<TTokens & TResetPasswordResponse>(`/auth/token`, {
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
      return await request<TResetPasswordResponse>(`/password-reset`, {
         method: RequestMethod.post,
         body: {
            email
         },
      })
   },

   setPassword: async (form: TForm) => {
      return await request<TResetPasswordResponse>(`/password-reset/reset`, {
         method: RequestMethod.post,
         body: form,
      })
   },

   getUser: async () => {
      const { user } = await request<{ user: TUser }>(`/auth/user`)

      return user
   },

   updateUser: async (form: TForm) => {
      const { user } = await request<{ user: TUser }>(`/auth/user`, {
         method: RequestMethod.patch,
         body: form,
      })

      return user
   }
}
