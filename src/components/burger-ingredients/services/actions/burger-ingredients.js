import { Api } from '../../../../utils/api'

export const SET_INGREDIENTS_LOADING = 'SET_INGREDIENTSS_LOADING'
export const SET_INGREDIENTS_SUCCESS = 'SET_INGREDIENTS_SUCCESS'
export const SET_INGREDIENTS_ERROR = 'SET_INGREDIENTS_ERROR'
export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT'
export const REMOVE_CURRENT_INGREDIENT = 'REMOVE_CURRENT_INGREDIENT'
export const INCREASE_COUNT = 'INCREASE_COUNT'
export const DECREASE_COUNT = 'DECREASE_COUNT'

export const setLoading = () => ({ type: SET_INGREDIENTS_LOADING })
export const setError = payload => ({ type: SET_INGREDIENTS_ERROR, payload })
export const setIngredients = payload => ({ type: SET_INGREDIENTS_SUCCESS, payload })
export const setCurrentIngredient = payload => ({ type: SET_CURRENT_INGREDIENT, payload })
export const removeCurrentIngredient = payload => ({ type: REMOVE_CURRENT_INGREDIENT, payload })
export const increaseCount = payload => ({ type: INCREASE_COUNT, payload })
export const decreaseCount = payload => ({ type: DECREASE_COUNT, payload })


export const getIngredients = () => async dispatch => {
  try {
    dispatch(setLoading())
    const data = await Api.getIngredients()
    await dispatch(setIngredients(data))
  } catch (error) {
    dispatch(setError(error))
  }
}
