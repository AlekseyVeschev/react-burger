import {
  WS_HISTORY_CONNECTION_SUCCESS,
  WS_HISTORY_GET_MESSAGE,
  WS_HISTORY_CONNECTION_CLOSED,
  WS_HISTORY_CONNECTION_ERROR,
} from '../actions/history'

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
}

export const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_HISTORY_CONNECTION_SUCCESS:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case WS_HISTORY_GET_MESSAGE:
      return {
        ...state,
        isLoading: false,
        orders: action.payload.orders
      }
    case WS_HISTORY_CONNECTION_CLOSED:
      return {
        ...state,
        isLoading: false,
        error: null
      }
    case WS_HISTORY_CONNECTION_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.code
      }
    default:
      return state
  }
}