import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { socketMiddleware } from '../middleware/socket-middleware'
import { ThunkMiddleware } from '../types'

import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_GET_MESSAGE,
  WS_FEED_SEND_MESSAGE,
} from './actions/feed'
import {
  WS_HISTORY_CONNECTION_CLOSED,
  WS_HISTORY_CONNECTION_ERROR,
  WS_HISTORY_CONNECTION_START,
  WS_HISTORY_CONNECTION_SUCCESS,
  WS_HISTORY_GET_MESSAGE,
  WS_HISTORY_SEND_MESSAGE
} from './actions/history'
import { rootReducer } from "./reducers"

const wsFeedUrl = 'wss://norma.nomoreparties.space/orders/all'
const wsFeedActions = {
  wsInit: WS_FEED_CONNECTION_START,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onClose: WS_FEED_CONNECTION_CLOSED,
  onError: WS_FEED_CONNECTION_ERROR,
  onMessage: WS_FEED_GET_MESSAGE,
  wsSendMessage: WS_FEED_SEND_MESSAGE,
} as const
const wsFeed = socketMiddleware(wsFeedUrl, wsFeedActions)

const wsHistoryUrl = 'wss://norma.nomoreparties.space/orders'
const wsHistoryActions = {
  wsInit: WS_HISTORY_CONNECTION_START,
  onOpen: WS_HISTORY_CONNECTION_SUCCESS,
  onClose: WS_HISTORY_CONNECTION_CLOSED,
  onError: WS_HISTORY_CONNECTION_ERROR,
  onMessage: WS_HISTORY_GET_MESSAGE,
  wsSendMessage: WS_HISTORY_SEND_MESSAGE,
} as const
const wsHistory = socketMiddleware(wsHistoryUrl, wsHistoryActions)

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(applyMiddleware(
  thunk as ThunkMiddleware,
  wsFeed,
  wsHistory
))

export const store = createStore(rootReducer, enhancer)