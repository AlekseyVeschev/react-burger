import { TIngredientsActions } from './../actions/burger-ingredients';
import { TError, TIngredient } from './../../types/data';
import { INGREDIENTS_TYPES } from '../../utils/constants'
import {
  SET_INGREDIENTS_ERROR,
  SET_INGREDIENTS_SUCCESS,
  SET_INGREDIENTS_LOADING,
  INCREASE_COUNT,
  DECREASE_COUNT,
  CLEAR_COUNTS,
} from '../actions/burger-ingredients'

const initialState = {
  ingredients: [] as Array<TIngredient>,
  isLoading: false,
  error: null as TError | null
}
export type TIngredientsState = typeof initialState

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
  switch (action.type) {
    case SET_INGREDIENTS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case SET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        ingredients: action.payload,
      }
    case INCREASE_COUNT:
      return {
        ...state,
        ingredients: [...state.ingredients.map(ing => {
          if (ing.type === INGREDIENTS_TYPES.bun
            && ing._id !== action.payload.id
            && action.payload.type === INGREDIENTS_TYPES.bun
          ) { return { ...ing, count: null } }

          if (ing._id === action.payload.id) {
            if (ing.type === INGREDIENTS_TYPES.bun) {
              return { ...ing, count: 1 }
            } else {
              return { ...ing, count: Number(ing.count) + 1 || 1 }
            }
          } else {
            return { ...ing, count: ing.count }
          }
        })]
      }
    case DECREASE_COUNT:
      return {
        ...state,
        ingredients: [...state.ingredients.map(ing => {
          if (ing._id === action.payload) {
            return { ...ing, count: Number(ing.count) - 1 || null }
          }
          return ing
        })]
      }
    case CLEAR_COUNTS:
      return {
        ...state,
        ingredients: [...state.ingredients.map(ing => {
          return { ...ing, count: null }
        })]
      }
    case SET_INGREDIENTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      return state
  }
}
