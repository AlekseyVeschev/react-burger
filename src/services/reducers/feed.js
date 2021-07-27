import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_GET_MESSAGE,
  SET_CURRENT_NUMBER,
} from '../actions/feed'

const initialState = {
  orders: [],
  total: null,
  totalToday: null,
  currentNumber: null,
  isLoading: false,
  error: null,
}

export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_FEED_CONNECTION_SUCCESS:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case WS_FEED_GET_MESSAGE:
      return {
        ...state,
        isLoading: false,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      }
    case SET_CURRENT_NUMBER:
      return {
        ...state,
        currentNumber: action.payload + ''
      }
    case WS_FEED_CONNECTION_CLOSED:
      return {
        ...state,
        isLoading: false,
        error: null
      }
    case WS_FEED_CONNECTION_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.code
      }
    default:
      return state
  }
}