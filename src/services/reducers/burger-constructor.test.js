import { INGREDIENTS_TYPES } from '../../utils/constants'
import { constructorReducer } from './burger-constructor'
import {
  clearConstructor,
  setConstructorLoading,
  setSelectedIngredient,
  setOrder
} from '../actions/burger-constructor'

const testState = {
  selectedIngredients: [],
  selectedBun: null,
  bunsSum: null,
  ingredientsSum: null,
  orderNumber: null,
  isLoading: false,
  error: null,
}

describe('constructorReducer', () => {
  it('should return initialState', () => {
    expect(constructorReducer(testState, clearConstructor())).toEqual(
      { ...testState }
    )
  })
  it('should return isLoading = true', () => {
    expect(constructorReducer(testState, setConstructorLoading())).toEqual(
      {
        ...testState,
        isLoading: true
      }
    )
  })
  it('if type= bun, should return bunsSum = price*2', () => {
    const ingredient =
      { type: INGREDIENTS_TYPES.bun, price: 1 }
    expect(constructorReducer(testState, setSelectedIngredient(ingredient))).toEqual(
      {
        ...testState,
        selectedBun: ingredient,
        bunsSum: 2,
      }
    )
  })
  it('should return ingredientsSum = price', () => {
    const ingredient =
      { type: INGREDIENTS_TYPES.sauce, price: 2 }
    expect(constructorReducer(testState, setSelectedIngredient(ingredient))).toEqual(
      {
        ...testState,
        selectedIngredients: [ingredient],
        ingredientsSum: 2,
      }
    )
  })
  it('should return orderNumber === newOrderNumber', () => {
    const payload = { number: 5 }
    expect(constructorReducer(testState, setOrder(payload))).toEqual(
      {
        ...testState,
        orderNumber: 5
      }
    )
  })
})