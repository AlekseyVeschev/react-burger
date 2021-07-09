import { useEffect, useCallback } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getIngredients } from '../services/actions/burger-ingredients'
import { IngredientDetails } from '../components/ingredient-details/ingredient-details'
import { Constructor } from '../pages/constructor'
import { Modal } from '../components/modal/modal'


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

      <Route path="/ingredients/:id" exact={true}>
        {isShowModal ?
          (
            <>
              <Constructor />
              <Modal
                title="Детали ингредиента"
                onClose={onClickCloseButton}
              >
                <IngredientDetails />
              </Modal>
            </>
          ) : (
            <IngredientDetails title="Детали ингредиента" />
          )
        }

      </Route>
    </Switch>
  )
}