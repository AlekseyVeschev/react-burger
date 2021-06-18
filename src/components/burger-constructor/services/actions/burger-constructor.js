import { Api } from '../../../../utils/api'

export const SET_CONSTRUCTOR_LOADING = 'SET_CONSTRUCTOR_LOADING'
export const SET_CONSTRUCTOR_ERROR = 'SET_CONSTRUCTOR_ERROR'
export const SET_SELECTED_INGREDIENT = 'SET_SELECTED_INGREDIENT'
export const SET_ORDER = 'SET_ORDER'
export const REMOVE_CONSTRUCTOR_INGREDIENT = 'REMOVE_CONSTRUCTOR_INGREDIENT'
export const REMOVE_ORDER = 'REMOVE_ORDER'
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS'

export const setConstructorLoading = () => ({ type: SET_CONSTRUCTOR_LOADING })
export const setConstructorError = payload => ({ type: SET_CONSTRUCTOR_ERROR, payload })
export const setSelectedIngredient = payload => ({ type: SET_SELECTED_INGREDIENT, payload })
export const setOrder = payload => ({ type: SET_ORDER, payload })
export const removeConstructorIngredient = payload => ({ type: REMOVE_CONSTRUCTOR_INGREDIENT, payload })
export const removeOrder = payload => ({ type: REMOVE_ORDER, payload })
export const sortIngredients = payload => ({ type: SORT_INGREDIENTS, payload })


export const getOrder = (ids) => async dispatch => {
  try {
    dispatch(setConstructorLoading())
    const order = await Api.createOrder(ids)
    dispatch(setOrder(order))
  } catch (error) {
    dispatch(setConstructorError(error))
  }
}
