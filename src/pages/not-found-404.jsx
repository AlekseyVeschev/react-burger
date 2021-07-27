import logo from '../images/logo.svg'
import styles from './not-found-404.module.css'

export const NotFound404 = () => {
  return (
    <div className={styles.root}>
      <p className="text text_type_digits-large text_color_inactive">
        NotF
      </p>
      <img className={styles.image} src={logo} alt="0" />
      <p className="text text_type_digits-large text_color_inactive" >
        und404
      </p>
    </div>
  )
}