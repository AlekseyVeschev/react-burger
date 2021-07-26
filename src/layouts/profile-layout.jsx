import { useCallback, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, Switch } from 'react-router-dom'
import { ProtectedRoute } from '../components/protected-route'
import { Profile } from '../pages/profile'
import { OrdersHistory } from '../pages/orders-history'
import { OrderInHistory } from '../pages/order-in-history'
import { logoutRequest, getUserRequest } from '../services/actions/auth'
import styles from './profile-layout.module.css'


export const ProfileLayout = () => {

   const dispatch = useDispatch()
   const [title, setTitle] = useState('')

   useEffect(() => {
      dispatch(getUserRequest)
   }, [dispatch])

   const buttonLogout = useCallback(() => {
      dispatch(logoutRequest())
   }, [dispatch])

   return (
      <div className={`${styles.root}`}>
         <nav className={`${styles.nav} mr-5 pr-5`}>
            <NavLink
               exact
               to="/profile"
               className={`${styles.link}`}
               activeClassName={styles.active}
            >
               <p className="text text_type_main-medium pt-4 pb-4">
                  Профиль
               </p>
            </NavLink>
            <NavLink
               exact
               to="/profile/orders"
               className={`${styles.link}`}
               activeClassName={styles.active}
            >
               <p className="text text_type_main-medium pt-4 pb-4">
                  История заказов
               </p>
            </NavLink>
            <button
               className={`${styles.button}`}
               onClick={buttonLogout}
            >
               <p className="text text_type_main-medium pt-4 pb-5">
                  Выход
               </p>
            </button>
            <p className={`${styles.title} text text_type_main-smoll pt-5`}>
               {title}
            </p>
         </nav>
         <Switch>
            <ProtectedRoute path="/profile" exact={true}>
               <Profile setTitle={setTitle} />
            </ProtectedRoute>
            <ProtectedRoute path="/profile/orders" exact={true}>
               <OrdersHistory setTitle={setTitle} />
            </ProtectedRoute>
            <ProtectedRoute path="/profile/orders/:id" exact={true}>
               <OrderInHistory />
            </ProtectedRoute>
         </Switch>
      </div>
   )
}