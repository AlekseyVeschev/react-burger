import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import { constructorReducer } from '../services/reducers/burger-constructor'
import { ingredientsReducer } from '../services/reducers/burger-ingredients'
import { authReducer } from '../services/reducers/auth'
import { feedReducer } from '../services/reducers/feed'
import { historyReducer } from '../services/reducers/history'
import { socketMiddleware } from './socket-middleware'
import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_MESSAGE,
  WS_FEED_SEND_MESSAGE,
} from '../services/actions/feed'
import {
  WS_HISTORY_CONNECTION_START,
  WS_HISTORY_CONNECTION_SUCCESS,
  WS_HISTORY_CONNECTION_CLOSED,
  WS_HISTORY_CONNECTION_ERROR,
  WS_HISTORY_GET_MESSAGE,
  WS_HISTORY_SEND_MESSAGE
} from '../services/actions/history'

const wsFeedUrl = 'wss://norma.nomoreparties.space/orders/all'
const wsFeedActions = {
  wsInit: WS_FEED_CONNECTION_START,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onClose: WS_FEED_CONNECTION_CLOSED,
  onError: WS_FEED_CONNECTION_ERROR,
  onMessage: WS_FEED_GET_MESSAGE,
  wsSendMessage: WS_FEED_SEND_MESSAGE,
}

const wsHistoryUrl = 'wss://norma.nomoreparties.space/orders'
const wsHistoryActions = {
  wsInit: WS_HISTORY_CONNECTION_START,
  onOpen: WS_HISTORY_CONNECTION_SUCCESS,
  onClose: WS_HISTORY_CONNECTION_CLOSED,
  onError: WS_HISTORY_CONNECTION_ERROR,
  onMessage: WS_HISTORY_GET_MESSAGE,
  wsSendMessage: WS_HISTORY_SEND_MESSAGE,
}

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  selectedIngredients: constructorReducer,
  auth: authReducer,
  feed: feedReducer,
  history: historyReducer,
})

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose
const middleware = [thunk,
  socketMiddleware(wsFeedUrl, wsFeedActions),
  socketMiddleware(wsHistoryUrl, wsHistoryActions)
]

const enhancer = composeEnhancers(applyMiddleware(...middleware))

export const store = createStore(rootReducer, enhancer)