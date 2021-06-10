import React, { useEffect, useState, useReducer } from 'react';
import { Api } from '../../utils/api';
import { INGREDIENTS_TYPES } from '../../utils/constants';
import { AppHeader } from '../app-header/app-header';
import { Content } from '../content/content'

export const IngredientsContext = React.createContext()
export const OrderContext = React.createContext()

const initialState = {
  ingredients: [],
  selectedIngredientsIds: [],
  bunId: "",
  bunsSum: 0,
  ingredientsSum: 0,
}
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "setIngredients":
      return {
        ...state,
        ingredients: action.data
      };
    case "setSelectedIngredient":
      if (action.payload.type === INGREDIENTS_TYPES.bun) {
        state.bunsSum = 0
        return {
          ...state,
          bunId: action.payload.id,
          bunsSum: state.bunsSum + action.payload.price * 2
        }
      } else {
        return {
          ...state,
          selectedIngredientsIds: [
            ...state.selectedIngredientsIds,
            action.payload.id
          ],
          ingredientsSum: state.ingredientsSum + action.payload.price
        }
      };
    case "removeIngredient":
      return {
        ...state,
        selectedIngredientsIds: state.selectedIngredientsIds
          .filter((ing, idx) => idx !== action.payload.idx),
        ingredientsSum: state.ingredientsSum - action.payload.price
      };
    default:
      return state
  }
}

export const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const orderNumber = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    Api.getIngredients()
      .then((data) => dispatch({ type: "setIngredients", data }))
      .catch(error => setError(error.message))
  }, [])

  return (
    <IngredientsContext.Provider value={{ state, dispatch }}>
      <OrderContext.Provider value={orderNumber}>
        <AppHeader />
        {!error
          ? <Content ingredients={state.ingredients} />
          : `Неизвестная ошибка: ${error}`}
      </OrderContext.Provider>
    </IngredientsContext.Provider>
  );
};
