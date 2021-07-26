import logo from '../../images/logo.svg'
import styles from './loading.module.css'

export const Loading = () => {

   return (
      <div className={styles.root}>
         <div className={styles.image_wrapper}>
            <img className={styles.image} src={logo} alt="Загрузка..." />
         </div>
      </div>
   )
}