import { FC, useCallback } from "react"
import { NavLink, useHistory } from "react-router-dom"
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { MenuIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons"
import logo from "../../images/logo.svg"
import styles from './app-header.module.css'

export const AppHeader: FC = () => {

   const history = useHistory()
   const openMenu = useCallback((_id) => {
      history.push({
         pathname: `/menu`
      })
   }, [history])

   const onClickGoHome = useCallback((_id) => {
      history.push({
         pathname: `/`
      })
   }, [history])

   return (
      <div className={styles.root}>
         <header className={`${styles.header} pt-5 pb-5`}>
            <div className={`${styles.mobile_header} pl-5 pr-5`}>
               <button
                  className={styles.closeButton}
                  onClick={onClickGoHome}
               >
                  <img src={logo} alt="LOGO" />
               </button>
               <button
                  className={styles.closeButton}
                  onClick={openMenu}
               >
                  <MenuIcon type="primary" />
               </button>
            </div>
            <div className={styles.leftBlock}>
               <NavLink
                  exact
                  to="/"
                  className={styles.link}
                  activeClassName={styles.active}
               >
                  <BurgerIcon type="secondary" />
                  <p className="text text_type_main-default ml-2">
                     Конструктор
                  </p>
               </NavLink>
               <NavLink
                  to="/feed"
                  className={`${styles.link}`}
                  activeClassName={styles.active}>
                  <ListIcon type="secondary" />
                  <p className="text text_type_main-default ml-2">
                     Лента заказов
                  </p>
               </NavLink>
            </div>
            <NavLink
               to="/"
               className={styles.logo}
            >
               <Logo />
            </NavLink>
            <NavLink
               to="/profile"
               className={`${styles.link}`}
               activeClassName={styles.active}
            >
               <ProfileIcon type="secondary" />
               <p className="text text_type_main-default ml-2">
                  Личный кабинет
               </p>
            </NavLink>
         </header >
      </div>
   )
}