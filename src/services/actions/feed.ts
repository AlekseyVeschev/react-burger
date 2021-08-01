import { TFeedState } from '../reducers/feed';
import { TError } from './../../types/data';
export const WS_FEED_CONNECTION_START = 'WS_FEED_CONNECTION_START'
export const WS_FEED_CONNECTION_SUCCESS = 'WS_FEED_CONNECTION_SUCCESS'
export const WS_FEED_CONNECTION_ERROR = 'WS_FEED_CONNECTION_ERROR'
export const WS_FEED_CONNECTION_CLOSED = 'WS_FEED_CONNECTION_CLOSED'
export const WS_FEED_GET_MESSAGE = 'WS_FEED_GET_MESSAGE'
export const WS_FEED_SEND_MESSAGE = 'WS_FEED_SEND_MESSAGE'
export const SET_CURRENT_NUMBER = 'SET_CURRENT_NUMBER'

export type TFeedActions = ReturnType<typeof wsFeedStart>
   | ReturnType<typeof wsFeedConnectionSuccess>
   | ReturnType<typeof wsFeedGetMessage>
   | ReturnType<typeof wsFeedConnectionClosed>
   | ReturnType<typeof wsFeedConnectionError>
   | ReturnType<typeof setCurrentNumber>

export const wsFeedStart = () => ({ type: WS_FEED_CONNECTION_START } as const)
export const wsFeedConnectionSuccess = () => ({ type: WS_FEED_CONNECTION_SUCCESS } as const)
export const wsFeedConnectionError = (payload: TError) => ({ type: WS_FEED_CONNECTION_ERROR, payload } as const)
export const wsFeedConnectionClosed = () => ({ type: WS_FEED_CONNECTION_CLOSED } as const)
export const wsFeedGetMessage = (payload: TFeedState) => ({ type: WS_FEED_GET_MESSAGE, payload } as const)
export const setCurrentNumber = (payload: number) => ({ type: SET_CURRENT_NUMBER, payload } as const)