import { Route, Switch } from 'react-router-dom'
import { AppHeader } from '../app-header/app-header'
import { Login } from '../../pages/login'
import { Register } from '../../pages/register'
import { RestorePassword } from '../../pages/restore-password'
import { SaveNewPassword } from '../../pages/save-new-password'
import { OrdersTape } from '../../pages/orders-tape'
import { OrderInTape } from '../../pages/order-in-tape'
import { ProfileLayout } from '../../layouts/profile-layout'
import { ProtectedRoute } from '../../components/protected-route'
import { PublicRoute } from '../../components/public-route'
import { NotFound404 } from '../../pages/not-found-404'
import { ConstructorLayout } from '../../layouts/constructor-layout'


export const App = () => {

  return (
    <>
      <AppHeader />
      <Switch>
        <Route path={["/", "/ingredients/:id"]} exact={true}>
          <ConstructorLayout />
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

        <Route path="/feed" exact={true}>
          <OrdersTape />
        </Route>

        <Route path="/feed/:id" exact={true}>
          <OrderInTape />
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
