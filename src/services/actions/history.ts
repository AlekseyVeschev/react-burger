import { THistoryState } from './../reducers/history';
import { TError } from "../../types/data"

export const WS_HISTORY_CONNECTION_START = 'WS_HISTORY_CONNECTION_START'
export const WS_HISTORY_CONNECTION_SUCCESS = 'WS_HISTORY_CONNECTION_SUCCESS'
export const WS_HISTORY_CONNECTION_CLOSED = 'WS_HISTORY_CONNECTION_CLOSED'
export const WS_HISTORY_CONNECTION_ERROR = 'WS_HISTORY_CONNECTION_ERROR'
export const WS_HISTORY_GET_MESSAGE = 'WS_HISTORY_GET_MESSAGE'
export const WS_HISTORY_SEND_MESSAGE = 'WS_HISTORY_SEND_MESSAGE'

export type THistoryActions = ReturnType<typeof wsHistoryStart>
   | ReturnType<typeof wsConnectionSuccess>
   | ReturnType<typeof wsGetMessage>
   | ReturnType<typeof wsConnectionClosed>
   | ReturnType<typeof wsConnectionError>

export const wsHistoryStart = () => ({ type: WS_HISTORY_CONNECTION_START } as const)
export const wsConnectionSuccess = () => ({ type: WS_HISTORY_CONNECTION_SUCCESS } as const)
export const wsGetMessage = (payload: Pick<THistoryState, 'orders'>) => ({ type: WS_HISTORY_GET_MESSAGE, payload } as const)
export const wsConnectionClosed = () => ({ type: WS_HISTORY_CONNECTION_CLOSED } as const)
export const wsConnectionError = (payload: TError) => ({ type: WS_HISTORY_CONNECTION_ERROR, payload } as const)