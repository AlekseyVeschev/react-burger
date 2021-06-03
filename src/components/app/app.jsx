import { useEffect, useState } from 'react';
import { Api } from '../../utils/api';
import { AppHeader } from '../app-header/app-header';
import { Content } from '../content/content'

export const App = () => {

  const [ingredients, setIngredients] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    Api.getIngredients()
      .then((data) => setIngredients(data))
      .catch(error => setError(error.message))
  }, [])

  return (
    <>
      <AppHeader />
      {!error
        ? <Content ingredients={ingredients} />
        : `Неизвестная ошибка: ${error}`}
    </>
  );
};
