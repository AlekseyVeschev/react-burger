import { NavLink } from "react-router-dom"
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'


export const AppHeader = () => {

   return (
      <div className={styles.root}>
         <header className={`${styles.header} pt-5 pb-5`}>
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
            <div className={styles.logo} >
               <Logo />
            </div>
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