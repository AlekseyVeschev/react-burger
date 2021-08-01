import { AnyAction, Dispatch, MiddlewareAPI, Middleware } from "redux"
import { getCookie } from "../utils/cookies"
import { Api } from "../utils/api"

export type WSMiddlewareActions = {
   wsInit: string;
   onOpen: string;
   onClose: string;
   onError: string;
   onMessage: string;
   wsSendMessage: string;
}

export const socketMiddleware = (wsUrl: string, wsActions: WSMiddlewareActions): Middleware => {
   return ({ dispatch }: MiddlewareAPI) => {
      let socket: WebSocket | null = null

      return (next: Dispatch<AnyAction>) => (action: AnyAction) => {
         const { type, payload } = action
         const { wsInit, onOpen, onClose, onError, onMessage, wsSendMessage } = wsActions

         if (type === wsInit) {
            let url = wsUrl
            const accessToken = getCookie('accessToken')
            if (accessToken) {
               url = `${url}?token=${accessToken}`
            }
            socket = new WebSocket(url)
         }

         if (socket) {
            socket.onopen = (event: Event) => {
               dispatch({ type: onOpen, payload: event })
            }

            socket.onerror = (event: Event) => {
               dispatch({ type: onError, payload: event })
            }

            socket.onmessage = (event: any) => {
               const { data } = event
               const { success, ...payload } = JSON.parse(data)

               if (!success && payload.message === 'Invalid or missing token') {
                  Api.updateAccessToken().then(() => {
                     dispatch({ type: wsInit })
                  })
               }

               dispatch({ type: onMessage, payload })
            }

            socket.onclose = (event: Event) => {
               dispatch({ type: onClose, payload: event })
            }
         }

         if (type === wsSendMessage) {
            const message = { ...payload }
            socket?.send(JSON.stringify(message))
         }

         next(action)
      }
   }
}
