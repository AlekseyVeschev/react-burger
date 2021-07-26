import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Switch, Route, useHistory, useLocation } from 'react-router-dom'
import { ProtectedRoute } from '../components/protected-route'
import { Modal } from '../components/modal/modal'
import { OrdersHistory } from '../pages/orders-history'
import { HistoryPage } from '../pages/history-page'
import { Profile } from '../pages/profile'
import { logoutRequest, getUserRequest } from '../services/actions/auth'
import { wsHistoryStart } from '../services/actions/history'
import styles from './profile-layout.module.css'

export const ProfileLayout = () => {

   const { currentNumber } = useSelector(state => state.feed)
   const location = useLocation()
   const history = useHistory()
   const isShowModal = history.action === 'PUSH'

   const onClickCloseButton = useCallback(() => {
      history.go(-1)
   }, [history])

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getUserRequest())
   }, [dispatch])

   const buttonLogout = useCallback(() => {
      dispatch(logoutRequest())
   }, [dispatch])

   useEffect(() => {
      dispatch(wsHistoryStart())
   }, [dispatch])

   const navBarLinks = useMemo(() =>
      ['/profile', '/profile/orders', isShowModal ? '/profile/orders/:id' : ''],
      [isShowModal])

   return (
      <div className={`${styles.root}`}>
         <Switch>
            <ProtectedRoute path={navBarLinks} exact>
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
                     <Switch>
                        <Route path='/profile/orders' >В этом разделе вы можете просмотреть свою историю заказов</Route>
                        <Route path='/profile' >В этом разделе вы можете изменить свои персональные данные</Route>
                     </Switch>
                  </p>
               </nav>
            </ProtectedRoute>
         </Switch>
         <Switch>
            <ProtectedRoute path="/profile" exact={true}>
               <Profile />
            </ProtectedRoute>
            <ProtectedRoute path="/profile/orders" >
               <Switch location={location}>

                  <Route path="/profile/orders" exact={true} >
                     <OrdersHistory />
                  </Route>

                  {isShowModal ? (
                     <Route path={"/profile/orders/:id"} exact={true}>
                        <OrdersHistory />
                        <Modal
                           title={currentNumber}
                           onClose={onClickCloseButton}
                        >
                           <HistoryPage title={currentNumber} />
                        </Modal>
                     </Route>
                  ) : (
                     <Route path={"/profile/orders/:id"} exact={true}>
                        <HistoryPage />
                     </Route>
                  )}
               </Switch>
            </ProtectedRoute>
         </Switch>
      </div>
   )
}