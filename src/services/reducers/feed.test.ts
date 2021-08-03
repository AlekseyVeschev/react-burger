import { TOrder } from './../../types/data';
import { TFeedState } from './../reducers/feed';
import { wsFeedGetMessage, TFeedActions } from './../actions/feed';
import { feedReducer, initialState } from './feed'
import { createMockOrder } from './history.test';

type TPayload = {
  orders: TOrder[],
  total: number,
  totalToday: number
}

const payload: TPayload = {
  orders: [createMockOrder('1'), createMockOrder('2')],
  total: 5,
  totalToday: 2
}
describe('feedReducer', () => {
  it('should return the initialState', () => {
    expect(feedReducer(undefined, {} as TFeedActions)).toEqual(initialState)
  })
  it('should return orders = newOrders', () => {
    expect(feedReducer(initialState, wsFeedGetMessage(payload))).toEqual(
      {
        ...initialState,
        orders: [{
          _id: '1',
          name: '',
          status: '',
          createdAt: '',
          updatedAt: '',
          number: 0,
          ingredients: []
        }, {
          _id: '2',
          name: '',
          status: '',
          createdAt: '',
          updatedAt: '',
          number: 0,
          ingredients: []
        }],
        total: 5,
        totalToday: 2,
      }
    )
  })
})