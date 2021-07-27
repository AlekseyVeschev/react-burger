export const WS_HISTORY_CONNECTION_START = 'WS_HISTORY_CONNECTION_START'
export const WS_HISTORY_CONNECTION_SUCCESS = 'WS_HISTORY_CONNECTION_SUCCESS'
export const WS_HISTORY_CONNECTION_CLOSED = 'WS_HISTORY_CONNECTION_CLOSED'
export const WS_HISTORY_CONNECTION_ERROR = 'WS_HISTORY_CONNECTION_ERROR'
export const WS_HISTORY_GET_MESSAGE = 'WS_HISTORY_GET_MESSAGE'
export const WS_HISTORY_SEND_MESSAGE = 'WS_HISTORY_SEND_MESSAGE'

export const wsHistoryStart = payload => ({ type: WS_HISTORY_CONNECTION_START, payload })
export const wsConnectionSuccess = () => ({ type: WS_HISTORY_CONNECTION_SUCCESS })
export const wsGetMessage = payload => ({ type: WS_HISTORY_GET_MESSAGE, payload })
export const wsConnectionClosed = payload => ({ type: WS_HISTORY_CONNECTION_CLOSED, payload })
export const wsConnectionError = payload => ({ type: WS_HISTORY_CONNECTION_ERROR, payload })