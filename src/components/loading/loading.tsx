import { FC } from 'react'
import logo from '../../images/logo.svg'
import styles from './loading.module.css'

export const Loading: FC = () => {

   return (
      <div className={styles.root}>
         <div className={styles.image_wrapper}>
            <img className={styles.image} src={logo} alt="Загрузка..." />
         </div>
      </div>
   )
}