import { TIngredient } from './../../types/data';
import { TIngredientsActions } from './../actions/burger-ingredients';
import { ingredientsReducer, initialState } from './burger-ingredients'
import {
  setIngredients,
  decreaseCount,
  clearCounts
} from '../actions/burger-ingredients'

const ingredients: Array<TIngredient> = [
  { _id: "1", name: "1", type: "main", price: 2, count: 1 },
  { _id: "2", name: "2", type: "bun", price: 4, count: 2 }]

describe('ingredientsReducer', () => {
  it('should return the initialState', () => {
    expect(ingredientsReducer(undefined, {} as TIngredientsActions)).toEqual(initialState)
  })
  it('should return ingredients = newIngredients', () => {
    expect(ingredientsReducer(initialState, setIngredients(ingredients))).toEqual(
      {
        ...initialState,
        ingredients: [
          { _id: "1", name: "1", type: "main", price: 2, count: 1 },
          { _id: "2", name: "2", type: "bun", price: 4, count: 2 }
        ]
      }
    )
  })
  it('should return decrease count by id', () => {

    expect(ingredientsReducer({ ...initialState, ingredients }, decreaseCount('2'))).toEqual(
      {
        ...initialState,
        ingredients: [
          { _id: "1", name: "1", type: "main", price: 2, count: 1 },
          { _id: "2", name: "2", type: "bun", price: 4, count: 1 }
        ]
      }
    )
  })
  it('should return clear counts', () => {
    expect(ingredientsReducer({ ...initialState, ingredients }, clearCounts())).toEqual(
      {
        ...initialState,
        ingredients: [
          { _id: "1", name: "1", type: "main", price: 2, count: null },
          { _id: "2", name: "2", type: "bun", price: 4, count: null }
        ]
      }
    )
  })
})