import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

export const AppHeader = () => {
   return (
      <div className={styles.root}>
         <header className={`${styles.header} pt-5 pb-5`}>
            <div className={styles.leftBlock}>
               <button className={styles.button}>
                  <BurgerIcon type="secondary" />
                  <p className="text text_type_main-default ml-2">
                     Конструктор
                  </p>
               </button>
               <button className={styles.button}>
                  <ListIcon type="secondary" />
                  <p className="text text_type_main-default ml-2">
                     Лента заказов
                  </p>
               </button>
            </div>
            <div className={styles.logo} >
               <Logo />
            </div>
            <button className={styles.button}>
               <ProfileIcon type="secondary" />
               <p className="text text_type_main-default ml-2">
                  Личный кабинет
               </p>
            </button>
         </header >
      </div>
   )
}