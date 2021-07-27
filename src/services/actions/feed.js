export const WS_FEED_CONNECTION_START = 'WS_FEED_CONNECTION_START'
export const WS_FEED_CONNECTION_SUCCESS = 'WS_FEED_CONNECTION_SUCCESS'
export const WS_FEED_CONNECTION_ERROR = 'WS_FEED_CONNECTION_ERROR'
export const WS_FEED_CONNECTION_CLOSED = 'WS_FEED_CONNECTION_CLOSED'
export const WS_FEED_GET_MESSAGE = 'WS_FEED_GET_MESSAGE'
export const WS_FEED_SEND_MESSAGE = 'WS_FEED_SEND_MESSAGE'
export const SET_CURRENT_NUMBER = 'SET_CURRENT_NUMBER'

export const wsFeedStart = payload => ({ type: WS_FEED_CONNECTION_START, payload })
export const wsFeedConnectionSuccess = () => ({ type: WS_FEED_CONNECTION_SUCCESS })
export const wsFeedConnectionError = payload => ({ type: WS_FEED_CONNECTION_ERROR, payload })
export const wsFeedConnectionClosed = payload => ({ type: WS_FEED_CONNECTION_CLOSED, payload })
export const wsFeedGetMessage = payload => ({ type: WS_FEED_GET_MESSAGE, payload })
export const setCurrentNumber = payload => ({ type: SET_CURRENT_NUMBER, payload })