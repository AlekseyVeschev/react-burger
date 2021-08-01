import { TOrder, TError } from '../../types/data'
import {
  WS_HISTORY_CONNECTION_SUCCESS,
  WS_HISTORY_GET_MESSAGE,
  WS_HISTORY_CONNECTION_CLOSED,
  WS_HISTORY_CONNECTION_ERROR,
  THistoryActions,
} from '../actions/history'

const initialState = {
  orders: [] as Array<TOrder>,
  isLoading: false,
  error: null as TError | null,
}

export type THistoryState = typeof initialState

export const historyReducer = (state = initialState, action: THistoryActions): THistoryState => {
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
        error: action.payload
      }
    default:
      return state
  }
}