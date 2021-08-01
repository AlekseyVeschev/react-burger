import { FC } from 'react'
import { RouteProps } from 'react-router'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

type TProtectedRoute = {
   path: string;
} & RouteProps

export const ProtectedRoute: FC<TProtectedRoute> = ({ children, ...rest }) => {

   const { isAuth } = useSelector((state: any) => state.auth)

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
