import { useEffect, useCallback } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getIngredients } from '../components/burger-ingredients/services/actions/burger-ingredients'
import { IngredientDetails } from '../components/ingredient-details/ingredient-details'
import { Constructor } from '../pages/constructor'
import { ModalOverlay } from '../components/modal-overlay/modal-overlay'


export const ConstructorLayout = () => {

  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const isShowModal = history.action === 'PUSH'

  const onClickCloseButton = useCallback(() => {
    history.go(-1)
  }, [history])

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <Switch location={location}>
      <Route path="/" exact={true}>
        <Constructor />
      </Route>

      {isShowModal &&
        <Route path="/ingredients/:id" exact={true}>
          <Constructor />
          <ModalOverlay
            title="Детали ингредиента"
            onClose={onClickCloseButton}
          >
            <IngredientDetails />
          </ModalOverlay>
        </Route>
      }
      <Route path="/ingredients/:id" exact={true}>
        <IngredientDetails title="Детали ингредиента" />
      </Route>
    </Switch>
  )
}