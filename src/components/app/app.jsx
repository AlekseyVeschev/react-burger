import { useEffect, useState } from 'react';
import { Api } from '../api';
import { AppHeader } from '../app-header/app-header';
import { Content } from '../content/content'

export const App = () => {

  const [ingredients, setIngredients] = useState([])
  const [error, setErrore] = useState('')

  useEffect(() => {
    Api.getIngredients()
      .then((data) => setIngredients(data))
      .catch(error => setErrore(error.message))
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