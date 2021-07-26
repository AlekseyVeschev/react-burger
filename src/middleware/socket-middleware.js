import { getCookie } from "../utils/cookies"
import { Api } from "../utils/api"

export const socketMiddleware = (wsUrl, wsActions) => {
   return store => {
      let socket = null

      return next => action => {
         const { dispatch } = store
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
            socket.onopen = event => {
               dispatch({ type: onOpen, payload: event })
            }

            socket.onerror = event => {
               dispatch({ type: onError, payload: event })
            }

            socket.onmessage = event => {
               const { data } = event
               const { success, ...payload } = JSON.parse(data)

               if (!success && payload.message === 'Invalid or missing token') {
                  Api.updateAccessToken().then(() => {
                     dispatch({ type: wsInit })
                  })
               }

               dispatch({ type: onMessage, payload })
            }

            socket.onclose = event => {
               dispatch({ type: onClose, payload: event })
            }
         }

         if (type === wsSendMessage) {
            const message = { ...payload }
            socket.send(JSON.stringify(message))
         }

         next(action)
      }
   }
}
