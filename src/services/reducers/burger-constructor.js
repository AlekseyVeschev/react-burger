import { INGREDIENTS_TYPES } from '../../utils/constants'
import {
  SET_CONSTRUCTOR_ERROR,
  SET_CONSTRUCTOR_LOADING,
  SET_SELECTED_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  SET_ORDER,
  CLEAR_CONSTRURTOR,
  SORT_INGREDIENTS
} from '../actions/burger-constructor'

const initialState = {
  selectedIngredients: [],
  selectedBun: null,
  bunsSum: null,
  ingredientsSum: null,
  loading: false,
  error: null,
  orderNumber: null,
}

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONSTRUCTOR_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      }
    case SET_SELECTED_INGREDIENT:
      if (action.payload.type === INGREDIENTS_TYPES.bun) {
        return {
          ...state,
          selectedBun: action.payload,
          bunsSum: action.payload.price * 2,
        }
      } else {
        return {
          ...state,
          selectedIngredients: [
            ...state.selectedIngredients,
            action.payload,
          ],
          ingredientsSum: state.ingredientsSum + action.payload.price,
        }
      }
    case REMOVE_CONSTRUCTOR_INGREDIENT:
      return {
        ...state,
        selectedIngredients:
          state.selectedIngredients.filter((ing, idx) =>
            idx !== action.payload.idx
          ),
        ingredientsSum: state.ingredientsSum - action.payload.price,
      }
    case SET_ORDER:
      return {
        ...state,
        orderNumber: action.payload.order.number,
        loading: false
      }
    case CLEAR_CONSTRURTOR:
      return {
        ...initialState
      }
    case SORT_INGREDIENTS:
      const sortIngredients = [...state.selectedIngredients]

      const dragIndex = action.payload.dragIndex
      const hoverIndex = action.payload.hoverIndex

      const [dragIngredient] = sortIngredients.splice(dragIndex, 1)
      sortIngredients.splice(hoverIndex, 0, dragIngredient)

      return {
        ...state,
        selectedIngredients: sortIngredients
      }
    case SET_CONSTRUCTOR_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}