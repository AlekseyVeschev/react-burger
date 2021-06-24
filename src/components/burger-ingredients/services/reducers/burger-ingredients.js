import { INGREDIENTS_TYPES } from '../../../../utils/constants'
import {
  SET_INGREDIENTS_ERROR,
  SET_INGREDIENTS_SUCCESS,
  SET_INGREDIENTS_LOADING,
  SET_CURRENT_INGREDIENT,
  REMOVE_CURRENT_INGREDIENT,
  INCREASE_COUNT,
  DECREASE_COUNT,
  CLEAR_COUNTS,
} from '../actions/burger-ingredients'

const initialState = {
  ingredients: [],
  currentIngredient: null,
  loading: false,
  error: null,
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      }
    case SET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        ingredients: action.payload,
      }
    case SET_CURRENT_INGREDIENT:
      return {
        ...state,
        currentIngredient: action.payload
      }
    case REMOVE_CURRENT_INGREDIENT:
      return {
        ...state,
        currentIngredient: initialState.currentIngredient
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
              return { ...ing, count: ing.count + 1 || 1 }
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
            return { ...ing, count: ing.count - 1 || null }
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
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}
