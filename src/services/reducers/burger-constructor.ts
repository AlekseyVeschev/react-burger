import { TIngredient, TError } from './../../types/data';
import { INGREDIENTS_TYPES } from '../../utils/constants'
import {
  SET_CONSTRUCTOR_ERROR,
  SET_CONSTRUCTOR_LOADING,
  SET_SELECTED_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  CLEAR_CONSTRURTOR,
  SORT_INGREDIENTS,
  SET_ORDER,
  REMOVE_ORDER,
  TConstructorActions,
} from '../actions/burger-constructor'

const initialState = {
  selectedIngredients: [] as Array<TIngredient>,
  selectedBun: null as TIngredient | null,
  bunsSum: 0,
  ingredientsSum: 0,
  orderNumber: null as number | null,
  isLoading: false,
  error: null as TError | null,
}
type TConstructorState = typeof initialState

export const constructorReducer = (state = initialState, action: TConstructorActions): TConstructorState => {
  switch (action.type) {
    case SET_CONSTRUCTOR_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
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
        ingredientsSum: Number(state.ingredientsSum) - action.payload.price,
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
    case SET_ORDER:
      return {
        ...state,
        orderNumber: action.payload.number,
        isLoading: false
      }
    case REMOVE_ORDER:
      return {
        ...state,
        orderNumber: initialState.orderNumber
      }
    case SET_CONSTRUCTOR_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      return state
  }
}