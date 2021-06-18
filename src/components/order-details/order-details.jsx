import PropTypes from 'prop-types'
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './order-details.module.css'

export const OrderDetails = ({ orderNumber, info, text }) => {
   return (
      <section className={styles.root} >
         <p className="text text_type_digits-large pb-5 pt-5">
            {orderNumber}
         </p>
         <p className="text text_type_main-medium pt-3 pb-5">
            идентификатор заказа
         </p>
         <div className={styles.checkMarkIcon} >
            < CheckMarkIcon />
         </div>
         <p className="text text_type_main-default pt-5 pb-2">
            {info}
         </p>
         <p className={`${styles.button_block} text text_type_main-default`}>
            {text}
         </p>
      </section >
   )
}
OrderDetails.propTypes = {
   orderNumber: PropTypes.number.isRequired,
   info: PropTypes.string.isRequired,
   text: PropTypes.string.isRequired,
}