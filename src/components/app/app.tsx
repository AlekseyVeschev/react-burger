import { useEffect } from 'react'
import { useDispatch } from '../../utils/hooks'
import { getIngredients } from '../../services/actions/burger-ingredients'
import { Route, Switch } from 'react-router-dom'
import { AppHeader } from '../app-header/app-header'
import { Login } from '../../pages/login'
import { Register } from '../../pages/register'
import { RestorePassword } from '../../pages/restore-password'
import { SaveNewPassword } from '../../pages/save-new-password'
import { ProfileLayout } from '../../layouts/profile-layout'
import { ProtectedRoute } from '../protected-route'
import { PublicRoute } from '../public-route'
import { NotFound404 } from '../../pages/not-found-404'
import { ConstructorLayout } from '../../layouts/constructor-layout'
import { FeedLayout } from '../../layouts/feed-layout'
import { wsFeedStart } from '../../services/actions/feed'
import { Menu } from '../menu/menu'

export const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  useEffect(() => {
    dispatch(wsFeedStart())
  }, [dispatch])

  return (
    <>
      <AppHeader />
      <Switch>
        <Route path={["/", "/ingredients/:id"]} exact={true}>
          <ConstructorLayout />
        </Route>

        <Route path="/menu" exact={true}>
          <Menu />
        </Route>

        <PublicRoute path="/login" exact={true}>
          <Login />
        </PublicRoute>

        <PublicRoute path="/register" exact={true}>
          <Register />
        </PublicRoute>

        <PublicRoute path="/forgot-password" exact={true}>
          <RestorePassword />
        </PublicRoute>

        <PublicRoute path="/reset-password" exact={true}>
          <SaveNewPassword />
        </PublicRoute>

        <Route path="/feed">
          <FeedLayout />
        </Route>

        <ProtectedRoute path="/profile">
          <ProfileLayout />
        </ProtectedRoute>

        <Route>
          <NotFound404 />
        </Route>
      </Switch>
    </>
  )
}
