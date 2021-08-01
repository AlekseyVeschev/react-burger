import { TOrder, TError } from '../../types/data'
import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_GET_MESSAGE,
  SET_CURRENT_NUMBER,
  TFeedActions,
} from '../actions/feed'

const initialState = {
  orders: [] as Array<TOrder>,
  total: null as number | null,
  totalToday: null as number | null,
  currentNumber: null as string | null,
  isLoading: false,
  error: null as TError | null,
}
export type TFeedState = typeof initialState

export const feedReducer = (state = initialState, action: TFeedActions): TFeedState => {
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
        currentNumber: String(action.payload)
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
        error: action.payload
      }
    default:
      return state
  }
}