import { useMemo, FC } from 'react'
import { RouteProps } from 'react-router'
import { Redirect, Route, useHistory } from 'react-router-dom'
import { useSelector } from '../utils/hooks'

type RouteLocationState = {
   from?: string;
}

export const PublicRoute: FC<RouteProps> = ({ children, ...rest }) => {

   const { isAuth } = useSelector(state => state.auth)
   const history = useHistory<RouteLocationState>()
   const state = useMemo(() => history?.location?.state, [history])

   return (
      <Route
         {...rest}
         render={() =>
            isAuth
               ? (<Redirect to={state?.from || '/'} />)
               : (children)
         }
      />
   )
}
