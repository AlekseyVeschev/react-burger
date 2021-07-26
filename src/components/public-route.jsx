import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, useHistory } from 'react-router-dom'

export function PublicRoute({ children, ...rest }) {

   const { isAuth } = useSelector(state => state.auth)
   const history = useHistory()

   const state = useMemo(() =>
      history?.location?.state
      , [history])

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
