import { ingredientsReducer } from './burger-ingredients'
import {
  setIngredients,
  increaseCount,
  decreaseCount,
  clearCounts
} from '../actions/burger-ingredients'

const testState = {
  ingredients: [],
  isLoading: false,
  error: null,
}

describe('ingredientsReducer', () => {
  it('should return the initialState', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(testState)
  })
  it('should return ingredients = newIngredients', () => {
    const ingredients = [{ id: 1 }, { id: 2 }]
    expect(ingredientsReducer(testState, setIngredients(ingredients))).toEqual(
      {
        ...testState,
        ingredients: [{ id: 1 }, { id: 2 }]
      }
    )
  })
  it('should return increase count by id', () => {
    const testState = {
      ingredients: [{ id: 5 }]
    }
    expect(ingredientsReducer(testState, increaseCount(5))).toEqual(
      {
        ...testState,
        ingredients: [{
          id: 5,
          count: 1
        }]
      }
    )
  })
  it('should return decrease count by id', () => {
    const testState = {
      ingredients: [
        {
          _id: 5,
          count: 4
        }
      ]
    }
    expect(ingredientsReducer(testState, decreaseCount(5))).toEqual(
      {
        ...testState,
        ingredients: [
          {
            _id: 5,
            count: 3
          }]
      }
    )
  })
  it('should return clear counts', () => {
    const testState = {
      ingredients: [
        { count: 4 },
        { count: 3 },
        { count: 2 },
      ],
      isLoading: false,
      error: null,
    }
    expect(ingredientsReducer(testState, clearCounts())).toEqual(
      {
        ...testState,
        ingredients: [
          { count: null },
          { count: null },
          { count: null },
        ]
      }
    )
  })
})