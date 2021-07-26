import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

export function ProtectedRoute({ children, ...rest }) {

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
