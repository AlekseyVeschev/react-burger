import { TOrder } from './../../types/data';
import { THistoryActions } from './../actions/history';
import { historyReducer, initialState } from './history'
import { wsGetMessage } from '../actions/history'

export const createMockOrder = (_id: TOrder['_id']): TOrder => ({
  _id,
  name: '',
  status: '',
  createdAt: '',
  updatedAt: '',
  number: 0,
  ingredients: []
})

type TPayload = {
  orders: TOrder[]
}
const payload: TPayload = {
  orders: [createMockOrder('1'), createMockOrder('2')]
}

describe('historyReducer', () => {
  it('should return the initial state', () => {
    expect(historyReducer(undefined, {} as THistoryActions)).toEqual(initialState)
  })
  it('should return orders = newOrders', () => {
    expect(historyReducer(initialState, wsGetMessage(payload))).toEqual(
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
        }]
      }
    )
  })
})