import { NavLink, useHistory } from 'react-router-dom'
import { CloseIcon, BurgerIcon, ProfileIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons"
import styles from './menu-page.module.css'
import { useCallback } from 'react'

export const MenuPage = () => {

   const history = useHistory()
   const onClose = useCallback(() => {
      history.go(-1)
   }, [history])

   return (
      <div className={styles.root}>
         <header className={`${styles.header} p-2`}>
            <p className="text text_type_main-medium pt-2 pb-2">
               Меню
            </p>
            <button
               className={styles.closeButton}
               onClick={onClose}
            >
               <CloseIcon type="primary" />
            </button>
         </header>
         <nav>
            <NavLink
               exact
               to="/profile"
               className={`${styles.link} pl-2 pt-3 pb-3 `}
               activeClassName={styles.active}
            >
               <ProfileIcon type="secondary" />
               <p className="text text_type_main-small ml-2">
                  Личный кабинет
               </p>
            </NavLink>
            <NavLink
               to="/"
               className={`${styles.link} pl-2 pt-3 pb-3`}
               activeClassName={styles.active}
            >
               <BurgerIcon type="secondary" />
               <p className="text text_type_main-small ml-2">
                  Конструктор бургеров
               </p>
            </NavLink>
            <NavLink
               to="/feed"
               className={`${styles.link} pl-2 pt-3 pb-3`}
               activeClassName={styles.active}
            >
               <ListIcon type="secondary" />
               <p className="text text_type_main-small ml-2">
                  Лента заказов
               </p>
            </NavLink>
         </nav>
      </div>
   )
}