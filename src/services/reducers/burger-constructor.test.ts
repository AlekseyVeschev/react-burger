import { TIngredient, TSetOrder } from './../../types/data';
import { INGREDIENTS_TYPES } from '../../utils/constants'
import { constructorReducer, initialState } from './burger-constructor'
import {
  setConstructorLoading,
  setSelectedIngredient,
  setOrder,
  TConstructorActions
} from '../actions/burger-constructor'


describe('constructorReducer', () => {
  it('should return the initialState', () => {
    expect(constructorReducer(undefined, {} as TConstructorActions)).toEqual(initialState)
  })
  it('should return isLoading = true', () => {
    expect(constructorReducer(initialState, setConstructorLoading())).toEqual(
      {
        ...initialState,
        isLoading: true
      }
    )
  })
  it('if type= bun, should return bunsSum = price*2', () => {
    const ingredient: TIngredient = {
      type: INGREDIENTS_TYPES.bun,
      price: 2, _id: "",
      name: "",
      image_mobile: "",
      image_large: "",
      image: ""
    }
    expect(constructorReducer(initialState, setSelectedIngredient(ingredient))).toEqual(
      {
        ...initialState,
        selectedBun: ingredient,
        bunsSum: 4,
      }
    )
  })
  it('should return ingredientsSum = price', () => {
    const ingredient: TIngredient = {
      type: INGREDIENTS_TYPES.main,
      price: 4,
      _id: "",
      name: "",
      image_mobile: "",
      image_large: "",
      image: ""
    }
    expect(constructorReducer(initialState, setSelectedIngredient(ingredient))).toEqual(
      {
        ...initialState,
        selectedIngredients: [ingredient],
        ingredientsSum: 4,
      }
    )
  })
  it('should return orderNumber === newOrderNumber', () => {
    const payload: TSetOrder = { number: 5 }
    expect(constructorReducer(initialState, setOrder(payload))).toEqual(
      {
        ...initialState,
        orderNumber: 5
      }
    )
  })
})