import { FC } from 'react'
import { RouteProps } from 'react-router'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from '../utils/hooks'

type TProtectedRoute = {
   path: string;
} & RouteProps

export const ProtectedRoute: FC<TProtectedRoute> = ({ children, ...rest }) => {

   const { isAuth } = useSelector(state => state.auth)

   return (
      <Route
         {...rest}
         render={props =>
            isAuth ? (
               children
            ) : (
               <Redirect
                  to={{
                     pathname: '/login',
                     state: { from: props.location }
                  }}
               />
            )
         }
      />
   )
}
