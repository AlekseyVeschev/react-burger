import { TIngredient, TError } from './../../types/data';
import { AppDispatch, AppThunk } from '../../types'
import { Api } from '../../utils/api'

export const SET_INGREDIENTS_LOADING = 'SET_INGREDIENTSS_LOADING'
export const SET_INGREDIENTS_SUCCESS = 'SET_INGREDIENTS_SUCCESS'
export const SET_INGREDIENTS_ERROR = 'SET_INGREDIENTS_ERROR'
export const INCREASE_COUNT = 'INCREASE_COUNT'
export const DECREASE_COUNT = 'DECREASE_COUNT'
export const CLEAR_COUNTS = 'CLEAR_COUNTS'

type TincreaseCount = {
  id: TIngredient["_id"],
  type: TIngredient["type"]
}

export type TIngredientsActions = ReturnType<typeof setLoading>
  | ReturnType<typeof setError>
  | ReturnType<typeof setIngredients>
  | ReturnType<typeof increaseCount>
  | ReturnType<typeof decreaseCount>
  | ReturnType<typeof clearCounts>

export const setLoading = () => ({ type: SET_INGREDIENTS_LOADING } as const)
export const setError = (payload: TError) => ({ type: SET_INGREDIENTS_ERROR, payload } as const)
export const setIngredients = (payload: Array<TIngredient>) => ({ type: SET_INGREDIENTS_SUCCESS, payload } as const)
export const increaseCount = (payload: TincreaseCount) => ({ type: INCREASE_COUNT, payload } as const)
export const decreaseCount = (payload: string) => ({ type: DECREASE_COUNT, payload } as const)
export const clearCounts = () => ({ type: CLEAR_COUNTS } as const)

export const getIngredients: AppThunk = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading())
    const data = await Api.getIngredients()
    dispatch(setIngredients(data))
  } catch (error) {
    dispatch(setError(error as TError))
  }
}
