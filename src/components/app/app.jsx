import React, { useEffect, useState } from 'react';
import { Api } from '../../utils/api';
import { AppHeader } from '../app-header/app-header';
import { Content } from '../content/content'

export const IngredientsContext = React.createContext()
export const OrderContext = React.createContext()

export const App = () => {

  const orderNumber = useState(0)
  const [ingredients, setIngredients] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    Api.getIngredients()
      .then((data) => setIngredients(data))
      .catch(error => setError(error.message))
  }, [])

  return (
    <IngredientsContext.Provider value={ingredients}>
      <OrderContext.Provider value={orderNumber}>
        <AppHeader />
        {!error
          ? <Content ingredients={ingredients} />
          : `Неизвестная ошибка: ${error}`}
      </OrderContext.Provider>
    </IngredientsContext.Provider>
  );
};
