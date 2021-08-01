import { wsFeedGetMessage } from './../actions/feed';
import { feedReducer } from './feed'

const testState = {
  orders: [],
  total: null,
  totalToday: null,
  currentNumber: null,
  isLoading: false,
  error: null,
}

describe('feedReducer', () => {
  it('should return the initialState', () => {
    expect(feedReducer(undefined, {} as any)).toEqual(testState)
  })
  it('should return orders = newOrders', () => {
    const payload: any = {
      orders: [{ id: 1 }, { id: 2 }],
      total: 5,
      totalToday: 2,
    }

    expect(feedReducer(testState, wsFeedGetMessage(payload))).toEqual(
      {
        ...testState,
        orders: [{ id: 1 }, { id: 2 }],
        total: 5,
        totalToday: 2,
      }
    )
  })
})