import { TIngredient, TSetOrder, TError } from './../../types/data';
import { AppDispatch, AppThunk } from './../../types/index';
import { Api } from '../../utils/api'

export const SET_CONSTRUCTOR_LOADING = 'SET_CONSTRUCTOR_LOADING'
export const SET_CONSTRUCTOR_ERROR = 'SET_CONSTRUCTOR_ERROR'
export const SET_SELECTED_INGREDIENT = 'SET_SELECTED_INGREDIENT'
export const REMOVE_CONSTRUCTOR_INGREDIENT = 'REMOVE_CONSTRUCTOR_INGREDIENT'
export const CLEAR_CONSTRURTOR = 'CLEAR_CONSTRURTOR'
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS'
export const SET_ORDER = 'SET_ORDER'
export const REMOVE_ORDER = 'REMOVE_ORDER'

type TRemoveIngredient = {
   idx: number,
   price: number
}
type TSortIngredient = {
   dragIndex: number,
   hoverIndex: number
}

export type TConstructorActions = ReturnType<typeof setConstructorLoading>
   | ReturnType<typeof setConstructorError>
   | ReturnType<typeof setSelectedIngredient>
   | ReturnType<typeof removeConstructorIngredient>
   | ReturnType<typeof clearConstructor>
   | ReturnType<typeof sortIngredients>
   | ReturnType<typeof setOrder>
   | ReturnType<typeof removeOrder>

export const setConstructorLoading = () => ({ type: SET_CONSTRUCTOR_LOADING } as const)
export const setConstructorError = (payload: TError) => ({ type: SET_CONSTRUCTOR_ERROR, payload } as const)
export const setSelectedIngredient = (payload: TIngredient) => ({ type: SET_SELECTED_INGREDIENT, payload } as const)
export const removeConstructorIngredient = (payload: TRemoveIngredient) => ({ type: REMOVE_CONSTRUCTOR_INGREDIENT, payload } as const)
export const clearConstructor = () => ({ type: CLEAR_CONSTRURTOR } as const)
export const sortIngredients = (payload: TSortIngredient) => ({ type: SORT_INGREDIENTS, payload } as const)
export const setOrder = (payload: TSetOrder) => ({ type: SET_ORDER, payload } as const)
export const removeOrder = () => ({ type: REMOVE_ORDER } as const)

export const createOrder: AppThunk = (ids) => async (dispatch: AppDispatch) => {
   try {
      dispatch(setConstructorLoading())
      const order = await Api.createOrder(ids)
      dispatch(setOrder(order))
   } catch (error) {
      dispatch(setConstructorError(error as TError))
   }
}
