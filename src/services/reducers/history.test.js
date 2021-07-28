import { historyReducer } from './history'
import { wsGetMessage } from '../actions/history'

const testState = {
  orders: [],
  isLoading: false,
  error: null,
}

describe('historyReducer', () => {
  it('should return the initial state', () => {
    expect(historyReducer(undefined, {})).toEqual(
      {
        orders: [],
        isLoading: false,
        error: null,
      }
    )
  })
  it('should return orders = newOrders', () => {
    const payload = {
      orders: [{ id: 1 }, { id: 2 }]
    }

    expect(historyReducer(testState, wsGetMessage(payload))).toEqual(
      {
        orders: [{ id: 1 }, { id: 2 }],
        isLoading: false,
        error: null,
      }
    )
  })
})